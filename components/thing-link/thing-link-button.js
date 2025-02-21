import { useRef, useState, useEffect } from 'react'

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion'; // Import useAnimation
import CloseIcon from '@components/icons/close';
import RichtextComponent from '@components/richText';

const ThingLinkButton = ({ data, allData, index }) => {


  const [isOpen, setIsOpen] = useState(false)

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

  const borderClass = getBorder(data.borderColor);

  const getSize = (size) => {
    let buttonSize = ''

    switch (size) {
      case 'Tiny':
        buttonSize = 'w-2 h-2 border';
        break;
      case 'Small':
        buttonSize = 'w-3 h-3 sm:w-5 sm:h-5 border-2';
        break;
      case 'Medium':
        buttonSize = 'w-10 h-10 border-2';
        break;
      case 'Large':
        buttonSize = 'w-20 h-20 border-4';
        break;
      case 'Massive':
        buttonSize = 'w-32 h-32 border-5';
        break;
      default:
        buttonSize = 'w-4 h-4 border-2';
        break;
    }

    return buttonSize
  }

  const sizeClass = getSize(data.size)

  return (
    <>
      <motion.div
        style={{
          left: `${pos.x - 0.5}%`,
          top: `${pos.y - 1}%`,
          // transform: 'translate(-50%, -50%)', // Ensure the circle's center stays fixed
        }}
        animate={{
          scale: [1, 1.4, 1], // Scale values for the pulsating effect
          opacity: [1, 0.85, 1], // Opacity values for the pulsating effect
          // scale: [1, 1, 1.5, 1, 1], // Scale values for the pulsating effect
        }}
        whileHover={{ scale: [1.4], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className={`cursor-pointer absolute ${colClass} ${borderClass} ${sizeClass} ${data.className} z-40 rounded-full shadow-3xl flex items-center justify-center p-0 m-0 text-center`}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        {data.showIndex && <span className={'text-white text-xs font-bold'}>{index + 1}</span>}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <ThingLinkOverlay data={data} isOpen={isOpen} setIsOpen={setIsOpen} allData={allData} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ThingLinkButton;

const ThingLinkOverlay = ({ data, allData, isOpen, setIsOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(allData.indexOf(data));

  const modalRef = useRef(null); // Create a reference to the modal

  const spring = {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  };

  const handleNext = () => {
    if (currentIndex < allData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentData = allData[currentIndex];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If modal is open and click is outside, close it
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <motion.div
      exit={{ background: 'transparent' }}
      animate={{ background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent' }}
      className={`flex w-full h-full ${isOpen ? 'bg-white bg-opacity-50' : 'bg-transparent'} flex items-center justify-center`}
    // onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        enter={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={spring}
        className={`w-auto max-w-3xl h-auto bg-white z-50 absolute border-black border-2 max-h-full overflow-y-auto`}
        ref={modalRef} // Attach ref here to detect outside clicks
      >
        {currentData.image ? (
          <div className={'flex flex-col-reverse sm:grid sm:grid-cols-2 items-center sm:p-2'}>
            <div>
              <ResizeableImage image={currentData.image} />
            </div>
            <motion.div className={'pt-4 pl-4 pb-4 pr-5 sm:pr-10 flex flex-col justify-between gap-1'}>
              {allData.length > 1 &&
                <div className={'w-full flex justify-start items-center mb-3 gap-x-3'}>
                  <button onClick={handleBack} className={`transition-opacity bg-burgundy px-3 py-1 text-white text-xs sm:text-base font-normal ${currentIndex - 1 < 0 ? 'opacity-50' : ''}`}>
                    ←Back
                  </button>
                  <button onClick={handleNext} className={`transition-opacity bg-burgundy px-3 py-1 text-white text-xs sm:text-base font-normal ${currentIndex + 1 >= allData.length ? 'opacity-50' : ''}`}>
                    Next→
                  </button>
                  <span>{currentIndex + 1} / {allData.length}</span>
                </div>
              }
              <RichtextComponent content={currentData.text.json} />
            </motion.div>
          </div>
        ) : (
          <motion.div className={'pt-4 pl-4 pb-4 pr-5 sm:pr-10 flex flex-col justify-between gap-1'}>
            {allData.length > 1 && (
              <div className={'w-full flex justify-start items-center mb-3 gap-x-3'}>
                <button onClick={handleBack} className={`transition-opacity bg-burgundy px-3 py-1 text-white text-xs sm:text-base font-normal ${currentIndex - 1 < 0 ? 'opacity-50' : ''}`}>
                  ←Back
                </button>
                <button onClick={handleNext} className={`transition-opacity bg-burgundy px-3 py-1 text-white text-xs sm:text-base font-normal ${currentIndex + 1 >= allData.length ? 'opacity-50' : ''}`}>
                  Next→
                </button>
                <span>{currentIndex + 1} / {allData.length}</span>
              </div>
            )}
            <RichtextComponent content={currentData.text.json} />
          </motion.div>
        )}

        <motion.div
          className={'w-6 h-6 sm:w-6 sm:h-6 block absolute top-2 sm:top-2 right-2 text-burgundy cursor-pointer z-50'}
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
  );
};

const ResizeableImage = ({ image }) => {
  return (
    <div className={'w-full'}>
      <Image src={image.url} width={image.width} height={image.height} alt={image.title} key={`image-${image?.url}`} />
    </div>
  )
}
