import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class  FooterAdmin extends  Component {
    render() {
        return (
            <div>
                <div className="sidenav-overlay"></div>
                <div className="drag-target"></div>
                <footer className="footer footer-static footer-light navbar-shadow">
                    <p className="clearfix blue-grey lighten-2 mb-0"><span
                        className="float-md-left d-block d-md-inline-block mt-25">COPYRIGHT &copy; 2019<a
                        className="text-bold-800 grey darken-2" href="https://1.envato.market/pixinvent_portfolio"
                        target="_blank">Pixinvent,</a>All rights Reserved</span><span
                        className="float-md-right d-none d-md-block">Hand-crafted & Made with<i
                        className="feather icon-heart pink"></i></span>
                        <button className="btn btn-primary btn-icon scroll-top" type="button"><i
                            className="feather icon-arrow-up"></i></button>
                    </p>
                </footer>
            </div>
        );
    }
}
export default FooterAdmin;
