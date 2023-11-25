import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { HiPlus, HiXCircle, HiXMark } from "react-icons/hi2";
import api from "../../config/api";

type ModalCreateMotifProps = {
    modalMotif: boolean;
    setModalMotif: React.Dispatch<React.SetStateAction<boolean>>;
    idIndustri: string;
};

type MotifBody = {
    idIndustri: string;
    idMotif: string;
    nama: string;
    harga: number;
    desc: string;
    image1: string;
    // image2: string;
    // image3: string;
};

export default function ModalCreateMotif({
    modalMotif,
    setModalMotif,
    idIndustri
}: ModalCreateMotifProps) {
    const [motifBody, setMotifBody] = useState({} as MotifBody);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleSubmit = async () => {
        const idMotif = Math.random().toString(36).substr(2, 9);
        const image1 = imagePreviews[0];
        const image2 = imagePreviews[1];
        const image3 = imagePreviews[2];

        // setMotifBody({
        //     ...motifBody,
        //     idMotif,
        //     idIndustri,
        //     image1,
        //     image2,
        //     image3
        // });
        const body = {
            ...motifBody,
            idMotif,
            idIndustri,
            image1
            // image2,
            // image3
        };

        console.log(motifBody);

        // if (
        //     image1 === undefined ||
        //     image2 === undefined ||
        //     image3 === undefined
        // ) {
        //     alert("Mohon upload 3 gambar");
        //     return;
        // }

        try {
            api.post("/motif", await body).then((res) => {
                console.log(res);
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
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

    return (
        <Transition appear show={modalMotif} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setModalMotif(false)}
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
                                    Buat Motif
                                    <button
                                        className="absolute top-4 right-4"
                                        onClick={() => setModalMotif(false)}
                                    >
                                        <HiXMark className="inline-block w-5 h-5 ml-2" />
                                    </button>
                                </Dialog.Title>
                                <div className="flex flex-col gap-4 mt-2">
                                    <div>
                                        <h2>Gambar</h2>
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
                                                            className="object-cover w-24 h-24 rounded-md"
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
                                                    onClick={handleImageClick}
                                                >
                                                    <HiPlus className="inline-block w-20 h-20 text-disabled" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-2 h-fit">
                                        <div className="w-full text-base font-normal leading-snug indent-1">
                                            Nama Motif{" "}
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
                                            placeholder="Batik Mewah Merdeka"
                                            onChange={(e) =>
                                                setMotifBody({
                                                    ...motifBody,
                                                    nama: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col w-full gap-2 h-fit">
                                        <div className="w-full text-base font-normal leading-snug indent-1">
                                            Harga{" "}
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
                                            placeholder="100.000"
                                            onChange={(e) =>
                                                setMotifBody({
                                                    ...motifBody,
                                                    harga: Number(
                                                        e.target.value
                                                    )
                                                })
                                            }
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
                                        <textarea
                                            className="flex-col items-center justify-start h-32 px-5 py-5 border rounded-lg border-slate-200 active:border-slate-200"
                                            placeholder="Batik terbaik di seluruh indonesia..."
                                            onChange={(e) =>
                                                setMotifBody({
                                                    ...motifBody,
                                                    desc: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        onClick={() => setModalMotif(false)}
                                    >
                                        Batalkan
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                        onClick={() => handleSubmit()}
                                    >
                                        Buat Motif
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
