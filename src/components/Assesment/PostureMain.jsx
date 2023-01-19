import React from 'react'
import { useHistory } from 'react-router-dom'
import Posture from './Posture'

const PostureMain = ({Setsidebarshow}) => {
    const history = useHistory()
  return (
    <Posture history={history} Setsidebarshow={Setsidebarshow}/>
  )
}

export default PostureMain