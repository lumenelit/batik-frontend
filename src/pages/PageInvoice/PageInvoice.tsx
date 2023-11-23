import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import api from "../../config/api";

type PesananData = {
    _id: string;
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

export default function PageInvoice() {
    const navigate = useNavigate();
    const { idPesanan } = useParams();
    const [pesananData, setPesananData] = useState<PesananData>({
        _id: "",
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

    useEffect(() => {
        try {
            api.get(`/pesanan/${idPesanan}`).then((res) => {
                setPesananData(res.data.data[0]);
                console.log(res.data.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-row justify-center items-start gap-4 font-['Inter'] text-primary">
                    <div className="flex flex-col w-full gap-4 p-4 bg-white shadow-primary rounded-xl">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Data Pesanan - {idPesanan}
                            </h1>
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
                            <h1 className="text-xl font-semibold">
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
                            <h1 className="text-xl font-semibold">
                                Data Penerima
                            </h1>
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
                                className="flex items-center justify-center w-full py-3 font-semibold text-white rounded-lg bg-primary-500"
                                to="/"
                            >
                                Kembali ke Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
