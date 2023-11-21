import { useNavigate } from "react-router-dom";

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

export default function MotifCard({ data }) {
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

            <div className="flex flex-col justify-between h-full">
                <div className="w-full font-semibold text-dark line-clamp-2">
                    {data.nama}
                </div>
                <div className="text-primary">{formatRupiah(data.harga)}</div>
            </div>
        </div>
    );
}
