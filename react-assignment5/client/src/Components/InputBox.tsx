import * as React from 'react'
import DataStore from "../DataStore/DataStore";
import {socket} from "./../App"

interface IInputBox {
    groupId: any;
    input: string
    userLogged: object| null
}



class InputBox extends React.Component <any, IInputBox> {

    constructor(props: any) {
        super(props)
        this.state = {
            groupId: null,
            input: "",
            userLogged: null
        }
    }

    componentDidMount() {
        //console.log("INPUT BOX componentDidMount", this.props.convObj)
        this.setState({
            groupId: this.props.convObj,
            userLogged: this.props.userLoggedIn
        })
    }

    componentDidUpdate() {
        //console.log("INPUT BOX componentDidUpdate", this.props.convObj)
        if (this.props.convObj.id !== this.state.groupId.id) {
            this.setState({
                groupId: this.props.convObj,
                userLogged: this.props.userLoggedIn
            })
        }
    }

    clickHandler = () => {
        if(this.state.groupId===null) {
            this.clearInput()
            return
        }
        if(this.state.input.length==0)
            return
        let today = new Date()
        let msg = {
            classType: "notMe",
            senderName: this.props.userLoggedIn['name'],
            senderID: this.props.userLoggedIn['id'],
            convType: this.props.convObj['type'],
            convName: this.props.convObj['name'],
            convID: this.props.convObj['id'],
            senderContent: this.state.input,
            senderDate: "sent at " + today.toLocaleTimeString() + " " + today.toLocaleDateString()
        }

        socket.emit("msg sent", {msg:msg,conv: this.props.convObj['id']})
        // socket.emit("msg sent", {convObj:this.props.convObj,
        //     userLoggedIn:this.props.userLoggedIn,
        //     content:this.state.input})

        socket.on('gotMessage', (data)=>{
            DataStore.getInstance().addMessage(data.msg, data.conv, this.props.userLoggedIn['id'])
            this.props.renderApp()
        })
        msg.classType = "me"
        DataStore.getInstance().addMessage(msg, this.props.convObj['id'], this.props.userLoggedIn['id'])
        this.clearInput()
        this.props.renderApp()
        return
    }


    clearInput = () => {
        this.setState({
            input: ""
        })
    }

    addMessageToData(){

    }
    setInput = (event: any) => {
        this.setState({
            input: event.target.value
        })
    }
    keyHandler = (e: any) => {
        // evt.keyCode == 13 && !evt.shiftKey
        if (e.key == 'Enter') {
            if(e.shiftKey){
                //console.log('enter + shift key press here! ')
                return;
            }else{
                this.clickHandler();
                //console.log('enter press here! ')
            }

        }

    }

    render() {

        return (
            <div className="input-box">
                <input type="text" onChange={this.setInput} placeholder="enter your message here" value={this.state.input} onKeyPress={this.keyHandler}/>
                <button onClick={this.clickHandler}>send</button>
            </div>
        )
    }
}

export default InputBox;