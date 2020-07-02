import React, { PureComponent,Fragment } from "react";
import {Button, Form} from "reactstrap";
import ReadMoreAndLess from "react-read-more-less";
import moment from "moment";


class StatusComment extends PureComponent {

    render() {
        return (
            <>
                <div className="alert alert-danger" role="alert">
                    <div className="container">
                        <div className="text-center">
                            <b>Les commentaires sont desctivés de cette annonce vous êtes le seul persone à pouvoir y commenter</b>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default StatusComment;
