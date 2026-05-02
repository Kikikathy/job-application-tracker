import { useState, useEffect } from 'react'
import { Mail, RefreshCw, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react'
import { 
  signInToGmail, 
  signOutFromGmail, 
  isGmailSignedIn,
  scanEmailsForApplications,
  monitorNewEmails
} from '../lib/gmail'
import { supabase } from '../lib/supabase'

export default function EmailIntegration({ onApplicationsDetected }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState(null)
  const [error, setError] = useState(null)
  const [lastScanDate, setLastScanDate] = useState(null)

  useEffect(() => {
    // Check if already connected
    setIsConnected(isGmailSignedIn())
    
    // Load last scan date from localStorage
    const lastScan = localStorage.getItem('lastEmailScan')
    if (lastScan) {
      setLastScanDate(new Date(lastScan))
    }
  }, [])

  const handleConnect = async () => {
    try {
      setError(null)
      await signInToGmail()
      setIsConnected(true)
      alert('Gmail connected successfully!')
    } catch (err) {
      console.error('Gmail connection error:', err)
      setError('Failed to connect to Gmail. Please try again.')
    }
  }

  const handleDisconnect = async () => {
    try {
      await signOutFromGmail()
      setIsConnected(false)
      setScanResults(null)
      alert('Gmail disconnected successfully!')
    } catch (err) {
      console.error('Gmail disconnection error:', err)
      setError('Failed to disconnect from Gmail.')
    }
  }

  const handleScanEmails = async (daysBack = 30) => {
    try {
      setIsScanning(true)
      setError(null)
      setScanResults(null)

      const applications = await scanEmailsForApplications(daysBack)
      
      setScanResults({
        total: applications.length,
        applications: applications,
        scannedAt: new Date()
      })

      // Save last scan date
      const now = new Date().toISOString()
      localStorage.setItem('lastEmailScan', now)
      setLastScanDate(new Date(now))

      if (applications.length === 0) {
        alert('No job applications found in your emails.')
      }
    } catch (err) {
      console.error('Email scan error:', err)
      setError('Failed to scan emails. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleImportApplication = async (app) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('applications')
        .insert([{ ...app, user_id: user.id }])

      if (error) throw error

      alert('Application imported successfully!')
      
      // Remove from scan results
      setScanResults(prev => ({
        ...prev,
        applications: prev.applications.filter(a => a.email_id !== app.email_id)
      }))

      // Notify parent component
      if (onApplicationsDetected) {
        onApplicationsDetected()
      }
    } catch (err) {
      console.error('Import error:', err)
      alert('Failed to import application: ' + err.message)
    }
  }

  const handleImportAll = async () => {
    if (!scanResults || scanResults.applications.length === 0) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const appsToImport = scanResults.applications.map(app => ({
        ...app,
        user_id: user.id
      }))

      const { error } = await supabase
        .from('applications')
        .insert(appsToImport)

      if (error) throw error

      alert(`Successfully imported ${appsToImport.length} applications!`)
      setScanResults(null)

      if (onApplicationsDetected) {
        onApplicationsDetected()
      }
    } catch (err) {
      console.error('Bulk import error:', err)
      alert('Failed to import applications: ' + err.message)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-blue-100 text-blue-800',
      responded: 'bg-green-100 text-green-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getOutcomeBadge = (outcome) => {
    const styles = {
      in_progress: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      successful: 'bg-green-100 text-green-800',
    }
    return styles[outcome] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Email Integration</h2>
            <p className="text-sm text-gray-600">
              {isConnected ? 'Connected to Gmail' : 'Connect Gmail to auto-detect applications'}
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Connect Gmail
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {isConnected && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleScanEmails(30)}
              disabled={isScanning}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Scan Last 30 Days
                </>
              )}
            </button>
            <button
              onClick={() => handleScanEmails(90)}
              disabled={isScanning}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Scan Last 90 Days
                </>
              )}
            </button>
          </div>

          {lastScanDate && (
            <p className="text-xs text-gray-500 text-center">
              Last scanned: {lastScanDate.toLocaleString()}
            </p>
          )}

          {scanResults && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Found {scanResults.total} application{scanResults.total !== 1 ? 's' : ''}
                </h3>
                {scanResults.applications.length > 0 && (
                  <button
                    onClick={handleImportAll}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Import All
                  </button>
                )}
              </div>

              {scanResults.applications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>All detected applications have been imported!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scanResults.applications.map((app, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{app.company_name}</h4>
                          <p className="text-sm text-gray-600">{app.position_title}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(app.response_status)}`}>
                              {app.response_status}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getOutcomeBadge(app.final_outcome)}`}>
                              {app.final_outcome.replace('_', ' ')}
                            </span>
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                              {app.email_type}
                            </span>
                          </div>
                          {app.notes && (
                            <p className="text-xs text-gray-500 mt-2">{app.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleImportApplication(app)}
                          className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
                        >
                          Import
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!isConnected && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
          <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <h3 className="font-semibold text-gray-900 mb-2">Connect Your Gmail</h3>
          <p className="text-sm text-gray-600 mb-4">
            Automatically detect job applications, interview invitations, and responses from your email.
          </p>
          <ul className="text-sm text-gray-600 text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Auto-detect application confirmations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Track interview invitations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Monitor responses and rejections</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Your data stays private and secure</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

// Made with Bob