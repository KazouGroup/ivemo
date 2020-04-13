import React from "react";
import {Route, Switch,withRouter} from 'react-router-dom';
import IndexPremium from "../components/dashboard/IndexPremium";
import PremiumUserBlogannonceLocation from "../components/dashboard/blogannoncelocation/PremiumUserBlogannonceLocation";
import PremiumUserBlogannonceLocationbyCategory
    from "../components/dashboard/blogannoncelocation/PremiumUserBlogannonceLocationbyCategory";
import PremiumUserTeams from "../components/dashboard/team/PremiumUserTeams";
import PremiumUserNewTeam from "../components/dashboard/team/treatment/PremiumUserNewTeam";
import PremiumUserEditTeam from "../components/dashboard/team/treatment/PremiumUserEditTeam";
import PremiumUserNewBlogannonceLocation
    from "../components/dashboard/blogannoncelocation/treatment/PremiumUserNewBlogannonceLocation";
import PremiumUserEditBlogannonceLocation
    from "../components/dashboard/blogannoncelocation/treatment/PremiumUserEditBlogannonceLocation";



const RouterUserPremium = props => (

    <Switch>

        <Route exact path="/dashboard/premium/:user/" component={IndexPremium}/>
        <Route exact path="/dashboard/premium/:user/teams/" component={PremiumUserTeams}/>
        <Route exact path="/dashboard/premium/:user/teams/create" component={PremiumUserNewTeam}/>
        <Route exact path="/dashboard/premium/:user/teams/:id/edit/" component={PremiumUserEditTeam}/>

        <Route exact path="/dashboard/premium/:user/blogs/annonce_locations/" component={PremiumUserBlogannonceLocation}/>
        <Route exact path="/dashboard/premium/:user/blogs/annonce_locations/create/" component={PremiumUserNewBlogannonceLocation}/>
        <Route exact path="/dashboard/premium/:user/blogs/annonce_locations/:blogannoncelocation/edit/" component={PremiumUserEditBlogannonceLocation}/>
        <Route exact path="/dashboard/premium/:user/blogs/annonce_locations/:categoryannoncelocation/" component={withRouter(PremiumUserBlogannonceLocationbyCategory)}/>

        <Route exact path="/dashboard/premium/:user/blogs/annonce_reservations/" component={IndexPremium}/>
        <Route exact path="/dashboard/premium/:user/blogs/annonce_ventes/" component={PremiumUserBlogannonceLocation}/>

    </Switch>

);
export default RouterUserPremium;
