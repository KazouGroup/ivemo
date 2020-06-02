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
import BlogannoncelocationsbycategoryAdmin
    from "../components/admin/blog/blogannoncelocation/BlogannoncelocationsbycategoryAdmin";
import BlogannoncereservationsbycategoryAdmin
    from "../components/admin/blog/blogannoncereservation/BlogannoncereservationsbycategoryAdmin";
import CityAdminIndex from "../components/admin/partial/CityAdminIndex";
import PermissionAdminIndex from "../components/admin/partial/PermissionAdminIndex";
import RoleAdminIndex from "../components/admin/partial/RoleAdminIndex";
import ContactusersfaqsAdminIndex from "../components/admin/contact/contactuserfaq/ContactusersfaqsAdminIndex";
import ContactusersforadvertsAdminIndex 
    from "../components/admin/contact/contactuserforadverts/ContactusersforadvertsAdminIndex";
import ConditionutilisationAdminIndex
    from "../components/admin/page/conditionutilisation/ConditionutilisationAdminIndex";
import ConditionutilisationAdminCreate
    from "../components/admin/page/conditionutilisation/ConditionutilisationAdminCreate";
import ConditionutilisationAdminEdit from "../components/admin/page/conditionutilisation/ConditionutilisationAdminEdit";
import LicencesiteAdminIndex from "../components/admin/page/licencesite/LicencesiteAdminIndex";
import LicencesiteAdminCreate from "../components/admin/page/licencesite/LicencesiteAdminCreate";
import LicencesiteAdminEdit from "../components/admin/page/licencesite/LicencesiteAdminEdit";
import CategoryWorkwithusAdminIndex from "../components/admin/categories/CategoryWorkwithusAdminIndex";
import WorkwithusAdminIndex from "../components/admin/page/workwithuses/WorkwithusAdminIndex";
import WorkwithusbyCategoryAdminIndex from "../components/admin/page/workwithuses/WorkwithusbyCategoryAdminIndex";
import WorkwithusShowAdminIndex from "../components/admin/page/workwithuses/WorkwithusShowAdminIndex";
import CategoryEmployementAdminIndex from "../components/admin/categories/CategoryEmployementAdminIndex";
import EmployementsAdminIndex from "../components/admin/employement/EmployementsAdminIndex";
import EmployementsbycategoryAdmin from "../components/admin/employement/EmployementsbycategoryAdmin";


