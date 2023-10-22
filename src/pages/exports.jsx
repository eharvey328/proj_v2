import React from "react";
import {LithuaniaHtml, IzhorkiHtml, JewMasterlistHtml, UkraineHtml, GermansHtml, ArmeniaHtml, GretchnayaHtml, PolandHtml, BelarussianHtml} from './js_files/page_sources';

function ArmeniaComponent (){
    return (
        <div dangerouslySetInnerHTML={{__html: ArmeniaHtml}}>
        </div>
    )
}

function BelarussianComponent (){
    return (
        <div dangerouslySetInnerHTML={{__html: BelarussianHtml}}>
        </div>
    )
}

// function GeorgiansComponent (){
//     return (
//         <div dangerouslySetInnerHTML={{__html: GeorgiansHtml}}>
//         </div>
//     )
// }

function GermansComponent(){
    return (
        <div dangerouslySetInnerHTML={{__html: GermansHtml}}>

        </div>
    )
}

function GretchnayaComponent(){
    return (
        <div><div  dangerouslySetInnerHTML={{__html: GretchnayaHtml}}/></div>
    )
}

function IzhorkiComponent(){
    return (
        <div><div dangerouslySetInnerHTML={{__html: IzhorkiHtml}}/></div>
    )
}

function JewMasterlistComponent(){
    return (
        <div><div dangerouslySetInnerHTML={{__html: <p>Later</p>}}/></div>
    )
}

function LithuaniaComponent(){
    return (
        <div><div dangerouslySetInnerHTML={{__html: LithuaniaHtml}}/></div>
    )
}

function PolandComponent(){
    return (
        <div><div dangerouslySetInnerHTML={{__html: PolandHtml}}/></div>
    )
}

function UkraineComponent(){
    return (
        <div><div dangerouslySetInnerHTML={{__html: UkraineHtml}}/></div>
    )
}

export {
    ArmeniaComponent, 
    BelarussianComponent,
    // GeorgiansComponent,
    GermansComponent,
    GretchnayaComponent,
    IzhorkiComponent,
    JewMasterlistComponent,
    LithuaniaComponent,
    PolandComponent,
    UkraineComponent,
};