import { useState } from 'react'

import "flag-icons/css/flag-icons.min.css"

const data = [
    {
        "country": "Afghanistan",
        "data": "In the country billed by the UN as the largest humanitarian crisis in the world, WFP was supporting up to 15 million people each month through much of last year. It can now only provide emergency assistance to 3 million a month. Earthquakes in Herat province in October that left more than 100,000 new people needing aid added to the pressures.",
        "flag": "af"
    },
    {
        "country": "Bangladesh",
        "data": "Monthly WFP rations for more than 900,000 Rohingya refugees in Cox’s Bazar were reduced in June from $10 to $8, having already been cut from $12 in March. The cuts came just weeks after thousands of refugees lost their homes to Cyclone Mocha, which followed a major fire earlier this year.",
        "flag": "bd"
    },
    {
        "country": "Haiti",
        "data": "WFP cut the number of people receiving emergency food assistance by 25% in July – meaning 100,000 of the most vulnerable Haitians are now going without support – and warned this number could rise to 700,000 by the year-end. Gang violence, floods, and earthquakes have all exacerbated the worst hunger crisis in Haiti’s history.",
        "flag": "ht"
    },
    {
        "country": "Ecuador",
        "data": "WFP’s funding for emergency response in Ecuador has dropped by 50% this year, causing the suspension of programmes for pregnant and lactating women, and children under two. The country has the second highest rate of chronic malnutrition in children in Latin America and the Caribbean, and is becoming both a gang violence and migration hotspot.",
        "flag": "ec"
    },
    {
        "country": "Colombia",
        "data": "By September, due to a 30-40% drop in funding in 2023, WFP had been unable to reach 355,000 of its planned 1.2 million recipients of emergency assistance. Roughly 30% of Colombia’s more than 50 million strong population is food insecure, including 2.1 million who are severely food insecure due to factors ranging from conflict to poverty. ",
        "flag": "co"
    },
    {
        "country": "Burkina Faso",
        "data": "Jihadist groups are imposing sieges around the country, which has forced WFP to use helicopters to deliver relief. This has proved costly, however, and food assistance was projected to reach under 20% of the population per month between October and December, according to US-funded hunger monitor FEWS NET.",
        "flag": "bf"
    },
    {
        "country": "Chad",
        "data": "WFP has warned that food aid for 1.4 million people in Chad faces a “looming halt” in January, even as the country is experiencing an influx of refugees from the fighting in Sudan’s Darfur region. Millions of Chadians, particularly children, already face acute food insecurity and malnutrition.",
        "flag": "td"
    },
    {
        "country": "Mali",
        "data": "WFP reduced food rations by 50% for host communities in April and May, and warned of deeper cuts ahead. In September, it warned that one million Malian children were facing malnutrition, including hundreds of thousands it was worried it might not be able to reach, as conflict – and blockades by armed groups – cut off aid access.",
        "flag": "ml"
    },
    {
        "country": "Pakistan",
        "data": "After catastrophic flooding from June-October 2022 left aid organisations providing life-saving assistance to more than 6.1 million people, WFP progressively scaled down operations from an initial target of 1.1 million people to 650,000 people in September 2023 due to funding constraints..",
        "flag": "pk"
    },
    {
        "country": "Niger",
        "data": "Aid agencies, including WFP, have struggled to bring in humanitarian supplies since a military coup in July. Restrictions are linked to post-coup sanctions imposed by the Economic Community of West African States (ECOWAS), and to the new junta’s wariness of importing goods from neighbouring states it views as hostile.",
        "flag": "ne"
    },
    {
        "country": "Ethiopia",
        "data": "WFP suspended its food aid across the country earlier this year after reports of large-scale theft. In November, the agency said it had “revamped” its operations and was kickstarting efforts to reach 3.2 million people. The suspension reportedly resulted in hundreds of starvation deaths.",
        "flag": "et"
    },
    {
        "country": "Somalia",
        "data": "WFP forecasts that a quarter of Somalia's population is currently facing crisis-level hunger or worse, yet funding shortfalls mean the agency can assist less than half of those most in need. The country experienced its worst drought in 40 years and is now suffering from catastrophic flooding.",
        "flag": "so"
    },
    {
        "country": "Uganda",
        "data": "Uganda, which hosts one of the world’s largest refugee communities, also has one of the poorest funded responses. On top of earlier cuts, WFP has implemented “prioritisations” that assign different levels of vulnerability. Some of the 1.5 million refugees say they have been miscategorised and are now getting no assistance. Others say the cuts have sparked crime, prostitution, child marriages, and sexual abuse in the settlements as refugees look for ways to feed themselves and their families.",
        "flag": "ug"
    },
    {
        "country": "South Sudan",
        "data": "South Sudan has been hit with back-to-back climate disasters, and a peace deal hasn’t brought the stability people had hoped for. Humanitarian needs are increasing, yet WFP faces a funding gap of $759 million between October 2023 and March 2024. This year, it reduced the number of people targeted for assistance from 7.7 million to 5.4 million.",
        "flag": "ss"
    },
    {
        "country": "Sudan",
        "data": "Sudan was once touted as a future East African breadbasket, but over 18 million people now face acute hunger, more than double the number from last year. WFP says parts of the country risk slipping into catastrophic hunger conditions if the agency cannot expand access to conflict hotspots.",
        "flag": "sd"
    },
    {
        "country": "Syria",
        "data": "General food assistance across Syria will end in January after WFP warned in September that it required $134 million to provide food aid for the next six months to combat hunger and malnutrition in 3.2 million people. In previous years, WFP has helped feed 5.5 million Syrians, and needs were reaching record high even before February’s devastating earthquake disaster. ",
        "flag": "sy"
    },
    {
        "country": "Honduras",
        "data": "In 2023, WFP planned to assist 2.2 million people, but by November only 1.2 million had received some help; 95% of them are children benefiting from school meals. One in three people need humanitarian assistance in Honduras, where gang violence and the climate crisis are also fuelling outward migration.",
        "flag": "hn"
    },
    {
        "country": "Tanzania",
        "data": "Refugees in Tanzania have faced reduced WFP aid since 2020, but further cuts this year left 200,000 people on 50% rations and struggling to meet their nutritional needs. The latest cuts were implemented at a time of increased need related to the arrival of refugees from neighbouring Democratic Republic of the Congo.",
        "flag": "tz"
    },
    {
        "country": "DRC",
        "data": "The M23 insurgency has worsened a long-running humanitarian crisis in eastern DRC. Though the UN has launched a “system-wide scale-up” to boost support for people in need, resources for relief agencies remain limited. WFP has a funding gap of several hundred million dollars and warned in November that it may have to start scaling down assistance.",
        "flag": "cd"
    },
    {
        "country": "Yemen",
        "data": "In December 2023, WFP announced it was pausing its general food assistance programme in Houthi rebel-controlled north Yemen, due to “limited funding” and the breakdown in negotiations about reducing the number of people receiving food aid in the area from 9.5 million to 6.5 million. Before that, rations for the 13 million people were already at a reduced rate of 41%, and the agency says its Yemen plan is only 11% funded from December 2023-March 2024.",
        "flag": "ye"
    },
    {
        "country": "Palestine ",
        "data": "WFP had already cut assistance by 60% in June, when nearly one third of the population of Palestine – or 1.84 million people – were food insecure. It now says aid delivery in Gaza is “almost impossible” due to Israel’s invasion even though more than 2 million Palestinians need food aid as a “lifeline”.",
        "flag": "ps"
    },
    {
        "country": "Jordan",
        "data": "Due to ongoing funding shortfalls, WFP’s assistance in Jordan has been gradually reduced. Around 410,000 “vulnerable refugees” in camps and host community members receive monthly cash transfers at a “one third reduced” level. In September, the agency said new donations had allowed aid to continue — after warnings of a suspension — but shortfalls are ongoing.",
        "flag": "jo"
    }
]

