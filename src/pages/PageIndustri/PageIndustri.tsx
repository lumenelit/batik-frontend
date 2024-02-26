// import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import MotifCard from "../../components/MotifCard";
import { HiChevronLeft } from "react-icons/hi2";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useTranslation } from "react-i18next";
import translate from "translate";

// import { showShopLogo, showSosmedLogo } from
import { showShopLogo, showSosmedLogo } from "../../customHooks";

export default function PageIndustri() {
    const { idIndustri } = useParams();
    const [industri, setIndustri] = useState(null);
    const [industriImage, setIndustriImage] = useState(null);
    const [motifData, setMotifData] = useState([]);
    const { t } = useTranslation();
    const [lang, setLang] = useState("id");

    // const trans = true;
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/industri/${idIndustri}`);
                setIndustri(res.data.data[0]);
                console.log(res.data.data[0].desc);
                const desc = await translateToEnglish(res.data.data[0].desc);
                setDescription(desc);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData().then(async () => {
            try {
                const res = await api.get(`/industri/image/${idIndustri}`);
                setIndustriImage(res.data.data[0]);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        });
    }, [idIndustri]);
    // Include idIndustri as a dependency if it's used inside the useEffect

    useEffect(() => {
        try {
            api.get(`/motif/industri/${idIndustri}`)
                .then((res) => {
                    setMotifData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (lang === "id") {
            setDescription(industri && industri.desc);
        } else {
            translateToEnglish(industri && industri.desc).then((res) => {
                setDescription(res);
            });
        }
        // setDescription(industri.desc);
    }, [lang]);

    const translateToEnglish = async (text) => {
        // if (lang === "en") {
        return await translate(text, {
            from: "id",
            to: "en",
            engine: "google"
        });
        // } else {
        //     return text;
        // }
    };
    return (
        <>
            <Container center={true}>
                <Header setLang={setLang} />
                <div className="flex flex-col items-start gap-5">
                    <div className="flex flex-col justify-center w-full gap-4 cursor-default h-fit">
                        {/* <Link
                            to={`/home`}
                            className="text-primary w-fit text-xl font-semibold font-['Poppins']"
                        >
                            <HiChevronLeft className="inline-flex" />{" "}
                            <span>{t("back")}</span>
                        </Link> */}
                        {industri && (
                            <div className="p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex text-primary text-xl font-semibold font-['Poppins']">
                                <div className="w-full text-3xl font-semibold">
                                    {industri.nama}
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col items-start self-stretch justify-start w-1/2 gap-2 h-fit">
                                        <div className="relative w-full">
                                            <div>{t("ownerName")}</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.pemilik}
                                            </div>
                                        </div>
                                        <div className="relative w-full ">
                                            <div>{t("desc")}</div>
                                            <div className="w-full text-lg font-normal">
                                                {description}
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <div>{t("address")}</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.alamat}
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <div>{t("contact")}</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.kontak}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start self-stretch justify-center w-full gap-1">
                                            <div>{t("branchStores")}</div>
                                            <div className="text-lg font-normal">
                                                {industri.alamatCabang.length &&
                                                    industri.alamatCabang.map(
                                                        (item, index) => (
                                                            <li key={index}>
                                                                {item}
                                                            </li>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                        {industri.sosmed.length > 0 && (
                                            <div className="flex flex-col items-start justify-center w-full gap-1">
                                                <div>{t("socialMedia")}</div>

                                                <div className="inline-flex items-center justify-start gap-2">
                                                    {industri.sosmed.map(
                                                        (item, index) => (
                                                            <Link
                                                                className="py-1 px-4 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-white"
                                                                to={item.link}
                                                                key={index}
                                                            >
                                                                {showSosmedLogo(
                                                                    item.label
                                                                )}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {industri.eCommerce.length > 0 && (
                                            <div className="flex flex-col items-start justify-center w-full gap-1">
                                                <div>{t("eCommerce")}</div>

                                                <div className="inline-flex items-center justify-start gap-2">
                                                    {industri.eCommerce.map(
                                                        (item, index) => (
                                                            <Link
                                                                className="py-1 px-2 bg-gray-100 rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-white"
                                                                to={item.link}
                                                                key={index}
                                                            >
                                                                {showShopLogo(
                                                                    item.nama
                                                                )}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 max-w-1/2 h-fit">
                                        <img
                                            className="bg-center object-cover w-[36.5rem] bg-cover shadow-primary aspect-square rounded-xl"
                                            src={
                                                industriImage &&
                                                industriImage?.image1
                                                    ? industriImage?.image1
                                                    : "https://via.placeholder.com/250x250"
                                            }
                                            alt="motif1"
                                        />
                                        {(industriImage?.image2 ||
                                            industriImage?.image3) && (
                                            <div className="flex flex-row justify-between w-full gap-2 shrink">
                                                {industriImage?.image2 && (
                                                    <img
                                                        className="object-cover bg-center bg-cover w-72 shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                        src={
                                                            industriImage &&
                                                            industriImage?.image2
                                                                ? industriImage?.image2
                                                                : "https://via.placeholder.com/250x250"
                                                        }
                                                        alt="motif2"
                                                    />
                                                )}
                                                {industriImage?.image3 && (
                                                    <img
                                                        className="object-cover bg-center bg-cover w-72 shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                        src={
                                                            industriImage &&
                                                            industriImage?.image3
                                                                ? industriImage?.image3
                                                                : "https://via.placeholder.com/250x250"
                                                        }
                                                        alt="motif3"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="inline-flex flex-col items-start justify-end w-full gap-4 mb-10">
                        <div className="text-primary text-xl font-semibold font-['Poppins']">
                            Motif batik
                        </div>
                        <div className="inline-flex flex-col items-start self-stretch justify-start gap-5">
                            <div className="grid flex-wrap items-start justify-start grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {motifData.length === 0 && (
                                    <div className="text-lg text-dark">
                                        {t("emptyMotif")}
                                    </div>
                                )}
                                {motifData.map((item, index) => (
                                    <MotifCard data={item} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
