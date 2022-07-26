import React from "react"
import Board from "./Board"

class DraggableSquere extends React.Component{
    constructor(props: string){
        super(props)
        this.state = {position: {x: 0, y: 0}}
    }
    render(){
        return(<div style={{height: "100px"}}><Board/></div>)
    }
}

export default DraggableSquere;