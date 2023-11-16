import { Link } from "react-router-dom";

export default function PageLanding() {
    return (
        <div className="h-screen p-5 bg-cover bg-landing-background">
            <h1 className="text-2xl font-bold text-white">Ma'kaaruyen</h1>
            <div className="absolute flex flex-col items-center justify-center w-full text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <h1 className="text-4xl md:text-[96px] md:leading-none font-bold text-white mb-5">
                    Discover Batik, Unveil Your Style.
                </h1>
                <p className="mb-5 text-xl font-semibold text-white md:text-4xl">
                    Batik fashion, your gateway to self-discovery.
                </p>
                <Link
                    to="/home"
                    className="px-5 py-2 font-bold text-white rounded-lg bg-primary-500"
                >
                    Kunjungi Peta
                </Link>
            </div>
        </div>
    );
}