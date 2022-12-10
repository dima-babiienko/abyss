import React from "react";
import arrow from "../../assets/images/arrow.png";

import "./index.scss";

interface HeaderProps {
    className: string;
    onClick: () => void;
}

const Arrow: React.FC<HeaderProps> = ({ className, onClick }) => {
    return (
        <div onClick={onClick} className={`Arrow ${className}`}>
            <img src={arrow} alt="arrow" />
        </div>
    );
};

export default Arrow;
