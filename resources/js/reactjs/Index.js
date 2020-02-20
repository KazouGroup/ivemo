
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import RouteDashboard from "./router/RouteDashboard";
import RouteUser from "./router/RouteUser";
import 'animate.css/animate.css';
import 'datatables.net-autofill-bs4';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducers from "./reducers/rootReducers";

const store = createStore(rootReducers);


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
    ReactDOM.render(<Provider store={store}><Index /></Provider>  , document.getElementById('app_ivemo'));
}
export default Index;
