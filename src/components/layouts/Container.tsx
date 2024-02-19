// import bgLeft from "../../assets/images/bg-left.png";
// import bgRight from "../../assets/images/bg-right.png";
import bgSimple from "../../assets/images/bg-simple.png";

export default function Container({ children, center = true }) {
    // return <div className='container max-w-5xl px-4 mx-auto'>{children}</div>;
    return (
        <>
            {/* <div className="fixed z-0 w-full h-screen overflow-hidden">
                <img
                    src={bgLeft}
                    alt="bg"
                    className="absolute bottom-0 left-0"
                />
                <img
                    src={bgRight}
                    alt="bg"
                    className="absolute top-0 right-0"
                />
            </div> */}
            <div className="fixed z-0 w-full h-screen overflow-hidden">
                <img
                    src={bgSimple}
                    alt="bg"
                    className="absolute h-screen w-screen"
                />
            </div>
            <div
                className={`container px-4 ${center ? "mx-auto" : "mx-[5%]"} `}
            >
                {children}
            </div>
        </>
    );
}
