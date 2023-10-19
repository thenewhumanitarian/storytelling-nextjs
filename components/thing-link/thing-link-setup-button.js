import { useState } from 'react';

import { motion, useDragControls } from 'framer-motion'; // Import useAnimation

const ThingLinkSetupButton = ({ data, onUpdatePosition, containerRef }) => {
    const [hasDragged, setHasDragged] = useState(false); // State to track if the button has been dragged

    const controls = useDragControls(); // Initialize drag controls

    const onDragEnd = (event, info) => {
        if (!containerRef.current) return;

        console.log

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Calculate the new position within the container
        const newX = (info.point.x - containerRect.left) / containerWidth * 100;
        const newY = (info.point.y - containerRect.top) / containerHeight * 100;

        // Reset the transform property to its default value
        event.target.style.transform = '';

        // Update the position in the parent component
        onUpdatePosition(data.id, newX, newY);
    }

    return (
        <motion.div
            key={`draggable-thing-link-button-${data.id}`}
            style={{
                // left: hasDragged ? null : `${data.xPosition}%`,
                // top: hasDragged ? null : `${data.yPosition}%`,
                // transform: 'none', // Reset the transform property to its default value
                transform: hasDragged ? null : `translate(${data.xPosition}%, ${data.yPosition}%)`,
            }}
            className={`origin-center cursor-pointer absolute bg-red-500 bg-opacity-70 -left-5 -top-5 rounded-full w-10 h-10 ${data.className} flex justify-center items-center z-50 shadow-2xl border-white border`}
            drag
            dragConstraints={containerRef}
            onClick={() => { setHasDragged(true) }}
            dragElastic={0} // Add some elasticity for a smoother drag
            dragControls={controls} // Use drag controls
            onDragEnd={onDragEnd}
        // onDrag={() => {setHasDragged(true)}}
        >
            <span className={'font-bold m-0 p-0 pb-1 text-xl'}>⌖</span>
            <span className={'absolute left-11'}>{data.id}</span>
        </motion.div>
    )
}

export default ThingLinkSetupButton;
