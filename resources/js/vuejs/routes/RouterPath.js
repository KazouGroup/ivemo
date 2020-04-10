import DashboardIndex from "../components/admin/DashboardIndex";
import FaqAdminIndex from "../components/admin/page/faq/FaqAdminIndex";
import FaqAdminCreate from "../components/admin/page/faq/FaqAdminCreate";
import FaqAdminEdit from "../components/admin/page/faq/FaqAdminEdit";
import CategoryFaqAdminIndex from "../components/admin/categories/CategoryFaqAdminIndex";
import CategoryAnnoncelocationAdminIndex from "../components/admin/categories/CategoryAnnoncelocationAdminIndex";
import CategoryAnnoncereservationAdminIndex from "../components/admin/categories/CategoryAnnoncereservationAdminIndex";
import CategoryAnnonceventeAdminIndex from "../components/admin/categories/CategoryAnnonceventeAdminIndex";
import PolicyprivacyAdminIndex from "../components/admin/page/policyprivacy/PolicyprivacyAdminIndex";
import PolicyprivacyAdminCreate from "../components/admin/page/policyprivacy/PolicyprivacyAdminCreate";
import PolicyprivacyAdminEdit from "../components/admin/page/policyprivacy/PolicyprivacyAdminEdit";
import SignalannoncelocationsAdminIndex from "../components/admin/signal/signalannoncelocation/SignalannoncelocationsAdminIndex";
import SignalannoncelocationsAdminShow
    from "../components/admin/signal/signalannoncelocation/SignalannoncelocationsAdminShow";
import SignalannonceventesAdminIndex from "../components/admin/signal/signalannoncevente/SignalannonceventesAdminIndex";
import SignalannoncereservationAdminIndex
    from "../components/admin/signal/signalannoncereservation/SignalannoncereservationAdminIndex";
import BlogannonceventesAdminIndex from "../components/admin/blog/blogannoncevente/BlogannonceventesAdminIndex";
import BlogannoncelocationsAdminIndex
    from "../components/admin/blog/blogannoncelocation/BlogannoncelocationsAdminIndex";
import BlogannoncereservationsAdminIndex
    from "../components/admin/blog/blogannoncereservation/BlogannoncereservationsAdminIndex";
import BlogannonceventesbycategoryAdmin
    from "../components/admin/blog/blogannoncevente/BlogannonceventesbycategoryAdmin";


export const routes = [

    {path: '/dashboard/', name: 'dashboard.index', component: DashboardIndex},
    {path: '/dashboard/faqs/', name: 'faqs.index', component: FaqAdminIndex},
    {path: '/dashboard/faqs/create/', name: 'faqs.create', component: FaqAdminCreate},
    {path: '/dashboard/faqs/:id/edit/', name: 'faqs.edit', component: FaqAdminEdit},

    {path: '/dashboard/policyprivacies/', name: 'policyprivacies.index', component: PolicyprivacyAdminIndex},
    {path: '/dashboard/policyprivacies/create/', name: 'policyprivacies.create', component: PolicyprivacyAdminCreate},
    {path: '/dashboard/policyprivacies/:id/edit/', name: 'policyprivacies.edit', component: PolicyprivacyAdminEdit},

    {path: '/dashboard/categories_faqs/', name: 'categories_faqs.index', component: CategoryFaqAdminIndex},
    {path: '/dashboard/categoryannoncelocations/', name: 'categoryannoncelocations.index', component: CategoryAnnoncelocationAdminIndex},
    {path: '/dashboard/categoryannoncereservations/', name: 'categoryannoncereservations.index', component: CategoryAnnoncereservationAdminIndex},
    {path: '/dashboard/categoryannonceventes/', name: 'categoryannonceventes.index', component: CategoryAnnonceventeAdminIndex},

    {path: '/dashboard/signalannoncelocations/', name: 'signalannoncelocations.index', component: SignalannoncelocationsAdminIndex},
    {path: '/dashboard/signalannoncelocations/:annoncelocation/', name: 'signalannoncelocations.show', component: SignalannoncelocationsAdminShow},

    {path: '/dashboard/signalannonceventes/', name: 'signalannonceventes.index', component: SignalannonceventesAdminIndex},
    {path: '/dashboard/signalannonceventes/:annoncevente/', name: 'signalannonceventes.show', component: SignalannoncelocationsAdminShow},

    {path: '/dashboard/signalannoncereservations/', name: 'signalannoncereservations.index', component: SignalannoncereservationAdminIndex},
    {path: '/dashboard/signalannoncereservations/:annoncereservation/', name: 'signalannoncereservations.show', component: SignalannoncelocationsAdminShow},


    {path: '/dashboard/blogannoncelocations/', name: 'blogannoncelocations.dashboard', component: BlogannoncelocationsAdminIndex},
    {path: '/dashboard/blogannoncereservations/', name: 'blogannoncereservations.dashboard', component: BlogannoncereservationsAdminIndex},
    {path: '/dashboard/blogannonceventes/', name: 'blogannonceventes.dashboard', component: BlogannonceventesAdminIndex},
    {path: '/dashboard/blogannonceventes/:categoryannoncevente/', name: 'blogannonceventes_show.dashboard', component: BlogannonceventesbycategoryAdmin},

];
