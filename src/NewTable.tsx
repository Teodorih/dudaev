import React from "react";

export default class NewTable extends React.Component<{}, {error: any, isLoaded: boolean, data:any[]}>{

    constructor(props:any){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:5001/table/new_table').then(res => res.json()).then(
            (result) => {
              this.setState({
                isLoaded: true,
                data: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    render(): React.ReactNode {
        return(<div>test44</div>)
    }
}
