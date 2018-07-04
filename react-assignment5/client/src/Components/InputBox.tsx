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
        //console.log("this.props.convObj ", this.props.convObj)
        DataStore.getInstance().addMessage(this.props.convObj,this.props.userLoggedIn, this.state.input)
        //console.log("INPUTBOX msg was added")
        socket.emit("msg sent", {action:this.props.userLoggedIn.name})
        this.clearInput()
        this.props.renderApp()
        return
    }

    clearInput = () => {
        this.setState({
            input: ""
        })
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