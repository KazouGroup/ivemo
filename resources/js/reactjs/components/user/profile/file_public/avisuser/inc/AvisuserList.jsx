import React, { Component,Fragment } from "react";
import { Button, Form } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";

class AvisuserList extends Component {

    render() {

        return(
            <>
                <h5 className="media-heading">{this.props.from.first_name || <Skeleton width={80}/>}
                    <small
                        className="text-muted">&middot; {moment(this.props.created_at).format('ll')}</small>
                </h5>

                <div className="text-justify">
                    <ReadMoreAndLess
                        className="read-more-content"
                        charLimit={250}
                        readMoreText="(Plus)"
                        readLessText=""
                    >
                        {this.props.description || <Skeleton count={5}/>}
                    </ReadMoreAndLess>
                </div>

            </>
        )
    }
}

export default AvisuserList;
