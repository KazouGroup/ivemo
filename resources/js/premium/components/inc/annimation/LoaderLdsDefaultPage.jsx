import React, {Fragment} from "react";
import {Link, NavLink} from "react-router-dom";
//import "./LoaderLdsDefault.css";


function LoaderLdsDefaultPage(props) {

    return(

        <div className="text-center">
            <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loading">Patienter un moment ...</div>
        </div>
    )
}
export default LoaderLdsDefaultPage;
