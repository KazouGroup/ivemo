import React from "react";

const StatusAdmin = (props) =>
    <>
        <div key={props.id} className="submit">
            <div className="text-center">
                <button className="btn btn-success btn-raised btn-lg">
                    <i className="material-icons">supervisor_account</i>
                    <b>{props.roles}</b>
                </button>
            </div>
        </div>
    </>;
export default StatusAdmin;
