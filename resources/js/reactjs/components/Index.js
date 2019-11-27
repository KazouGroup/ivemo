import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FaqCreate from "./admin/page/faq/FaqCreate";
import FaqEdit from "./admin/page/faq/FaqEdit";
import FaqIndex from "./admin/page/faq/FaqIndex";
import DashboardIndex from "./admin/DashboardIndex";


if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/dashboard/" component={DashboardIndex} />
                    <Route exact path="/dashboard/faqs" component={FaqIndex} />
                    <Route exact path="/dashboard/faqs/create" component={FaqCreate} />
                    <Route exact path="/dashboard/faqs/:faq/edit" component={FaqEdit} />
                </Switch>
            </div>
        </BrowserRouter>,

        document.getElementById('root')
    );
}
