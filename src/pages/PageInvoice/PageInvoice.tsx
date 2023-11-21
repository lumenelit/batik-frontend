import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";

export default function PageInvoice() {
    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-row justify-center items-start gap-4 font-['Inter'] text-primary">
                    <div className="flex flex-col w-full gap-4 p-4 bg-white shadow-primary rounded-xl">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Data Pesanan - #SU069
                            </h1>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span>Nama pemesan</span>
                                    <span className="max-w-xs text-end">
                                        Jordy Sinaulan
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Whatsapp</span>
                                    <span className="max-w-xs text-end">
                                        +628123456789
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Catatan</span>
                                    <span className="max-w-xs text-end">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Facere architecto
                                        quae, deserunt recusandae fuga
                                        explicabo?
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Metode Pengiriman</span>
                                    <span className="max-w-xs text-end">
                                        JNE
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Alamat Pengiriman</span>
                                    <span className="max-w-xs text-end">
                                        Jl. Boulevard No. 1, Manado, Sulawesi
                                        Utara, Indonesia
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
                                        Jordy Sinaulan
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Whatsapp</span>
                                    <span className="max-w-xs text-end">
                                        +628123456789
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 p-4 bg-white shadow-primary rounded-xl">
                        <div className="self-stretch mb-4 text-3xl font-semibold">
                            Batik akatsuki tanah - 2x5 meter
                        </div>
                        <img
                            className="self-stretch w-full rounded-xl"
                            src="https://via.placeholder.com/488x450"
                            alt="motif"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">
                                Data Penerima
                            </h1>
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Nama Penerima</span>
                                    <span className="max-w-xs text-end">
                                        Jordy Sinaulan
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Banyak pesanan</span>
                                    <span className="max-w-xs text-end">
                                        10x
                                    </span>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <span className="max-w-xs text-end">
                                        Rp. 6.500.000
                                    </span>
                                </div>
                            </div>
                            <button
                                className="w-full py-3 text-white rounded-lg bg-primary-500"
                                onClick={() => {}}
                            >
                                Kembali ke Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
