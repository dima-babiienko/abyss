export interface Child<C> {
    text: string;
    type: string;
    isDefaultChild: boolean;
    parentId?: string;
    children: C;
}

export interface TreeChildType {
    [key: string]: Child<TreeChildType>;
}

export interface Position {
    x: number;
    y: number;
}
