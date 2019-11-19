import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../inc/admin/TopNavAdmin";
import NavAdmin from "../inc/admin/NavAdmin";
import FooterAdmin from "../inc/admin/FooterAdmin";

export default class DashboardIndex extends Component {
    render() {
        return (
            <div className="wrapper">

                <NavAdmin/>

                    <TopNavAdmin/>



                    <FooterAdmin/>

            </div>
        );
    }
}
