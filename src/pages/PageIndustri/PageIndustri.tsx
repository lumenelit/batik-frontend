import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/layouts/Container";
import MotifCard from "../../components/MotifCard";

export default function PageIndustri() {
    const handleTabChange = (index) => {};
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
                        <div className="text-xl w-full font-semibold">
                            Nama Industri
                        </div>
                        <div className="self-stretch h-fit w-full flex-col justify-start items-start gap-2 flex">
                            <div className="w-full relative">
                                <div>Pemilik</div>
                                <div className="w-full text-sm font-normal">
                                    John Doe
                                </div>
                            </div>
                            <div className=" w-full relative">
                                <div>Deskripsi</div>
                                <div className="w-full text-sm font-normal">
                                    Lorem ipsum dolor sit amet consectetur. Urna
                                    justo elementum tortor massa. Vel morbi
                                    accumsan sit laoreet massa auctor enim. Sed
                                    vestibulum quam tellus morbi magna.
                                </div>
                            </div>
                            <div className="w-full relative">
                                <div>Alamat</div>
                                <div className="w-full text-sm font-normal">
                                    Jl. Indonesia merdeka, Manado, Indonesia
                                </div>
                            </div>
                            <div className="w-full relative">
                                <div>Kontak (No. telp, Whatsapp, Email)</div>
                                <div className="w-full text-sm font-normal">
                                    +62 123 1234 1234
                                </div>
                            </div>
                            <div className="w-full self-stretch  flex-col justify-center items-start gap-1 flex">
                                <div>Toko Cabang</div>
                                <div className="text-sm font-normal">
                                    Jl. Indonesia merdeka, Manado, Indonesia
                                    <br />
                                    Jl. Indonesia merdeka, Manado, Indonesia
                                    <br />
                                    Jl. Indonesia merdeka, Manado, Indonesia
                                </div>
                            </div>
                            <div className="w-full flex-col justify-center items-start gap-1 flex">
                                <div>Social Media</div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="p-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-center text-white text-sm">
                                            Instagram: @batik
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-white text-sm font-semibold">
                                            facebook: @batik.id
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-[63px] flex-col justify-center items-start gap-1 flex">
                                <div>Toko online</div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-center text-white text-sm font-semibold">
                                            Tokopedia
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-[#A25B4C] rounded-xl justify-start items-start gap-2.5 flex">
                                        <div className="text-white text-sm font-semibold">
                                            Shopee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex-col justify-end items-start gap-4 inline-flex">
                        <div className="text-[#231010] text-xl font-semibold font-['Inter']">
                            Motif batik
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-5 inline-flex">
                            <div className="flex flex-wrap justify-start items-start gap-3">
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
