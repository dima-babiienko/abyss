import React, { MutableRefObject, useCallback, useState } from "react";
import navigator from "../../assets/images/navigator.png";
import { SCALE_STEP } from "../../constants/common";

import "./index.scss";

const scaleOptions = Array.from({ length: 20 }).map(
    (_, index) => (index + 1) * 10
);

interface HeaderProps {
    overlayRef: MutableRefObject<HTMLDivElement | null>;
    onCenterLayout: () => void;
}

const Header: React.FC<HeaderProps> = ({ overlayRef, onCenterLayout }) => {
    const [selectValue, setSelectValue] = useState(100);
    const handleZoomOut = useCallback(() => {
        if (overlayRef.current) {
            const currentTransform = overlayRef.current.style.transform;
            const scale = +currentTransform.slice(
                currentTransform.indexOf("(") + 1,
                currentTransform.indexOf(")")
            );

            const updatedScale =
                scale - SCALE_STEP > 0 ? scale - SCALE_STEP : scale;
            setSelectValue(Math.round(updatedScale * 100));
            overlayRef.current.style.transform = `scale(${updatedScale})`;
        }
    }, []);

    const handleZoomIn = useCallback(() => {
        if (overlayRef.current) {
            const currentTransform = overlayRef.current.style.transform;
            const scale = +currentTransform.slice(
                currentTransform.indexOf("(") + 1,
                currentTransform.indexOf(")")
            );

            const updatedScale =
                scale + SCALE_STEP < 3 ? scale + SCALE_STEP : scale;
            setSelectValue(Math.round(updatedScale * 100));
            overlayRef.current.style.transform = `scale(${updatedScale})`;
        }
    }, []);

    const handleZoomSelect = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            if (overlayRef.current) {
                const updatedScale = Number(event.target.value) / 100;
                // eslint-disable-next-line no-param-reassign
                overlayRef.current.style.transform = `scale(${updatedScale})`;
                setSelectValue(Number(event.target.value));
            }
        },
        []
    );

    return (
        <div className="Header">
            <div>Services</div>
            <div className="Header-BoxContainer">
                <div
                    className="Header-Box Header-Box__CenterOverlay"
                    onClick={onCenterLayout}
                >
                    <img src={navigator} alt="navigator" />
                </div>
                <div
                    className="Header-Box Header-Box__ZooOut"
                    onClick={handleZoomOut}
                >
                    -
                </div>
                <div className="Header-Box Header-Box__Select">
                    <select value={selectValue} onChange={handleZoomSelect}>
                        {scaleOptions.map((scaleOption) => (
                            <option key={scaleOption} value={scaleOption}>
                                {scaleOption}%
                            </option>
                        ))}
                    </select>{" "}
                </div>
                <div
                    className="Header-Box Header-Box__ZoomIn"
                    onClick={handleZoomIn}
                >
                    +
                </div>
            </div>
        </div>
    );
};

export default Header;
