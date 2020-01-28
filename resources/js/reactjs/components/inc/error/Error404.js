import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FooterAdmin from "../admin/FooterAdmin";

class Error404 extends Component{
    render() {
        return (
            <div className="wrapper wrapper-full-page">
                <div className="page-header error-page header-filter">
                    <div className="content-center">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="title">404</h1>
                                <h2>Page not found :(</h2>
                                <h4>Ooooups! Looks like you got lost.</h4>
                                <h4>
                                    <Link to={'/dashboard/'} className="btn btn-danger"
                                          id="button_hover">
                                        <i className="material-icons">chevron_left</i>
                                        <b className="title_hover">Back Home</b>
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
export default Error404;
