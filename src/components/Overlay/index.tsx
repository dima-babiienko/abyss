import React, {
    FC,
    MutableRefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState
} from "react";
import { flushSync } from "react-dom";

import Item from "../Item";
import Header from "../Header";
import Arrow from "../Arrow";
import { useDragging } from "../../hooks/useDragging";
import { handleItemById } from "../../utils/handleItemById";
import { defaultElement } from "../../constants/childElement";
import { Position, TreeChildType } from "../../types";
import { ITEM_ACTION } from "../../constants/itemAction";

import "./index.scss";

interface OverlayProps {
    overlayRef: MutableRefObject<HTMLDivElement | null>;
}

const Overlay: FC<OverlayProps> = ({ overlayRef }) => {
    const [treeData, setTreeData] = useState<TreeChildType>(defaultElement);
    const [isCentering, setIsCentering] = useState<boolean>(false);

    const {
        dragging,
        position,
        setPosition,
        handleMouseUp,
        handleMouseDown,
        handleMouseMove
    } = useDragging();

    const handleItemClick = useCallback(
        (action: ITEM_ACTION, parent: string, text?: string) => {
            setTreeData((prevState) => {
                const updatedTree = { ...prevState };
                handleItemById(action, parent, updatedTree, text);
                return updatedTree;
            });
        },
        []
    );

    const renderTree = (children: TreeChildType) => {
        return Object.keys(children).map((key) => {
            const item = children[key];
            const childrenCount = Object.keys(item.children).length;
            return (
                <div
                    className={`Parent ${
                        childrenCount <= 1 ? "RemoveHorizontalLine" : ""
                    }`}
                    key={key}
                >
                    <div className="HorizontalLine" />
                    <div className="VerticalLine" />
                    <Item
                        isDefaultChild={item.isDefaultChild}
                        text={item.text}
                        addItem={() => handleItemClick(ITEM_ACTION.ADD, key)}
                        deleteItem={() =>
                            handleItemClick(ITEM_ACTION.DELETE, key)
                        }
                        onChange={(value) =>
                            handleItemClick(ITEM_ACTION.EDIT, key, value)
                        }
                    />
                    <div className="Children-Container">
                        {childrenCount > 1 && <div className="VerticalLine" />}
                        <div className="Children">
                            {childrenCount ? renderTree(item.children) : null}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleCenterLayout = useCallback(() => {
        flushSync(() => {
            setIsCentering(true);
        });
        if (overlayRef.current) {
            setPosition({
                x: window.innerWidth / 2 - overlayRef.current.clientWidth / 2,
                y: window.innerHeight / 2 - overlayRef.current.clientHeight / 2
            });
        }
        setTimeout(() => {
            setIsCentering(false);
        }, 300);
    }, [setPosition]);

    const handleArrowClick = useCallback(
        (coordinate: keyof Position, value: number) => {
            flushSync(() => {
                setIsCentering(true);
            });

            setPosition((prevPosition) => {
                const updatedPosition = { ...prevPosition };
                updatedPosition[coordinate] += value;

                return updatedPosition;
            });

            setTimeout(() => {
                setIsCentering(false);
            }, 300);
        },
        []
    );

    useLayoutEffect(() => {
        if (overlayRef.current) {
            setPosition({
                x: window.innerWidth / 2 - overlayRef.current.clientWidth / 2,
                y: 200
            });
        }
    }, []);

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
    }, [dragging]);
    return (
        <div className="Overlay-Container">
            <Header
                overlayRef={overlayRef}
                onCenterLayout={handleCenterLayout}
            />
            <Arrow
                onClick={() => handleArrowClick("y", 30)}
                className="Arrow-Top"
            />
            <Arrow
                onClick={() => handleArrowClick("x", -30)}
                className="Arrow-Right"
            />
            <Arrow
                onClick={() => handleArrowClick("y", -30)}
                className="Arrow-Bottom"
            />
            <Arrow
                onClick={() => handleArrowClick("x", 30)}
                className="Arrow-Left"
            />
            <div
                className={`Overlay ${isCentering ? "Overlay-Centered" : ""}`}
                ref={overlayRef}
                style={{
                    top: position.y,
                    left: position.x,
                    transform: "scale(1.0)"
                }}
                onMouseDown={handleMouseDown}
            >
                {renderTree(treeData)}
            </div>
        </div>
    );
};

export default Overlay;
