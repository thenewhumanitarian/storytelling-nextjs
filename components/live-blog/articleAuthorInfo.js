import Link from 'next/link'
import RichtextComponent from '@components/richText'

const ArticleAuthorInfo = ({ author, lang }) => {
	const aboutText = lang === 'en' ? 'About the author' : 'À propos de l’auteur'

	return (
		<li className={'border-t mt-4 pt-3 border-white sm:border-black'}>
			<h3 className={'text-white sm:text-black font-sans font-bold text-base'}>{aboutText}</h3>
			<div>
				<img src={author.image.url} alt={author?.image?.alt} className={'w-20 h-20 object-cover rounded-full mb-2'} />
				<h4 className={'font-bold text-white sm:text-black'}>{author?.name}</h4>
			</div>
			<RichtextComponent className={'text-white sm:text-black'} content={author?.description.json} />
			<Link className={'text-white sm:text-black pt-2 block sm:text-burgundy'} href={`/car-live-blog/${lang}/by-author/${author.slug}`}>Show posts</Link>
		</li>
	)
}

export default ArticleAuthorInfo
