import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../../components/layouts/Header";

export default function PageLanding() {
    const { t } = useTranslation();
    return (
        <div className="h-screen bg-cover bg-landing-background">
            <div className=" mx-[20%] flex flex-col items-center justify-between h-screen">
                {/* <header className="z-50"> */}
                <Header landing={true} />
                {/* </header> */}
                <div className="absolute flex flex-col items-center justify-center w-[70%] text-center h-full">
                    <h1 className="text-3xl md:text-5xl md:leading-none font-bold text-[#32768A] mb-5 ">
                        {t("title")}
                    </h1>
                    <Link
                        to="/home"
                        className="px-5 py-2 font-bold text-white rounded-lg bg-primary-500"
                    >
                        {t("button")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
