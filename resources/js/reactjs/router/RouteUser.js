import React from "react";
import {Route, Switch,withRouter} from 'react-router-dom';
import IndexSite from "../components/user/IndexSite";
import LoginUser from "../components/user/auth/LoginUser";
import AboutUserSite from "../components/user/about/AboutUserSite";
import ContactUserSite from "../components/user/pages/ContactUserSite";
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
import PrivateUserAnnonceLocations from "../components/user/profile/annonces/private/annoncelocation/PrivateUserAnnonceLocations";
import BlogannoncereservationIndex from "../components/user/blog/blogannoncereservation/BlogannoncereservationIndex";
import BlogannoncelocationIndex from "../components/user/blog/blogannoncelocation/BlogannoncelocationIndex";
import PrivateUserBlogannonceLocation from "../components/user/profile/blogs/private/blogannoncelocation/PrivateUserBlogannonceLocation";
import PrivateUserBlogannonceReservation
    from "../components/user/profile/blogs/private/blogannoncereservation/PrivateUserBlogannonceReservation";
import PrivateUserAnnonceReservations from "../components/user/profile/annonces/private/annoncereservation/PrivateUserAnnonceReservations";
import BlogannonceventeIndex from "../components/user/blog/blognnoncevente/BlogannonceventeIndex";
import BlogannonceventesBycategoryvente from "../components/user/blog/blognnoncevente/BlogannonceventesBycategoryvente";
import BlogannonceventeShow from "../components/user/blog/blognnoncevente/BlogannonceventeShow";
import PrivateUserBlogannonceVente from "../components/user/profile/blogs/private/blogannoncevente/PrivateUserBlogannonceVente";
import PublicUserBlogannonceVente from "../components/user/profile/blogs/public/PublicUserBlogannonceVente";
import PrivateUserAnnonceVentes from "../components/user/profile/annonces/private/annoncevente/PrivateUserAnnonceVentes";
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

import Annoncelocationbyannoncetypebycity
    from "../components/user/annonces/annonceloaction/Annoncelocationbyannoncetypebycity";
import Annonceventebyannoncetypebycity from "../components/user/annonces/annoncevente/Annonceventebyannoncetypebycity";
import Annoncereservationbyannoncetypebycity
    from "../components/user/annonces/annoncereservation/Annoncereservationbyannoncetypebycity";
import AgencesimmobilieIndex from "../components/user/agencesimmobilie/AgencesimmobilieIndex";
import FaqsIndexSite from "../components/user/pages/FaqsIndexSite";
import PubliciteIndexSite from "../components/user/pages/PubliciteIndexSite";
import PolicyprivacyIndexSite from "../components/user/pages/PolicyprivacyIndexSite";
import AnnonceventeEdit from "../components/user/annonces/annoncevente/treatment/AnnonceventeEdit";
import AnnoncelocationEdit from "../components/user/annonces/annonceloaction/treatment/AnnoncelocationEdit";
import BlogannonceIndexSite from "../components/user/blog/BlogannonceIndexSite";
import EmailresetUser from "../components/user/auth/EmailresetUser";
import WorkwithusIndexSite from "../components/user/pages/workwithus/WorkwithusIndexSite";
import WorkwithusBycategorySite from "../components/user/pages/workwithus/WorkwithusBycategorySite";
import WorkwithusShowUserSite from "../components/user/pages/workwithus/WorkwithusShowUserSite";
import ForumIndexSite from "../components/user/forum/ForumIndexSite";
import VerifyEmailUser from "../components/user/auth/VerifyEmailUser";
import ConditionutilisationIndexSite from "../components/user/pages/ConditionutilisationIndexSite";
import LicencesiteIndexSite from "../components/user/pages/LicencesiteIndexSite";
import AnnoncelocationCreate from "../components/user/annonces/annonceloaction/treatment/AnnoncelocationCreate";
import AnnonceventeCreate from "../components/user/annonces/annoncevente/treatment/AnnonceventeCreate";
import EmployementIndexSite from "../components/user/employment/EmployementIndexSite";
import EmployementBycategoryemployement from "../components/user/employment/EmployementBycategoryemployement";
import EmployementBycategoryemployementbycity
    from "../components/user/employment/EmployementBycategoryemployementbycity";
