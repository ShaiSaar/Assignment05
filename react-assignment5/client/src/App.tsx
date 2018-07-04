import * as React from 'react';
import './style.css';
import Tree from './Components/Tree/Tree'
import Messages from './Components/Messages'
import InputBox from './Components/InputBox'
import Login from './Components/Login'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import LoginBar from "./Components/LoginBar";
import EditFeild from './containers/editFeild';
import DataStore from "./DataStore/DataStore";
import * as socketIOClient from 'socket.io-client'

export const socket = socketIOClient("http://localhost:4000")



interface IAppState {
    index: null|number,
    indexType: string|null
    fullObj: object|null
    loginNeeded: boolean,
    username: string,
    statusLogin: string
    userLogedIn: object|null
    statusEdit:string,
    DBtree:object
}

class App extends React.Component <{}, IAppState> {

    state = {
        index: null,
        indexType: null,
        fullObj:{},
        loginNeeded: true,
        userLogedIn : null,
        username: "User",
        statusLogin: "Login",
        statusEdit:"EDIT PANEL",
        DBtree:{}
    }

    setIndexHandler = (e: any, type, itemObj) => {
        // console.log("this.state.index = entry ==>", e)
        // console.log("App item chosen = itemObj ==>", itemObj)
        this.setState({
            index: e,
            indexType: type,
            fullObj:{...itemObj}
        })
    }

    reRender = () => {
        this.forceUpdate();
    }

    logOutHandler=()=>{

        if(!this.state.loginNeeded){
            this.setState({
                index: null,
                userLogedIn:null,
                loginNeeded: !this.state.loginNeeded,
                username:"User",
                statusLogin:"Login",

            })
        }
    }
    setLoginHandler = (user:object) => {
        let state = this.state.loginNeeded

        this.setState({
            loginNeeded: !state,
            userLogedIn:user,
            username:user["name"],
            statusLogin:"Log Out",


        })
        socket.emit("login", {name:this.state.username})
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("APP shouldComponentUpdate")
        return this.state != nextState
    }
    componentDidMount(){
        this.setState({
            DBtree:DataStore.getInstance().DBMainTree()
        })
        console.log("APP componentDidMount")
    }
    componentDidUpdate(){
        console.log("APP componentDidMount")
        //const socket = io.connect("http:/http://localhost:3000/")
    }
    public render() {
        const loginRenderer = () => {
           return (this.state.loginNeeded)? <Login login={this.setLoginHandler} /> : <Redirect to=''/>

        }

        const loginBar = () => {
            return(<LoginBar getName={this.state.username} loginButton={this.state.statusLogin} editButton={this.state.statusEdit} logOut={this.logOutHandler}/>)
        }

        const renderEditFeild = () => {

            return <EditFeild  logOut={this.reRender} pickedIndex={this.setIndexHandler} fullObj={this.state.fullObj} pickedIndexToEdit={this.state.index} pickedIndexType={this.state.indexType} treeLogin={this.state.loginNeeded}/>
        }

            return (
                <BrowserRouter>
                    <div className="app">

                        <Route path='' name='' exact={true} strict={true} render={loginBar}/>
                        <div className="content">

                            <Tree pickedIndex={this.setIndexHandler} showTree={this.state.loginNeeded} upDateTree={this.state.DBtree}/>
                            <section className="board">
                                {this.state.userLogedIn && <Messages idGroup={this.state.index} idUser={this.state.userLogedIn.id}/>}
                                <InputBox convObj={this.state.fullObj} renderApp={this.reRender} userLoggedIn={this.state.userLogedIn}/>
                            </section>
                        </div>
                        {/*<footer><h2>This is my footer</h2></footer>*/}

                        <Route path='/login' name='login' exact={true} strict={true} render={loginRenderer}/>
                        <Route path='/editPanel' name='editPanel' exact={true} strict={true} render={renderEditFeild}/>
                    </div>
                </BrowserRouter>
            );
        }
    }

    export
    default
    App;
