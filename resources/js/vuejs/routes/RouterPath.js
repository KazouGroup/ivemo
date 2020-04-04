import DashboardIndex from "../components/admin/DashboardIndex";
import FaqAdminIndex from "../components/admin/page/faq/FaqAdminIndex";


export const routes = [

    {path: '/dashboard/', name: 'dashboard.index', component: DashboardIndex},
    {path: '/dashboard/faqs/', name: 'faqs.index', component: FaqAdminIndex},

];
