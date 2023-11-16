import React from "react";

export default function Container({ children, center = true }) {
    // return <div className='container px-4 mx-auto max-w-5xl'>{children}</div>;
    if (!center) {
        return <div className="px-4 mx-[5%]">{children}</div>;
    } else {
        return <div className="container px-4 mx-auto">{children}</div>;
    }
}
