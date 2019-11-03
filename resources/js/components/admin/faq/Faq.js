import React from "react";

const Faq= (props)=>

    <div className="card card-collapse">
        <div className="card-header" role="tab" id="headingOne">
            <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" href="#collapseOne"
                   aria-expanded="false" aria-controls="collapseOne">
                    {props.title}
                    <i className="material-icons">keyboard_arrow_down</i>
                </a>
            </h5>
        </div>
        <div id="collapseOne" className="collapse"
             role="tabpanel" aria-labelledby="headingOne"
             data-parent="#accordion">
            <div className="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod
            </div>
        </div>
    </div>;

export default Faq;
