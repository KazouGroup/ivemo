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

];
