import * as React from 'react'
import './editContentStyle.css'
import DataStore from "../../DataStore/DataStore";


class EditContent extends React.Component <any, any> {

    itemId
    allIsUpToDate
    constructor(props: any) {
        super(props)
        this.itemId= null
        this.allIsUpToDate = false
        this.state = {
            myGroupName: "",
            myUserPassword: "",
            myUserAge: "",
            myUserName: "",
            myItemID:"",
            myNEWGroupName: "",
            myNEWUserPassword: "",
            myNEWUserAge: "",
            myNEWUserName: "",
        }

    }

    componentDidMount() {

        console.log(" EditContent  componentDidMount this.props.pickedIndex", this.props.pickedIndex)
        if(!this.props.pickedIndex){
            console.log("EditContent - componentDidMount no element was chosen")
            return
        }
        if (this.props.pickedIndex['type'] == "user") {
            console.log("EditContent - componentDidMount element User was chosen")
            this.itemId = this.props.pickedIndex['id']
            this.setState({
                myGroupName:"",
                myUserPassword: "",
                myUserAge: this.props.pickedIndex.age,
                myUserName: this.props.pickedIndex.name,
                myItemID: this.props.pickedIndex.id,
            })
        }
        if (this.props.pickedIndex['type'] == "group") {
            console.log("EditContent - componentDidMount element Group was chosen")
            this.itemId = this.props.pickedIndex['id']
            this.setState({
                myGroupName: this.props.pickedIndex.name,
                myUserPassword: "",
                myUserAge: "",
                myUserName: "",
                myItemID: this.props.pickedIndex.id,

            })
        }
    }
    // componentWillReceiveProps(){
    //     if (this.props.pickedIndex['type'] == "user") {
    //             this.setState({
    //                 myGroupName:"",
    //                 myUserPassword: "",
    //                 myUserAge: this.props.pickedIndex.age,
    //                 myUserName: this.props.pickedIndex.name,
    //                 myItemID: this.props.pickedIndex.id,
    //             })
    //     }
    //     if (this.props.pickedIndex['type'] == "group") {
    //             this.setState({
    //                 myGroupName: this.props.pickedIndex.name,
    //                 myUserPassword: "",
    //                 myUserAge: "",
    //                 myUserName: "",
    //                 myItemID: this.props.pickedIndex.id,
    //
    //             })
    //     }
    // }
    componentDidUpdate(){
        if(!this.props.pickedIndex){
            console.log("EditContent componentDidUpdate- no element was chosen")
            return
        }
        if (this.props.pickedIndex['type'] == "user") {
            //if(this.state.myUserName!= this.props.pickedIndex.name){
            if(this.itemId != this.props.pickedIndex['id'] ){
                this.itemId = this.props.pickedIndex['id']
                console.log("EDIT CONTENT componentDidUpdate User was updated")
                this.setState({
                    myGroupName:"",
                    myUserPassword: "",
                    myUserAge: this.props.pickedIndex.age,
                    myUserName: this.props.pickedIndex.name,
                    myItemID: this.props.pickedIndex.id,
                })
            }

        }
        if (this.props.pickedIndex['type'] == "group") {
            //if(this.state.myGroupName!= this.props.pickedIndex.name) {
            if(this.itemId != this.props.pickedIndex['id']) {
                this.itemId = this.props.pickedIndex['id']
                console.log("EDIT CONTENT componentDidUpdate Group was updated")
                this.setState({
                    myGroupName: this.props.pickedIndex.name,
                    myUserPassword: "",
                    myUserAge: "",
                    myUserName: "",
                    myItemID: this.props.pickedIndex.id,


                })
            }

        }
    }

    changeGroupNameHandler=(e)=>{
        console.log("onChange is active")
        this.allIsUpToDate=true
        this.setState({
            myGroupName: e.target.value
        })
    }
    deleteGroup= ()=>{

        let path = `http://localhost:4000/groups/deleteGroup/${this.state.myItemID}`
        this.deleteMethod(path)
            .then(response => {
                console.log('Success:', response)
                if(!(response['answer']=="group exist")){
                    DataStore.getInstance().DBaddGroup(response.answer)
                    console.log("GROUP WAS ADDED",response )
                }
                this.setState({})
                this.props.updateCom()
            });
    }

    deleteUser= ()=>{
        // if(this.state.myGroupName.length==0){
        //     console.log("Name must be entered")
        //     return
        // }
        // let path = `http://localhost:4000/groups/updateGroup/${this.state.myItemID}`
        // let data = {
        //     name: this.state.myGroupName
        // }
        // this.updateMethod(path,data)
    }

    deleteMethod =(url)=>{
        return fetch(url).then(res => res.json())
            .catch(error => console.error('Error:', error))

    }

