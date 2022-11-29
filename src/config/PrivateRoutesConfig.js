import { Roles } from 'config';


import MainPage from "../components/MainPage/MainPage";
import Registration from '../components/Registration/Registration';
import Login from '../components/Login/Login';
import PasswordReset from "../components/PasswordReset/PasswordReset";
import Contact from "../components/Contact/Contact";
import NotFound from "../components/NotFound/NotFound";
import Listing from "../components/Listing/Listing";
import PasswordResetConfirmation from "../components/PasswordReset/PasswordResetConfirmation";
import {MaterialCard} from "../components/MaterialCard/MaterialCard";
import {UserProfile} from "../components/UserProfile/UserProfile";
import StoriesListing from "../components/Listing/StoriesListing";
import CartoonsListing from "../components/Listing/CartoonsListing";
import SongsListing from "../components/Listing/SongsListing";
import Settings from "../components/Settings/Settings";
import PrivacyPolicy from "../components/Regulations/PrivacyPolicy";
import TermsAndConditions from "../components/Regulations/TermsAndConditions";
import AuthorProfile from "../components/AuthorProfile/AuthorProfile";
import Statistics from "../components/Statistics/Statistics";
import AddMaterial from "../components/AuthorProfile/AddMaterial";
import Identity from "../components/Identity/Identity";


export default [
    {
        component: MainPage,
        path: '/',
        title: 'MainPage',
        exact: true
    },
    {
        component: Registration,
        path: '/register',
        title: '',
        permission: [

        ]
    },
    {
        component: Login,
        path: '/login',
        title: '',
        permission: [

        ]
    },
    {
        component: PasswordReset,
        path: '/password-reset',
        title: '',
        permission: [
            Roles.PARENT,
            Roles.AUTHOR
        ]
    },
    {
        component: Contact,
        path: '/contact',
        title: '',
        permission: [

        ]
    },
    {
        component: NotFound,
        path: '/*',
        title: '',
        permission: [

        ]
    },
    {
        component: Listing,
        path: '/listing/*',
        title: '',
        permission: [
            Roles.PARENT,
            Roles.AUTHOR
        ]
    },
    {
        component: PasswordResetConfirmation,
        path: '/password-reset-confirmation',
        title: '',
        permission: [

        ]
    },
    {
        component: MaterialCard,
        path: '/listing/:id',
        title: '',
        permission: [
            Roles.PARENT
        ]
    },
    {
        component: UserProfile,
        path: '/profile',
        title: '',
        permission: [
            Roles.PARENT
        ]
    },
    {
        component: StoriesListing ,
        path: '/stories',
        title: '',
        permission: [
            Roles.PARENT
        ]
    },
    {
        component: CartoonsListing,
        path: '/cartoons',
        title: '',
        permission: [
            Roles.PARENT
        ]
    },
    {
        component: SongsListing ,
        path: '/songs',
        title: '',
        permission: [
            Roles.PARENT
        ]
    },
    {
        component: Statistics ,
        path: '/statistics',
        title: '',
        permission: [
            Roles.AUTHOR
        ]
    },
    {
        component: Settings ,
        path: '/settings',
        title: '',
        permission: [
            Roles.PARENT,
            Roles.AUTHOR
        ]
    },
    {
        component: PrivacyPolicy ,
        path: '/privacy-policy',
        title: '',
        permission: [

        ]
    },
    {
        component: TermsAndConditions ,
        path: '/terms',
        title: '',
        permission: [

        ]
    },
    {
        component: AuthorProfile ,
        path: '/author',
        title: '',
        permission: [
            Roles.AUTHOR
        ]
    },
    {
        component: AddMaterial ,
        path: '/add',
        title: '',
        permission: [
            Roles.AUTHOR
        ]
    },
    {
        component: Identity ,
        path: '/identity',
        title: '',
        permission: [
            Roles.AUTHOR
        ]
    }
]