// Gmail API Integration for Job Application Tracker

const GMAIL_CLIENT_ID = import.meta.env.VITE_GMAIL_CLIENT_ID
const GMAIL_SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify'

// Email detection patterns
export const emailPatterns = {
  application: {
    subject: [
      /application.*received/i,
      /thank you for applying/i,
      /we.*received.*application/i,
      /application.*submitted/i,
      /confirmation.*application/i,
    ],
    body: [
      /application.*received/i,
      /thank you for your interest/i,
    ]
  },
  interview: {
    subject: [
      /interview/i,
      /schedule.*meeting/i,
      /invitation.*interview/i,
      /next steps/i,
      /phone.*screen/i,
    ],
    body: [
      /schedule.*interview/i,
      /would like to invite/i,
      /next round/i,
    ]
  },
  rejection: {
    subject: [
      /unfortunately/i,
      /not.*moving forward/i,
      /other candidates/i,
      /not.*selected/i,
      /regret.*inform/i,
    ],
    body: [
      /unfortunately/i,
      /not be moving forward/i,
      /decided to pursue/i,
      /other candidates/i,
    ]
  },
  offer: {
    subject: [
      /offer/i,
      /congratulations/i,
      /we.*pleased/i,
      /job offer/i,
    ],
    body: [
      /pleased to offer/i,
      /extend.*offer/i,
      /congratulations/i,
    ]
  }
}

// Initialize Gmail API
export const initGmailClient = () => {
  return new Promise((resolve, reject) => {
    if (!GMAIL_CLIENT_ID) {
      reject(new Error('Gmail Client ID not configured'))
      return
    }

    // Load Google API
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: GMAIL_CLIENT_ID,
          scope: GMAIL_SCOPES,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
        }).then(() => {
          resolve(window.gapi.auth2.getAuthInstance())
        }).catch(reject)
      })
    }
    script.onerror = reject
    document.body.appendChild(script)
  })
}

// Sign in to Gmail
export const signInToGmail = async () => {
  try {
    const authInstance = await initGmailClient()
    if (authInstance.isSignedIn.get()) {
      return authInstance.currentUser.get()
    }
    return await authInstance.signIn()
  } catch (error) {
    console.error('Gmail sign-in error:', error)
    throw error
  }
}

// Sign out from Gmail
export const signOutFromGmail = async () => {
  try {
    const authInstance = window.gapi.auth2.getAuthInstance()
    if (authInstance) {
      await authInstance.signOut()
    }
  } catch (error) {
    console.error('Gmail sign-out error:', error)
    throw error
  }
}

// Check if signed in
export const isGmailSignedIn = () => {
  try {
    const authInstance = window.gapi?.auth2?.getAuthInstance()
    return authInstance?.isSignedIn?.get() || false
  } catch {
    return false
  }
}

// Fetch emails from Gmail
export const fetchGmailMessages = async (query = '', maxResults = 50) => {
  try {
    const response = await window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: maxResults
    })
    return response.result.messages || []
  } catch (error) {
    console.error('Error fetching Gmail messages:', error)
    throw error
  }
}

// Get email details
export const getEmailDetails = async (messageId) => {
  try {
    const response = await window.gapi.client.gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full'
    })
    return response.result
  } catch (error) {
    console.error('Error getting email details:', error)
    throw error
  }
}

// Parse email headers
export const parseEmailHeaders = (headers) => {
  const headerMap = {}
  headers.forEach(header => {
    headerMap[header.name.toLowerCase()] = header.value
  })
  return {
    from: headerMap['from'] || '',
    to: headerMap['to'] || '',
    subject: headerMap['subject'] || '',
    date: headerMap['date'] || '',
  }
}

