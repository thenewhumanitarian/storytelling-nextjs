import { motion, useDragControls } from 'framer-motion'; // Import useAnimation

const ThingLinkSetupButton = ({ data, onUpdatePosition, containerRef }) => {
    const controls = useDragControls(); // Initialize drag controls

    const pos = {
        x: data.xPosition,
        y: data.yPosition,
    }

    const getBackground = (colour) => {
        let col = ''

        switch (colour) {
            case 'Burgundy':
                col = 'bg-burgundy';
                break;
            case 'Green':
                col = 'bg-green-400';
                break;
            case 'Blue':
                col = 'bg-blue-400';
                break;
            case 'Black':
                col = 'bg-black';
                break;
            case 'White':
                col = 'bg-white';
                break;
            case 'Orange':
                col = 'bg-orange-400';
                break;
            default:
                col = 'bg-burgundy';
                break;
        }

        return col
    }

    const colClass = getBackground(data.colour);

    const getSize = (size) => {
        let buttonSize = ''

        switch (size) {
            case 'Small':
                buttonSize = 'w-5 h-5';
                break;
            case 'Medium':
                buttonSize = 'w-10 h-10';
                break;
            case 'Large':
                buttonSize = 'w-20 h-20';
                break;
            default:
                buttonSize = 'w-10 h-10';
                break;
        }

        return buttonSize
    }

    const sizeClass = getSize(data.size)

    const onDragEnd = (event, info) => {
        if (!containerRef.current) return;

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
    };

    return (
        <motion.div
            style={{
                left: `${data.xPosition}%`,
                top: `${data.yPosition}%`,
                zIndex: 9999,
                transform: 'none', // Reset the transform property to its default value
            }}
            className={`cursor-pointer absolute ${colClass} ${sizeClass} ${data.className} z-40 rounded-full shadow-2xl border-white border-4 transform-none`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2} // Add some elasticity for a smoother drag
            dragControls={controls} // Use drag controls
            onDragEnd={onDragEnd}
        />
    );
};

export default ThingLinkSetupButton;
