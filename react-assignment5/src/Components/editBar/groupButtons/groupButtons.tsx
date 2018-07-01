import * as React from 'react'
import './groupButtonsStyle.css'

class GroupButtons extends React.Component <any,any>{
    constructor(props:any){
        super(props)
    }

    const
    render(){
        return (
                <div className="GroupButtons">
                    <img src="./pics/save.png" />
                    <img src="./pics/group-add.png" />
                    <img src="./pics/group-delete.png" />
                    <img src="./pics/group-edit.png" />
                </div>

        )
    }
}

export default GroupButtons