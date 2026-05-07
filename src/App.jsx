import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only set session if email is confirmed
      if (session?.user?.email_confirmed_at) {
        setSession(session)
      } else if (session) {
        // Sign out if email not confirmed
        supabase.auth.signOut()
        setSession(null)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Only allow access if email is confirmed
      if (session?.user?.email_confirmed_at) {
        setSession(session)
      } else if (session && _event === 'SIGNED_IN') {
        // Sign out immediately if trying to sign in without email confirmation
        supabase.auth.signOut()
        setSession(null)
      } else {
        setSession(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={!session ? <Auth /> : <Navigate to="/" replace />}
        />
        <Route
          path="/*"
          element={
            session ? (
              <Layout session={session}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App

// Made with Bob
