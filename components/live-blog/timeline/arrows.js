import { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export default function Arrow({ children, disabled, onClick }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={'bg-gray-300 px-2 h-full transition-opacity'}
            style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                right: "1%",
                opacity: disabled ? "0" : "1",
                userSelect: "none",
                zIndex: 500
            }}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        useContext(VisibilityContext);

    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            ←
        </Arrow>
    )
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
            →
        </Arrow>
    )
}