import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

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
    return (
        <div
            className="w-[250px] h-[300px] p-4 bg-white rounded-xl shadow-primary flex-col justify-start items-start gap-2 inline-flex font-['Inter'] text-sm cursor-pointer hover:scale-105 transition-all"
            onClick={handleClickCard}
        >
            <img
                className="rounded-lg "
                src="https://via.placeholder.com/250x250"
                alt="motif"
            />

            <div className="flex flex-col justify-between w-full h-full">
                <div className="w-full font-semibold text-dark line-clamp-2">
                    {data.nama}
                </div>
                <div className="flex justify-between text-primary">
                    <span>{formatRupiah(data.harga)}</span>
                    <button
                        className="inline-block ml-2 text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <HiTrash className="inline-block w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
