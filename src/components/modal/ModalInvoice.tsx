import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { HiOutlineCheckCircle, HiXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

type ModalInvoiceProps = {
    modalInvoice: boolean;
    setModalInvoice: React.Dispatch<React.SetStateAction<boolean>>;
    idPesanan: string;
};

export default function ModalInvoice({
    modalInvoice,
    setModalInvoice,
    idPesanan
}: ModalInvoiceProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Transition appear show={modalInvoice} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setModalInvoice(false)}
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
                            <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    <button
                                        className="absolute top-4 right-4"
                                        onClick={() => setModalInvoice(false)}
                                    >
                                        <HiXMark className="inline-block w-5 h-5 ml-2" />
                                    </button>
                                </Dialog.Title>
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center justify-center">
                                        <HiOutlineCheckCircle className="inline-block w-20 h-20 text-green-500" />
                                    </div>
                                    <div className="text-center text-dark">
                                        <h1 className="text-3xl font-semibold">
                                            {t("invoiceTitle")}
                                        </h1>
                                        <p>{t("invoiceSubtitle")}</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <button
                                            className="px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
                                            onClick={() =>
                                                navigate(
                                                    `/invoice/${idPesanan}`
                                                )
                                            }
                                        >
                                            {t("invoiceButton2")}
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-white border rounded-md text-dark hover:bg-white"
                                            onClick={() => navigate("/")}
                                        >
                                            {t("invoiceButton")}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