import EmployementShowUserSite from "../components/user/employment/EmployementShowUserSite";
import EmploymentEdit from "../components/user/employment/treatement/EmploymentEdit";
import EmploymentCreate from "../components/user/employment/treatement/EmploymentCreate";
import ContactserviceEmploymentShow from "../components/user/profile/contactservices/employment/ContactserviceEmploymentShow";
import ContactserviceEmploymentContactShow from "../components/user/profile/contactservices/employment/ContactserviceEmploymentContactShow";
import PrivateUserFavoritEmployments from "../components/user/profile/favorites/PrivateUserFavoritEmployments";
import PrivateUserEmployments from "../components/user/profile/employments/private/PrivateUserEmployments";
import PublicUserEmployments from "../components/user/profile/employments/public/PublicUserEmployments";
import EmployementBycity from "../components/user/employment/EmployementBycity";
import PrivateUserFavoriteblogannoncereservations
    from "../components/user/profile/favorites/PrivateUserFavoriteblogannoncereservations";
import PrivateUserFavoriteannonceventes from "../components/user/profile/favorites/PrivateUserFavoriteannonceventes";
import PrivateUserFavoriteannoncelocations
    from "../components/user/profile/favorites/PrivateUserFavoriteannoncelocations";
import PrivateUserFavoriteblogannoncelocations
    from "../components/user/profile/favorites/PrivateUserFavoriteblogannoncelocations";
import PrivateUserFavoriteblogannonceventes
    from "../components/user/profile/favorites/PrivateUserFavoriteblogannonceventes";
import PrivateUserBlogannonceLocationStatistiqueShow
    from "../components/user/profile/blogs/private/blogannoncelocation/PrivateUserBlogannonceLocationStatistiqueShow";
import AnnoncereservationCreate
    from "../components/user/annonces/annoncereservation/treatment/AnnoncereservationCreate";
import ForumShow from "../components/user/forum/ForumShow";
import ForumcategoryforumSite from "../components/user/forum/ForumcategoryforumSite";
import ForumCreate from "../components/user/forum/treatement/ForumCreate";
import ForumEdit from "../components/user/forum/treatement/ForumEdit";
import PrivateUserForum from "../components/user/profile/forum/private/PrivateUserForum";
import PublicUserFollowers from "../components/user/profile/followers/PublicUserFollowers";
import PublicUserFollowings from "../components/user/profile/followers/PublicUserFollowings";
import PersonalmessagesemploymentsUser
    from "../components/user/profile/mail/contactusersemployment/PersonalmessagesemploymentsUser";
import PublicUserForums from "../components/user/profile/forum/public/PublicUserForums";
import PrivateUserFavoritForums from "../components/user/profile/favorites/PrivateUserFavoritForums";
import PersonalnotificationsUser from "../components/user/profile/mail/notifications/PersonalnotificationsUser";
import CityIndexSite from "../components/user/pages/CityIndexSite";
import ActivitycityShowUserSite from "../components/user/pages/activitycity/ActivitycityShowUserSite";
import ContactserviceAnnoncelocationShow
    from "../components/user/profile/mail/contactuserslocation/ContactserviceAnnoncelocationShow";
import Annoncebycategoryannoncereservationcityshow
    from "../components/user/annonces/annoncereservation/Annoncebycategoryannoncereservationcityshow";
import ContactserviceAnnonceventeShow
    from "../components/user/profile/mail/contactusersvente/ContactserviceAnnonceventeShow";
import PersonalmessagesannoncesreservationsUser
    from "../components/user/profile/contactservices/contactusersreservation/PersonalmessagesannoncesreservationsUser";
import PersonalmessagesannoncesreservationsShowUser
    from "../components/user/profile/contactservices/contactusersreservation/PersonalmessagesannoncesreservationsShowUser";
import AnnoncereservationEdit from "../components/user/annonces/annoncereservation/treatment/AnnoncereservationEdit";
import PersonalmessagesannoncesreservationssendUser
    from "../components/user/profile/contactservices/contactusersreservation/PersonalmessagesannoncesreservationssendUser";