const SmallMultiple = () => {
    const [isOpen, setIsOpen] = useState(-1)

    const Container = ({ children }) => {
        return <div
            data-iframe-height={true}
            className={`grid grid-cols-3 sm:grid-cols-4 border-2 border-zinc-600 h-full top-0 left-0 w-full relative`}
        >
            {children}
        </div>
    }

    const Flag = ({ flag }) => {
        return (
            <span
                className={`w-64 aspect-[4/3] fi fi-${flag} bg-cover bg-center`}
            />
        )
    }

    const Card = ({ entry, index }) => {
        return (
            <div
                onClick={() => { setIsOpen(index) }}
                className={`aspect-[5/2] sm:aspect-[4/3] relative flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-all ${isOpen > -1 ? 'opacity-20 pointer-events-none' : ''}`}
                key={`card-${index}`}
            >
                <div className={'flex flex-row gap-2 justify-center items-center px-2 py-1'}>
                    <Flag flag={entry.flag} />
                    <span className={'top-0 left-0 text-xs sm:text-lg font-title'}>
                        {entry.country}
                    </span>
                </div>
            </div>
        )
    }

    const Overlay = () => {
        const currentEntry = data[isOpen]

        return (
            <div className={'absolute top-0 left-0 w-full h-full'}>
                <div
                    className={'flex h-full overflow-auto w-full h-auto bg-white bg-opacity-100 p-5 flex items-start justify-center flex-col'}
                >
                    <span onClick={() => setIsOpen(-1)} className={'text-xs sm:text-sm font-bold cursor-pointer text-burgundy font-bold absolute top-5 right-7'}>Close</span>
                    <div classname={'z-50'}>
                        <div className={'flex flex-row gap-2 mb-3'}>
                            <Flag flag={currentEntry.flag} />
                            <span className={'top-0 left-0 text-base sm:text-2xl font-title'}>
                                {currentEntry.country}
                            </span>
                        </div>
                        <p>{currentEntry.data}</p>
                    </div>
                    <div onClick={() => setIsOpen(-1)} className={'close-overlay absolute top-0 left-0 w-full h-full z-10 cursor-pointer'} />
                </div>
            </div>
        )
    }

    data.sort((a, b) => {
        if (a.country < b.country) {
            return -1;
        }
        if (a.country > b.country) {
            return 1;
        }
        return 0;
    });

    return (
        <Container>
            {data.map((entry, i) => {
                return <Card entry={entry} index={i} key={`card-entry-${i}`} />
            })}
            {isOpen > -1 && <Overlay />}
        </Container>
    )
}

export default SmallMultiple