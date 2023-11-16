import { createBrowserRouter } from "react-router-dom";
import PageError from "./pages/PageError/PageError";
import PageLogin from "./pages/PageLogin/PageLogin";
import PageHome from "./pages/PageHome/PageHome";
import PageIndustri from "./pages/PageIndustri/PageIndustri";
import PageMotif from "./pages/PageMotif/PageMotif";
import PageLanding from "./pages/PageLanding.tsx/PageLanding";

export const ROUTES = {
    LANDING: "/",
    INTRODUCTION: "/introduction",
    LANGUAGE: "/language",
    LOGIN: "/login",
    HOME: "/home",
    INDUSTRI: "/industri",
    MOTIF: "/motif/:idMotif",
    CHECKOUT: "/checkout/:idMotif",
    PAGE_404: "*"
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
        path: ROUTES.PAGE_404,
        element: <PageError />
    }
];

export const router = createBrowserRouter(routerList);
