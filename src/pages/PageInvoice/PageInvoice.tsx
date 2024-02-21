import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import "primeicons/primeicons.css";

import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import api from "../../config/api";

type PesananData = {
    _id: string;
    idMotif: string;
    namaPembeli: string;
    namaPenerima: string;
    kontakPembeli: string;
    kontakPenerima: string;
    alamat: string;
    namaMotif: string;
    metodePengiriman: string;
    reqTambahan: string;
    jumlah: number;
    hargaMotif: number;
    totalHarga: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
type motifImage = {
    _id: string;
    image1: string;
};

export default function PageInvoice() {
    const navigate = useNavigate();
    const { idPesanan } = useParams();
    const webViewRef = useRef(null);
    const [motifImage, setMotifImage] = useState<motifImage>();
    const [pesananData, setPesananData] = useState<PesananData>({
        _id: "",
        idMotif: "",
        namaPembeli: "",
        namaPenerima: "",
        kontakPembeli: "",
        kontakPenerima: "",
        alamat: "",
        namaMotif: "",
        metodePengiriman: "",
        reqTambahan: "",
        jumlah: 0,
        hargaMotif: 0,
        totalHarga: 0,
        createdAt: "",
        updatedAt: "",
        __v: 0
    });
    const [loadingDownload, setLoadingDownload] = useState(false);

    const handleDownload = async () => {
        setLoadingDownload(true);
        try {
            await htmlToImage
                .toPng(webViewRef.current)
                .then(function (dataUrl) {
                    saveAs(dataUrl, "webview.png");
                })
                .catch(function (error) {
                    console.error("Error:", error);
                });
        } catch (e) {
            console.log("error", e);
            alert("Error");
        }
        setLoadingDownload(false);
    };

    const getPesanan = async (idPesanan) => {
        try {
            const res = await api.get(`/pesanan/${idPesanan}`);
            setPesananData(res.data.data[0]);
            console.log(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const getPesananImage = async (idMotif) => {
        try {
            const res = await api.get(`/motif/image/${idMotif}`);
            setMotifImage(res.data.data[0]);
            console.log(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPesanan(idPesanan);
    }, []);
    useEffect(() => {
        if (pesananData && pesananData.idMotif) {
            getPesananImage(pesananData.idMotif);
        }
    }, [pesananData]);
    return (
        <>
            <Container center={true} ss={webViewRef} loading={loadingDownload}>
                <Header hide={loadingDownload} />
                <div className="flex flex-row justify-center items-start gap-4 font-['Poppins'] text-primary">
                    <div className="flex flex-col w-full gap-4 p-4 bg-white shadow-primary rounded-xl">
                        <div>
                            <div className="flex flex-row items-center justify-between w-full gap-4 mb-5">
                                <h1 className="text-xl font-semibold">
                                    Data Pesanan - {idPesanan}
                                </h1>
                                <button
                                    onClick={handleDownload}
                                    className="w-10 h-10 text-lg text-blue-400 rounded-full bg-slate-100 hover:text-white hover:bg-blue-400"
                                >
                                    {loadingDownload ? (
                                        <i
                                            className="pi pi-spin pi-spinner"
                                            style={{ fontSize: "1rem" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="pi pi-download text-primary"
                                            style={{ fontSize: "1rem" }}
                                        ></i>
                                    )}
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span>Nama pemesan</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.namaPembeli}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Whatsapp</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.kontakPembeli}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Catatan</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.reqTambahan}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Metode Pengiriman</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.metodePengiriman}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Alamat Pengiriman</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.alamat}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold ">
                                Data Penerima
                            </h1>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span>Nama Penerima</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.namaPenerima}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Whatsapp</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.kontakPenerima}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 p-4 bg-white shadow-primary rounded-xl">
                        <div className="self-stretch mb-4 text-3xl font-semibold">
                            {pesananData.namaMotif}
                        </div>
                        {/* <img
                            className="self-stretch w-full rounded-xl"
                            src="https://via.placeholder.com/488x450"
                            alt="motif"
                        /> */}
                        <div className="w-full">
                            <img
                                className="self-stretch h-[400px] rounded-xl object-cover mb-4"
                                src={motifImage && motifImage.image1}
                                alt=""
                            />
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Nama Penerima</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.namaPenerima}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Banyak pesanan</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.jumlah}
                                    </span>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <span className="max-w-xs text-end">
                                        {pesananData.totalHarga}
                                    </span>
                                </div>
                            </div>

                            <Link
                                className={`flex items-center justify-center w-full py-3 font-semibold text-white rounded-lg bg-primary-500 ${
                                    loadingDownload ? "hidden" : ""
                                } `}
                                to="javascript:javascript:history.go(-1)"
                            >
                                Kembali ke Dashboard
                            </Link>
                            <button
                                className={`w-full px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 ${
                                    loadingDownload ? "hidden" : ""
                                }`}
                                onClick={async () => {
                                    const res = await api.delete(
                                        "/pesanan/${}"
                                    );
                                }}
                            >
                                <i className="mr-3 text-white fas fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
