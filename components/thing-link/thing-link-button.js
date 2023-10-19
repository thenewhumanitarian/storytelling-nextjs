import { useEffect, useState } from 'react'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'; // Import useAnimation
import CloseIcon from '@components/icons/close';
import RichtextComponent from '@components/richText';

const ThingLinkButton = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false)

    const spring = {
        type: 'spring',
        stiffness: 200,
        damping: 20,
    }

    const pos = {
        x: data.xPosition,
        y: data.yPosition,
    };

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
                buttonSize = 'w-5 h-5 border-2';
                break;
            case 'Medium':
                buttonSize = 'w-10 h-10 border-2';
                break;
            case 'Large':
                buttonSize = 'w-20 h-20 border-4';
                break;
            default:
                buttonSize = 'w-10 h-10 border-2';
                break;
        }

        return buttonSize
    }

    const sizeClass = getSize(data.size)

    // Create animation controls
    const controls = useAnimation();

    // Define pulsating animation
    const pulseAnimation = {
        scale: [1, 1.05, 1], // Scale values for the pulse effect
        opacity: [0.9, 1, 0.9], // Opacity values for the pulse effect
        transition: {
            duration: 1.5, // Duration of each pulse cycle
            ease: 'easeInOut', // Easing function
            loop: Infinity, // Loop the animation infinitely
        },
    };

    // Start the pulsating animation when the component mounts
    useEffect(() => {
        controls.start(pulseAnimation);
    }, [controls]);

    return (
        <>
            <motion.span
                style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                }}
                // initial={{ opacity: 0, scale: 0.5 }}
                // enter={{ opacity: 1 }}
                animate={controls} // Use the animation controls
                whileHover={{ scale: 1.2, opacity: 1 }}
                className={`cursor-pointer absolute ${colClass} ${sizeClass} ${data.className} z-40 rounded-full shadow-3xl border-black`}
                transition={spring}
                onClick={() => {
                    setIsOpen(true)
                }}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        onClick={() => setIsOpen(false)}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        enter={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                        className={`fixed flex justify-center items-center top-0 left-0 w-full h-full bg-white z-50 fixed border-black border-2`}
                    >
                        <motion.div className={'pt-5 pl-5 pb-5 pr-16'}>
                            <RichtextComponent content={data.text.json} />
                        </motion.div>
                        <motion.div
                            className={'w-8 h-8 block absolute top-5 right-5 text-red-500 cursor-pointer'}
                            whileHover={{ scale: 1.2 }}
                            initial={{ rotate: '-40deg' }}
                            exit={{ rotate: '40deg', opacity: 0 }}
                            animate={{ rotate: 0 }}
                            transition={spring}
                            onClick={() => setIsOpen(false)}
                        >
                            <CloseIcon />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThingLinkButton;
