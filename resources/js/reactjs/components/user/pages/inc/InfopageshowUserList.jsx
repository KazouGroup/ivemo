import React, {Component,Fragment} from "react";


class InfopageshowUserList extends Component {


    render() {
        return (

            <Fragment>

                <h2 className="title text-center">{this.props.title}</h2>

                <div className="title text-justify" dangerouslySetInnerHTML={{__html: this.props.body}}/>

            </Fragment>
        )
    }

}

export default InfopageshowUserList;
