import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FaqIndex from "../admin/page/faq/FaqIndex";
import FaqCreate from "../admin/page/faq/FaqCreate";
import FaqEdit from "../admin/page/faq/FaqEdit";
import DashboardIndex from "../admin/DashboardIndex";
import LinkIndex from "../admin/link/LinkIndex";
import FaqView from "../admin/page/faq/FaqView";
import FaqAdminSite from "../admin/page/faq/FaqAdminSite";
import ProfileUserEdit from "../admin/profile/ProfileUserEdit";
import ProfileUserAdmin from "../admin/profile/ProfileUserAdmin";
import UserIndex from "../admin/user/UserIndex";
import AdministratorIndex from "../admin/administrator/AdministratorIndex";
import UserEdit from "../admin/user/UserEdit";
import UserCreate from "../admin/user/UserCreate";
import UserDatatables from "../admin/user/UserDatatables";
import AdministratorDatatables from "../admin/administrator/AdministratorDatatables";
import Error404 from "../inc/error/Error404";
import PermissionIndex from "../admin/partials/permission/PermissionIndex";
import RoleIndex from "../admin/partials/role/RoleIndex";
import RoleEdit from "../admin/partials/role/RoleEdit";
import PermissionEdit from "../admin/partials/permission/PermissionEdit";
import TestimonialIdex from "../admin/page/testimonial/TestimonialIdex";
import TestimonialEdit from "../admin/page/testimonial/TestimonialEdit";
import TestimonialView from "../admin/page/testimonial/TestimonialView";

export default class RoutePath  extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/dashboard/" component={DashboardIndex} />
                    <Route exact path="/dashboard/administrators/" component={AdministratorIndex} />
                    <Route exact path="/dashboard/administrators/p/datatables/" component={AdministratorDatatables} />
                    <Route exact path="/dashboard/users/" component={UserIndex} />
                    <Route exact path="/dashboard/users/p/datatables/" component={UserDatatables} />
                    <Route exact path="/dashboard/users/create/" component={UserCreate} />
                    <Route exact path="/dashboard/users/:user/edit" component={UserEdit} />
                    <Route exact path="/dashboard/profile/" component={ProfileUserAdmin} />
                    <Route exact path="/dashboard/profile/edit/" component={ProfileUserEdit} />
                    <Route exact path="/dashboard/faqs/" component={FaqIndex} />
                    <Route exact path="/dashboard/faqs/v1/all/" component={FaqAdminSite} />
                    <Route exact path="/dashboard/faqs/create/" component={FaqCreate} />
                    <Route exact path="/dashboard/faqs/:faq/edit/" component={FaqEdit} />
                    <Route exact path="/dashboard/faqs/v/:slug/" component={FaqView} />
                    <Route exact path="/dashboard/links/" component={LinkIndex} />
                    <Route exact path="/dashboard/permissions/" component={PermissionIndex} />
                    <Route exact path="/dashboard/permissions/:permission/edit" component={PermissionEdit} />
                    <Route exact path="/dashboard/roles/" component={RoleIndex} />
                    <Route exact path="/dashboard/roles/:id/edit" component={RoleEdit} />
                    <Route exact path="/dashboard/testimonials" component={TestimonialIdex} />
                    <Route exact path="/dashboard/testimonials/:id/edit" component={TestimonialEdit} />
                    <Route exact path="/dashboard/testimonials/v/:testimonial/" component={TestimonialView} />
                    <Route path="*" component={Error404}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <RoutePath />
    , document.getElementById('root')
);
