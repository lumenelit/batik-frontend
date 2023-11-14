import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/layouts/Container";

export default function PageMotif() {
    const { idMotif } = useParams();
    const motifData = [
        {
            nama: "Batik akatsuki air",
            harga: 200000
        },

        {
            nama: "Batik akatsuki tanah",
            harga: 100000
        }
    ];
    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-row justify-center items-start gap-4 font-['Inter'] ">
                    <div className="flex flex-row-reverse min-w-1/2 h-fit gap-2">
                        <img
                            className="w-[400px] h-[400px] rounded-xl bg-cover bg-center shadow-lg"
                            src="https://via.placeholder.com/520x520"
                        />
                        <div className="flex flex-col justify-between gap-2 w-full">
                            <img
                                className="w-[180px] h-1/2 rounded-xl bg-cover bg-center shadow-lg"
                                src="https://via.placeholder.com/250x250"
                            />
                            <img
                                className="w-[180px] h-1/2 rounded-xl bg-cover bg-center shadow-lg"
                                src="https://via.placeholder.com/250x250"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 max-w-[600px] flex-col justify-end items-start gap-4 inline-flex ">
                        <div className="min-w-[520px] h-fit p-4 bg-white rounded-xl shadow-lg flex-col justify-start items-start gap-16 inline-flex">
                            <div className="flex-col justify-start items-start gap-4 flex h-fit">
                                <div className="self-stretch text-3xl font-semibold line-clamp-2">
                                    Batik akatsuki tanah - 2x5 meter
                                </div>
                                <div className="h-fit relative">
                                    <div className="w-full left-0 top-0 text-base font-normal ">
                                        Rp 100.000/meter
                                    </div>
                                    <div className="w-full text-base font-normal ">
                                        Lorem ipsum dolor sit amet consectetur.
                                        Urna justo elementum tortor massa. Vel
                                        morbi accumsan sit laoreet massa auctor
                                        enim. Sed vestibulum quam tellus morbi
                                        magna.
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="left-0 top-0 text-2xl font-semibold ">
                                        Varian
                                    </div>
                                    <div className="justify-start items-start gap-2 inline-flex">
                                        <img
                                            className="w-[100px] h-[100px] rounded-xl"
                                            src="https://via.placeholder.com/100x100"
                                        />
                                        <img
                                            className="w-[100px] h-[100px] opacity-50 rounded-xl"
                                            src="https://via.placeholder.com/100x100"
                                        />
                                        <img
                                            className="w-[100px] h-[100px] opacity-50 rounded-xl"
                                            src="https://via.placeholder.com/100x100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-[50px] px-2 bg-[#A25B4C] rounded-xl justify-center items-center inline-flex">
                                <div className="flex-col justify-center items-center inline-flex">
                                    <div className="h-6 justify-start items-center inline-flex">
                                        <div className="justify-center items-center gap-1 flex">
                                            <div className="text-center text-white text-base font-semibold  leading-normal">
                                                Beli Sekarang
                                            </div>
                                            <div className="w-5 h-5 relative origin-top-left rotate-180" />
                                        </div>
                                    </div>
                                    <div className="px-3 justify-start items-start inline-flex">
                                        <div className="w-[0px] h-[0px] bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
