// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/layouts/Container";
import MotifCard from "../../components/MotifCard";

export default function PageIndustri() {
    // const handleTabChange = (index) => {};
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
            <Container center={false}>
                <Header />
                <div className="flex flex-row items-start gap-4">
                    <div className="w-1/2 max-w-[400px] h-fit p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-4 inline-flex text-[#231010] text-l font-semibold font-['Inter']">
                        <div className="w-full text-xl font-semibold">
                            Nama Industri
                        </div>
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
                                    Lorem ipsum dolor sit amet consectetur. Urna
                                    justo elementum tortor massa. Vel morbi
                                    accumsan sit laoreet massa auctor enim. Sed
                                    vestibulum quam tellus morbi magna.
                                </div>
                            </div>
                            <div className="relative w-full">
                                <div>Alamat</div>
                                <div className="w-full text-sm font-normal">
                                    Jl. Indonesia merdeka, Manado, Indonesia
                                </div>
                            </div>
                            <div className="relative w-full">
                                <div>Kontak (No. telp, Whatsapp, Email)</div>
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
                                    <div className="p-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-sm text-center text-white">
                                            Instagram: @batik
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-sm font-semibold text-white">
                                            facebook: @batik.id
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-[63px] flex-col justify-center items-start gap-1 flex">
                                <div>Toko online</div>
                                <div className="inline-flex items-center justify-start gap-2">
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-sm font-semibold text-center text-white">
                                            Tokopedia
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-sm font-semibold text-white">
                                            Shopee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex flex-col items-start justify-end w-full gap-4">
                        <div className="text-[#231010] text-xl font-semibold font-['Inter']">
                            Motif batik
                        </div>
                        <div className="inline-flex flex-col items-start self-stretch justify-start gap-5">
                            <div className="flex flex-wrap items-start justify-start gap-3">
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
