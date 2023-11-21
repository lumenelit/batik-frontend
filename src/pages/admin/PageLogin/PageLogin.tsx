import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import logoVector from "../../../assets/images/Logo-vector.svg";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            navigate("/admin/industri");
        } else {
            alert("Username atau Password salah");
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            <img
                src={logoVector}
                alt="U"
                className="absolute w-full -translate-x-1/2 -bottom-20 left-1/2 -z-10"
            />
            <div>
                <div className="w-[385px] h-[588px] sm:w-[485px] sm:h-[688px] bg-[#dbdbdb] bg-opacity-50 px-[44px] py-[65px] rounded-2xl backdrop-filter backdrop-blur-lg">
                    <h1 className="text-[60px] font-bold">Hello!</h1>
                    <p className="font-medium text-[15px]">
                        Login with your Username and Password
                    </p>
                    <form
                        action="#"
                        className="login-input mt-[75px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col mb-3">
                            <input
                                type="username"
                                placeholder="Username"
                                name="username"
                                id="username"
                                className=" border-b py-4 px-1 border-[#7a7a7a] focus:outline-none focus:border-primary-500"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full">
                            <input
                                className="border-b border-[#7a7a7a] w-full py-4 px-1 focus:outline-none focus:border-primary-500 pr-16"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordShown ? "text" : "password"}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <button
                                    type="button"
                                    className="font-mono text-sm underline bg-gray-300 rounded cursor-pointer hover:bg-gray-400 js-password-label"
                                    onClick={togglePasswordVisiblity}
                                >
                                    {passwordShown ? (
                                        <HiEyeSlash className="text-2xl" />
                                    ) : (
                                        <HiEye className="text-2xl" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex justify-end items-center text-white w-[80px] h-[80px] mt-[40px] bg-primary-300 text-[20px] font-medium p-0 rounded-[20px] relative hover:w-full transition-all ease-in-out duration-300 shadow-primary-500 shadow-2xl"
                        >
                            <span className="w-full text-center">Login</span>
                            <i className="flex justify-center items-center fa-solid fa-arrow-right text-4xl text-white bg-primary-500 z-10 -ml-[80px] rounded-[20px] w-[80px] h-[80px] shadow-sm" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
