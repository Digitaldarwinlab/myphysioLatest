import React from 'react'
import Dashboard from '../components/episode-visit-details/Dashboard/Dashboard'

const HomeDashboard = () => {
  return (
    <div style={{marginTop:'20px'}}>
        <Dashboard patient={true} />
    </div>
  )
}

export default HomeDashboard