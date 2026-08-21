import React, { useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const Background = ({
    rows = 16,
    cols = 30,
    cellSize = 64
}) => {
    const [clickedCell, setClickedCell] = useState(null);
    const [rippleKey, setRippleKey] = useState(0);
    const ref = useRef(null);

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 h-full w-full",
                "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
                "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"
            )}>
            <div className="relative h-full w-full overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
                <DivGrid
                    key={`base-${rippleKey}`}
                    className="hero-grid-fade"
                    rows={rows}
                    cols={cols}
                    cellSize={cellSize}
                    borderColor="var(--cell-border-color)"
                    fillColor="var(--cell-fill-color)"
                    clickedCell={clickedCell}
                    onCellClick={(row, col) => {
                        setClickedCell({ row, col });
                        setRippleKey((k) => k + 1);
                    }}
                    interactive />
            </div>
        </div>
    );
};

const DivGrid = ({
    className,
    rows = 7,
    cols = 30,
    cellSize = 56,
    borderColor = "#3f3f46",
    fillColor = "rgba(14,165,233,0.3)",
    clickedCell = null,
    onCellClick = () => { },
    interactive = true
}) => {
    const cells = useMemo(() => Array.from({ length: rows * cols }, (_, idx) => idx), [rows, cols]);

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
        // Centre the fixed-size grid over the hero; it is intentionally larger
        // than the viewport so the cells run past every edge instead of
        // stopping in a visible straight line.
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    return (
        <div className={cn("relative z-[3]", className)} style={gridStyle}>
            {cells.map((idx) => {
                const rowIdx = Math.floor(idx / cols);
                const colIdx = idx % cols;
                const distance = clickedCell
                    ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
                    : 0;
                const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
                const duration = 200 + distance * 80; // ms

                const style = clickedCell
                    ? {
                        "--delay": `${delay}ms`,
                        "--duration": `${duration}ms`,
                    }
                    : {};

                return (
                    <div
                        key={idx}
                        className={cn(
                            "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
                            clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
                            !interactive && "pointer-events-none"
                        )}
                        style={{
                            backgroundColor: fillColor,
                            borderColor: borderColor,
                            ...style,
                        }}
                        onClick={
                            interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
                        } />
                );
            })}
        </div>
    );
};
