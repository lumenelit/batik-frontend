import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { HiPlus, HiXCircle, HiXMark } from "react-icons/hi2";
import api from "../../config/api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ModalCreateIndustriProps = {
    modalIndustri: boolean;
    setModalIndustri: (modalIndustri: boolean) => void;
};

type IndustriBody = {
    nama: string;
    pemilik: string;
    kontak: string;
    desc: string;
    alamat: string;
    coordinate: {
        lat: string;
        long: string;
    };
    image1: string;
    image2: string;
    image3: string;
    eCommerce: {
        nama: string;
        link: string;
    }[];
    sosmed: {
        label: string;
        link: string;
    }[];
    alamatCabang: string[];
};

export default function ModalCreateIndustri({
    modalIndustri,
    setModalIndustri
}: ModalCreateIndustriProps) {
    const { t } = useTranslation();
    const [industriBody, setIndustriBody] = useState({} as IndustriBody);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [cabangList, setCabangList] = useState<Array<string>>([""]);
    const [eCommerceList, setECommerceList] = useState<
        Array<{ nama: string; link: string }>
    >([{ nama: "", link: "" }]);
    const [sosmedList, setSosmedList] = useState<
        Array<{ label: string; link: string }>
    >([{ label: "", link: "" }]);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const image1 = imagePreviews[0];
        const image2 = imagePreviews[1];
        const image3 = imagePreviews[2];
        const eCommerce = (
            eCommerceList.filter(
                (item) => item.nama !== "" && item.link !== ""
            ) as {
                nama: string;
                link: string;
            }[]
        ).map((item) => ({
            ...item,
            link: item.link.replace("https://", "").replace("http://", "")
        }));
        const sosmed = sosmedList.filter(
            (item) => item.label !== "" && item.link !== ""
        ) as {
            label: string;
            link: string;
        }[];
        const alamatCabang = cabangList.filter((item) => item !== "");

        // setIndustriBody({
        //     ...industriBody,
        //     image1,
        //     image2,
        //     image3,
        //     alamatCabang,
        //     eCommerce,
        //     sosmed
        // });
        const body = {
            ...industriBody,
            image1,
            image2,
            image3,
            alamatCabang,
            eCommerce,
            sosmed
        };
        console.log(industriBody);
        // setModalIndustri(false);
        try {
            api.post("/industri", await body).then((res) => {
                console.log(res);
                navigate(`/admin/industri/edit/${res.data.data._id}`);
            });
        } catch (error) {
            console.log(error);
            // setModalIndustri(false);
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const newImagePreviews: string[] = [];

            // Ensure only up to 3 images are processed
            for (
                let i = 0;
                i < Math.min(files.length, 3 - imagePreviews.length);
                i++
            ) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    newImagePreviews.push(e.target?.result as string);

                    // Update state when all images are processed
                    if (
                        newImagePreviews.length ===
                        Math.min(files.length, 3 - imagePreviews.length)
                    ) {
                        setImagePreviews([
                            ...imagePreviews,
                            ...newImagePreviews
                        ]);
                    }
                };

                reader.readAsDataURL(files[i]);
            }
        }
    };

    const handleImageClick = () => {
        document.getElementById("imageInput")?.click();
    };

    const handleCabangInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const list = [...cabangList];
        list[index] = e.target.value;
        setCabangList(list);
    };

    const handleAddMoreCabang = () => {
        setCabangList((prev) => [...prev, ""]);
    };

    const handleECommerceInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { name, value } = e.target;
        const list = [...eCommerceList];
        list[index][name] = value;
        setECommerceList(list);
    };

    const handleAddMoreECommerce = () => {
        setECommerceList((prev) => [...prev, { nama: "", link: "" }]);
    };

    const handleSosmedInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { name, value } = e.target;
        const list = [...sosmedList];
        list[index][name] = value;
        setSosmedList(list);
    };

    const handleAddMoreSosmed = () => {
        setSosmedList((prev) => [...prev, { label: "", link: "" }]);
    };

    return (
        <Transition appear show={modalIndustri} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setModalIndustri(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-6xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold leading-6 text-gray-900"
                                >
                                    {t("createIndustry")}
                                    <button
                                        className="absolute top-4 right-4"
                                        onClick={() => setModalIndustri(false)}
                                    >
                                        <HiXMark className="inline-block w-5 h-5 ml-2" />
                                    </button>
                                </Dialog.Title>
                                <div className="flex gap-4 mt-2">
                                    <div className="w-1/2">
                                        <div className="flex flex-col gap-2 mb-4">
                                            <h2 className="text-xl font-semibold">
                                                {t("industryInformation")}
                                            </h2>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    {t("industryName")}{" "}
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
                                                        setIndustriBody({
                                                            ...industriBody,
                                                            nama: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    {t("desc")}{" "}
                                                    <span
                                                        className="text-red-500"
                                                        title="Wajib diisi"
                                                    >
                                                        *
                                                    </span>
                                                </div>
                                                <textarea
                                                    className="flex-col items-center justify-start h-32 px-5 py-5 border rounded-lg border-slate-200 active:border-slate-200"
                                                    onChange={(e) =>
                                                        setIndustriBody({
                                                            ...industriBody,
                                                            desc: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    {t("ownerName")}{" "}
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
                                                        setIndustriBody({
                                                            ...industriBody,
                                                            pemilik:
                                                                e.target.value
                                                        })
                                                    }
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
                                                        setIndustriBody({
                                                            ...industriBody,
                                                            kontak: e.target
                                                                .value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    {t("address")}{" "}
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
                                                        setIndustriBody({
                                                            ...industriBody,
                                                            alamat: e.target
                                                                .value
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <h2 className="text-xl font-semibold">
                                                {t("coordinate")}
                                            </h2>
                                            <div className="flex gap-4">
                                                <div className="flex flex-col w-full gap-2 h-fit">
                                                    <div className="w-full text-base font-normal leading-snug indent-1">
                                                        Latitude{" "}
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
                                                            setIndustriBody({
                                                                ...industriBody,
                                                                coordinate: {
                                                                    ...industriBody.coordinate,
                                                                    lat: e
                                                                        .target
                                                                        .value
                                                                }
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col w-full gap-2 h-fit">
                                                    <div className="w-full text-base font-normal leading-snug indent-1">
                                                        Longitude{" "}
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
                                                            setIndustriBody({
                                                                ...industriBody,
                                                                coordinate: {
                                                                    ...industriBody.coordinate,
                                                                    long: e
                                                                        .target
                                                                        .value
                                                                }
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                {t("image")}
                                            </h2>
                                            <div className="flex gap-4 mb-4">
                                                <input
                                                    type="file"
                                                    id="imageInput"
                                                    className="hidden"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                />
                                                {imagePreviews.map(
                                                    (preview, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative"
                                                        >
                                                            <img
                                                                src={preview}
                                                                alt={`Preview ${
                                                                    index + 1
                                                                }`}
                                                                className="w-24 h-24 rounded-md"
                                                            />
                                                            <button
                                                                className="absolute flex items-center justify-center w-5 h-5 p-0 text-red-500 bg-white rounded-full top-1 right-1"
                                                                onClick={() => {
                                                                    const updatedPreviews =
                                                                        [
                                                                            ...imagePreviews
                                                                        ];
                                                                    updatedPreviews.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                    setImagePreviews(
                                                                        updatedPreviews
                                                                    );
                                                                }}
                                                            >
                                                                <HiXCircle className="text-xl" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                                {imagePreviews.length < 3 && (
                                                    <button
                                                        className="flex items-center justify-center p-1 border-4 rounded-md border-disabled"
                                                        onClick={
                                                            handleImageClick
                                                        }
                                                    >
                                                        <HiPlus className="inline-block w-20 h-20 text-disabled" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                Toko Cabang
                                            </h2>
                                            <div>
                                                <div className="flex flex-col w-full gap-2 h-fit">
                                                    <div className="w-full text-base font-normal leading-snug indent-1">
                                                        Nama E-Commerce{" "}
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
                                                            setIndustriBody({
                                                                ...industriBody,
                                                                alamatCabang: [
                                                                    e.target
                                                                        .value
                                                                ]
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                {t("branchStores")}
                                            </h2>
                                            {cabangList.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col w-full gap-2 h-fit"
                                                >
                                                    <div className="w-full text-base font-normal leading-snug indent-1">
                                                        {t("branchAddress")}{" "}
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
                                                            handleCabangInputChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={handleAddMoreCabang}
                                                className="px-4 py-2 mt-4 text-sm font-medium text-white rounded-md bg-primary-500 hover:bg-primary-600"
                                            >
                                                {t("addBranch")}
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                Link E-Commerce
                                            </h2>
                                            {eCommerceList.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex flex-col w-full gap-2 h-fit">
                                                            <div className="w-full text-base font-normal leading-snug indent-1">
                                                                {t(
                                                                    "eCommerceName"
                                                                )}{" "}
                                                                <span
                                                                    className="text-red-500"
                                                                    title="Wajib diisi"
                                                                >
                                                                    *
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="nama"
                                                                defaultValue={
                                                                    item.nama
                                                                }
                                                                onChange={(e) =>
                                                                    handleECommerceInputChange(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                                className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col w-full gap-2 h-fit">
                                                            <div className="w-full text-base font-normal leading-snug indent-1">
                                                                Link{" "}
                                                                <span
                                                                    className="text-red-500"
                                                                    title="Wajib diisi"
                                                                >
                                                                    *
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="link"
                                                                defaultValue={
                                                                    item.link
                                                                }
                                                                onChange={(e) =>
                                                                    handleECommerceInputChange(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                                className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleAddMoreECommerce}
                                                className="px-4 py-2 mt-4 text-sm font-medium text-white rounded-md bg-primary-500 hover:bg-primary-600"
                                            >
                                                {t("addECommerce")}
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                {t("socialMedia")}
                                            </h2>
                                            {sosmedList.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex flex-col w-full gap-2 h-fit">
                                                        <div className="w-full text-base font-normal leading-snug indent-1">
                                                            {t(
                                                                "socialMediaName"
                                                            )}{" "}
                                                            <span
                                                                className="text-red-500"
                                                                title="Wajib diisi"
                                                            >
                                                                *
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="label"
                                                            defaultValue={
                                                                item.label
                                                            }
                                                            onChange={(e) =>
                                                                handleSosmedInputChange(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                            className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col w-full gap-2 h-fit">
                                                        <div className="w-full text-base font-normal leading-snug indent-1">
                                                            Link{" "}
                                                            <span
                                                                className="text-red-500"
                                                                title="Wajib diisi"
                                                            >
                                                                *
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="link"
                                                            defaultValue={
                                                                item.link
                                                            }
                                                            onChange={(e) =>
                                                                handleSosmedInputChange(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                            className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={handleAddMoreSosmed}
                                                className="px-4 py-2 mt-4 text-sm font-medium text-white rounded-md bg-primary-500 hover:bg-primary-600"
                                            >
                                                {t("addSocialMedia")}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        onClick={() => setModalIndustri(false)}
                                    >
                                        {t("cancel")}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                        onClick={() => handleSubmit()}
                                    >
                                        {t("createIndustry")}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
