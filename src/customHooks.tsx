import blibli from "./assets/images/icon-blibli.png";
import bukalapak from "./assets/images/icon-bukalapak.png";
import shopee from "./assets/images/icon-shopee.png";
import lazada from "./assets/images/icon-lazada.png";
import tokopedia from "./assets/images/icon-tokopedia.png";

export function showSosmedLogo(name: string) {
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseName === "facebook")
        return <i className="text-lg fab fa-facebook-f"></i>;
    if (lowerCaseName === "instagram")
        return <i className="text-lg fab fa-instagram"></i>;
    if (lowerCaseName === "whatsapp")
        return <i className="text-lg fab fa-whatsapp"></i>;
    if (lowerCaseName === "twitter")
        return <i className="text-lg fab fa-twitter"></i>;
    if (lowerCaseName === "pinterest")
        return <i className="text-lg fab fa-pinterest"></i>;
    if (lowerCaseName === "website")
        return <i className="text-lg fas fa-globe"></i>;
}

export function showShopLogo(eCommerce: string) {
    const lowerCase = eCommerce.toLowerCase();

    if (lowerCase === "tokopedia")
        return <img className="h-6 bg-auto" src={tokopedia} />;
    if (lowerCase === "bukalapak")
        return <img className="h-6 bg-auto" src={bukalapak} />;
    if (lowerCase === "shopee")
        return <img className="h-6 bg-auto" src={shopee} />;
    if (lowerCase === "lazada")
        return <img className="h-6 bg-auto" src={lazada} />;
    if (lowerCase === "blibli")
        return <img className="h-6 bg-auto" src={blibli} />;

    return eCommerce;
}
