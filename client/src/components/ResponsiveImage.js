import React from "react";
export default function ResponsiveImage({ src }){
    return ( 
        <img src = {src} style = {{width: "100%"}}/>
    )
}