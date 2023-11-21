import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";

export default function PageCheckout() {
    const { idMotif } = useParams();
    const [namaPembeli, setNamaPembeli] = useState("");
    const [whatsappPembeli, setWhatsappPembeli] = useState("");
    const [catatan, setCatatan] = useState("");
    const [metodePengiriman, setMetodePengiriman] = useState("");
    const [alamat, setAlamat] = useState("");
    const [namaPenerima, setNamaPenerima] = useState("");
    const [whatsappPenerima, setWhatsappPenerima] = useState("");

    const [mirror, setMirror] = useState(true);

    const handleOnchangeDefault = (value, setFunction) => {
        console.log("On change - ", value);
        setFunction(value);
    };
    const handleOnchangeMirror = (value, setFunction, setMirrorFunction) => {
        setFunction(value);
        if (mirror === true) {
            console.log("On change mirror - ", value);
            setMirrorFunction(value);
        }
    };
    const handleToggleMirror = () => {
        if (mirror === false) {
            console.log("before", mirror);
            setNamaPenerima(namaPembeli);
            setWhatsappPenerima(whatsappPembeli);
        }
        setMirror(!mirror);
    };

    return (
        <>
            <Container center={true}>
                <Header />
                <div className="flex flex-row justify-center items-start gap-4 font-['Inter'] text-primary">
                    <div className="flex flex-row-reverse gap-2 min-w-1/2 h-fit">
                        <div className="min-w-[790px] h-fit flex flex-col p-4 mb-5 bg-white rounded-xl shadow-primary justify-start items-start gap-4">
                            <div className="text-xl font-semibold ">
                                Rincian pembeli
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Nama pembeli
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setNamaPembeli
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Whatsapp
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setWhatsappPembeli
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Catatan untuk penjual
                                </div>
                                <textarea
                                    className="flex-col px-5 py-2 h-[120px] rounded-lg border border-slate-200 active:border-slate-200 resize-none"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setCatatan
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Metode pengiriman
                                </div>
                                <select
                                    className="px-5 h-[50px] rounded-lg border border-slate-200 justify-center  active:border-slate-200 items-center"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setMetodePengiriman
                                        )
                                    }
                                >
                                    <option value="JNE">JNE</option>
                                    <option value="COD">COD</option>
                                    <option value="GOJEK">GOJEK</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Alamat
                                </div>
                                <textarea
                                    className="flex-col px-5 py-2 h-[120px] rounded-lg border border-slate-200 active:border-slate-200 resize-none"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setAlamat
                                        )
                                    }
                                />
                            </div>
                            <div className="inline-flex items-center justify-start gap-5">
                                <div className="text-xl font-semibold ">
                                    Rincian penerima
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        onChange={handleToggleMirror}
                                        checked={mirror}
                                    ></input>
                                    <div className="text-xs font-normal leading-none text-slate-400">
                                        Rincian penerima sama dengan pembeli
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Nama penerima
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setNamaPenerima
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    Whatsapp penerima
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) =>
                                        handleOnchangeDefault(
                                            e.target.value,
                                            setWhatsappPenerima
                                        )
                                    }
                                    value={whatsappPenerima}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 max-w-[600px] flex-col justify-end items-start gap-4 inline-flex ">
                        <div className="w-[520px] h-[748px] p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch h-[39px]  text-[32px] font-semibold">
                                Batik akatsuki tanah - 2x5 meter
                            </div>
                            <img
                                className="self-stretch h-[450px] rounded-xl"
                                src="https://via.placeholder.com/488x450"
                                alt="motif"
                            />
                            <div className="self-stretch h-[78px] flex-col justify-start items-start gap-2 flex">
                                <div className="text-xl font-semibold ">
                                    Rincian pesanan
                                </div>
                                <div className="inline-flex items-center self-stretch justify-center gap-2">
                                    <div className="text-base font-normal ">
                                        Harga
                                    </div>
                                    <div className="text-base font-normal text-right grow shrink basis-0">
                                        Rp 100.000
                                    </div>
                                </div>
                                <div className="inline-flex items-center self-stretch justify-between">
                                    <div className="text-base font-normal ">
                                        Banyak pesanan
                                    </div>
                                    <div className="px-2 rounded-[14px] border border-slate-400 justify-center items-center gap-1 flex">
                                        <div className="w-3.5 h-3.5 px-[1.75px] justify-center items-center flex" />
                                        <div className="px-2 border border-slate-400 justify-center items-center gap-2.5 flex">
                                            <div className="text-base font-normal text-right">
                                                10
                                            </div>
                                        </div>
                                        <div className="w-3.5 h-3.5 p-[2.48px] justify-center items-center flex" />
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center self-stretch justify-center gap-2">
                                <div className="text-base font-normal ">
                                    Total
                                </div>
                                <div className="text-base font-normal text-right grow shrink basis-0">
                                    Rp 1.000.000
                                </div>
                            </div>
                            <div className="self-stretch h-[50px] px-2 bg-stone-500 rounded-xl justify-center items-center inline-flex">
                                <div className="inline-flex flex-col items-center justify-center">
                                    <div className="inline-flex items-center justify-start h-6">
                                        <div className="flex items-center justify-center gap-1">
                                            <div className="text-base font-semibold leading-normal text-center text-white">
                                                Buat pesanan
                                            </div>
                                            <div className="relative w-5 h-5 origin-top-left rotate-180" />
                                        </div>
                                    </div>
                                    <div className="inline-flex items-start justify-start px-3">
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