const RouteUser = props => (

    <Switch>

          <Route exact path="/" component={IndexSite}/>
          <Route exact path="/home/" component={IndexSite}/>
          <Route exact path="/login/" component={LoginUser}/>
          <Route exact path="/password/reset/" component={EmailresetUser}/>
          <Route exact path="/email/verify/" component={VerifyEmailUser}/>
          <Route exact path="/register/" component={RegisterUser}/>
          <Route exact path="/about/" component={AboutUserSite}/>
          <Route exact path="/contact/" component={ContactUserSite}/>
          <Route exact path="/faqs/" component={FaqsIndexSite}/>
          <Route exact path="/policy_privacy/" component={PolicyprivacyIndexSite}/>
          <Route exact path="/condition_utilisation/" component={ConditionutilisationIndexSite}/>
          <Route exact path="/licence_site/" component={LicencesiteIndexSite}/>
          <Route exact path="/advertisement/" component={PubliciteIndexSite}/>
          <Route exact path="/annonce/" component={AnnonceUserSite}/>
          <Route exact path="/annonce/show/" component={AnnonceShowUserSite}/>


          <Route exact path="/work_with_us/" component={WorkwithusIndexSite}/>
          <Route exact path="/work_with_us/:categoryworkwithus/" component={WorkwithusBycategorySite}/>
          <Route exact path="/work_with_us/:categoryworkwithus/:workwithus/" component={WorkwithusShowUserSite}/>

          <Route exact path="/agences_immobilies/" component={AgencesimmobilieIndex}/>

          <Route exact path="/forums/" component={ForumIndexSite}/>
          <Route exact path="/forums/ab/new" component={ForumCreate}/>
          <Route exact path="/forums/ab/:forum/edit/" component={ForumEdit}/>
          <Route exact path="/forums/:categoryforum/" component={withRouter(ForumcategoryforumSite)}/>
          <Route exact path="/forums/:categoryforum/:user/:forum/" component={withRouter(ForumShow)}/>

          <Route exact path="/ars/:annoncetype/" component={AnnoncereservationIndex}/>
          <Route exact path="/ar/:annoncetype/:city/" component={withRouter(Annoncereservationbyannoncetypebycity)}/>
          <Route exact path="/ars/:annoncetype/:categoryannoncereservation/" component={withRouter(Annoncebycategoryannoncereservation)}/>
          <Route exact path="/ars/:annoncetype/:categoryannoncereservation/:city/" component={withRouter(Annoncebycategoryannoncereservationcity)}/>
          <Route exact path="/ars/:annoncetype/:categoryannoncereservation/:city/:user/:annoncereservation/" component={withRouter(Annoncebycategoryannoncereservationcityshow)}/>
          <Route exact path="/ar_data/:annoncetype/new/" component={AnnoncereservationCreate}/>
          <Route exact path="/ar_data/:annoncetype/:annoncereservation/edit/" component={AnnoncereservationEdit}/>


          <Route exact path="/als/:annoncetype/" component={AnnoncelocationIndex}/>
          <Route exact path="/al/:annoncetype/:city/" component={withRouter(Annoncelocationbyannoncetypebycity)}/>
          <Route exact path="/als/:annoncetype/:categoryannoncelocation/" component={withRouter(Annoncebycategoryannoncelocation)}/>
          <Route exact path="/als/:annoncetype/:categoryannoncelocation/:city/" component={withRouter(Annoncelocationbycity)}/>
          <Route exact path="/als/:annoncetype/:categoryannoncelocation/:city/:user/:annoncelocation/" component={withRouter(Annoncelocationbycategorycityshow)}/>
          <Route exact path="/al_data/:annoncetype/new/" component={AnnoncelocationCreate}/>
          <Route exact path="/al_data/:annoncetype/:annoncelocation/edit/" component={AnnoncelocationEdit}/>

          <Route exact path="/annonce/show/create/" component={AnnonceShowCreateUserSite}/>
          <Route exact path="/annonce/show/vendre/create/" component={AnnonceBienAvendreCreate}/>

          <Route exact path="/avs/:annoncetype/" component={AnnonceventeIndex}/>
          <Route exact path="/av/:annoncetype/:city/" component={withRouter(Annonceventebyannoncetypebycity)}/>
          <Route exact path="/avs/:annoncetype/:categoryannoncevente/" component={withRouter(Annoncebycategoryannoncevente)}/>
          <Route exact path="/avs/:annoncetype/:categoryannoncevente/:city/" component={withRouter(Annoncebycategoryannonceventecity)}/>
          <Route exact path="/avs/:annoncetype/:categoryannoncevente/:city/:user/:annoncevente/" component={withRouter(Annonceventebycategorycityshow)}/>
          <Route exact path="/av_data/:annoncetype/new/" component={AnnonceventeCreate}/>
          <Route exact path="/av_data/:annoncetype/:annoncevente/edit/" component={AnnonceventeEdit}/>


          <Route exact path="/profile/account/" component={ProfileAccountUser}/>

          <Route exact path="/user/:user/" component={ProfileAccountPublicUser}/>
          <Route exact path="/pro/:user/" component={ProfileAccountPublicUser}/>
          <Route exact path="/pro/:user/als/:annoncetype/" component={PublicUserAnnonceLocations}/>
          <Route exact path="/pro/:user/annonces_reservations/" component={PublicUserAnnonceReservations}/>
          <Route exact path="/pro/:user/avs/:annoncetype/" component={PublicUserAnnonceVentes}/>

          <Route exact path="/pro/:user/employments/" component={PublicUserEmployments}/>
          <Route exact path="/pro/:user/forums/" component={PublicUserForums}/>


          <Route exact path="/pro/:user/following/" component={withRouter(PublicUserFollowings)}/>
          <Route exact path="/user/:user/following/" component={withRouter(PublicUserFollowings)}/>

          <Route exact path="/pro/:user/followers/" component={withRouter(PublicUserFollowers)}/>
          <Route exact path="/user/:user/followers/" component={withRouter(PublicUserFollowers)}/>

          <Route exact path="/pro/:user/blogs/annonce_locations/" component={PublicUserBlogannonceLocation}/>
          <Route exact path="/pro/:user/blogs/annonce_reservations/" component={PublicUserBlogannonceReservation}/>
          <Route exact path="/pro/:user/blogs/annonce_ventes/" component={PublicUserBlogannonceVente}/>

          <Route exact path="/profile/personal_reservations/" component={PersonalannoncereservationsUser}/>
          <Route exact path="/profile/annonces_reservations_booked/" component={Profileannoncesreservationsbooked}/>
          <Route exact path="/profile/change_password/" component={ProfileAccountChangePasswordUser}/>
          <Route exact path="/profile/:profile/account/" component={ProfileConfigUser}/>

          <Route exact path="/messages/als/" component={withRouter(PersonalmessagesannonceslocationsUser)}/>
          <Route exact path="/messages/als/:contactservice/" component={PersonalmessagesannonceslocationsShowUser}/>
          <Route exact path="/statistics/als/:annoncetype/" component={PrivateUserAnnonceLocations}/>
          <Route exact path="/statistics/als/:annoncetype/:annoncelocation/" component={withRouter(ContactserviceAnnoncelocationShow)}/>

          <Route exact path="/messages/ars/" component={withRouter(PersonalmessagesannoncesreservationsUser)}/>
          <Route exact path="/messages/ars/send/" component={withRouter(PersonalmessagesannoncesreservationssendUser)}/>
          <Route exact path="/messages/ars/:user/:annoncetype/:annoncereservation/" component={PersonalmessagesannoncesreservationsShowUser}/>

          <Route exact path="/messages/avs/" component={withRouter(PersonalmessagesannoncesventesUser)}/>
          <Route exact path="/messages/avs/:contactservice/" component={PersonalmessagesannoncesventesShowUser}/>
          <Route exact path="/statistics/avs/:annoncetype/" component={PrivateUserAnnonceVentes}/>
          <Route exact path="/statistics/avs/:annoncetype/:annoncevente/" component={withRouter(ContactserviceAnnonceventeShow)}/>

          <Route exact path="/messages/notifications/" component={PersonalnotificationsUser}/>


          <Route exact path="/messages/contacts/" component={withRouter(PersonalmessagescontactUser)}/>
          <Route exact path="/messages/contacts/:contactuser/" component={PersonalmessagescontactShowUser}/>


          <Route exact path="/statistics/employments/" component={withRouter(PrivateUserEmployments)}/>
          <Route exact path="/statistics/employments/:employment/" component={withRouter(ContactserviceEmploymentShow)}/>
          <Route exact path="/messages/employments/" component={PersonalmessagesemploymentsUser}/>
          <Route exact path="/messages/employments/:contactservice/" component={withRouter(ContactserviceEmploymentContactShow)}/>

          <Route exact path="/profile/:user/personal_settings/favorite_annonces_locations/" component={PrivateUserFavoriteannoncelocations}/>
          <Route exact path="/profile/:user/personal_settings/favorite_annonces_ventes/" component={PrivateUserFavoriteannonceventes}/>
          <Route exact path="/profile/:user/personal_settings/favorite_employments/" component={PrivateUserFavoritEmployments}/>
          <Route exact path="/profile/:user/personal_settings/favorite_forums/" component={PrivateUserFavoritForums}/>
          <Route exact path="/profile/:user/personal_settings/favorite_blogannoncelocations/" component={PrivateUserFavoriteblogannoncelocations}/>
          <Route exact path="/profile/:user/personal_settings/favorite_blogannonceventes/" component={PrivateUserFavoriteblogannonceventes}/>
          <Route exact path="/profile/:user/personal_settings/favorite_blogannoncereservations/" component={PrivateUserFavoriteblogannoncereservations}/>

          <Route exact path="/profile/:user/personal_settings/subscriber_users/" component={SubscriberuserUserIndex}/>

          <Route exact path="/profile/:user/personal_settings/teams/" component={TeamsUserIndex}/>
          <Route exact path="/profile/:user/personal_settings/teams/" component={TeamsUserIndex}/>
          <Route exact path="/profile/:user/personal_settings/teams/create/" component={TeamsUserCreate}/>
          <Route path="/profile/:user/personal_settings/teams/:id/edit/" component={TeamsUserEdite}/>

          <Route exact path="/profile/:user/personal_settings/annonces_reservations/" component={PrivateUserAnnonceReservations}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_locations/" component={PrivateUserBlogannonceLocation}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_locations/:categoryannoncelocation/" component={withRouter(PrivateUserBlogannonceLocationByCategorylocation)}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_location/statistique/:blogannoncelocation/" component={PrivateUserBlogannonceLocationStatistiqueShow}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_reservations/" component={PrivateUserBlogannonceReservation}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_reservations/:categoryannoncereservation" component={withRouter(PrivateUserBlogannonceReservationCategoryreservation)}/>

          <Route exact path="/profile/:user/personal_settings/blogs/annonce_ventes/" component={PrivateUserBlogannonceVente}/>
          <Route exact path="/profile/:user/personal_settings/blogs/annonce_ventes/:categoryannoncevente/" component={withRouter(PrivateUserBlogannonceVentebyCategoryannoncevente)}/>

          <Route exact path="/statistics/forums/" component={PrivateUserForum}/>


          <Route exact path="/city/:city" component={withRouter(CityIndexSite)}/>
          <Route exact path="/city/:city/a/:activitycity" component={withRouter(ActivitycityShowUserSite)}/>

          <Route exact path="/employments/" component={EmployementIndexSite}/>
          <Route exact path="/employment/ab/new/" component={EmploymentCreate}/>
          <Route exact path="/employment/ab/:employment/edit/" component={EmploymentEdit}/>
          <Route exact path="/employment/:city/" component={withRouter(EmployementBycity)}/>
          <Route exact path="/employments/:categoryemployment/" component={withRouter(EmployementBycategoryemployement)}/>
          <Route exact path="/employments/:categoryemployment/:city/" component={withRouter(EmployementBycategoryemployementbycity)}/>
          <Route exact path="/employments/:categoryemployment/:city/:user/:employment/" component={withRouter(EmployementShowUserSite)}/>


          <Route exact path="/blogs/" component={BlogannonceIndexSite}/>

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
