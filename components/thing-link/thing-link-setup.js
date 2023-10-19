import { useState } from 'react'

import Image from 'next/image'

import ThingLinkButton from './thing-link-button'

const ThingLinkSetupComponent = ({ thinglink }) => {
    const [buttons, setButtons] = useState([])

    return (
        <div className={'w-full h-full overflow-hidden relative'}>
            <Image
                src={thinglink.baseImage.url}
                width={thinglink.baseImage.width}
                height={thinglink.baseImage.height}
                alt="Picture of the author"
                layout={'responsive'}
            />
            {buttons.length > 0 &&
                <div className={'absolute top-0 left-0 w-full h-full'}>
                    {buttons.map((button) => {
                        return (
                            <ThingLinkButton data={button} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default ThingLinkSetupComponent
