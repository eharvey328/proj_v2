import React from "react";
import './button.css'
import { get_html_page } from "./utils";

function Button(props){
    return (
        <div className="button" onClick={()=>{
            window.open(props.href, '_blank').focus()
        }}>
           <p className="buttonText">{props.text}</p> 
        </div>
    )
}

export default Button;