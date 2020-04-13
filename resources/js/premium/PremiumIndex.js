
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import "../vuejs/axios"
import './components/css/PremiumApp.css';
import 'animate.css/animate.css';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducers from "./reducers/rootReducers";
import ScrollToTop from "./components/inc/dashboard/ScrollToTop";
import RouterUserPremium from "./router/RouterUserPremium";


const store = createStore(rootReducers);


class Index extends Component {
    render() {
        return (
            <BrowserRouter   keyLength={12}>
                <ScrollToTop/>
                <Route component={RouterUserPremium} />
            </BrowserRouter>
        );
    }
}

if (document.getElementById('premium_app_ivemo')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>  , document.getElementById('premium_app_ivemo'));
}
export default Index;
