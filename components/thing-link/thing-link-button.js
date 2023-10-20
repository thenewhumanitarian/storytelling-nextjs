import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'; // Import useAnimation
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

    const getBorder = (colour) => {
        let col = ''

        switch (colour) {
            case 'Burgundy':
                col = 'border-burgundy';
                break;
            case 'Green':
                col = 'border-green-400';
                break;
            case 'Blue':
                col = 'border-blue-400';
                break;
            case 'Black':
                col = 'border-black';
                break;
            case 'White':
                col = 'border-white';
                break;
            case 'Orange':
                col = 'border-orange-400';
                break;
            default:
                col = 'border-burgundy';
                break;
        }

        return col
    }

    const borderClass = getBorder(data.borderColour);

    const getSize = (size) => {
        let buttonSize = ''

        switch (size) {
            case 'Tiny':
                buttonSize = '-ml-1 -mt-1 w-2 h-2 border';
                break;
            case 'Small':
                buttonSize = '-ml-2 -mt-2 w-4 h-4 border-2';
                break;
            case 'Medium':
                buttonSize = '-ml-5 -mt-5 w-10 h-10 border-2';
                break;
            case 'Large':
                buttonSize = '-ml-10 -mt-10 w-20 h-20 border-4';
                break;
            case 'Massive':
                buttonSize = '-ml-16 -mt-16 w-32 h-32 border-5';
                break;
            default:
                buttonSize = '-ml-2 -m-t-2 w-4 h-4 border-2';
                break;
        }

        return buttonSize
    }

    const sizeClass = getSize(data.size)

    return (
        <>
            <motion.span
                style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                }}
                animate={{
                    scale: [0.75, 1.5, 0.75], // Scale values for the pulsating effect
                    // opacity: [0.5, 1, 0.5], // Opacity values for the pulsating effect
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                whileHover={{ scale: 2, opacity: 1 }}
                className={`cursor-pointer absolute ${colClass} ${borderClass} ${sizeClass} ${data.className} z-40 rounded-full shadow-3xl`}
                onClick={() => {
                    setIsOpen(true)
                }}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        exit={{ background: 'transparent' }}
                        animate={{ background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent' }}
                        className={`flex w-full h-full ${isOpen ? 'bg-white bg-opacity-50' : 'bg-transparent'} flex items-center justify-center`}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            enter={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={spring}
                            className={`absolute w-auto max-w-xl h-auto bg-white z-50 fixed border-black border-2 max-h-full overflow-y-auto`}
                        >
                            <motion.div className={'pt-5 pl-5 pb-5 pr-5 sm:pr-10'}>
                                <RichtextComponent content={data.text.json} />
                            </motion.div>
                            <motion.div
                                className={'w-6 h-6 sm:w-6 sm:h-6 block absolute top-2 sm:top-3 right-2 text-red-500 cursor-pointer z-50'}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThingLinkButton;
