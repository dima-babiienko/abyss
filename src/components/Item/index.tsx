import React, { useCallback, useEffect, useState } from "react";

import Icon from "../Icon";
import addIcon from "../../assets/images/plus.png";
import deleteIcon from "../../assets/images/close.png";
import editIcon from "../../assets/images/pen.png";
import saveIcon from "../../assets/images/check.png";

import "./index.scss";

interface ItemProps {
    text: string;
    addItem: () => void;
    deleteItem: () => void;
    isDefaultChild: boolean;
    onChange: (value: string) => void;
}

const Item: React.FC<ItemProps> = ({
    text,
    onChange,
    addItem,
    deleteItem,
    isDefaultChild
}) => {
    const [itemName, setItemName] = useState<string>(text);
    const [isEdit, setIsEdit] = useState(!isDefaultChild);
    const [isAddItemClicked, setIsAddItemClicked] = useState(false);

    const renderAddIcon = (isAddItemClicked || isDefaultChild) && !isEdit;
    const renderEditIcon = !isEdit && !isDefaultChild && isAddItemClicked;
    const renderSaveIcon = (!isDefaultChild && !isAddItemClicked) || isEdit;

    const handleSaveItem = useCallback(() => {
        if (itemName) {
            setIsAddItemClicked(true);
            setIsEdit(false);
            onChange(itemName);
        }
    }, [itemName]);

    const handleEditItem = useCallback(() => {
        if (text) {
            setIsEdit(true);
        }
    }, [text]);

    const handleCancelEditItem = useCallback(() => {
        setIsAddItemClicked(true);
        setIsEdit(false);
    }, [itemName]);

    useEffect(() => {
        if (isEdit) {
            setItemName(text);
        }
    }, [isEdit, text]);

    return (
        <div className={`Item ${isDefaultChild ? "IsDefaultChild" : ""}`}>
            <div className={`ItemBlock ${isEdit ? "ItemBlock-Edit" : ""}`}>
                {isEdit && !isDefaultChild ? (
                    <input
                        autoFocus
                        placeholder="Category name"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                    />
                ) : (
                    <div className="ItemBlock-Name">{text}</div>
                )}
            </div>
            <div className="ActionBlock">
                {renderAddIcon && (
                    <Icon callback={addItem} src={addIcon} alt="add" />
                )}
                {renderEditIcon && (
                    <Icon callback={handleEditItem} src={editIcon} alt="edit" />
                )}
                {!isDefaultChild && (
                    <Icon
                        callback={
                            isEdit && text ? handleCancelEditItem : deleteItem
                        }
                        src={deleteIcon}
                        alt="delete"
                        className={`ActionBlock-Delete ${
                            isEdit && "ActionBlock-Delete__EditMode"
                        }`}
                    />
                )}
                {renderSaveIcon && (
                    <Icon
                        callback={handleSaveItem}
                        src={saveIcon}
                        alt="save"
                        className="ActionBlock-Save"
                    />
                )}
            </div>
        </div>
    );
};

export default Item;
