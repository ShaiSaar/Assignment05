import * as React from 'react';
import Message from './Message';
import DataStore from "../DataStore/DataStore";

interface IMessages {
    messageStore: any,
    idGroup : number | null
    idUser : number | null

}
class Messages extends React.Component <any,IMessages> {

    myRef:any;
    constructor(props:{}){
        super(props);
        this.state ={
            messageStore: [],
            idGroup : 0,
            idUser : 0,

        }
        this.myRef = React.createRef()
    }

    getMessages(idUser:any,idGroup:any){
        return DataStore.getInstance().getMessagesOfUser(idUser,idGroup)
    }
    componentDidMount(){
        if(this.props.idGroup===this.state.idGroup){
            return;
        }else{
            this.setState({
                idGroup : this.props.idGroup,
                idUser : this.props.idUser,
                messageStore: this.getMessages(this.props.idUser,this.props.idGroup)
            })
            this.forceUpdate()
        }
        return
    }
    componentDidUpdate(){
        console.log("MESSAGES state.messageStore  msgs ",this.state.messageStore)
        console.log("MESSAGES DataStore msgs ",DataStore.getInstance().getAllUsersMessages())
        const objDiv = document.querySelector("ul.messages");
        if(this.props.idGroup===this.state.idGroup){

            if(!!objDiv){objDiv.scrollTop = objDiv.scrollHeight;}
            return;
        }else{
            this.setState({
                idGroup : this.props.idGroup,
                idUser : this.props.idUser,
                messageStore: this.getMessages(this.props.idUser, this.props.idGroup)
            })
            console.log("this.state",this.state)
            if(!!objDiv){objDiv.scrollTop = objDiv.scrollHeight;}
            this.forceUpdate()
        }
        return
    }


    render(){

        const messges = ()=>{
            this.state.messageStore.map((msg:any,i:any) => {
                let classType = (this.state.idUser==msg.senderID) ? "me" : "notMe"
                return <Message key={i} classType={classType} senderName={msg.senderName} senderContent={msg.senderContent} senderDate={msg.senderDate}/>
            })
        }
        return(
            <ul className="messages" ref={this.myRef}>

                {this.state.messageStore.map((msg:any,i:any) => <Message key={i} classType={msg.classType} senderName={msg.senderName} senderContent={msg.senderContent} senderDate={msg.senderDate}/>)}

            </ul>
        )
    }

}

export default Messages;