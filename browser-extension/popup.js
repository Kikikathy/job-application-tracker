// Job Application Tracker - Popup Script

class PopupController {
  constructor() {
    this.supabaseUrl = '';
    this.supabaseKey = '';
    this.session = null;
    this.init();
  }

  async init() {
    // Load Supabase credentials from storage
    await this.loadCredentials();
    
    // Check authentication status
    await this.checkAuth();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Try to get job data from current page
    await this.loadJobData();
  }

  async loadCredentials() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['supabaseUrl', 'supabaseKey', 'session'], (result) => {
        this.supabaseUrl = result.supabaseUrl || '';
        this.supabaseKey = result.supabaseKey || '';
        this.session = result.session || null;
        resolve();
      });
    });
  }

  async checkAuth() {
    const loading = document.getElementById('loading');
    const authRequired = document.getElementById('auth-required');
    const mainForm = document.getElementById('main-form');

    loading.classList.add('active');

    // Check if we have credentials and session
    if (!this.supabaseUrl || !this.supabaseKey || !this.session) {
      loading.classList.remove('active');
      authRequired.classList.remove('hidden');
      return;
    }

    // Verify session is still valid
    try {
      const response = await fetch(`${this.supabaseUrl}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${this.session.access_token}`,
          'apikey': this.supabaseKey
        }
      });

      if (response.ok) {
        // Session is valid
        loading.classList.remove('active');
        mainForm.classList.remove('hidden');
      } else {
        // Session expired
        this.session = null;
        chrome.storage.sync.remove('session');
        loading.classList.remove('active');
        authRequired.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      loading.classList.remove('active');
      authRequired.classList.remove('hidden');
    }
  }

  setupEventListeners() {
    // Form submission
    const form = document.getElementById('application-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Clear button
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearForm());
    }

    // Open dashboard link
    const openDashboard = document.getElementById('open-dashboard');
    if (openDashboard) {
      openDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: 'https://job-application-tracker-two-xi.vercel.app' });
      });
    }

    // File input handlers
    const fileInputs = ['resume', 'cover_letter', 'portfolio'];
    fileInputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      const fileName = document.getElementById(`${inputId}-name`);
      
      if (input && fileName) {
        // Click on file name to trigger file input
        fileName.addEventListener('click', () => input.click());
        
        // Update file name display when file is selected
        input.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            const file = e.target.files[0];
            fileName.textContent = file.name;
            fileName.classList.add('has-file');
          } else {
            fileName.textContent = 'No file chosen';
            fileName.classList.remove('has-file');
          }
        });
      }
    });
  }

  async loadJobData() {
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) return;

      // Send message to content script to get job data
      chrome.tabs.sendMessage(tab.id, { action: 'getJobData' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('No content script available');
          return;
        }

        if (response && response.success && response.data) {
          this.populateForm(response.data);
          
          // Show detected info message
          const detectedInfo = document.getElementById('detected-info');
          if (detectedInfo) {
            detectedInfo.classList.remove('hidden');
          }
        }
      });

      // Also check for pending application in storage
      chrome.storage.local.get(['pendingApplication'], (result) => {
        if (result.pendingApplication) {
          this.populateForm(result.pendingApplication);
          
          const detectedInfo = document.getElementById('detected-info');
          if (detectedInfo) {
            detectedInfo.classList.remove('hidden');
          }
        }
      });
    } catch (error) {
      console.error('Error loading job data:', error);
    }
  }

  populateForm(data) {
    const fields = ['company_name', 'position_title', 'application_date', 
                    'application_method', 'job_posting_url', 'notes'];
    
    fields.forEach(field => {
      const input = document.getElementById(field);
      if (input && data[field]) {
        input.value = data[field];
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const saveBtn = document.getElementById('save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    try {
      // Get form data
      const formData = new FormData(e.target);
      const applicationData = {
        company_name: formData.get('company_name'),
        position_title: formData.get('position_title'),
        application_date: formData.get('application_date'),
        application_method: formData.get('application_method') || '',
        job_posting_url: formData.get('job_posting_url') || '',
        notes: formData.get('notes') || '',
        response_status: 'pending',
        final_outcome: 'in_progress',
        user_id: this.session.user.id
      };

      // Save application to Supabase and get the ID
      const response = await fetch(`${this.supabaseUrl}/rest/v1/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.session.access_token}`,
          'apikey': this.supabaseKey,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        throw new Error('Failed to save application');
      }

      const [savedApplication] = await response.json();
      const applicationId = savedApplication.id;

      // Upload documents if any
      const documents = [];
      const fileInputs = [
        { id: 'resume', type: 'resume' },
        { id: 'cover_letter', type: 'cover_letter' },
        { id: 'portfolio', type: 'portfolio' }
      ];

      for (const { id, type } of fileInputs) {
        const fileInput = document.getElementById(id);
        if (fileInput && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          saveBtn.textContent = `Uploading ${type}...`;
          
          try {
            const uploadResult = await this.uploadDocument(file, type, applicationId);
            if (uploadResult) {
              documents.push(uploadResult);
            }
          } catch (uploadError) {
            console.error(`Error uploading ${type}:`, uploadError);
            // Continue with other uploads even if one fails
          }
        }
      }

      // Show success message
      const docCount = documents.length;
      const message = docCount > 0
        ? `Application saved with ${docCount} document${docCount > 1 ? 's' : ''}!`
        : 'Application saved successfully!';
      
      this.showMessage(message, 'success');
      
      // Clear form after 1.5 seconds
      setTimeout(() => {
        this.clearForm();
        
        // Clear pending application from storage
        chrome.storage.local.remove('pendingApplication');
      }, 1500);

    } catch (error) {
      console.error('Error saving application:', error);
      this.showMessage('Error saving application. Please try again.', 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = originalText;
    }
  }

  async uploadDocument(file, documentType, applicationId) {
    try {
      // Create file path: userId/applicationId/documentType_timestamp_filename
      const timestamp = Date.now();
      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${this.session.user.id}/${applicationId}/${documentType}_${timestamp}_${fileName}`;

      // Upload file to Supabase Storage
      const uploadResponse = await fetch(
        `${this.supabaseUrl}/storage/v1/object/application-documents/${filePath}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.session.access_token}`,
            'apikey': this.supabaseKey,
            'Content-Type': file.type
          },
          body: file
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      // Get public URL
      const fileUrl = `${this.supabaseUrl}/storage/v1/object/public/application-documents/${filePath}`;

      // Save document metadata to database
      const documentData = {
        application_id: applicationId,
        document_type: documentType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size
      };

      const docResponse = await fetch(`${this.supabaseUrl}/rest/v1/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.session.access_token}`,
          'apikey': this.supabaseKey,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(documentData)
      });

      if (!docResponse.ok) {
        throw new Error('Failed to save document metadata');
      }

      return await docResponse.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  clearForm() {
    const form = document.getElementById('application-form');
    if (form) {
      form.reset();
      
      // Set today's date
      const dateInput = document.getElementById('application_date');
      if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
      
      // Reset file input displays
      const fileInputs = ['resume', 'cover_letter', 'portfolio'];
      fileInputs.forEach(inputId => {
        const fileName = document.getElementById(`${inputId}-name`);
        if (fileName) {
          fileName.textContent = 'No file chosen';
          fileName.classList.remove('has-file');
        }
      });
      
      // Hide detected info
      const detectedInfo = document.getElementById('detected-info');
      if (detectedInfo) {
        detectedInfo.classList.add('hidden');
      }
    }
  }

  showMessage(text, type = 'info') {
    const statusMessage = document.getElementById('status-message');
    if (!statusMessage) return;

    const icons = {
      success: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>`,
      error: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>`,
      info: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="12" y1="16" x2="12" y2="12"></line>
               <line x1="12" y1="8" x2="12.01" y2="8"></line>
             </svg>`
    };

    statusMessage.className = `status-message ${type}`;
    statusMessage.innerHTML = `${icons[type]}<span>${text}</span>`;
    statusMessage.style.display = 'flex';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusMessage.style.display = 'none';
    }, 5000);
  }
}

// Initialize popup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PopupController());
} else {
  new PopupController();
}

// Made with Bob
