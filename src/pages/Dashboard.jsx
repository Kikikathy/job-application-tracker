import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  Briefcase,
  ExternalLink,
  Edit,
  Trash2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    responded: 0,
    rejected: 0,
    successful: 0
  })

  // Form state
  const [formData, setFormData] = useState({
    company_name: '',
    position_title: '',
    application_date: new Date().toISOString().split('T')[0],
    application_method: '',
    job_posting_url: '',
    notes: ''
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [applications])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('application_date', { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      alert('Error loading applications')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const total = applications.length
    const pending = applications.filter(app => app.response_status === 'pending').length
    const responded = applications.filter(app => app.response_status === 'responded').length
    const rejected = applications.filter(app => app.final_outcome === 'rejected').length
    const successful = applications.filter(app => app.final_outcome === 'successful').length

    setStats({ total, pending, responded, rejected, successful })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (editingApp) {
        // Update existing application
        const { error } = await supabase
          .from('applications')
          .update(formData)
          .eq('id', editingApp.id)

        if (error) throw error
        alert('Application updated successfully!')
      } else {
        // Create new application
        const { error } = await supabase
          .from('applications')
          .insert([{ ...formData, user_id: user.id }])

        if (error) throw error
        alert('Application added successfully!')
      }

      setShowAddModal(false)
      setEditingApp(null)
      resetForm()
      fetchApplications()
    } catch (error) {
      console.error('Error saving application:', error)
      alert('Error saving application: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Application deleted successfully!')
      fetchApplications()
    } catch (error) {
      console.error('Error deleting application:', error)
      alert('Error deleting application')
    }
  }

  const handleEdit = (app) => {
    setEditingApp(app)
    setFormData({
      company_name: app.company_name,
      position_title: app.position_title,
      application_date: app.application_date,
      application_method: app.application_method || '',
      job_posting_url: app.job_posting_url || '',
      notes: app.notes || ''
    })
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      company_name: '',
      position_title: '',
      application_date: new Date().toISOString().split('T')[0],
      application_method: '',
      job_posting_url: '',
      notes: ''
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'responded':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'no_response':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getOutcomeBadge = (outcome) => {
    const styles = {
      in_progress: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      successful: 'bg-green-100 text-green-800',
      withdrawn: 'bg-gray-100 text-gray-800'
    }
    return styles[outcome] || styles.in_progress
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position_title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterStatus === 'all' || 
      app.response_status === filterStatus ||
      app.final_outcome === filterStatus

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage your job search</p>
        </div>
        <button
          onClick={() => {
            setEditingApp(null)
            resetForm()
            setShowAddModal(true)
          }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Responded</p>
              <p className="text-2xl font-bold text-green-600">{stats.responded}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
          <option value="no_response">No Response</option>
          <option value="rejected">Rejected</option>
          <option value="successful">Successful</option>
        </select>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-4">Start tracking your job applications by adding your first one!</p>
          <button
            onClick={() => {
              setEditingApp(null)
              resetForm()
              setShowAddModal(true)
            }}
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Application</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-6 h-6 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{app.company_name}</h3>
                      <p className="text-gray-600">{app.position_title}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(app.application_date), 'MMM dd, yyyy')}</span>
                        </div>
                        {app.application_method && (
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{app.application_method}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(app.response_status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOutcomeBadge(app.final_outcome)}`}>
                      {app.final_outcome.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.job_posting_url && (
                      <a
                        href={app.job_posting_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View job posting"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(app)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit application"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete application"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {app.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">{app.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingApp ? 'Edit Application' : 'Add New Application'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position_title}
                      onChange={(e) => setFormData({ ...formData, position_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.application_date}
                      onChange={(e) => setFormData({ ...formData, application_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Method
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., LinkedIn, Company Website"
                      value={formData.application_method}
                      onChange={(e) => setFormData({ ...formData, application_method: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Posting URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.job_posting_url}
                    onChange={(e) => setFormData({ ...formData, job_posting_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Add any additional notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingApp ? 'Update Application' : 'Add Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingApp(null)
                      resetForm()
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Made with Bob