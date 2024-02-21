import { useEffect, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import logoVector from "../../../assets/images/Logo-vector.svg";
import bg from "../../../assets/images/bg-simple.png";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";

export default function PageLogin() {
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

    useEffect(() => {
        if (username === "" || password === "") {
            setIsPasswordEmpty(true);
        } else {
            setIsPasswordEmpty(false);
        }
    }, [username, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/admin/login", {
                username,
                password
            });
            console.log(response.data);

            if (response.data.status === false) {
                alert("Username atau Password salah");
            } else {
                navigate("/admin/industri");
            }
        } catch (error) {
            // console.log(error);
            if (error.response.status === 404) {
                alert("Username atau Password salah");
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden bg-cover bg-landing-background">
            {/* <img
                src={bg}
                alt="U"
                className="absolute w-full -translate-x-1/2 bg-cover -bottom-20 left-1/2 -z-10"
            /> */}
            <div>
                <div className="w-[385px] h-fit sm:w-[485px]  bg-white bg-opacity-70 px-[44px] py-[65px] rounded-2xl backdrop-filter backdrop-blur-lg shadow-xl">
                    <img src="/Logo.svg" />
                    <h1 className="text-[60px] custom-font">Hello!</h1>
                    <p className="font-medium text-[15px]">
                        Login with your Username and Password
                    </p>
                    <form
                        action="#"
                        className="flex flex-col gap-4 mt-10 login-input"
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
                                    className="font-mono text-sm underline bg-gray-100 rounded cursor-pointer hover:bg-gray-200 js-password-label"
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
                        <div className="flex flex-row opacity-80">
                            <p className="inline text-red-500">*</p>
                            <p className="block ml-1 text-sm">
                                Login dengan password minimal 6 karakter,
                                kombinasi huruf dan angka. Hindari karakter
                                khusus, spasi, atau informasi pribadi. Gunakan
                                password yang tidak mudah ditebak dan belum
                                pernah digunakan sebelumnya untuk keamanan
                                maksimal.
                            </p>
                        </div>
                        {/* <button
                            type="submit"
                            disabled={isPasswordEmpty}
                            className={`flex justify-end items-center text-white w-[80px] h-[60px] mt-[25px] ${
                                isPasswordEmpty
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-primary-300 "
                            }  text-[20px] font-medium hover:w-full p-0 rounded-[20px] relative  transition-all ease-in-out duration-300 shadow-primary-500 shadow-2xl`}
                        >
                            <span className="w-full text-center">Login</span>
                            <i
                                className={`flex justify-center items-center fa-solid fa-arrow-right text-2xl text-white ${
                                    isPasswordEmpty
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-primary-500 hover:w-full"
                                }  z-10 -ml-[80px] rounded-[20px] w-[80px] h-[60px] shadow-sm`}
                            />
                        </button> */}
                        <button
                            type="submit"
                            disabled={isPasswordEmpty}
                            className={`flex justify-end  py-1.5 px-6 w-fit self-end
                        text-lg text-center font-medium p-0 rounded-[20px] relative  transition-all ease-in-out duration-300 shadow-primary-500 shadow-2xl 
                        ${
                            isPasswordEmpty
                                ? "bg-gray-200 cursor-not-allowed text-primary-300 ring-primary-300 ring-2"
                                : "bg-primary-300 text-white"
                        }`}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
