import * as React from 'react'
import './userButtonsStyle.css'

class UserButtons extends React.Component <any,any>{
    constructor(props:any){
        super(props)
    }

    const
    render(){
        return (
            <div className="UserButtons">
                <img src="./pics/save.png" />
                <img src="./pics/user-add.png" />
                <img src="./pics/user-delete.png" />
                <img src="./pics/user-edit.png" />
            </div>

        )
    }
}

export default UserButtons