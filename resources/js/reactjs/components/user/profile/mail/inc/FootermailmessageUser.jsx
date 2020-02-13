import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';


class FootermailmessageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }

    render() {
        return (
            <>
                <div className="copyright text-center">
                    Copyright © 2020 - {new Date().getFullYear()}, Ivemo All Rights Reserved.
                </div>
            </>

        )
    }
}
export default FootermailmessageUser;
