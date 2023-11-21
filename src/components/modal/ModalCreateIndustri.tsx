import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiPlus, HiXMark } from "react-icons/hi2";

type ModalCreateIndustriProps = {
    modalIndustri: boolean;
    setModalIndustri: (modalIndustri: boolean) => void;
};

export default function ModalCreateIndustri({
    modalIndustri,
    setModalIndustri
}: ModalCreateIndustriProps) {
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
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Buat Industri
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
                                                Informasi Industri
                                            </h2>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    Nama Industri{" "}
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
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    Deskripsi{" "}
                                                    <span
                                                        className="text-red-500"
                                                        title="Wajib diisi"
                                                    >
                                                        *
                                                    </span>
                                                </div>
                                                <textarea className="flex-col items-center justify-start h-32 px-5 py-5 border rounded-lg border-slate-200 active:border-slate-200" />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    Nama Pemilik{" "}
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
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    Kontak
                                                    {
                                                        "(No. telp, Whatsapp, Email) "
                                                    }
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
                                                />
                                            </div>
                                            <div className="flex flex-col w-full gap-2 h-fit">
                                                <div className="w-full text-base font-normal leading-snug indent-1">
                                                    Alamat{" "}
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
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <h2 className="text-xl font-semibold">
                                                Kordinat Industri
                                            </h2>
                                            <div className="flex gap-4">
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
                                                    />
                                                </div>
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
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                Gambar
                                            </h2>
                                            <div className="flex gap-4 mb-4">
                                                <button className="flex items-center justify-center p-1 border-4 rounded-md border-disabled">
                                                    <HiPlus className="inline-block w-20 h-20 text-disabled" />
                                                </button>
                                                <button className="flex items-center justify-center p-1 border-4 rounded-md border-disabled">
                                                    <HiPlus className="inline-block w-20 h-20 text-disabled" />
                                                </button>
                                                <button className="flex items-center justify-center p-1 border-4 rounded-md border-disabled">
                                                    <HiPlus className="inline-block w-20 h-20 text-disabled" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
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
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                Link E-Commerce
                                            </h2>
                                            <div className="flex gap-4">
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
                                                        className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold">
                                                Social Media
                                            </h2>
                                            <div className="flex gap-4">
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
                                                        className="flex-col px-5 h-[50px] rounded-lg border border-slate-200 justify-start items-center active:border-slate-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        onClick={() => setModalIndustri(false)}
                                    >
                                        Batalkan
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                        onClick={() => setModalIndustri(false)}
                                    >
                                        Buat Industri
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
