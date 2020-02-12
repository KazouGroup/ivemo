import React from "react";
import {Route, Switch,withRouter} from 'react-router-dom';
import IndexSite from "../components/user/IndexSite";
import LoginUser from "../components/user/auth/LoginUser";
import AboutUserSite from "../components/user/about/AboutUserSite";
import ContactUserSite from "../components/user/contact/ContactUserSite";
import AnnonceUserSite from "../components/user/annonce/AnnonceUserSite";
import AnnonceShowUserSite from "../components/user/annonce/AnnonceShowUserSite";
import AnnonceShowCreateUserSite from "../components/user/annonce/AnnonceShowCreateUserSite";
import AnnonceBienAvendreCreate from "../components/user/annonce/AnnonceBienAvendreCreate";
import ProfileAccountUser from "../components/user/profile/ProfileAccountUser";
import ProfileAccountChangePasswordUser from "../components/user/profile/ProfileAccountChangePasswordUser";
import AnnoncereservationIndex from "../components/user/annoncereservation/AnnoncereservationIndex";
import Annoncebycategoryannoncereservation
    from "../components/user/annoncereservation/Annoncebycategoryannoncereservation";
import Annoncebycategoryannoncereservationcity
    from "../components/user/annoncereservation/Annoncebycategoryannoncereservationcity";
import PersonalannoncereservationsUser from "../components/user/profile/PersonalannoncereservationsUser";
import Profileannoncesreservationsbooked from "../components/user/profile/Profileannoncesreservationsbooked";
import Annoncebycategoryannoncereservationcityshow
    from "../components/user/annoncereservation/Annoncebycategoryannoncereservationcityshow";
import BlogannoncereservationShow from "../components/user/blog/blogannoncereservation/BlogannoncereservationShow";
import ProfileAccountPublicUser from "../components/user/profile/ProfileAccountPublicUser";
import BlogannoncereservationIBycategoryreservation
    from "../components/user/blog/blogannoncereservation/BlogannoncereservationIBycategoryreservation";
import AnnoncelocationIndex from "../components/user/annonceloaction/AnnoncelocationIndex";
import Annoncebycategoryannoncelocation from "../components/user/annonceloaction/Annoncebycategoryannoncelocation";
import Annoncelocationbycity from "../components/user/annonceloaction/Annoncelocationbycity";
import Annoncelocationbycategorycityshow from "../components/user/annonceloaction/Annoncelocationbycategorycityshow";
import BlogannoncelocationShow from "../components/user/blog/blogannoncelocation/BlogannoncelocationShow";
import BlogannoncelocationBycategorylocation
    from "../components/user/blog/blogannoncelocation/BlogannoncelocationBycategorylocation";


const RouteUser = props => (

    <Switch>
          <Route exact path="/" component={IndexSite}/>
          <Route exact path="/login/" component={LoginUser}/>
          <Route exact path="/about/" component={AboutUserSite}/>
          <Route exact path="/contact/" component={ContactUserSite}/>
          <Route exact path="/annonce/" component={AnnonceUserSite}/>
          <Route exact path="/annonce/show/" component={AnnonceShowUserSite}/>
          <Route exact path="/annonces_reservations/:annoncetype/" component={AnnoncereservationIndex}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/" component={withRouter(Annoncebycategoryannoncereservation)}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/:city/" component={withRouter(Annoncebycategoryannoncereservationcity)}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/:city/:annoncereservation/" component={withRouter(Annoncebycategoryannoncereservationcityshow)}/>

          <Route exact path="/annonces_locations/:annoncetype/" component={withRouter(AnnoncelocationIndex)}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/" component={withRouter(Annoncebycategoryannoncelocation)}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/:city/" component={withRouter(Annoncelocationbycity)}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/:city/:date/:annoncelocation/" component={withRouter(Annoncelocationbycategorycityshow)}/>
          <Route exact path="/annonce/show/create/" component={AnnonceShowCreateUserSite}/>
          <Route exact path="/annonce/show/vendre/create/" component={AnnonceBienAvendreCreate}/>
          <Route exact path="/profile/account/" component={ProfileAccountUser}/>
          <Route exact path="/@:user/" component={withRouter(ProfileAccountPublicUser)}/>
          <Route exact path="/profile/personal_reservations/" component={PersonalannoncereservationsUser}/>
          <Route exact path="/profile/annonces_reservations_booked/" component={Profileannoncesreservationsbooked}/>
          <Route exact path="/profile/change_password/" component={ProfileAccountChangePasswordUser}/>
          <Route exact path="/blogs/annonce_reservations/:categoryannoncereservation/" component={withRouter(BlogannoncereservationIBycategoryreservation)}/>
          <Route exact path="/blogs/annonce_reservations/:categoryannoncereservation/:date/:blogannoncereservation/" component={withRouter(BlogannoncereservationShow)}/>

          <Route exact path="/blogs/annonce_locations/:categoryannoncelocation/" component={withRouter(BlogannoncelocationBycategorylocation)}/>
          <Route exact path="/blogs/annonce_locations/:categoryannoncelocation/:date/:blogannoncelocation/" component={withRouter(BlogannoncelocationShow)}/>
    </Switch>

);
export default RouteUser;
