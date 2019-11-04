import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FaqIndex from "../admin/faq/FaqIndex";
import FaqCreate from "../admin/faq/FaqCreate";
import FaqEdit from "../admin/faq/FaqEdit";
import DashboardIndex from "../admin/DashboardIndex";
import LinkIndex from "../admin/link/LinkIndex";
import FaqView from "../admin/faq/FaqView";
import FaqAdminSite from "../admin/faq/FaqAdminSite";
import ProfileUserEdit from "../admin/profile/ProfileUserEdit";
import ProfileUserAdmin from "../admin/profile/ProfileUserAdmin";
import UserIndex from "../admin/user/UserIndex";
import AdministratorIndex from "../admin/user/AdministratorIndex";
import UserEdit from "../admin/user/UserEdit";

export default class RoutePath  extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/dashboard/" component={DashboardIndex} />
                    <Route exact path="/dashboard/administrators/" component={AdministratorIndex} />
                    <Route exact path="/dashboard/users/" component={UserIndex} />
                    <Route exact path="/dashboard/users/:user/edit" component={UserEdit} />
                    <Route exact path="/dashboard/profile/" component={ProfileUserAdmin} />
                    <Route exact path="/dashboard/profile/edit/" component={ProfileUserEdit} />
                    <Route exact path="/dashboard/faqs/" component={FaqIndex} />
                    <Route exact path="/dashboard/faqs/v1/all/" component={FaqAdminSite} />
                    <Route exact path="/dashboard/faqs/create/" component={FaqCreate} />
                    <Route exact path="/dashboard/faqs/:faq/edit/" component={FaqEdit} />
                    <Route exact path="/dashboard/faqs/v/:slug/" component={FaqView} />
                    <Route exact path="/dashboard/links/" component={LinkIndex} />
                </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <RoutePath />
    , document.getElementById('root')
);
