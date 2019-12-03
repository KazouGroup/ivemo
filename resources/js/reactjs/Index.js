import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import RouterSite from "./RouterSite";

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={RouterSite} />
            </BrowserRouter>
        );
    }
}
ReactDOM.render(
    <Index />
    , document.getElementById('root')
);
