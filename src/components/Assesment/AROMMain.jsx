import React from 'react'
import { useHistory } from 'react-router-dom'
import AromClass from './AromClass'

const AROMMain = ({Setsidebarshow}) => {
    const history = useHistory()
  return (
    <AromClass history={history} Setsidebarshow={Setsidebarshow} />
  )
}

export default AROMMain