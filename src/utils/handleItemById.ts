import { childElement } from "../constants/childElement";
import { TreeChildType } from "../types";

export const handleItemById = (
    action: string,
    id: string,
    node: TreeChildType,
    text?: string
) => {
    const idList = id.split("-");
    const parentId = idList.slice(0, idList.length - 1);
    let child = node;
    let currentKey = "";

    (action === "ADD" ? idList : parentId).forEach((idItem: string) => {
        currentKey += currentKey ? `-${idItem}` : idItem;
        child = child[currentKey].children;
    });
    switch (action) {
        case "ADD": {
            child[`${id}-${Object.keys(child).length}`] = {
                ...childElement,
                children: {}
            };
            break;
        }
        case "DELETE": {
            delete child[id];
            break;
        }
        case "EDIT": {
            child[id].text = text || "";
            break;
        }
        default: {
            return child;
        }
    }
};
