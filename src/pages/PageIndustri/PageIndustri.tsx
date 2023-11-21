// import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import MotifCard from "../../components/MotifCard";
import { HiChevronLeft, HiMapPin, HiUser } from "react-icons/hi2";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";

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
    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-row items-start gap-5">
                    <div className="w-1/2 max-w-[400px] h-fit flex justify-center gap-4 flex-col">
                        <Link
                            to={`/industri`}
                            className="text-primary text-xl font-semibold font-['Inter']"
                        >
                            <HiChevronLeft className="inline-flex" />{" "}
                            <span>Back</span>
                        </Link>
                        <div className="p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex text-primary text-l font-semibold font-['Inter']">
                            <div className="w-full text-xl font-semibold">
                                Nama Industri
                            </div>
                            {/* <div className="flex flex-row-reverse gap-2 min-w-1/2 h-fit">
                                <img
                                    className="bg-center bg-cover shadow-primary aspect-square rounded-xl"
                                    src="https://via.placeholder.com/250x250"
                                    alt="motif"
                                />
                                <div className="flex flex-col justify-between w-full gap-2">
                                    <img
                                        className="bg-center bg-cover shadow-primary aspect-square h-1/2 rounded-xl"
                                        src="https://via.placeholder.com/250x250"
                                        alt="motif"
                                    />
                                    <img
                                        className="bg-center bg-cover shadow-primary aspect-square h-1/2 rounded-xl"
                                        src="https://via.placeholder.com/250x250"
                                        alt="motif"
                                    />
                                </div>
                            </div> */}
                            <div className="flex flex-col items-start self-stretch justify-start w-full gap-2 h-fit">
                                <div className="relative w-full">
                                    <div>Pemilik</div>
                                    <div className="w-full text-sm font-normal">
                                        Griffin
                                    </div>
                                </div>
                                <div className="relative w-full ">
                                    <div>Deskripsi</div>
                                    <div className="w-full text-sm font-normal">
                                        Lorem ipsum dolor sit amet consectetur.
                                        Urna justo elementum tortor massa. Vel
                                        morbi accumsan sit laoreet massa auctor
                                        enim. Sed vestibulum quam tellus morbi
                                        magna.
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>Alamat</div>
                                    <div className="w-full text-sm font-normal">
                                        Jl. Indonesia merdeka, Manado, Indonesia
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>
                                        Kontak (No. telp, Whatsapp, Email)
                                    </div>
                                    <div className="w-full text-sm font-normal">
                                        +62 123 1234 1234
                                    </div>
                                </div>
                                <div className="flex flex-col items-start self-stretch justify-center w-full gap-1">
                                    <div>Toko Cabang</div>
                                    <div className="text-sm font-normal">
                                        Jl. Indonesia merdeka, Manado, Indonesia
                                        <br />
                                        Jl. Indonesia merdeka, Manado, Indonesia
                                        <br />
                                        Jl. Indonesia merdeka, Manado, Indonesia
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-center w-full gap-1">
                                    <div>Social Media</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        <div className="p-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex">
                                            <div className="text-sm text-center text-white">
                                                Instagram: @batik
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex">
                                            <div className="text-sm font-semibold text-white">
                                                facebook: @batik.id
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-[63px] flex-col justify-center items-start gap-1 flex">
                                    <div>Toko online</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        <div className="px-4 py-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex">
                                            <div className="text-sm font-semibold text-center text-white">
                                                Tokopedia
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex">
                                            <div className="text-sm font-semibold text-white">
                                                Shopee
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full overflow-hidden rounded-lg h-60">
                                <MapContainer
                                    className="w-full h-full "
                                    // center to sulawesi utara
                                    center={[-6.2088, 106.8456]}
                                    zoom={11}
                                    scrollWheelZoom={true}
                                    attributionControl={false}
                                    zoomControl={false}
                                >
                                    <ResizeMap />
                                    <TileLayer url="https://api.mapbox.com/styles/v1/sitouxz/clp1n3f0m01ci01qy2q4q3qax/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2l0b3V4eiIsImEiOiJja3k1emE4YnQwYTV3MnVwMXM1NzJ1aWpsIn0.yzj632wgHQSoI8MZQD9qxg" />

                                    <Marker
                                        position={[-6.2088, 106.8456]}
                                        icon={marker}
                                    >
                                        <Popup>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-lg font-bold">
                                                    Nama Industri
                                                </div>
                                                <div className="flex items-center">
                                                    <HiUser className="text-lg" />
                                                    <span className="ml-2">
                                                        Griffin
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <HiMapPin className="text-lg text-dark" />
                                                    <span className="ml-2">
                                                        Jl. Indonesia merdeka,
                                                        Manado, Indonesia
                                                    </span>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
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
