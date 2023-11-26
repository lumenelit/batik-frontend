import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Popup } from "reactjs-popup";
import { useTranslation } from "react-i18next";
// import { signOut } from '../../config/index';
// import AuthContext from '../../contexts/AuthContext';

import SignOutImg from "../../assets/images/curious-amico.svg";

type Props = {
    childPage?: boolean;
    label?: string;
    onlyLabel?: boolean;
    showProfile?: boolean;
};

export default function Navigation({
    childPage,
    label,
    onlyLabel,
    showProfile
}: Props) {
    // const { user } = useContext(AuthContext);
    const user = {
        details: {
            photo: "https://i.pravatar.cc/300",
            name: "John Doe",
            noreg: "1234567890"
        }
    };
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(false);
    const closeModal = () => setOpen(false);
    const navigate = useNavigate();

    if (!childPage) {
        return (
            <header className="flex items-center justify-between py-3 mb-3">
                <Popup
                    open={open}
                    closeOnDocumentClick
                    onClose={closeModal}
                    overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    modal
                >
                    <div className="flex flex-col items-center justify-center p-3 mx-3 transition-all bg-white rounded-xl">
                        <LazyLoadImage
                            src={SignOutImg}
                            alt=""
                            height={180}
                            effect="blur"
                        />
                        <h2 className="text-2xl font-bold text-center">
                            {t("modalTitle")}
                        </h2>
                        <p className="mb-8 font-semibold text-center">
                            {t("modalDescription")}
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-12 py-2 font-bold transition-all border rounded-lg text-primary-500 border-primary-500 hover:bg-disabled"
                            >
                                {t("cancel")}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    // signOut();
                                    navigate("/");
                                }}
                                className="px-12 py-2 font-bold text-white transition-all rounded-lg bg-button-gradient hover:opacity-75"
                            >
                                {t("modalButton")}
                            </button>
                        </div>
                    </div>
                </Popup>
                <Popup
                    open={profile}
                    closeOnDocumentClick
                    onClose={() => setProfile(false)}
                    overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    modal
                    nested
                >
                    <div className="relative flex flex-col items-center justify-center transition-all bg-white p-7 rounded-xl w-72">
                        <button
                            type="button"
                            onClick={() => setProfile(false)}
                            className="absolute top-2 right-3"
                        >
                            <i className="text-xl text-gray-500 fas fa-times" />
                        </button>

                        <LazyLoadImage
                            src={user?.details?.photo}
                            alt=""
                            height={81}
                            width={81}
                            effect="blur"
                            className="rounded-full"
                        />
                        <h2 className="mt-3 text-xl font-bold leading-none text-center">
                            {user?.details?.name}
                        </h2>
                        <p className="text-center font-medium text-[10px] mb-40">
                            {user?.details?.noreg}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="px-8 py-2 font-bold text-white transition-all rounded-lg bg-danger hover:opacity-75"
                        >
                            {t("modalButton")}
                        </button>
                    </div>
                </Popup>
                <span className="text-xl font-bold">{t("title")}</span>
                <button
                    type="button"
                    onClick={() => setProfile(true)}
                    className="text-gray-500 hover:text-primary-500"
                >
                    <LazyLoadImage
                        src={user?.details?.photo}
                        alt=""
                        height={40}
                        width={40}
                        effect="blur"
                        className="rounded-full"
                    />
                </button>
            </header>
        );
    } else if (childPage && showProfile) {
        return (
            <div className="w-full py-[8px] px-[15px] flex justify-between items-center border-b border-stroke mb-3">
                <Popup
                    open={open}
                    closeOnDocumentClick
                    onClose={closeModal}
                    overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    modal
                >
                    <div className="flex flex-col items-center justify-center p-3 mx-3 transition-all bg-white rounded-xl">
                        <LazyLoadImage
                            src={SignOutImg}
                            alt=""
                            height={180}
                            effect="blur"
                        />
                        <h2 className="text-2xl font-bold text-center">
                            {t("modalTitle")}
                        </h2>
                        <p className="mb-8 font-semibold text-center">
                            {t("modalDescription")}
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-12 py-2 font-bold transition-all border rounded-lg text-primary-500 border-primary-500 hover:bg-disabled"
                            >
                                {t("button.cancel")}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    // signOut();
                                    navigate("/");
                                }}
                                className="px-12 py-2 font-bold text-white transition-all rounded-lg bg-button-gradient hover:opacity-75"
                            >
                                {t("modalButton")}
                            </button>
                        </div>
                    </div>
                </Popup>
                <Popup
                    open={profile}
                    closeOnDocumentClick
                    onClose={() => setProfile(false)}
                    overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    modal
                    nested
                >
                    <div className="relative flex flex-col items-center justify-center transition-all bg-white p-7 rounded-xl w-72">
                        <button
                            type="button"
                            onClick={() => setProfile(false)}
                            className="absolute top-2 right-3"
                        >
                            <i className="text-xl text-gray-500 fas fa-times" />
                        </button>

                        <LazyLoadImage
                            src={user?.details?.photo}
                            alt=""
                            height={81}
                            width={81}
                            effect="blur"
                            className="rounded-full"
                        />
                        <h2 className="mt-3 text-xl font-bold leading-none text-center">
                            {user?.details?.name}
                        </h2>
                        <p className="text-center font-medium text-[10px] mb-40">
                            {user?.details?.noreg}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="px-8 py-2 font-bold text-white transition-all rounded-lg bg-danger hover:opacity-75"
                        >
                            {t("modalButton")}
                        </button>
                    </div>
                </Popup>
                <div
                    className={`z-50 flex justify-center items-center w-[40px] h-[40px] rounded-full ${
                        onlyLabel ? "hidden" : ""
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                        className="w-full h-full transition-all bg-white rounded-full hover:bg-disabled"
                    >
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                </div>
                <div
                    className={`flex justify-center w-full ${
                        onlyLabel ? "ml-0" : "-ml-[40px]"
                    }`}
                >
                    <h1 className="font-bold text-[20px] text-[#2D2D2D] ">
                        {label}
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setProfile(true)}
                    className="text-gray-500 hover:text-primary-500"
                >
                    <LazyLoadImage
                        src={user?.details?.photo}
                        alt=""
                        height={40}
                        width={40}
                        effect="blur"
                        className="rounded-full"
                    />
                </button>
            </div>
        );
    } else {
        return (
            <div className="w-full py-[8px] px-[15px] flex justify-between items-center border-b border-stroke mb-3">
                <div
                    className={`z-50 flex justify-center items-center w-[40px] h-[40px] rounded-full ${
                        onlyLabel ? "hidden" : ""
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                        className="w-full h-full transition-all bg-white rounded-full hover:bg-disabled"
                    >
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                </div>
                <div
                    className={`flex justify-center w-full ${
                        onlyLabel ? "ml-0" : "-ml-[40px]"
                    }`}
                >
                    <h1 className="font-bold text-[20px] text-[#2D2D2D] ">
                        {label}
                    </h1>
                </div>
            </div>
        );
    }
}
