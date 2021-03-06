import * as React from 'react';
import ChatTree from './chat-tree'
import {events} from './common'
import './TreeCss.css'

// interface ITreeState {
//     searchInput: string
// }


class EditTree extends React.Component<any, any> {

    myRef: any;
    setIndex: Function;
    userLogedIn: boolean;
    mySearch: any
    onElementSelectHandler: boolean

    constructor(props: {}) {
        super(props);
        this.onElementSelectHandler = false
        this.userLogedIn = true;
        this.setIndex = () => {
        };
        this.myRef = React.createRef();
        this.state = {
            searchInput: ""
        }
    }

    shouldComponentUpdate(nextProps, nextState ){
        console.log("EDIT TREE nextProps", nextProps.fullTree)
        console.log("EDIT TREE nextProps state", this.props.fullTree != nextProps.fullTree)
        return this.props.fullTree != nextProps.fullTree
    }
    searchOnTree1 = (val:string) => {
        let input = val
        const chatTree = ChatTree(this.myRef.current)
        let fullTree = this.props.fullTree
        console.log("EDIT TREE fullTree", fullTree)
        if (input.length !== 0) {
            let arrResults = this.getSearchResults(fullTree, input)
            chatTree.load(arrResults);
        } else {chatTree.load(fullTree);}
        if(!this.onElementSelectHandler) {
            this.onElementSelectHandler = !this.onElementSelectHandler
            events.on("changeOnActiveElement", this.chooseElement)
        }

    }

    // searchOnTree = () => {
    //     let input = this.state.searchInput
    //     const chatTree = ChatTree(this.myRef.current)
    //
    //     this.getTree()
    //         .then((result: any) => {
    //             if (input.length !== 0) {
    //                 let arrResults = this.getSearchResults(result, input)
    //                 chatTree.load(arrResults);
    //             } else {chatTree.load(result);}
    //             if(!this.onElementSelectHandler) {
    //                 this.onElementSelectHandler = !this.onElementSelectHandler
    //                 events.on("changeOnActiveElement", this.chooseElement)
    //             }
    //         })
    // }

    getSearchResults = (tree: any, input: string) => {
        let arrResults: any = [];
        function search(arr: any) {
            for (let entry of arr) {
                if (entry.name.toUpperCase().includes(input.toUpperCase())) arrResults.push(entry)
                if (entry.type === "group") {search(entry.items)}
            }
        }

        search(tree);
        let tmp = Array.from(arrResults, obj => JSON.stringify(obj));
        let filtered = Array.from(Array.from(new Set(tmp)), obj => JSON.parse(obj));

        return filtered;
    }
    uploadTree = (show: boolean) => {
        const chatTree = ChatTree(this.myRef.current)
        let fullTree = this.props.fullTree
        console.log("7777777777", this.props.fullTree)
        if (show) {
            chatTree.load(fullTree);
            if(!this.onElementSelectHandler) {
                this.onElementSelectHandler = !this.onElementSelectHandler
                events.on("changeOnActiveElement", this.chooseElement)
            }
        } else {
            chatTree.load([]);
        }

                //this.myRef.current.focus();

    }

    componentDidMount() {
        this.userLogedIn = this.props.showTree;
        this.setIndex = this.props.pickedIndex
        if (!this.props.showTree) {
            this.uploadTree(true)
        }

    }

    componentDidUpdate() {
        // if (this.userLogedIn !== this.props.showTree) {
        //     this.userLogedIn = this.props.showTree
        //     if (!this.props.showTree) {
        //         this.uploadTree(true)
        //         console.log("EDIT TREEEEEEEEE component did updated")
        //     } else {
        //         this.uploadTree(false)
        //     }
        // }
        if (!this.props.showTree) {
            this.uploadTree(true)
            console.log("EDIT TREEEEEEEEE component did updated")
        } else {
            this.uploadTree(false)
        }
    }

    chooseElement = (element: any) => {
        let elm = element.getAttribute("dataId");
        let type = element.getAttribute("dataType");
        elm = Number(elm);
        console.log("elm", elm, typeof elm);
        //this.setIndex.bind(null,3)
        try{
            this.props.pickedIndex(elm,type,element.data.fullData)
        }catch (e) {
            console.log("TREE notify the App component failed", e)
        }

    }

    // getTree() {
    //     return fetch('http://localhost:4000/tree/getFullTree')
    //         .then((result) => result.json());
    //
    // };

    filter = () =>{
        const val = this.mySearch.value
        console.log(val)
        this.searchOnTree1(val)
        //this.mySearch.focus()
    }
    setSearchInput = (event: any) => {
        this.setState({
            searchInput: event.target.value
        })
        console.log("set input", this.state.searchInput)
        // this.searchOnTree(this.state.searchInput)
    }

    public render() {
        const searchBar = () => {
            return (
                <div className="Tree-searchBar">
                    {/*<input className="Tree-searchBar-input" type="text" onChange={this.setSearchInput} value={this.state.searchInput} placeholder="Search..."/>*/}
                    <input className="Tree-searchBar-input" type="text" ref={(value)=> this.mySearch = value} onChange={this.filter}  placeholder="Search..."/>
                    {/*<i onClick={this.searchOnTree} className="fas fa-search Tree-searchBar-button"/>*/}
                </div>)
        }
        return (

            <section className="tree">
                {/*{(!this.props.showTree) ? searchBar() : null}*/}
                <ul tabIndex={0} ref={this.myRef}/>
            </section>

        )
    }

}

// let style = {
//     cursor: "pointer",
// };
export default EditTree;