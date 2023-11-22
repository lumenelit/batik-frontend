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
    const motifData = [
        {
            idMotif: "AD123",
            idIndustri: "HF356542",
            nama: "Motif akatsuki air - 2mx3m",
            harga: 100000,
            desc: "Lorem ipsum dolor sit amet consectetur. Urna justo elementum tortor massa. Vel morbi accumsan sit laoreet massa auctor enim. Sed vestibulum quam tellus morbi magna.",
            varian: [
                {
                    id: "AD123",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                },
                {
                    id: "AD125",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                }
            ],
            image1: "ini pake file.bit64",
            image2: "ini pake file.bit64",
            image3: "ini pake file.bit64"
        },
        {
            idMotif: "AD123124",
            idIndustri: "HF356542",
            nama: "Motif akatsuki tanah - 2mx3m",
            harga: 200000,
            desc: "Lorem ipsum dolor sit amet consectetur. Urna justo elementum tortor massa. Vel morbi accumsan sit laoreet massa auctor enim. Sed vestibulum quam tellus morbi magna.",
            varian: [
                {
                    id: "AD123",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                },
                {
                    id: "AD125",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                }
            ],
            image1: "ini pake file.bit64",
            image2: "ini pake file.bit64",
            image3: "ini pake file.bit64"
        },
        {
            idMotif: "AD123124",
            idIndustri: "HF356542",
            nama: "Motif akatsuki tanah - 2mx3m",
            harga: 200000,
            desc: "Lorem ipsum dolor sit amet consectetur. Urna justo elementum tortor massa. Vel morbi accumsan sit laoreet massa auctor enim. Sed vestibulum quam tellus morbi magna.",
            varian: [
                {
                    id: "AD123",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                },
                {
                    id: "AD125",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                }
            ],
            image1: "ini pake file.bit64",
            image2: "ini pake file.bit64",
            image3: "ini pake file.bit64"
        },
        {
            idMotif: "AD123124",
            idIndustri: "HF356542",
            nama: "Motif akatsuki tanah - 2mx3m",
            harga: 200000,
            desc: "Lorem ipsum dolor sit amet consectetur. Urna justo elementum tortor massa. Vel morbi accumsan sit laoreet massa auctor enim. Sed vestibulum quam tellus morbi magna.",
            varian: [
                {
                    id: "AD123",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                },
                {
                    id: "AD125",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                }
            ],
            image1: "ini pake file.bit64",
            image2: "ini pake file.bit64",
            image3: "ini pake file.bit64"
        },
        {
            idMotif: "AD123124",
            idIndustri: "HF356542",
            nama: "Motif akatsuki tanah - 2mx3m",
            harga: 200000,
            desc: "Lorem ipsum dolor sit amet consectetur. Urna justo elementum tortor massa. Vel morbi accumsan sit laoreet massa auctor enim. Sed vestibulum quam tellus morbi magna.",
            varian: [
                {
                    id: "AD123",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                },
                {
                    id: "AD125",
                    image: "ini pake file.bit64", //ambil dari field image1 dari motif variant
                    nama: "Motif akatsuki air - 2mx3m"
                }
            ],
            image1: "ini pake file.bit64",
            image2: "ini pake file.bit64",
            image3: "ini pake file.bit64"
        }
    ];
    const { idIndustri } = useParams();
    const [industri, setIndustri] = useState(null);
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

    const marker = new DivIcon({
        className: "marker",
        html: ReactDOMServer.renderToString(
            <HiMapPin className="text-4xl text-dark" />
        ),
        iconAnchor: [24, 24]
    });
    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-col items-start gap-5">
                    <div className="flex flex-col justify-center w-full gap-4 cursor-default h-fit">
                        <Link
                            to={`/industri`}
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
                                                                {item.label}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 max-w-1/2 h-fit">
                                        <img
                                            className="bg-center bg-cover shadow-primary aspect-square rounded-xl"
                                            src="https://via.placeholder.com/250x250"
                                            alt="motif"
                                        />
                                        <div className="flex flex-row justify-between w-full gap-2 shrink">
                                            <img
                                                className="bg-center bg-cover shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                src="https://via.placeholder.com/250x250"
                                                alt="motif"
                                            />
                                            <img
                                                className="bg-center bg-cover shrink shadow-primary aspect-square h-1/2 rounded-xl"
                                                src="https://via.placeholder.com/250x250"
                                                alt="motif"
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
                            <div className="flex flex-wrap items-start justify-start gap-5">
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
