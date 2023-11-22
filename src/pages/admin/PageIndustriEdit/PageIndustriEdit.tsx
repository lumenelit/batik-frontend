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

export default function PageIndustriEdit() {
    const [industriData, setIndustriData] = useState(null);
    const [motifData, setMotifData] = useState([]);
    const [modalMotif, setModalMotif] = useState(false);
    const navigate = useNavigate();
    const { idIndustri } = useParams();

    useEffect(() => {
        try {
            api.get(`/industri/${idIndustri}`)
                .then((res) => {
                    setIndustriData(res.data.data[0]);
                    console.log("industri: ", res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

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
        api.delete(`/industri/${industriData.idIndustri}`)
            .then((res) => {
                console.log(res);
                navigate("/admin/industri");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!industriData) {
        return <>Not Found</>;
    }

    return (
        <>
            <ModalCreateMotif
                modalMotif={modalMotif}
                setModalMotif={setModalMotif}
                idIndustri={idIndustri}
            />
            <Container center={true}>
                <Header />
                <div className="flex flex-row items-start gap-5">
                    <div className="w-1/2 max-w-[400px] h-fit flex justify-center gap-4 flex-col">
                        <Link
                            to={"/admin/industri"}
                            className="text-primary text-xl font-semibold font-['Inter']"
                        >
                            <HiChevronLeft className="inline-flex" />{" "}
                            <span>Back</span>
                        </Link>
                        <div className="p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex text-primary text-l font-semibold font-['Inter']">
                            <div className="flex justify-between w-full text-xl font-semibold">
                                <div className="flex items-center justify-start gap-2">
                                    {industriData.namaIndustri}
                                </div>
                                <button className="flex items-center justify-center gap-2 text-gray-400">
                                    <HiPencil className="inline-flex" />
                                    Edit
                                </button>
                            </div>
                            <div className="flex flex-col items-start self-stretch justify-start w-full gap-2 h-fit">
                                <div className="relative w-full">
                                    <div>Pemilik</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.pemilik}
                                    </div>
                                </div>
                                <div className="relative w-full ">
                                    <div>Deskripsi</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.desc}
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>Alamat</div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.alamat}
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <div>
                                        Kontak (No. telp, Whatsapp, Email)
                                    </div>
                                    <div className="w-full text-sm font-normal">
                                        {industriData.kontak}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start self-stretch justify-center w-full gap-1">
                                    <div>Toko Cabang</div>
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
                                    <div>Social Media</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        {industriData.sosmed.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex"
                                                >
                                                    <a
                                                        href={item.link}
                                                        className="text-sm font-semibold text-white"
                                                    >
                                                        {item.label}
                                                    </a>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="self-stretch h-[63px] flex-col justify-center items-start gap-1 flex">
                                    <div>Toko online</div>
                                    <div className="inline-flex items-center justify-start gap-2">
                                        {industriData.eCommerce.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 bg-[#A25B4C] rounded-lg justify-start items-start gap-2.5 flex"
                                                >
                                                    <a
                                                        href={item.link}
                                                        className="text-sm font-semibold text-white"
                                                    >
                                                        {item.nama}
                                                    </a>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full overflow-hidden rounded-lg h-60">
                                <MapContainer
                                    className="w-full h-full"
                                    style={{ zIndex: 0 }}
                                    // center to sulawesi utara
                                    center={[
                                        industriData.coordinate.lat,
                                        industriData.coordinate.long
                                    ]}
                                    zoom={11}
                                    scrollWheelZoom={true}
                                    attributionControl={false}
                                    zoomControl={false}
                                >
                                    <ResizeMap />
                                    <TileLayer url="https://api.mapbox.com/styles/v1/sitouxz/clp1n3f0m01ci01qy2q4q3qax/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2l0b3V4eiIsImEiOiJja3k1emE4YnQwYTV3MnVwMXM1NzJ1aWpsIn0.yzj632wgHQSoI8MZQD9qxg" />

                                    <Marker
                                        position={[
                                            industriData.coordinate.lat,
                                            industriData.coordinate.long
                                        ]}
                                        icon={marker}
                                    >
                                        <Popup>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-lg font-bold">
                                                    {industriData.namaIndustri}
                                                </div>
                                                <div className="flex items-center">
                                                    <HiUser className="text-lg" />
                                                    <span className="ml-2">
                                                        {industriData.pemilik}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <HiMapPin className="text-lg text-dark" />
                                                    <span className="ml-2">
                                                        {industriData.alamat}
                                                    </span>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <button
                                className="w-full py-2 text-white bg-red-500 rounded-lg shadow-primary hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                <HiTrash className="inline-block w-5 h-5 mr-2" />
                                Hapus Industri
                            </button>
                        </div>
                    </div>
                    <div className="inline-flex flex-col items-start justify-end w-full gap-4">
                        <div className="flex items-center justify-between w-full">
                            <span className="text-xl font-semibold font-['Inter']">
                                Motif batik
                            </span>
                            <button
                                className="px-4 py-2 text-white rounded-lg bg-primary-500 shadow-primary hover:bg-primary-600"
                                onClick={() => setModalMotif(true)}
                            >
                                <HiPlus className="inline-block w-5 h-5 mr-2" />
                                Tambah Motif
                            </button>
                        </div>
                        <div className="inline-flex flex-col items-start self-stretch justify-start gap-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 ">
                                {motifData.length === 0 && (
                                    <div className="text-lg text-dark">
                                        Belum ada motif
                                    </div>
                                )}
                                {motifData.map((item, index) => (
                                    <MotifCard
                                        data={item}
                                        key={index}
                                        haveDelete
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
