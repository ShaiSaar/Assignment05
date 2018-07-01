import * as React from 'react'
import './editBarStyle.css'
import {Link} from "react-router-dom";
import UserButtons from "./userButtons/userButtons";
import GroupButtons from "./groupButtons/groupButtons";
import {Redirect} from "react-router";

class EditBar extends React.Component <any,any>{
    constructor(props:any){
        super(props)
    }

    logOut = ()=>{
        console.log("EDIT log out")
        this.props.reRender();
    }
    render(){
        return (
            <div className="editBar-wrapper">
                {(this.props.barShow=="user")?<UserButtons/>:<GroupButtons/>}
                <Link className="header-link-right" to='/' onClick={this.logOut}>{"BACK"}</Link>
                </div>

        )
    }
}

export default EditBar