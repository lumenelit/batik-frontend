// import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import MotifCard from "../../components/MotifCard";
import { HiChevronLeft, HiMapPin, HiUser } from "react-icons/hi2";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import api from "../../config/api";

export default function PageIndustri() {
    const { idIndustri } = useParams();
    const [industri, setIndustri] = useState(null);
    const [motifData, setMotifData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/industri/${idIndustri}`);
                setIndustri(res.data.data[0]);
                console.log("get", res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idIndustri]); // Include idIndustri as a dependency if it's used inside the useEffect

    useEffect(() => {
        try {
            api.get(`/motif/industri/${idIndustri}`)
                .then((res) => {
                    setMotifData(res.data.data);
                    console.log("motif: ", res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-col items-start gap-5">
                    <div className="flex flex-col justify-center w-full gap-4 cursor-default h-fit">
                        <Link
                            to={`/home`}
                            className="text-primary w-fit text-xl font-semibold font-['Inter']"
                        >
                            <HiChevronLeft className="inline-flex" />{" "}
                            <span>Back</span>
                        </Link>
                        {industri && (
                            <div className="p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex text-primary text-xl font-semibold font-['Inter']">
                                <div className="w-full text-3xl font-semibold">
                                    {industri.namaIndustri}
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col items-start self-stretch justify-start w-1/2 gap-2 h-fit">
                                        <div className="relative w-full">
                                            <div>Pemilik</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.pemilik}
                                            </div>
                                        </div>
                                        <div className="relative w-full ">
                                            <div>Deskripsi</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.desc}
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <div>Alamat</div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.alamat}
                                            </div>
                                        </div>
                                        <div className="relative w-full">
                                            <div>
                                                Kontak (No. telp, Whatsapp,
                                                Email)
                                            </div>
                                            <div className="w-full text-lg font-normal">
                                                {industri.kontak}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start self-stretch justify-center w-full gap-1">
                                            <div>Toko Cabang</div>
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
                                                <div>Social Media</div>

                                                <div className="inline-flex items-center justify-start gap-2">
                                                    {industri.sosmed.map(
                                                        (item, index) => (
                                                            <Link
                                                                className="py-1 px-4 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-white"
                                                                to={item.link}
                                                                key={index}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {industri.eCommerce.length > 0 && (
                                            <div className="flex flex-col items-start justify-center w-full gap-1">
                                                <div>Toko online</div>

                                                <div className="inline-flex items-center justify-start gap-2">
                                                    {industri.eCommerce.map(
                                                        (item, index) => (
                                                            <Link
                                                                className="py-1 px-4 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex text-lg text-center text-white"
                                                                to={item.link}
                                                                key={index}
                                                            >
                                                                {item.nama}
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
                                                industri.image1
                                                    ? industri.image1
                                                    : "https://via.placeholder.com/250x250"
                                            }
                                            alt="motif1"
                                        />
                                        <div className="flex flex-row justify-between w-full gap-2 shrink">
                                            <img
                                                className="bg-center object-cover w-72 bg-cover shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                src={industri.image2}
                                                alt="motif2"
                                            />
                                            <img
                                                className="bg-center object-cover w-72 bg-cover shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                src={industri.image3}
                                                alt="motif3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="inline-flex flex-col items-start justify-end w-full gap-4">
                        <div className="text-primary text-xl font-semibold font-['Inter']">
                            Motif batik
                        </div>
                        <div className="inline-flex flex-col items-start self-stretch justify-start gap-5">
                            <div className="grid flex-wrap items-start justify-start grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {motifData.length === 0 && (
                                    <div className="text-lg text-dark">
                                        Belum ada motif
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
