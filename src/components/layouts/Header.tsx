import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

type HeaderProps = {
    admin?: boolean;
};

export default function Header({ admin }: HeaderProps) {
    const [enabled, setEnabled] = useState(false);
    const { i18n } = useTranslation();

    useEffect(() => {
        if (enabled) {
            i18n.changeLanguage("id");
        } else {
            i18n.changeLanguage("en");
        }
    }, [enabled]);

    return (
        <div className="w-full h-[81px] items-center inline-flex">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className="relative inline-flex items-center h-6 rounded-full bg-primary-500 w-11 me-3"
            >
                <span
                    className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                >
                    {enabled ? (
                        <span className="absolute top-[1.8px] right-[2px] text-[8px] font-bold text-primary-500">
                            ID
                        </span>
                    ) : (
                        <span className="absolute top-[1.8px] right-[2px] text-[8px] font-bold text-primary-500">
                            EN
                        </span>
                    )}
                </span>
            </Switch>
            <h1 className="text-dark text-2xl font-bold font-['Montserrat']">
                Sistem Informasi Geografis Kain Batik di Sulawesi Utara
            </h1>
            {admin && (
                <div className="flex items-center gap-4 ms-auto text-dark">
                    <NavLink
                        to="/admin/pesanan"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary-500 text-lg font-semibold"
                                : "text-dark text-lg font-semibold"
                        }
                    >
                        Pesanan
                    </NavLink>
                    <NavLink
                        to="/admin/industri"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary-500 text-lg font-semibold"
                                : "text-dark text-lg font-semibold"
                        }
                    >
                        Industri
                    </NavLink>
                </div>
            )}
        </div>
    );
}
