/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            backgroundImage: {
                "button-gradient":
                    "linear-gradient(90deg, rgba(54,110,216,1) 0%, rgba(39,74,140,1) 100%);",
                "danger-gradient":
                    "linear-gradient(90deg, #F52323 0%, #B81A1A 100%);",
                "summer-gradient":
                    "linear-gradient(90deg, #F7B733 0%, #FC4A1A 100%);",
                "angular-white":
                    "conic-gradient(from 200deg at 50% 50%, rgba(249, 249, 249, 1) 0%, rgba(255, 255, 255, 1) 100%);",
                "landing-background": "url('./assets/images/bg-55.jpg')"
            },
            colors: {
                primary: {
                    100: "#D17562",
                    200: "#C16B5A",
                    300: "#B16152",
                    400: "#A1574A",
                    500: "#A25B4C",
                    600: "#8A4E40",
                    700: "#6E3F32",
                    800: "#5C3529",
                    900: "#4A2B20"
                },
                danger: "#FF1616",
                success: "#10D00C",
                warning: "#FFBF00",
                disabled: "#D0D0D0",
                stroke: "#F0F4F8",
                dark: "#231010"
            },
            fontFamily: {
                sans: ["Montserrat", "sans-serif"],
                poppins: ["Poppins", "sans-serif"]
            },
            boxShadow: {
                primary: "0px 5px 10px 0px rgba(0, 0, 0, 0.10);"
            }
        }
    },
    plugins: []
};
