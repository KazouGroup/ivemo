import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import RouteDashboard from "./router/RouteDashboard";
import RouteUser from "./router/RouteUser";

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={RouteUser} />
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app_ivemo')) {
    ReactDOM.render(<Index />, document.getElementById('app_ivemo'));
}
export default Index;
