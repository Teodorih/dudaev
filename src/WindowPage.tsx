/** @jsx jsx */
import { jsx, Container } from "theme-ui"

import React, { useEffect, useState } from "react"
import { ThemeProvider } from 'theme-ui'
import { theme } from "./Theme"

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
        return(<div id="my_hidden_window" style={{height: "200px", width: "50px"}}> <div>Hidden window</div> <CloseButton/></div>)
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
             <ThemeProvider theme={theme}>
                <h1
                sx={{
                    color: 'primary',
                    fontFamily: 'heading',
                }}>
                Hello
                </h1>
            </ThemeProvider>
            <OpenWindowsButtom/><OpenWindowButtonHook/><HiddenWindow/><OpenWindowButtonHookTwo/>
        </React.Fragment>)
    }
}

export default WindowPage