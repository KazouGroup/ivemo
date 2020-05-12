import IndexPremium from "../components/IndexPremium";
import PremiumUserBlogannonceLocation from "../components/dashbord/blogannoncelocation/PremiumUserBlogannonceLocation";
import PremiumUserBlogannonceVente from "../components/dashbord/blogannoncevente/PremiumUserBlogannonceVente";
import PremiumUserBlogannonceReservation
    from "../components/dashbord/blogannoncereservation/PremiumUserBlogannonceReservation";
import PremiumUserBlogannonceVenteEdit
    from "../components/dashbord/blogannoncevente/treatment/PremiumUserBlogannonceVenteEdit";
import PremiumUserBlogannonceVenteCreate
    from "../components/dashbord/blogannoncevente/treatment/PremiumUserBlogannonceVenteCreate";


export const routes = [

    {path: '/dashboard/premium/:user/', name: 'premium_user_index.site', component: IndexPremium},
    {path: '/dashboard/premium/:user/blogs/annonce_locations/', name: 'blogannoncelocations_premium.dashboard', component: PremiumUserBlogannonceLocation},
    {path: '/dashboard/premium/:user/blogs/annonce_reservations/', name: 'blogannoncereservations_premium.dashboard', component: PremiumUserBlogannonceReservation},

    {path: '/dashboard/premium/:user/blogs/annonce_ventes/', name: 'blogannonceventes_premium.dashboard', component: PremiumUserBlogannonceVente},
    {path: '/dashboard/premium/:user/blogs/annonce_ventes/create/', name: 'blogannonceventes_premium_create.dashboard', component: PremiumUserBlogannonceVenteCreate},
    {path: '/dashboard/premium/:user/blogs/annonce_ventes/:blogannoncevente/edit/', name: 'blogannonceventes_premium_edit.dashboard', component: PremiumUserBlogannonceVenteEdit},

];
