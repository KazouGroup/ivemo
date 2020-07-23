import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import RouteUser from "./router/RouteUser";
import "../vuejs/axios"
import 'animate.css/animate.css';
import ScrollToTop from "./components/inc/user/ScrollToTop";

{/*Redux import*/}
import {Provider} from "react-redux";
import store from "./redux/store";
{/*On n'oublie pas d'importer les provider qui entoure ici toute notre application*/}

{/*End*/}


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