    addGroup=()=>{
        if(this.state.myNEWGroupName.length==0){
            console.log("Name must be entered")
            return
        }
        let path = `http://localhost:4000/groups/addGroup`
        let data = {
            name: this.state.myNEWGroupName
        }
        this.addMethod(path,data)
            .then(response => {
                console.log('Success:', response)
                if(!(response['answer']=="group exist")){
                    DataStore.getInstance().DBaddGroup(response.answer)
                    console.log("GROUP WAS ADDED",response )
                }
                this.setState({
                    myNEWGroupName: "",
                })
                this.props.updateCom()
            });
    }
    addUser=()=>{
        let path = `http://localhost:4000/users/addUser`
        if(this.state.myNEWUserName.length==0||this.state.myNEWUserAge.length==0||this.state.myNEWUserPassword.length==0){
            console.log("All field must be entered")
            return
        }else{
            let data = {
                username: this.state.myNEWUserName,
                password: this.state.myNEWUserPassword,
                age: this.state.myNEWUserAge,
            }
            this.addMethod(path,data)
                .then(response => {
                    console.log('Success:', response)
                    if(!(response['answer']=="user exist")){
                        DataStore.getInstance().DBaddUser(response.answer)
                    }
                    this.setState({
                        myNEWUserPassword: "",
                        myNEWUserAge: "",
                        myNEWUserName: "",
                    })
                    this.props.updateCom()
                });
            // delete data.password
            // DataStore.getInstance().DBupdateUser(this.state.myItemID,data)
            // this.props.updateCom()
        }
    }
    updateGroup= ()=>{

        if(this.state.myGroupName.length==0){
            console.log("Name must be entered")
            return
        }
        let path = `http://localhost:4000/groups/updateGroup/${this.state.myItemID}`
        let data = {
            name: this.state.myGroupName
        }
        this.updateMethod(path,data)
        DataStore.getInstance().DBupdateGroup(this.state.myItemID,data)
        this.props.updateCom()
        //this.updateMethod(path,data)
    }
    updateUser= ()=>{
        let path = `http://localhost:4000/users/updateUser/${this.state.myItemID}`
        if(this.state.myUserName.length==0||this.state.myUserAge.length==0){
           console.log("Name and Age must be entered")
            return
        }
        if(this.state.myUserPassword.length==0){
            console.log("Password did not change")
            let data = {
                name: this.state.myUserName,
                age: this.state.myUserAge,
            }
            //todo
            this.updateMethod(path,data)
            DataStore.getInstance().DBupdateUser(this.state.myItemID,data)
            this.props.updateCom()
            //this.updateMethod(path,data)
        }else{
            console.log("New Password")
            let data = {
                name: this.state.myUserName,
                age: this.state.myUserAge,
                password: this.state.myUserPassword
            }
            this.updateMethod(path,data)
            delete data.password
            DataStore.getInstance().DBupdateUser(this.state.myItemID,data)
            this.props.updateCom()
            //this.updateMethod(path,data)
        }

    }
    addMethod =(url,data)=>{
        return fetch(url, {
            method: 'POST', // or 'POST'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))

    }

    updateMethod =(url,data)=>{
        fetch(url, {
            method: 'PUT', // or 'POST'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response)
                this.props.updateCom()
            });
    }

    render() {
        const groupEdit = () => {
            if (this.props.pickedIndex) {
                return (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" value={this.state.myGroupName} onChange={(e)=>this.changeGroupNameHandler(e)}  />
                        <div>
                            <button onClick={()=>console.log(this.state)}>State</button>
                            <button onClick={this.updateGroup}>UPDATE</button>
                            <button onClick={()=>console.log(this.state)}>DELETE</button>
                        </div>
                        <div className="addingGroupBox">
                            <h2>Adding New Group</h2>
                            <label htmlFor="NEWGname">Name</label>
                            <input id="NEWGname" value={this.state.myNEWGroupName} onChange={(e) => this.setState({myNEWGroupName: e.target.value})}  />
                            <button onClick={()=>console.log(this.state)}>State</button>
                            <button onClick={this.addGroup}>ADD</button>
                        </div>
                    </div>)
            } else {
                return null
            }
        }



        const userEdit = () => {
            if (this.props.pickedIndex) {
                return (
                    <div>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" onChange={(e) => this.setState({myUserName: e.target.value})} value={this.state.myUserName}/>
                        </div>
                        <div>
                            <label htmlFor="age">Age</label>
                            <input type="number" id="age" onChange={(e) => this.setState({myUserAge: e.target.value})} value={this.state.myUserAge} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => this.setState({myUserPassword: e.target.value})} value={this.state.myUserPassword}/>
                        </div>
                        <div>
                            <button onClick={()=>console.log(this.state)}>State</button>
                            <button onClick={this.updateUser}>UPDATE</button>
                            <button onClick={()=>console.log(this.state)}>DELETE</button>

                        </div>
                        <div className="addingUserBox">
                            <h2>Adding New User</h2>
                            <div>
                                <label htmlFor="NEWname">Name</label>
                                <input id="NEWname" onChange={(e) => this.setState({myNEWUserName: e.target.value})} value={this.state.myNEWUserName}/>
                            </div>
                            <div>
                                <label htmlFor="NEWage">Age</label>
                                <input type="number" id="NEWage" onChange={(e) => this.setState({myNEWUserAge: e.target.value})} value={this.state.myNEWUserAge} />
                            </div>
                            <div>
                                <label htmlFor="NEWpassword">Password</label>
                                <input type="password" id="NEWpassword" onChange={(e) => this.setState({myNEWUserPassword: e.target.value})} value={this.state.myNEWUserPassword}/>
                            </div>
                            <div>
                                <button onClick={()=>console.log(this.state)}>State</button>
                                <button onClick={this.addUser}>ADD</button>
                            </div>
                        </div>
                    </div>)
            } else {
                return null
            }
        }
        return (
            <div className="editContent-wrapper">

                {(this.props.contentShow == "user") && userEdit()}
                {(this.props.contentShow == "group") && groupEdit()}
                {/*{this.props.pickedIndex.answer.id}*/}
                {(this.props.pickedIndex) ? this.props.pickedIndex.id : "no data"}
            </div>
        )
    }
}

export default EditContent