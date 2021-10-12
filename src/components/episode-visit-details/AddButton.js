import React from 'react'
import { Button } from 'antd';
import { ImPlus } from 'react-icons/im';

export default function AddButton({onClick}) {
    return (
        <React.Fragment>
            
            <Button className="btncolor" 
            onClick={()=>onClick()}><ImPlus className="me-2"/> Add</Button>
        </React.Fragment>
    )
}
