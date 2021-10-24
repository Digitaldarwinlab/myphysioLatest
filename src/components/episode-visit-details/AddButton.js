import React from 'react'
import { Button } from 'antd';
import { ImPlus } from 'react-icons/im';
import '../../styles/Layout/Episode.css';

export default function AddButton({onClick}) {
    return (
        <React.Fragment>
            {/* Dipsikha 23/10 */}
            
            <Button className="button1" style={{color: "white"}} id="bnid"
            onClick={()=>onClick()}><ImPlus className="me-2"/> Add</Button>
        </React.Fragment>
    )
}
