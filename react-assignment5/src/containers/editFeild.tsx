import * as React from "react";
import "./editFeildStyle.css"
import Tree from "../Components/Tree/Tree";
import EditBar from "../Components/editBar/editBar";
import EditContent from "../Components/editContent/editContent";
import EditTree from "../Components/Tree/EditTree";
import DataStore from "../DataStore/DataStore";



class EditFeild extends React.Component <any, any> {

    itemIndex: number|null
    itemChosen: object|null
    fullTree: any[]|null
    constructor(props: any) {
        super(props)
        this.state = {
            itemIndex:null,
            itemChosen: null,
            treeUpdate: true,
            fullTree:null,
            typeOfitems:"groups"
        }
    }
    updateForNothing = ()=>{
        console.log("Updating EDIT FIELD FOR NOTHING", DataStore.getInstance().DBGetFullTree())
        // let newState = {treeUpdate:true}
        // this.setState(newState)
        // newState = {treeUpdate:false}
        // this.setState(newState)
        let newTree = [...DataStore.getInstance().DBGetFullTree(this.state.typeOfitems)]
        this.setState(
            {
                fullTree: newTree,
            }
        )
    }
    componentDidMount() {
        let selectItem = this.props.fullObj
        console.log("selectItem",selectItem)
        this.setState({
            itemChosen:selectItem,
            itemIndex:this.props.pickedIndexToEdit,
            treeUpdate:this.props.treeLogin,
            fullTree: DataStore.getInstance().DBGetFullTree(this.state.typeOfitems)
        })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
        console.log(this.state.fullTree)

        // let selectItem = this.props.fullObj
        // console.log("selectItem",selectItem)
        // if(selectItem != this.state.itemChosen){
        //     this.setState({
        //         itemChosen:selectItem,
        //         itemIndex:this.props.pickedIndexToEdit,
        //         fullTree: DataStore.getInstance().DBGetFullTree()
        //     })
        // }
        // if(this.props.pickedIndexToEdit!==this.state.itemIndex){
        //     this.getItemChosen(this.props.pickedIndexType ,this.props.pickedIndexToEdit).then(res=> {
        //         console.log("res",res)
        //         this.setState({
        //             itemChosen:res,
        //             itemIndex:this.props.pickedIndexToEdit
        //         })
        //     })
        // }
    }
    setItToGroups(){
        console.log("groups button was clicked")
        this.setState({
            typeOfitems:"groups",
            fullTree: DataStore.getInstance().DBGetFullTree("groups")
        })
    }

    setItToUsers(){
        console.log("users button was clicked")
        this.setState({
            typeOfitems:"users",
            fullTree: DataStore.getInstance().DBGetFullTree("users")
        })
    }
    getItemChosen(type,id) {
        if(type=="group"){
            return fetch(`http://localhost:4000/groups/getGroup/${id}`)
                .then((result) => result.json());
        }else if (type=="user"){
            return fetch(`http://localhost:4000/users/getUser/${id}`)
                .then((result) => result.json());
        } else {
            return new Promise(res=> {})
        }
    };

    //

    render() {
        return (
            <div className="app-edit-field">

                <div className="content">
                    <button onClick={()=>this.setItToGroups()}>Groups</button>
                    <button onClick={()=>this.setItToUsers()}>Users</button>
                    <EditTree fullTree={this.state.fullTree} pickedIndex={this.props.pickedIndex} showTree={this.state.treeUpdate}/>
                    <section className="board-edit">
                        <EditBar reRender={this.props.logOut} barShow={this.props.pickedIndexType}/>
                        <EditContent updateCom={this.updateForNothing} pickedIndex={this.props.fullObj} contentShow={this.props.pickedIndexType} />
                    </section>

                </div>
            </div>
        )
    }
}

export default EditFeild;