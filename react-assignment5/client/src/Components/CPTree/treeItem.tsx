import * as React from 'react';

class TreeItem extends React.Component<any, any> {



    constructor(props: {}) {
        super(props);

        this.state = {
        }
    }



    public render() {

        return (

            <li>{this.props.name}</li>

        )
    }

}
export default TreeItem