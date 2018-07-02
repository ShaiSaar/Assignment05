import * as React from 'react'
import {Link} from 'react-router-dom'

interface ILoginBar {
    logOut:Function
    loginButton:string
    editButton:string
    getName:string


}
class LoginBar extends React.Component <ILoginBar,any>{
    constructor(props:any){
        super(props)
    }

    logOut = ()=>{
        console.log("log out")
        this.props.logOut();
    }

    render(){
        return (
            <header>
                <Link className="header-link" to='/login' onClick={this.logOut}>{this.props.loginButton}</Link>
                <p>Welcome {this.props.getName}</p>
                {(this.props.loginButton!="Login")? <Link className="header-link-right" to='/editPanel'>{this.props.editButton}</Link>:null}
            </header>
        )
    }
}

export default LoginBar