// import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import api from "../../config/api";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import translate from "translate";

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

export default function PageMotif() {
    const { idMotif } = useParams();
    const navigate = useNavigate();
    const [motifData, setMotifData] = useState(null);
    const [motifImage, setMotifImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [lang, setLang] = useState(i18next.language);
    const [description, setDescription] = useState("processing...");

    const translateToEnglish = async (text) => {
        return await translate(text, {
            from: "id",
            to: "en",
            engine: "google"
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/motif/${idMotif}`);
                const motifData = response.data.data[0];
                setMotifData(motifData);
                console.log(motifData);

                const descriptionText =
                    lang === "en"
                        ? await translateToEnglish(motifData.desc)
                        : motifData.desc;
                setDescription(descriptionText);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [idMotif, lang]);

    useEffect(() => {
        try {
            api.get(`/motif/image/${idMotif}`).then((res) => {
                if (res.data.data[0].image1) {
                    setMotifImage((motifImage) => [
                        ...motifImage,
                        res.data.data[0].image1
                    ]);
                }
                // if (res.data.data[0].image2) {
                //     setMotifImage((motifImage) => [
                //         ...motifImage,
                //         res.data.data[0].image2
                //     ]);
                // }
                // if (res.data.data[0].image3) {
                //     setMotifImage((motifImage) => [
                //         ...motifImage,
                //         res.data.data[0].image3
                //     ]);
                // }
                // console.log(res.data.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    }, [idMotif]);

    return (
        <>
            <Container center={true}>
                <Header setLang={setLang} />

                {/* <button
                    onClick={() => navigate(-1)}
                    className="text-primary w-fit text-xl font-semibold font-['Poppins']"
                >
                    <HiChevronLeft className="inline-flex" />{" "}
                    <span>{t("back")}</span>
                </button> */}
                <div className="flex flex-row justify-center items-start gap-4 font-['Poppins'] ">
                    <div className="flex flex-row-reverse w-1/2 h-auto gap-2">
                        <img
                            className="object-cover w-[500px] h-[500px] bg-center bg-cover aspect-w-16 aspect-h-16 rounded-xl shadow-primary"
                            src={
                                motifImage[0]
                                    ? motifImage[0]
                                    : "https://via.placeholder.com/500x500"
                            }
                            alt="motif"
                        />
                        {/* <div className="flex flex-col justify-between w-auto gap-2">
                            <img
                                className="w-full min-w-[250px] bg-center object-cover aspect-w-16 aspect-h-16 h-1/2 rounded-xl shadow-primary"
                                src={
                                    motifImage[1]
                                        ? motifImage[1]
                                        : "https://via.placeholder.com/500x500"
                                }
                                alt="motif"
                            />
                            <img
                                className="w-full min-w-[250px] bg-center object-cover aspect-w-16 aspect-h-16 h-1/2 rounded-xl shadow-primary"
                                src={
                                    motifImage[2]
                                        ? motifImage[2]
                                        : "https://via.placeholder.com/500x500"
                                }
                                alt="motif"
                            />
                        </div> */}
                    </div>
                    <div className="w-1/2 max-w-[600px] flex-col justify-end items-start gap-4 inline-flex ">
                        <div className="min-w-[520px] h-fit p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-16 inline-flex">
                            <div className="flex flex-col items-start justify-start w-full gap-4 h-fit">
                                <div className="flex justify-between w-full text-xl font-semibold">
                                    <div className="flex items-center justify-start gap-2">
                                        {motifData?.nama}
                                    </div>
                                </div>
                                <div className="relative h-fit">
                                    <div className="top-0 left-0 w-full text-base font-bold">
                                        {formatRupiah(motifData?.harga)}
                                        /meter
                                    </div>
                                    <div className="w-full mt-2 text-base font-normal ">
                                        {description}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="self-stretch h-[50px] px-2 bg-[#A25B4C] rounded-xl justify-center items-center inline-flex cursor-pointer"
                                onClick={() =>
                                    navigate(`/checkout/${motifData._id}`)
                                }
                            >
                                <div className="inline-flex flex-col items-center justify-center">
                                    <div className="inline-flex items-center justify-start h-6">
                                        <div className="flex items-center justify-center gap-1">
                                            <div className="text-base font-semibold leading-normal text-center text-white">
                                                {t("buyNow")}
                                            </div>
                                            <div className="relative w-5 h-5 origin-top-left rotate-180" />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
