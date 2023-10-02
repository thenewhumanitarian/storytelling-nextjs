import dynamic from 'next/dynamic';

const ArticleChecker = dynamic(() => import('@components/live-blog/articleChecker'), {
    loading: () => <p className={'opacity-50'} style={{ height: '24px' }}>Loading...</p>,
    ssr: false // This line is important. It disables server-side rendering for this component.
});

export default ArticleChecker