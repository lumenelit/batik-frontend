import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../../components/layouts/Header";

export default function PageLanding() {
    const { t } = useTranslation();
    return (
        <div className="h-screen p-5 bg-cover bg-landing-background">
            <Header />
            
            <div className="absolute flex flex-col items-center justify-center w-full text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <h1 className="text-3xl md:text-5xl md:leading-none font-bold text-white mb-5 mt-52">
                    {t("title")}
                </h1>
                {/* <p className="mb-5 text-xl font-semibold text-white md:text-4xl">
                    {t("subtitle")}
                </p> */}
                <Link
                    to="/home"
                    className="px-5 py-2 font-bold text-white rounded-lg bg-primary-500"
                >
                    {t("button")}
                </Link>
            </div>
        </div>
    );
}
