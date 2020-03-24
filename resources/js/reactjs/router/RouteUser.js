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
import ProfileAccountUser from "../components/user/profile/file_private/ProfileAccountUser";
import ProfileAccountChangePasswordUser from "../components/user/profile/file_private/ProfileAccountChangePasswordUser";
import AnnoncereservationIndex from "../components/user/annonces/annoncereservation/AnnoncereservationIndex";
import Annoncebycategoryannoncereservation
    from "../components/user/annonces/annoncereservation/Annoncebycategoryannoncereservation";
import Annoncebycategoryannoncereservationcity
    from "../components/user/annonces/annoncereservation/Annoncebycategoryannoncereservationcity";
import PersonalannoncereservationsUser from "../components/user/profile/PersonalannoncereservationsUser";
import Profileannoncesreservationsbooked from "../components/user/profile/Profileannoncesreservationsbooked";
import Annoncebycategoryannoncereservationcityshow
    from "../components/user/annonces/annoncereservation/Annoncebycategoryannoncereservationcityshow";
import BlogannoncereservationShow from "../components/user/blog/blogannoncereservation/BlogannoncereservationShow";
import ProfileAccountPublicUser from "../components/user/profile/ProfileAccountPublicUser";
import BlogannoncereservationBycategoryreservation
    from "../components/user/blog/blogannoncereservation/BlogannoncereservationBycategoryreservation";
import AnnoncelocationIndex from "../components/user/annonces/annonceloaction/AnnoncelocationIndex";
import Annoncebycategoryannoncelocation from "../components/user/annonces/annonceloaction/Annoncebycategoryannoncelocation";
import Annoncelocationbycity from "../components/user/annonces/annonceloaction/Annoncelocationbycity";
import Annoncelocationbycategorycityshow from "../components/user/annonces/annonceloaction/Annoncelocationbycategorycityshow";
import BlogannoncelocationShow from "../components/user/blog/blogannoncelocation/BlogannoncelocationShow";
import BlogannoncelocationEdit from "../components/user/blog/blogannoncelocation/treatement/BlogannoncelocationEdit";
import BlogannoncereservationEdit from "../components/user/blog/blogannoncereservation/treatement/BlogannoncereservationEdit";
import BlogannoncelocationBycategorylocation
    from "../components/user/blog/blogannoncelocation/BlogannoncelocationBycategorylocation";
import AnnonceventeIndex from "../components/user/annonces/annoncevente/AnnonceventeIndex";
import Annoncebycategoryannoncevente from "../components/user/annonces/annoncevente/Annoncebycategoryannoncevente";
import Annoncebycategoryannonceventecity from "../components/user/annonces/annoncevente/Annoncebycategoryannonceventecity";
import Annonceventebycategorycityshow from "../components/user/annonces/annoncevente/Annonceventebycategorycityshow";

import PersonalmessagesannonceslocationsUser
    from "../components/user/profile/mail/contactuserslocation/PersonalmessagesannonceslocationsUser";
import PersonalmessagescontactUser from "../components/user/profile/mail/contactusers/PersonalmessagescontactUser";
import PersonalmessagesannonceslocationsShowUser
    from "../components/user/profile/mail/contactuserslocation/PersonalmessagesannonceslocationsShowUser";
import PersonalmessagescontactShowUser from "../components/user/profile/mail/contactusers/PersonalmessagescontactShowUser";
import TeamsUserIndex from "../components/user/configurations/teams/TeamsUserIndex";
import PublicUserAnnonceLocations from "../components/user/profile/annonces/public/PublicUserAnnonceLocations";
import PublicUserAnnonceReservations from "../components/user/profile/annonces/public/PublicUserAnnonceReservations";
import TeamsUserEdite from "../components/user/configurations/teams/TeamsUserEdite";
import ProfileConfigUser from "../components/user/profile/file_private/ProfileConfigUser";
import PublicUserBlogannonceLocation from "../components/user/profile/blogs/public/PublicUserBlogannonceLocation";
import PublicUserBlogannonceReservation from "../components/user/profile/blogs/public/PublicUserBlogannonceReservation";
import PrivateUserAnnonceLocations from "../components/user/profile/annonces/private/PrivateUserAnnonceLocations";
import BlogannoncereservationIndex from "../components/user/blog/blogannoncereservation/BlogannoncereservationIndex";
import BlogannoncelocationIndex from "../components/user/blog/blogannoncelocation/BlogannoncelocationIndex";
import PrivateUserBlogannonceLocation from "../components/user/profile/blogs/private/blogannoncelocation/PrivateUserBlogannonceLocation";
import PrivateUserBlogannonceReservation
    from "../components/user/profile/blogs/private/blogannoncereservation/PrivateUserBlogannonceReservation";
