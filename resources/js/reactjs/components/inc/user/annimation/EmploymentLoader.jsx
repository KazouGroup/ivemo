import React from 'react';
//import "./LoaderLdsDefault.css";
import EmploymentListOnSkeleton from "../employment/EmploymentListOnSkeleton";

const EmploymentLoader = (props) => (
    <>
        {
            props.progress && (
                <>
                    <EmploymentListOnSkeleton/>

                    <div className="loading text-center">Patienter un moment ...</div>
                </>
            )
        }
        {props.completed && (
            <div className="text-center">
                <span>No more annonce found :)</span>
            </div>)
        }
    </>
);

export default EmploymentLoader;
