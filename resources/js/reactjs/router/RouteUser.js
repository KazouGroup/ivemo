import React from "react";
import {Route, Switch} from 'react-router-dom';
import IndexSite from "../components/user/IndexSite";
import LoginUser from "../components/user/auth/LoginUser";
import AboutUserSite from "../components/user/about/AboutUserSite";
import ContactUserSite from "../components/user/contact/ContactUserSite";
import AnnonceUserSite from "../components/user/annonce/AnnonceUserSite";
import AnnonceShowUserSite from "../components/user/annonce/AnnonceShowUserSite";


const RouteUser = props => (

    <Switch>
          <Route exact path="/" component={IndexSite}/>
          <Route exact path="/login/" component={LoginUser}/>
          <Route exact path="/about/" component={AboutUserSite}/>
          <Route exact path="/contact/" component={ContactUserSite}/>
          <Route exact path="/annonce/" component={AnnonceUserSite}/>
          <Route exact path="/annonce/show/" component={AnnonceShowUserSite}/>
    </Switch>

);
export default RouteUser;
