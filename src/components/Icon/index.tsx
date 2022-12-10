import React from "react";

import "./index.scss";

interface ButtonProps {
    callback: () => void;
    src: string;
    alt: string;
    className?: string;
}

const Icon: React.FC<ButtonProps> = ({
    callback,
    src,
    alt,
    className = ""
}) => {
    return (
        <button
            className={`Icon ${className}`}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={callback}
        >
            <img src={src} alt={alt} />
        </button>
    );
};

export default Icon;
