import Link from 'next/link'

const LanguageSwitch = ({ lang, baseUrl }) => {
	return (
		<li className={'border-t mt-2 pt-2 border-black'}>
			<Link href={`${lang === 'en' ? baseUrl + '/fr' : baseUrl + '/en'}`}>
				<button
					className={
						'bg-transparent border-2 border-burgundy px-3 py-1 text-burgundy font-bold mt-2 hover:bg-burgundy hover:text-white transition-all duration-100 ease-in-out'
					}
				>
					{lang === 'en' ? 'Lire en français' : 'Read in English'}
				</button>
			</Link>
		</li>
	)
}

export default LanguageSwitch
