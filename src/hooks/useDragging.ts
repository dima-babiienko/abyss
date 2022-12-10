import React, { useCallback, useMemo, useState } from "react";
import { Position } from "../types";

export const useDragging = () => {
    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [clickPosition, setClickPosition] = useState<Position>({
        x: 0,
        y: 0
    });

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            setClickPosition({
                x: event.clientX,
                y: event.clientY
            });
            setDragging(true);
        },
        []
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const x = e.clientX - clickPosition.x + position.x;
            const y = e.clientY - clickPosition.y + position.y;

            setPosition({ x, y });
        },
        [clickPosition]
    );

    return useMemo(
        () => ({
            dragging,
            position,
            setPosition,
            handleMouseUp,
            handleMouseDown,
            handleMouseMove
        }),
        [
            dragging,
            position,
            setPosition,
            handleMouseUp,
            handleMouseDown,
            handleMouseMove
        ]
    );
};
