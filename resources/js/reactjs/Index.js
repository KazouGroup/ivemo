
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import RouteUser from "./router/RouteUser";
import "../vuejs/axios"
import 'animate.css/animate.css';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";
import ScrollToTop from "./components/inc/user/ScrollToTop";

const store = createStore(rootReducer);


class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <ScrollToTop/>
                <Route component={RouteUser} />
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app_ivemo')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>  , document.getElementById('app_ivemo'));
}
export default Index;
