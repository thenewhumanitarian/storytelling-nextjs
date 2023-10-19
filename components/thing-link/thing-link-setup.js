import { useState, useEffect, useRef } from 'react'

import Image from 'next/image'

import ThingLinkSetupButton from './thing-link-setup-button'

const ThingLinkSetupComponent = ({ thinglink }) => {
    const [buttons, setButtons] = useState([])
    // const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const initialButtonState = {
        size: 'Medium',
        colour: 'Burgundy',
        className: '-mt-5 -ml-5',
    }

    // Function to update the button positions
    const onUpdatePosition = (id, newX, newY) => {
        // Find the button with the given id and update its position
        const updatedButtons = buttons.map((button) =>
            button.id === id ? { ...button, xPosition: newX, yPosition: newY } : button
        );
        setButtons(updatedButtons);
    };

    // Function to calculate button position based on parent container size
    const calculatePosition = (x, y) => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const xPercent = (x / containerWidth) * 100;
        const yPercent = (y / containerHeight) * 100;
        return { x: xPercent, y: yPercent };
    };

    const handleDivClick = (e) => {
        // Calculate the relative position of the click within the div
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate the x and y positions as percentages
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Add a new button with the positions as percentages
        const newButton = {
            ...initialButtonState,
            xPosition: 50,
            // xPosition: xPercent,
            yPosition: 50,
            // yPosition: yPercent,
            id: buttons.length + 1
        }
        setButtons([...buttons, newButton]);

        // Store the clicked position for future use
        // setClickedPosition({ x, y });
    }

    return (
        <>
            <div
                className={'w-full h-full overflow-hidden relative'}
                ref={containerRef}
            >
                <Image
                    src={thinglink.baseImage.url}
                    width={thinglink.baseImage.width}
                    height={thinglink.baseImage.height}
                    alt="Thing Link base layer picture"
                    layout={'responsive'}
                />
                {buttons.length > 0 &&
                    <div className={'absolute top-0 left-0 w-full h-full'}>
                        {buttons.map((button, i) => {
                            return (
                                <ThingLinkSetupButton
                                    data={button}
                                    key={`thing-link-button-${i}`}
                                    onUpdatePosition={onUpdatePosition} // Pass the onUpdatePosition function
                                    containerRef={containerRef} // Pass the containerRef to the child component
                                />
                            )
                        })}
                    </div>
                }
            </div>
            <div className={'m-2'}>
                <button className={'bg-burgundy text-white px-3 py-1'} onClick={handleDivClick}>+ Add new circle</button>
                {/* Display the table */}
                <div className={'mt-4'}>
                    <table className={'border-collapse border border-gray-400 mt-2 w-full'}>
                        <thead>
                            <tr className={'bg-gray-200'}>
                                <th className={'border border-gray-400 px-3 py-1'}>ID</th>
                                <th className={'border border-gray-400 px-3 py-1'}>X Position (%)</th>
                                <th className={'border border-gray-400 px-3 py-1'}>Y Position (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buttons.map((button, i) => (
                                <tr key={`table-row-${i}`}>
                                    <td className={'border border-gray-400 px-3 py-1'}>{button.id}</td>
                                    <td className={'border border-gray-400 px-3 py-1'}>{button.xPosition.toFixed(2)}</td>
                                    <td className={'border border-gray-400 px-3 py-1'}>{button.yPosition.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ThingLinkSetupComponent