export const routes = [

    {path: '/dashboard/', name: 'dashboard.index', component: DashboardIndex},
    {path: '/dashboard/faqs/', name: 'faqs.index', component: FaqAdminIndex},
    {path: '/dashboard/faqs/create/', name: 'faqs.create', component: FaqAdminCreate},
    {path: '/dashboard/faqs/:id/edit/', name: 'faqs.edit', component: FaqAdminEdit},

    {path: '/dashboard/workwithuses/', name: 'workwithuses.index', component: WorkwithusAdminIndex},
    {path: '/dashboard/workwithuses/c/:categoryworkwithus/', name: 'work_with_uscategoryworkwithus.dashboard', component: WorkwithusbyCategoryAdminIndex},
    {path: '/dashboard/workwithuses/c/:categoryworkwithus/:workwithus/', name: 'work_with_usworkwithus.show', component: WorkwithusShowAdminIndex},

    {path: '/dashboard/cities/', name: 'cities.index', component: CityAdminIndex},
    {path: '/dashboard/roles/', name: 'roles.index', component: RoleAdminIndex},
    {path: '/dashboard/permissions/', name: 'permissions.index', component: PermissionAdminIndex},

    {path: '/dashboard/contactusersfaqs/', name: 'contactusersfaqs.index', component: ContactusersfaqsAdminIndex},
    {path: '/dashboard/contactusersforadverts/', name: 'contactusersforadverts.index', component:ContactusersforadvertsAdminIndex},

    {path: '/dashboard/policyprivacies/', name: 'policyprivacies.index', component: PolicyprivacyAdminIndex},
    {path: '/dashboard/policyprivacies/create/', name: 'policyprivacies.create', component: PolicyprivacyAdminCreate},
    {path: '/dashboard/policyprivacies/:id/edit/', name: 'policyprivacies.edit', component: PolicyprivacyAdminEdit},

    {path: '/dashboard/conditionutilisations/', name: 'conditionutilisations.index', component: ConditionutilisationAdminIndex},
    {path: '/dashboard/conditionutilisations/create/', name: 'conditionutilisations.create', component: ConditionutilisationAdminCreate},
    {path: '/dashboard/conditionutilisations/:id/edit/', name: 'conditionutilisations.edit', component: ConditionutilisationAdminEdit},

    {path: '/dashboard/licencesites/', name: 'licencesites.index', component: LicencesiteAdminIndex},
    {path: '/dashboard/licencesites/create/', name: 'licencesites.create', component: LicencesiteAdminCreate},
    {path: '/dashboard/licencesites/:id/edit/', name: 'licencesites.edit', component: LicencesiteAdminEdit},

    {path: '/dashboard/categories_faqs/', name: 'categories_faqs.index', component: CategoryFaqAdminIndex},
    {path: '/dashboard/categoryannoncelocations/', name: 'categoryannoncelocations.index', component: CategoryAnnoncelocationAdminIndex},
    {path: '/dashboard/categoryannoncereservations/', name: 'categoryannoncereservations.index', component: CategoryAnnoncereservationAdminIndex},
    {path: '/dashboard/categoryannonceventes/', name: 'categoryannonceventes.index', component: CategoryAnnonceventeAdminIndex},
    {path: '/dashboard/categoryworkwithuses/', name: 'categoryworkwithuses.index', component: CategoryWorkwithusAdminIndex},
    {path: '/dashboard/categoryemployements/', name: 'categoryemployements.index', component: CategoryEmployementAdminIndex},

    {path: '/dashboard/signalannoncelocations/', name: 'signalannoncelocations.index', component: SignalannoncelocationsAdminIndex},
    {path: '/dashboard/signalannoncelocations/:annoncelocation/', name: 'signalannoncelocations.show', component: SignalannoncelocationsAdminShow},

    {path: '/dashboard/signalannonceventes/', name: 'signalannonceventes.index', component: SignalannonceventesAdminIndex},
    {path: '/dashboard/signalannonceventes/:annoncevente/', name: 'signalannonceventes.show', component: SignalannoncelocationsAdminShow},

    {path: '/dashboard/signalannoncereservations/', name: 'signalannoncereservations.index', component: SignalannoncereservationAdminIndex},
    {path: '/dashboard/signalannoncereservations/:annoncereservation/', name: 'signalannoncereservations.show', component: SignalannoncelocationsAdminShow},


    {path: '/dashboard/employments/', name: 'employments.dashboard', component: EmployementsAdminIndex},
    {path: '/dashboard/employments/:categoryemployment/', name: 'employments_show.dashboard', component: EmployementsbycategoryAdmin},

    {path: '/dashboard/blogannoncelocations/', name: 'blogannoncelocations.dashboard', component: BlogannoncelocationsAdminIndex},
    {path: '/dashboard/blogannoncelocations/:categoryannoncelocation/', name: 'blogannoncelocations_show.dashboard', component: BlogannoncelocationsbycategoryAdmin},

    {path: '/dashboard/blogannoncereservations/', name: 'blogannoncereservations.dashboard', component: BlogannoncereservationsAdminIndex},
    {path: '/dashboard/blogannoncereservations/:categoryannoncereservation/', name: 'blogannoncereservations_show.dashboard', component: BlogannoncereservationsbycategoryAdmin},

    {path: '/dashboard/blogannonceventes/', name: 'blogannonceventes.dashboard', component: BlogannonceventesAdminIndex},
    {path: '/dashboard/blogannonceventes/:categoryannoncevente/', name: 'blogannonceventes_show.dashboard', component: BlogannonceventesbycategoryAdmin},


];
