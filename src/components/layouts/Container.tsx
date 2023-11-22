import bgLeft from "../../assets/images/bg-left.png";
import bgRight from "../../assets/images/bg-right.png";

export default function Container({ children, center = true }) {
    // return <div className='container max-w-5xl px-4 mx-auto'>{children}</div>;
    return (
        <>
            <div className="fixed z-0 w-full h-screen overflow-hidden">
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
            </div>
            <div
                className={`container px-4 ${center ? "mx-auto" : "mx-[5%]"} `}
            >
                {children}
            </div>
        </>
    );
}
