import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Container from "../../components/layouts/Container";
import api from "../../config/api";
import { HiMinus, HiPlus, HiChevronLeft } from "react-icons/hi2";
import ModalInvoice from "../../components/modal/ModalInvoice";
import { useTranslation } from "react-i18next";

type PesananBody = {
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
};

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

export default function PageCheckout() {
    const { idMotif } = useParams();
    const navigate = useNavigate();
    const [pesananBody, setPesananBody] = useState({
        jumlah: 1
    } as PesananBody);
    const [motifData, setMotifData] = useState(null);
    const [motifImage, setMotifImage] = useState([]);
    const [mirror, setMirror] = useState(false);
    const [modalInvoice, setModalInvoice] = useState(false);
    const [idPesanan, setIdPesanan] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        try {
            api.get(`/motif/${idMotif}`).then((res) => {
                setMotifData(res.data.data[0]);
                console.log("motif", res.data.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    }, [idMotif]);

    useEffect(() => {
        try {
            api.get(`/motif/image/${idMotif}`).then((res) => {
                if (res.data.data[0].image1) {
                    setMotifImage((motifImage) => [
                        ...motifImage,
                        res.data.data[0].image1
                    ]);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, [idMotif]);

    const handleSubmit = async () => {
        try {
            if (mirror) {
                setPesananBody((prevPesananBody) => ({
                    ...prevPesananBody,
                    namaPenerima: prevPesananBody?.namaPembeli,
                    kontakPenerima: prevPesananBody?.kontakPembeli
                }));
            }

            const body = {
                namaPembeli: pesananBody?.namaPembeli || "",
                kontakPembeli: pesananBody?.kontakPembeli || "",
                namaPenerima:
                    mirror === true
                        ? pesananBody?.namaPembeli
                        : pesananBody?.namaPenerima || "",
                kontakPenerima:
                    mirror === true
                        ? pesananBody?.kontakPembeli
                        : pesananBody?.kontakPenerima || "",
                alamat: pesananBody?.alamat || "",
                namaMotif: motifData.nama || "",
                metodePengiriman:
                    pesananBody?.metodePengiriman || "Ambil di store langsung",
                reqTambahan: pesananBody?.reqTambahan || "",
                jumlah: pesananBody?.jumlah || 0,
                hargaMotif: motifData.harga || 0,
                totalHarga: motifData.harga * pesananBody?.jumlah || 0,
                idMotif: idMotif
                // date: new Date().toISOString(),
            };

            if (
                body.namaPembeli === "" ||
                body.kontakPembeli === "" ||
                body.alamat === "" ||
                body.namaMotif === "" ||
                body.reqTambahan === "" ||
                body.jumlah === 0 ||
                body.hargaMotif === 0 ||
                body.totalHarga === 0 ||
                body.kontakPembeli === "" ||
                (!mirror && body.namaPenerima === "") ||
                (!mirror && body.kontakPenerima === "")
            ) {
                alert("Mohon isi semua data");
                return;
            }
            await api.post("/pesanan", await body).then((res) => {
                console.log(res);
                setModalInvoice(true);
                setIdPesanan(res.data.data._id);
                // navigate(`/invoice/${res.data.data._id}`);
            });
        } catch (error) {
            console.log(error);
        }
    };

    console.log(pesananBody);

    const getTotalHarga = () => {
        if (!motifData || !pesananBody) {
            return 0;
        }

        if (!pesananBody.jumlah || !motifData.harga) {
            return 0;
        }

        return formatRupiah(motifData.harga * pesananBody.jumlah);
    };

    if (!motifData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ModalInvoice
                modalInvoice={modalInvoice}
                setModalInvoice={setModalInvoice}
                idPesanan={idPesanan}
            />
            <Container center={true}>
                <Header />
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary w-fit text-xl font-semibold font-['Poppins']"
                >
                    <HiChevronLeft className="inline-flex" /> <span>Back</span>
                </button>
                <div className="flex flex-row justify-center items-start gap-4 font-['Poppins'] text-primary">
                    <div className="flex flex-row-reverse gap-2 min-w-1/2 h-fit">
                        <div className="min-w-[790px] h-fit flex flex-col p-4 mb-5 bg-white rounded-xl shadow-primary justify-start items-start gap-4">
                            <div className="text-xl font-semibold ">
                                {t("orderDetail")}
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("buyerName")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) => {
                                        // setPesananBody({
                                        //     ...pesananBody,
                                        //     namaPembeli: e.target.value
                                        // })
                                        if (mirror === false) {
                                            setPesananBody({
                                                ...pesananBody,
                                                namaPembeli: e.target.value
                                            });
                                        } else {
                                            setPesananBody({
                                                ...pesananBody,
                                                namaPembeli: e.target.value,
                                                namaPenerima: e.target.value
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("contact")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            kontakPembeli: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("noteForSeller")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <textarea
                                    className="flex-col px-5 py-2 h-[120px] rounded-lg border border-slate-200 active:border-slate-200 resize-none"
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            reqTambahan: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("shippingMethod")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <select
                                    className="px-5 h-[50px] rounded-lg border border-slate-200 justify-center  active:border-slate-200 items-center"
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            metodePengiriman: e.target.value
                                        })
                                    }
                                >
                                    <option value="Ambil di store langsung">
                                        Ambil di store langsung
                                    </option>
                                    <option value="Gojek">Gojek</option>
                                    <option value="Grab">Grab</option>
                                    <option value="JNT Reguler">
                                        JNT Reguler
                                    </option>
                                    <option value="JNT Express">
                                        JNT Express
                                    </option>
                                    <option value="JNE Reguler">
                                        JNE Reguler
                                    </option>
                                    <option value="JNE Express">
                                        JNE Express
                                    </option>
                                    <option value="GOJEK">POS</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("address")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <textarea
                                    className="flex-col px-5 py-2 h-[120px] rounded-lg border border-slate-200 active:border-slate-200 resize-none"
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            alamat: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="inline-flex items-center justify-start gap-5">
                                <div className="text-xl font-semibold ">
                                    {t("recieverDetail")}
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        // onChange={handleToggleMirror}
                                        defaultChecked={mirror}
                                        onClick={() => setMirror(!mirror)}
                                    ></input>
                                    <div className="text-xs font-normal leading-none text-slate-400">
                                        {t("sameBuyerAndReciever")}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`flex flex-col w-full gap-2 h-fit ${
                                    mirror && "hidden"
                                }`}
                            >
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("recieverName")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200 disabled:text-gray-500"
                                    disabled={mirror}
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            namaPenerima: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div
                                className={`flex flex-col w-full gap-2 h-fit ${
                                    mirror && "hidden"
                                }`}
                            >
                                <div className="w-full text-base font-normal leading-snug indent-1">
                                    {t("contact")}
                                    <span
                                        className="text-red-500"
                                        title="Wajib diisi"
                                    >
                                        *
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200  disabled:text-gray-500"
                                    disabled={mirror}
                                    onChange={(e) =>
                                        setPesananBody({
                                            ...pesananBody,
                                            kontakPenerima: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 max-w-[600px] flex-col justify-end items-start gap-4 inline-flex ">
                        <div className="w-[520px] h-[748px] p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch h-[39px]  text-[32px] font-semibold">
                                {motifData.nama}
                            </div>
                            <img
                                className="self-stretch h-[450px] rounded-xl object-cover"
                                src={
                                    motifImage[0]
                                        ? motifImage[0]
                                        : "https://via.placeholder.com/500x500"
                                }
                                alt="motif"
                            />
                            <div className="self-stretch h-[78px] flex-col justify-start items-start gap-2 flex">
                                <div className="text-xl font-semibold ">
                                    {t("orderDetail")}
                                </div>
                                <div className="inline-flex items-center self-stretch justify-center gap-2">
                                    <div className="text-base font-normal ">
                                        {t("price")}
                                    </div>
                                    <div className="text-base font-normal text-right grow shrink (basis-0">
                                        {formatRupiah(motifData.harga) || 0}
                                    </div>
                                </div>
                                <div className="inline-flex items-center self-stretch justify-between">
                                    <div className="text-base font-normal ">
                                        {t("totalOrder")}
                                    </div>
                                    <div className="px-2 rounded-[14px] bg-primary-500 justify-center items-center gap-1 flex">
                                        <div
                                            className="w-3.5 h-3.5 px-[1.75px] justify-center items-center flex cursor-pointer"
                                            onClick={() => {
                                                if (pesananBody.jumlah > 1) {
                                                    setPesananBody({
                                                        ...pesananBody,
                                                        jumlah: pesananBody?.jumlah
                                                            ? pesananBody.jumlah -
                                                              1
                                                            : 1
                                                    });
                                                }
                                            }}
                                        >
                                            <HiMinus className="inline-flex text-white" />
                                        </div>
                                        <div className="px-2 bg-white justify-center items-center gap-2.5 flex">
                                            <div className="text-base font-normal text-right">
                                                {pesananBody?.jumlah || 0}
                                            </div>
                                        </div>
                                        <div
                                            className="w-3.5 h-3.5 justify-center items-center flex cursor-pointer"
                                            onClick={() =>
                                                setPesananBody({
                                                    ...pesananBody,
                                                    jumlah: pesananBody?.jumlah
                                                        ? pesananBody.jumlah + 1
                                                        : 1
                                                })
                                            }
                                        >
                                            <HiPlus className="inline-flex text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center self-stretch justify-center gap-2">
                                <div className="text-base font-normal ">
                                    {t("totalPrice")}
                                </div>
                                <div className="text-base font-normal text-right grow shrink basis-0">
                                    {getTotalHarga() || 0}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="self-stretch h-[50px] px-2 bg-primary-500 rounded-xl justify-center items-center inline-flex"
                            >
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
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
