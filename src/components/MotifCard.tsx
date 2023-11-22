import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

type MotifCardProps = {
    data: any;
    haveDelete?: boolean;
};

export default function MotifCard({ data, haveDelete = false }) {
    const navigate = useNavigate();

    const handleClickCard = () => {
        console.log("clicked");
        navigate(`../motif/${data.idMotif}`);
    };

    const handleDelete = () => {
        api.delete(`/motif/${data.idMotif}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            className="min-w-[250px] w-full h-[300px] object-cover p-4 bg-white rounded-xl shadow-primary col-2 flex-col justify-start items-start gap-2 inline-flex font-['Inter'] text-sm cursor-pointer hover:scale-105 transition-all flex-1"
            onClick={handleClickCard}
        >
            <img
                className="object-cover w-full rounded-lg min-h-[200px]"
                src={
                    data.image1
                        ? data.image1
                        : "https://via.placeholder.com/250x250"
                }
                alt="motif"
            />

            <div className="flex flex-col w-full h-full">
                <div className="w-full text-xl font-semibold text-dark line-clamp-2">
                    {data.nama}
                </div>
                <div className="flex justify-between text-primary">
                    <span>{formatRupiah(data.harga)}</span>
                    <button
                        className="inline-block ml-2 text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        {haveDelete && (
                            <HiTrash className="inline-block w-5 h-5 ml-2" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
