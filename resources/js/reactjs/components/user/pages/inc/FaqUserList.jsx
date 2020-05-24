import React, {Component,Fragment} from "react";


class FaqUserList extends Component {


    render() {
        return (

            <Fragment>

                <div className="card card-plain">
                    <div className="card-header" role="tab" id={`heading${this.props.id}`}>
                        <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${this.props.id}`}
                           aria-expanded="false" aria-controls={`collapse${this.props.id}`} className="collapsed">
                            {this.props.title}
                            <i className="now-ui-icons arrows-1_minimal-down"/>
                        </a>
                    </div>
                    <div id={`collapse${this.props.id}`} className="collapse" role="tabpanel" aria-labelledby={`heading${this.props.id}`}>
                        <div className="card-body opacity-8" dangerouslySetInnerHTML={{__html: this.props.body}}/>
                    </div>
                </div>


            </Fragment>




        )
    }

}

export default FaqUserList;
