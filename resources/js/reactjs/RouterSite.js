import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardIndex from "./components/admin/DashboardIndex";
import AdministratorIndex from "./components/admin/administrator/AdministratorIndex";
import AdministratorDatatables from "./components/admin/administrator/AdministratorDatatables";
import UserIndex from "./components/admin/user/UserIndex";
import UserDatatables from "./components/admin/user/UserDatatables";
import DashboardUserCreate from "./components/admin/user/DashboardUserCreate";
import DashboardUserEdit from "./components/admin/user/DashboardUserEdit";
import AdminProfileUserAdmin from "./components/admin/profile/AdminProfileUserAdmin";
import AdminProfileUserEdit from "./components/admin/profile/AdminProfileUserEdit";
import DashboardProfileEdit from "./components/admin/user/DashboardProfileEdit";
import AdminChangePassword from "./components/admin/profile/AdminChangePassword";
import FaqIndex from "./components/admin/page/faq/FaqIndex";
import FaqAdminSite from "./components/admin/page/faq/FaqAdminSite";
import FaqCreate from "./components/admin/page/faq/FaqCreate";
import FaqEdit from "./components/admin/page/faq/FaqEdit";
import FaqByCategory from "./components/admin/page/faq/FaqByCategory";
import FaqView from "./components/admin/page/faq/FaqView";
import LinkIndex from "./components/admin/link/LinkIndex";
import PermissionIndex from "./components/admin/partials/permission/PermissionIndex";
import PermissionEdit from "./components/admin/partials/permission/PermissionEdit";
import RoleIndex from "./components/admin/partials/role/RoleIndex";
import RoleEdit from "./components/admin/partials/role/RoleEdit";
import TestimonialIdex from "./components/admin/page/testimonial/TestimonialIdex";
import TestimonialEdit from "./components/admin/page/testimonial/TestimonialEdit";
import TestimonialView from "./components/admin/page/testimonial/TestimonialView";
import CategoryFaqIndex from "./components/admin/partials/categoryfaq/CategoryFaqIndex";
import Error404 from "./components/inc/error/Error404";


const RouterSite = props => (

    <Switch>
        <Route exact path="/dashboard/" component={DashboardIndex}/>
        <Route exact path="/dashboard/administrators/" component={AdministratorIndex}/>
        <Route exact path="/dashboard/administrators/p/datatables/" component={AdministratorDatatables}/>
        <Route exact path="/dashboard/users/" component={UserIndex}/>
        <Route exact path="/dashboard/users/p/datatables/" component={UserDatatables}/>
        <Route exact path="/dashboard/users/create/" component={DashboardUserCreate}/>
        <Route exact path="/dashboard/users/:user/edit" component={DashboardUserEdit}/>
        <Route exact path="/dashboard/profile/" component={AdminProfileUserAdmin}/>
        <Route exact path="/dashboard/profile/edit/" component={AdminProfileUserEdit}/>
        <Route exact path="/dashboard/profile/add_info/:profile/edit/" component={DashboardProfileEdit}/>
        <Route exact path="/dashboard/profile/change_password" component={AdminChangePassword}/>
        <Route exact path="/dashboard/faqs/" component={FaqIndex}/>
        <Route exact path="/dashboard/faqs/v1/all/" component={FaqAdminSite}/>
        <Route exact path="/dashboard/faqs/create/" component={FaqCreate}/>
        <Route exact path="/dashboard/faqs/:faq/edit/" component={FaqEdit}/>
        <Route exact path="/dashboard/faqs/c/:categoryfaq/" component={FaqByCategory}/>
        <Route exact path="/dashboard/faqs/v/:slug/" component={FaqView}/>
        <Route exact path="/dashboard/links/" component={LinkIndex}/>
        <Route exact path="/dashboard/permissions/" component={PermissionIndex}/>
        <Route exact path="/dashboard/permissions/:permission/edit" component={PermissionEdit}/>
        <Route exact path="/dashboard/roles/" component={RoleIndex}/>
        <Route exact path="/dashboard/roles/:id/edit" component={RoleEdit}/>
        <Route exact path="/dashboard/testimonials" component={TestimonialIdex}/>
        <Route exact path="/dashboard/testimonials/:id/edit" component={TestimonialEdit}/>
        <Route exact path="/dashboard/testimonials/v/:testimonial/" component={TestimonialView}/>
        <Route exact path="/dashboard/categories_faqs/" component={CategoryFaqIndex}/>
        <Route path="*" component={Error404}/>
    </Switch>
);
export default RouterSite;