// Decode email body
export const decodeEmailBody = (message) => {
  let body = ''
  
  if (message.payload.body.data) {
    body = atob(message.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'))
  } else if (message.payload.parts) {
    message.payload.parts.forEach(part => {
      if (part.mimeType === 'text/plain' && part.body.data) {
        body += atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'))
      }
    })
  }
  
  return body
}

// Detect email type
export const detectEmailType = (subject, body) => {
  for (const [type, patterns] of Object.entries(emailPatterns)) {
    // Check subject patterns
    const subjectMatch = patterns.subject.some(pattern => pattern.test(subject))
    // Check body patterns
    const bodyMatch = patterns.body.some(pattern => pattern.test(body))
    
    if (subjectMatch || bodyMatch) {
      return type
    }
  }
  return null
}

// Extract company name from email
export const extractCompanyName = (from, subject) => {
  // Try to extract from email address
  const emailMatch = from.match(/@([^.]+)/)
  if (emailMatch) {
    const domain = emailMatch[1]
    // Capitalize first letter
    return domain.charAt(0).toUpperCase() + domain.slice(1)
  }
  
  // Try to extract from sender name
  const nameMatch = from.match(/^([^<]+)/)
  if (nameMatch) {
    return nameMatch[1].trim()
  }
  
  return 'Unknown Company'
}

// Extract position title from subject
export const extractPositionTitle = (subject) => {
  // Common patterns
  const patterns = [
    /position.*:(.+)/i,
    /role.*:(.+)/i,
    /application.*for(.+)/i,
    /(.+)position/i,
    /(.+)role/i,
  ]
  
  for (const pattern of patterns) {
    const match = subject.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }
  
  return 'Position from email'
}

// Scan emails for job applications
export const scanEmailsForApplications = async (daysBack = 30) => {
  try {
    const date = new Date()
    date.setDate(date.getDate() - daysBack)
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '/')
    
    // Search for job-related emails
    const query = `after:${dateStr} (subject:application OR subject:interview OR subject:job OR subject:position)`
    
    const messages = await fetchGmailMessages(query, 100)
    const applications = []
    
    for (const message of messages) {
      const details = await getEmailDetails(message.id)
      const headers = parseEmailHeaders(details.payload.headers)
      const body = decodeEmailBody(details)
      
      const emailType = detectEmailType(headers.subject, body)
      
      if (emailType) {
        const companyName = extractCompanyName(headers.from, headers.subject)
        const positionTitle = extractPositionTitle(headers.subject)
        
        applications.push({
          company_name: companyName,
          position_title: positionTitle,
          application_date: new Date(headers.date).toISOString().split('T')[0],
          response_status: emailType === 'application' ? 'pending' : 
                          emailType === 'interview' ? 'interview' :
                          emailType === 'rejection' ? 'responded' : 'responded',
          final_outcome: emailType === 'rejection' ? 'rejected' :
                        emailType === 'offer' ? 'successful' : 'in_progress',
          notes: `Auto-detected from email: ${headers.subject}`,
          email_id: message.id,
          email_type: emailType
        })
      }
    }
    
    return applications
  } catch (error) {
    console.error('Error scanning emails:', error)
    throw error
  }
}

// Monitor new emails (call periodically)
export const monitorNewEmails = async (lastCheckDate) => {
  try {
    const dateStr = new Date(lastCheckDate).toISOString().split('T')[0].replace(/-/g, '/')
    const query = `after:${dateStr} (subject:application OR subject:interview OR subject:job)`
    
    const messages = await fetchGmailMessages(query, 20)
    const updates = []
    
    for (const message of messages) {
      const details = await getEmailDetails(message.id)
      const headers = parseEmailHeaders(details.payload.headers)
      const body = decodeEmailBody(details)
      
      const emailType = detectEmailType(headers.subject, body)
      
      if (emailType) {
        updates.push({
          email_id: message.id,
          email_type: emailType,
          subject: headers.subject,
          from: headers.from,
          date: headers.date,
          company: extractCompanyName(headers.from, headers.subject)
        })
      }
    }
    
    return updates
  } catch (error) {
    console.error('Error monitoring emails:', error)
    throw error
  }
}

// Made with Bob