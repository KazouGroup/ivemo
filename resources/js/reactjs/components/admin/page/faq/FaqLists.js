import React from "react";

const FaqLists= (props)=>

    <div className="card card-collapse">
        <div className="card-header" role="tab" id={`heading${props.id}`}>
            <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" href={`#collapse${props.id}`}
                   aria-expanded="false" aria-controls={`collapse${props.id}`}>
                    {props.title}
                    <i className="material-icons">keyboard_arrow_down</i>
                </a>
            </h5>
        </div>
        <div id={`collapse${props.id}`} className="collapse"
             role="tabpanel" aria-labelledby={`heading${props.id}`}
             data-parent="#accordion">
            <div className="card-body" dangerouslySetInnerHTML={{__html: props.body}}/>
        </div>
    </div>;

export default FaqLists;
