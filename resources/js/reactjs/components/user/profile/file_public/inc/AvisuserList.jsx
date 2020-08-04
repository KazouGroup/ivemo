import React, { PureComponent } from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";

class AvisuserList extends PureComponent {

    render() {
        return (
            <>
                <div className="ivemoAvisUserComment">
                    <h5 className="media-heading">{this.props.from.first_name || <Skeleton width={80}/>}
                    </h5>
                    <div className="text-justify">
                        <ReadMoreAndLess
                            className="read-more-content"
                            charLimit={250}
                            readMoreText="lire plus"
                            readLessText=""
                        >
                            {this.props.description || <Skeleton count={5}/>}
                        </ReadMoreAndLess>
                    </div>
                </div>
                <small
                    className="text-muted mt-1">&middot; {moment(this.props.created_at).format('ll')}</small>
            </>
        )
    }
}

export default AvisuserList;
