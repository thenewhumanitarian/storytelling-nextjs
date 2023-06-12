import Link from 'next/link'
import RichtextComponent from '@components/richText'

const ArticleAuthorInfo = ({ author, lang }) => {
	const aboutText = lang === 'en' ? 'About the author' : 'À propos de l’auteur'

	return (
		<li className={'border-t mt-4 pt-3 border-black'}>
			<h3 className={'font-sans font-bold text-base'}>{aboutText}</h3>
			<div>
				<img src={author.image.url} alt={author?.image?.alt} className={'w-20 h-20 object-cover'} />
				<h4 className={'font-bold'}>{author?.name}</h4>
			</div>
			<RichtextComponent content={author?.description.json} />
			<Link href={`/car-live-blog/${lang}/by-author/${author.slug}`}>Show posts</Link>
		</li>
	)
}

export default ArticleAuthorInfo