import PrivateUserAnnonceReservations from "../components/user/profile/annonces/private/PrivateUserAnnonceReservations";
import BlogannonceventeIndex from "../components/user/blog/blognnoncevente/BlogannonceventeIndex";
import BlogannonceventesBycategoryvente from "../components/user/blog/blognnoncevente/BlogannonceventesBycategoryvente";
import BlogannonceventeShow from "../components/user/blog/blognnoncevente/BlogannonceventeShow";
import PrivateUserBlogannonceVente from "../components/user/profile/blogs/private/blogannoncevente/PrivateUserBlogannonceVente";
import PublicUserBlogannonceVente from "../components/user/profile/blogs/public/PublicUserBlogannonceVente";
import PrivateUserAnnonceVentes from "../components/user/profile/annonces/private/PrivateUserAnnonceVentes";
import PublicUserAnnonceVentes from "../components/user/profile/annonces/public/PublicUserAnnonceVentes";
import RegisterUser from "../components/user/auth/RegisterUser";
import SubscriberuserUserIndex from "../components/user/configurations/SubscriberuserUserIndex";
import BlogannoncelocationCreate
    from "../components/user/blog/blogannoncelocation/treatement/BlogannoncelocationCreate";
import TeamsUserCreate from "../components/user/configurations/teams/TeamsUserCreate";
import BlogannoncereservationCreate
    from "../components/user/blog/blogannoncereservation/treatement/BlogannoncereservationCreate";
import BlogannonceventeEdit from "../components/user/blog/blognnoncevente/treatement/BlogannonceventeEdit";
import BlogannonceventeCreate from "../components/user/blog/blognnoncevente/treatement/BlogannonceventeCreate";
import PersonalmessagesannoncesventesUser
    from "../components/user/profile/mail/contactusersvente/PersonalmessagesannoncesventesUser";
import PersonalmessagesannoncesventesShowUser
    from "../components/user/profile/mail/contactusersvente/PersonalmessagesannoncesventesShowUser";
import PrivateUserBlogannonceVentebyCategoryannoncevente
    from "../components/user/profile/blogs/private/blogannoncevente/PrivateUserBlogannonceVentebyCategoryannoncevente";
import PrivateUserBlogannonceLocationByCategorylocation
    from "../components/user/profile/blogs/private/blogannoncelocation/PrivateUserBlogannonceLocationByCategorylocation";
import PrivateUserBlogannonceReservationCategoryreservation
    from "../components/user/profile/blogs/private/blogannoncereservation/PrivateUserBlogannonceReservationCategoryreservation";
import PersonalmessagesprivateannoncesventesUser
    from "../components/user/profile/mail/contactusersvente/PersonalmessagesprivateannoncesventesUser";


