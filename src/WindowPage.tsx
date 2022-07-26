/** @jsx jsx */
import { jsx, Container } from "theme-ui"

import React, { useEffect, useState } from "react"


class OpenWindowsButtom extends React.Component{
    render(){
        return (<button>open</button>)
    }
}

class CloseButton extends React.Component{
    render(){
        return(<button> close </button>)
    }
}

class HiddenWindow extends React.Component{
    render(){
        return(<div id="my_hidden_window" style={{height: "200px", width: "50px"}}> Hidden window <CloseButton/></div>)
    }
}


function OpenWindowButtonHook(){
    const visible = 'block'
    const unvisible = 'none'
    const [visibleState, setVisibility] = useState(unvisible)

    useEffect(() => {
        const window =  document.getElementById("my_hidden_window")
        window!.style.display = visibleState
    })

    return(<button onClick={() => setVisibility(visibleState === unvisible ? visible : unvisible)}>open 2</button>)
}

function OpenWindowButtonHookTwo(){
        const [isVisible, setIsVisible] = useState(true)
      
        return (
          <div style={{ display: isVisible ? "block" : "none" }}>
            <p>This is the visibilityi test div</p>
            <button onClick={() => setIsVisible(false)}>Click me</button>
          </div>
        )
}



class WindowPage extends React.Component{
    render(){
        return(<React.Fragment>
            <OpenWindowsButtom/><OpenWindowButtonHook/><HiddenWindow/><OpenWindowButtonHookTwo/>
        </React.Fragment>)
    }
}

export default WindowPage