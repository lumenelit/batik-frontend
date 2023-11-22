import { createBrowserRouter } from "react-router-dom";
import PageError from "./pages/PageError/PageError";
import PageLogin from "./pages/admin/PageLogin/PageLogin";
import PageHome from "./pages/PageHome/PageHome";
import adminIndustriPage from "./pages/admin/PageIndustri/PageIndustri";
import PageIndustri from "./pages/PageIndustri/PageIndustri";

import PageMotif from "./pages/PageMotif/PageMotif";
import PageLanding from "./pages/PageLanding.tsx/PageLanding";
import PageCheckout from "./pages/PageCheckout/PageCheckout";
import PageInvoice from "./pages/PageInvoice/PageInvoice";
import PagePesanan from "./pages/admin/PagePesanan/PagePesanan";

export const ROUTES = {
    LANDING: "/",
    LOGIN: "/login",
    HOME: "/home",
    INDUSTRI: "/industri/:idIndustri",
    MOTIF: "/motif/:idMotif",
    CHECKOUT: "/checkout/:idMotif",
    INVOICE: "/invoice/:idInvoice",
    PAGE_404: "*",
    // Admin Divider
    ADMIN_LOGIN: "/admin",
    ADMIN_INDUSTRI: "/admin/industri",
    ADMIN_INDUSTRI_EDIT: "/admin/industri/edit/:idIndustri",
    ADMIN_MOTIF_EDIT: "/admin/motif/edit/:idMotif",
    ADMIN_PESANAN: "/admin/pesanan"
};

export const routerList = [
    {
        path: ROUTES.LANDING,
        element: <PageLanding />
    },
    {
        path: ROUTES.LOGIN,
        element: <PageLogin />
    },
    {
        path: ROUTES.HOME,
        element: <PageHome />
    },
    {
        path: ROUTES.INDUSTRI,
        element: <PageIndustri />
    },
    {
        path: ROUTES.MOTIF,
        element: <PageMotif />
    },
    {
        path: ROUTES.CHECKOUT,
        element: <PageCheckout />
    },
    {
        path: ROUTES.INVOICE,
        element: <PageInvoice />
    },
    {
        path: ROUTES.PAGE_404,
        element: <PageError />
    },
    {
        path: ROUTES.ADMIN_LOGIN,
        element: <PageLogin />
    },
    {
        path: ROUTES.ADMIN_INDUSTRI,
        element: <PageIndustri />
    },
    {
        path: ROUTES.ADMIN_INDUSTRI_EDIT
    },
    {
        path: ROUTES.ADMIN_MOTIF_EDIT
    },
    {
        path: ROUTES.ADMIN_PESANAN,
        element: <PagePesanan />
    }
];

export const router = createBrowserRouter(routerList);
