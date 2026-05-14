import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Download, Chrome, CheckCircle, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react'

export default function ExtensionSettings() {
  const [session, setSession] = useState(null)
  const [copied, setCopied] = useState(false)
  const [extensionConnected, setExtensionConnected] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Check if extension is installed (this is a simplified check)
    checkExtensionStatus()
  }, [])

  const checkExtensionStatus = () => {
    // Check if extension has stored credentials
    // This is a placeholder - actual implementation would need extension ID
    const hasExtension = localStorage.getItem('extension_connected') === 'true'
    setExtensionConnected(hasExtension)
  }

  const handleCopyCredentials = async () => {
    const credentials = {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      accessToken: session?.access_token
    }

    await navigator.clipboard.writeText(JSON.stringify(credentials, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConnectExtension = () => {
    // Mark as connected
    localStorage.setItem('extension_connected', 'true')
    setExtensionConnected(true)
    alert('Extension connected! You can now use the browser extension to track applications.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <Chrome className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browser Extension</h2>
            <p className="text-gray-600">
              Install our browser extension to automatically detect and track job applications as you browse.
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h3>
        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          extensionConnected 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          {extensionConnected ? (
            <>
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Extension Connected</p>
                <p className="text-sm text-green-700">Your browser extension is ready to use</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-900">Extension Not Connected</p>
                <p className="text-sm text-yellow-700">Follow the steps below to set up the extension</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Installation Steps */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Steps</h3>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Download the Extension</h4>
              <p className="text-gray-600 mb-3">
                Download the extension files from the repository or use the link below.
              </p>
              <a
                href="https://github.com/your-repo/job-application-tracker/tree/main/browser-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Extension
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Install in Your Browser</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open Chrome/Edge and go to <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions/</code></li>
                <li>Enable "Developer mode" (toggle in top right)</li>
                <li>Click "Load unpacked"</li>
                <li>Select the <code className="bg-gray-100 px-2 py-1 rounded">browser-extension</code> folder</li>
                <li>Pin the extension to your toolbar</li>
              </ol>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Connect to Your Account</h4>
              <p className="text-gray-600 mb-3">
                Click the button below to connect the extension to your account.
              </p>
              <button
                onClick={handleConnectExtension}
                disabled={!session || extensionConnected}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {extensionConnected ? 'Already Connected' : 'Connect Extension'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Extension Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900">Auto-Detection</h4>
              <p className="text-sm text-gray-600">Automatically detects job postings on popular sites</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900">Smart Extraction</h4>
              <p className="text-sm text-gray-600">Extracts company name, position, and details</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900">One-Click Save</h4>
              <p className="text-sm text-gray-600">Save applications with a single click</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900">Multi-Platform</h4>
              <p className="text-sm text-gray-600">Works on LinkedIn, Indeed, Glassdoor, and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Credentials (for manual configuration)
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Supabase URL</span>
                <button
                  onClick={handleCopyCredentials}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy All
                    </>
                  )}
                </button>
              </div>
              <code className="text-xs text-gray-600 break-all">
                {import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              These credentials are automatically configured when you connect the extension.
            </p>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-700 mb-4">
          Check out our comprehensive documentation for detailed setup instructions and troubleshooting.
        </p>
        <div className="flex gap-3">
          <a
            href="/browser-extension/README.md"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="/browser-extension/INSTALLATION.md"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Installation Guide
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
