import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import FaqIndex from "../admin/faq/FaqIndex";
import FaqCreate from "../admin/faq/FaqCreate";
import FaqEdit from "../admin/faq/FaqEdit";
import DashboardIndex from "../admin/DashboardIndex";
import LinkIndex from "../admin/link/LinkIndex";
import FaqView from "../admin/faq/FaqView";

export default class RoutePath  extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/dashboard/" component={DashboardIndex} />
                    <Route exact path="/dashboard/faqs/" component={FaqIndex} />
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
