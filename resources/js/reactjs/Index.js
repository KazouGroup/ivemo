import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import RouteDashboard from "./router/RouteDashboard";
import RouteUser from "./router/RouteUser";

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={RouteDashboard} />
                <Route component={RouteUser} />
            </BrowserRouter>
        );
    }
}
ReactDOM.render(
    <Index />
    , document.getElementById('root')
);
export default Index;