const RouteUser = props => (

    <Switch>

          <Route exact path="/" component={IndexSite}/>
          <Route exact path="/login/" component={LoginUser}/>
          <Route exact path="/register/" component={RegisterUser}/>
          <Route exact path="/about/" component={AboutUserSite}/>
          <Route exact path="/contact/" component={ContactUserSite}/>
          <Route exact path="/annonce/" component={AnnonceUserSite}/>
          <Route exact path="/annonce/show/" component={AnnonceShowUserSite}/>

          <Route exact path="/annonces_reservations/:annoncetype/" component={AnnoncereservationIndex}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/" component={withRouter(Annoncebycategoryannoncereservation)}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/:city/" component={withRouter(Annoncebycategoryannoncereservationcity)}/>
          <Route exact path="/annonces_reservations/:annoncetype/:categoryannoncereservation/:city/:annoncereservation/" component={withRouter(Annoncebycategoryannoncereservationcityshow)}/>

          <Route exact path="/annonces_locations/:annoncetype/" component={AnnoncelocationIndex}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/" component={withRouter(Annoncebycategoryannoncelocation)}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/:city/" component={withRouter(Annoncelocationbycity)}/>
          <Route exact path="/annonces_locations/:annoncetype/:categoryannoncelocation/:city/:annoncelocation/" component={withRouter(Annoncelocationbycategorycityshow)}/>

          <Route exact path="/annonce/show/create/" component={AnnonceShowCreateUserSite}/>
          <Route exact path="/annonce/show/vendre/create/" component={AnnonceBienAvendreCreate}/>

          <Route exact path="/annonces_ventes/:annoncetype/" component={AnnonceventeIndex}/>
          <Route exact path="/annonces_ventes/:annoncetype/:categoryannoncevente/" component={withRouter(Annoncebycategoryannoncevente)}/>
          <Route exact path="/annonces_ventes/:annoncetype/:categoryannoncevente/:city/" component={withRouter(Annoncebycategoryannonceventecity)}/>
          <Route exact path="/annonces_ventes/:annoncetype/:categoryannoncevente/:city/:annoncevente/" component={withRouter(Annonceventebycategorycityshow)}/>


          <Route exact path="/profile/account/" component={ProfileAccountUser}/>

          <Route exact path="/@:user/" component={ProfileAccountPublicUser}/>
          <Route exact path="/@:user/annonces_locations/" component={PublicUserAnnonceLocations}/>
          <Route exact path="/@:user/annonces_reservations/" component={PublicUserAnnonceReservations}/>
          <Route exact path="/@:user/annonces_ventes/" component={PublicUserAnnonceVentes}/>

          <Route exact path="/@:user/blogs/annonce_locations/" component={PublicUserBlogannonceLocation}/>
          <Route exact path="/@:user/blogs/annonce_reservations/" component={PublicUserBlogannonceReservation}/>
          <Route exact path="/@:user/blogs/annonce_ventes/" component={PublicUserBlogannonceVente}/>

          <Route exact path="/profile/personal_reservations/" component={PersonalannoncereservationsUser}/>
          <Route exact path="/profile/annonces_reservations_booked/" component={Profileannoncesreservationsbooked}/>
          <Route exact path="/profile/change_password/" component={ProfileAccountChangePasswordUser}/>
          <Route exact path="/profile/:profile/account/" component={ProfileConfigUser}/>


          <Route strict exact path="/profile/:user/personal_mails/annonces_locations/" component={withRouter(PersonalmessagesannonceslocationsUser)}/>
          <Route exact path="/profile/:user/personal_mails/annonces_locations/:contactuserslocation/" component={PersonalmessagesannonceslocationsShowUser}/>

         {/*<Route strict exact path="/profile/:user/personal_mails/annonces_ventes_by_mail/" component={withRouter(PersonalmessagesprivateannoncesventesUser)}/>*/}


          <Route strict exact path="/profile/:user/personal_mails/annonces_ventes/" component={withRouter(PersonalmessagesannoncesventesUser)}/>
          <Route exact path="/profile/:user/personal_mails/annonces_ventes/:contactusersvente/" component={PersonalmessagesannoncesventesShowUser}/>

          <Route strict exact path="/profile/:user/personal_mails/contacts/" component={withRouter(PersonalmessagescontactUser)}/>
          <Route exact path="/profile/:user/personal_mails/contacts/:contactuser/" component={PersonalmessagescontactShowUser}/>


          <Route exact path="/profile/:user/personal_settings/subscriber_users/" component={SubscriberuserUserIndex}/>

          <Route exact path="/profile/:user/personal_settings/teams/" component={TeamsUserIndex}/>
          <Route exact path="/profile/:user/personal_settings/teams/" component={TeamsUserIndex}/>
          <Route exact path="/profile/:user/personal_settings/teams/create/" component={TeamsUserCreate}/>
          <Route path="/profile/:user/personal_settings/teams/:id/edit/" component={TeamsUserEdite}/>

          <Route exact path="/profile/:user/personal_settings/annonces_locations/" component={PrivateUserAnnonceLocations}/>
          <Route exact path="/profile/:user/personal_settings/annonces_ventes/" component={PrivateUserAnnonceVentes}/>

          <Route exact path="/profile/:user/personal_settings/annonces_reservations/" component={PrivateUserAnnonceReservations}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_locations/" component={PrivateUserBlogannonceLocation}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_locations/:categoryannoncelocation/" component={withRouter(PrivateUserBlogannonceLocationByCategorylocation)}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_reservations/" component={PrivateUserBlogannonceReservation}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_reservations/:categoryannoncereservation" component={PrivateUserBlogannonceReservationCategoryreservation}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_ventes/" component={PrivateUserBlogannonceVente}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_ventes/:categoryannoncevente/" component={withRouter(PrivateUserBlogannonceVentebyCategoryannoncevente)}/>

          <Route exact path="/blogs/annonce_locations/ab/new/" component={BlogannoncelocationCreate}/>
          <Route exact path="/blogs/annonce_locations/:blogannoncelocation/edit/" component={BlogannoncelocationEdit}/>
          <Route exact path="/blogs/annonce_locations/" component={BlogannoncelocationIndex}/>
          <Route exact path="/blogs/annonce_locations/:categoryannoncelocation/" component={withRouter(BlogannoncelocationBycategorylocation)}/>
          <Route exact path="/blogs/annonce_locations/:categoryannoncelocation/:date/:blogannoncelocation/" component={withRouter(BlogannoncelocationShow)}/>

          <Route exact path="/blogs/annonce_reservations/ab/new/" component={BlogannoncereservationCreate}/>
          <Route exact path="/blogs/annonce_reservations/:blogannoncereservation/edit/" component={BlogannoncereservationEdit}/>
          <Route exact path="/blogs/annonce_reservations/" component={BlogannoncereservationIndex}/>
          <Route exact path="/blogs/annonce_reservations/:categoryannoncereservation/" component={withRouter(BlogannoncereservationBycategoryreservation)}/>
          <Route exact path="/blogs/annonce_reservations/:categoryannoncereservation/:date/:blogannoncereservation/" component={withRouter(BlogannoncereservationShow)}/>

          <Route exact path="/blogs/annonce_ventes/ab/new/" component={BlogannonceventeCreate}/>
          <Route exact path="/blogs/annonce_ventes/:blogannoncevente/edit/" component={BlogannonceventeEdit}/>
          <Route exact path="/blogs/annonce_ventes/" component={BlogannonceventeIndex}/>
          <Route exact path="/blogs/annonce_ventes/:categoryannoncevente/" component={withRouter(BlogannonceventesBycategoryvente)}/>
          <Route exact path="/blogs/annonce_ventes/:categoryannoncevente/:date/:blogannoncevente/" component={withRouter(BlogannonceventeShow)}/>
    </Switch>

);
export default RouteUser;
