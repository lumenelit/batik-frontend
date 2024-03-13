// import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/layouts/Header";
import Container from "../../../components/layouts/Container";
import MotifCard from "../../../components/MotifCard";
import {
    HiChevronLeft,
    HiMapPin,
    HiPencil,
    HiPlus,
    HiTrash,
    HiUser
} from "react-icons/hi2";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import ModalCreateMotif from "../../../components/modal/ModalCreateMotif";
import ModalEditIndustri from "../../../components/modal/ModalEditIndustri";
import { useTranslation } from "react-i18next";
import translate from "translate";

import { showShopLogo, showSosmedLogo } from "../../../customHooks";
import i18next from "i18next";

export default function PageIndustriEdit() {
    const [industriData, setIndustriData] = useState(null);
    const [industriImage, setIndustriImage] = useState(null);
    const [motifData, setMotifData] = useState([]);
    const [modalMotif, setModalMotif] = useState(false);
    const [modalEditIndustri, setModalEditIndustri] = useState(false);
    const navigate = useNavigate();
    const { idIndustri } = useParams();
    const { t } = useTranslation();
    const [lang, setLang] = useState(i18next.language);
    const [description, setDescription] = useState("processing...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const industriResponse = await api.get(
                    `/industri/${idIndustri}`
                );
                setIndustriData(industriResponse.data.data[0]);
                console.log("industri: ", industriResponse.data.data);

                const descriptionText =
                    lang === "en"
                        ? await translateToEnglish(
                              industriResponse.data.data[0].desc
                          )
                        : industriResponse.data.data[0].desc;
                setDescription(descriptionText);

                const imageResponse = await api.get(
                    `/industri/image/${idIndustri}`
                );
                setIndustriImage(imageResponse.data.data[0]);
                // console.log(imageResponse.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [idIndustri, lang]);

    const translateToEnglish = async (text) => {
        return await translate(text, {
            from: "id",
            to: "en",
            engine: "google"
        });
    };

    useEffect(() => {
        try {
            api.get(`/motif/industri/${idIndustri}`)
                .then((res) => {
                    setMotifData(res.data.data);
                    // console.log("motif: ", res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const ResizeMap = () => {
        const map = useMap() as any;
        map._onResize();
        return null;
    };

    const marker = new DivIcon({
        className: "marker",
        html: ReactDOMServer.renderToString(
            <HiMapPin className="text-4xl text-dark" />
        ),
        iconAnchor: [24, 24]
    });

    const handleDelete = () => {
        api.delete(`/industri/${industriData._id}`)
            .then((res) => {
                console.log(res);
                navigate("/admin/industri");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!industriData) {
        return <>Loading...</>;
    }

    return (
        <>
            <ModalCreateMotif
                modalMotif={modalMotif}
                setModalMotif={setModalMotif}
                idIndustri={idIndustri}
            />
            <ModalEditIndustri
                modalEditIndustri={modalEditIndustri}
                setModalEditIndustri={setModalEditIndustri}
                industriData={industriData}
            />
            <Container center={true}>
                <Header setLang={setLang} />
                <div className="flex flex-row items-start gap-5">
                    <div className="w-1/2 max-w-[400px] h-fit flex justify-center gap-4 flex-col">
                        {/* <Link
                            to={"/admin/industri"}
                            className="text-primary text-xl font-semibold font-['Poppins']"
                        >
                            <HiChevronLeft className="inline-flex" />{" "}
                            <span> {t("back")}</span>
                        </Link> */}
                        <div className="p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex text-primary text-l font-semibold font-['Poppins']">
                            <div className="flex justify-between w-full text-xl font-semibold">
                                <div className="flex items-center justify-start gap-2">
                                    {industriData.nama}
                                </div>
                                <button
                                    className="flex items-center justify-center gap-2 text-gray-400"
                                    onClick={() => setModalEditIndustri(true)}
                                >
                                    <HiPencil className="inline-flex" />
                                    Edit
                                </button>
                            </div>
                            <div className="flex flex-col items-start self-stretch justify-start w-full gap-2 h-fit">
                                <div className="flex flex-col w-full gap-1.5 overflow-hidden">
                                    <img
                                        className="w-[368px] bg-cover rounded-lg "
                                        src={industriImage?.image1}
                                    />
                                    <div className="flex flex-row justify-between ">
                                        <img
                                            className="rounded-lg w-[180px]"
                                            src={industriImage?.image2}
                                        />
                                        <img
                                            className="rounded-lg w-[180px]"
                                            src={industriImage?.image3}
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>{t("ownerName")}</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.pemilik}
                                    </div>
                                </div>
                                <div className="relative w-full ">
                                    <div>{t("desc")}</div>
                                    <div className="w-full text-sm font-normal">
                                        {description}
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>{t("address")}</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.alamat}
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>{t("contact")}</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.kontak}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start self-stretch justify-center w-full gap-1">
                                    <div>{t("branchStores")}</div>
                                    <div className="text-sm font-normal">
                                        {industriData.alamatCabang.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-start gap-2"
                                                >
                                                    <HiMapPin className="text-lg text-dark" />
                                                    <span className="ml-2">
                                                        {item}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-center w-full gap-1">
                                    <div>{t("socialMedia")}</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        {industriData.sosmed.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="py-1 px-2 bg-gray-100 rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-black"
                                                >
                                                    {showSosmedLogo(item.label)}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="self-stretch h-[63px] flex-col justify-center items-start gap-1 flex">
                                    <div>{t("eCommerce")}</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        {industriData.eCommerce.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="py-1 px-2 bg-gray-100 rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-white"
                                                >
                                                    {showShopLogo(item.nama)}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-full py-2 text-white bg-red-500 rounded-lg shadow-primary hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                <HiTrash className="inline-block w-5 h-5 mr-2" />
                                {t("DeleteIndustry")}
                            </button>
                        </div>
                    </div>
                    <div className="inline-flex flex-col items-start justify-end w-full gap-4">
                        <div className="flex items-center justify-between w-full">
                            <span className="text-xl font-semibold font-['Poppins']">
                                Motif batik
                            </span>
                            <button
                                className="px-4 py-2 text-white rounded-lg bg-primary-500 shadow-primary hover:bg-primary-600"
                                onClick={() => setModalMotif(true)}
                            >
                                <HiPlus className="inline-block w-5 h-5 mr-2" />
                                {t("addMotif")}
                            </button>
                        </div>
                        <div className="inline-flex flex-col items-start self-stretch justify-start gap-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 ">
                                {motifData.length === 0 && (
                                    <div className="text-lg text-dark">
                                        {t("emptyMotif")}
                                    </div>
                                )}
                                {motifData.map((item, index) => (
                                    <MotifCard
                                        data={item}
                                        key={index}
                                        haveDelete
                                        admin
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
