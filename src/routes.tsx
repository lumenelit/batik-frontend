import { createBrowserRouter } from "react-router-dom";
import PageError from "./pages/PageError/PageError";
import PageLogin from "./pages/admin/PageLogin/PageLogin";
import PageHome from "./pages/PageHome/PageHome";
import PageIndustri from "./pages/PageIndustri/PageIndustri";
import PageMotif from "./pages/PageMotif/PageMotif";
import PageLanding from "./pages/PageLanding.tsx/PageLanding";
import PageCheckout from "./pages/PageCheckout/PageCheckout";
import PageInvoice from "./pages/PageInvoice/PageInvoice";
import PagePesanan from "./pages/admin/PagePesanan/PagePesanan";
import PageIndustriEdit from "./pages/admin/PageIndustriEdit/PageIndustriEdit";
import PageIndustriAdmin from "./pages/admin/PageIndustriAdmin/PageIndustriAdmin";
import PageMotifEdit from "./pages/admin/PageMotifEdit/PageMotifEdit";
import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

export const ROUTES = {
    LANDING: "/",
    LOGIN: "/login",
    HOME: "/home",
    INDUSTRI: "/industri/:idIndustri",
    MOTIF: "/motif/:idMotif",
    CHECKOUT: "/checkout/:idMotif",
    INVOICE: "/invoice/:idPesanan",
    PAGE_404: "*",
    // Admin Divider
    ADMIN_LOGIN: "/admin",
    ADMIN_INDUSTRI: "/admin/industri",
    ADMIN_INDUSTRI_EDIT: "/admin/industri/:idIndustri",
    ADMIN_MOTIF_EDIT: "/admin/motif/:idMotif",
    ADMIN_PESANAN: "/admin/pesanan"
};

const routerList = [
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
        element: <PageIndustriAdmin />
    },
    {
        path: ROUTES.ADMIN_INDUSTRI_EDIT,
        element: <PageIndustriEdit />
    },
    {
        path: ROUTES.ADMIN_MOTIF_EDIT,
        element: <PageMotifEdit />
    },
    {
        path: ROUTES.ADMIN_PESANAN,
        element: <PagePesanan />
    }
];

export const router = createBrowserRouter(routerList);
