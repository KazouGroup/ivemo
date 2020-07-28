import React from 'react';
import "./LoaderLdsDefault.css";

const DataLoader = (props) => (
    <div className="text-center">
    {
        props.progress && (
            <>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="loading">Patienter un moment ...</div>
            </>
        )
    }
        {props.completed && (<div>
            <h5>No More Post Found!</h5>
        </div>)
        }
  </div>
);

export default DataLoader;
