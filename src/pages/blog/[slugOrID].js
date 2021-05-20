// Local imports
import { useArticlesContext } from 'contexts'





export default function BlogPage(props) {
	const {
		id,
		slugOrID,
		staticArticleData,
	} = props

	const {
		articlesByID,
		articlesBySlug,
		documentHook: useArticle,
		isLoading,
	} = useArticlesContext()

	useArticle({ id: id || slugOrID })

	const article = articlesByID[id || slugOrID] || articlesBySlug[slugOrID] || staticArticleData

	return (
		<section>
			<header>
				<h2>{article.title}</h2>
			</header>

			{article.summary}
			{article.body}
		</section>
	)
}

export async function getStaticPaths() {
	const [
		{
			collection,
			getDocs,
			getFirestore,
		},
	] = await Promise.all([
		import('firebase/firestore'),
		import('helpers/firebase'),
	])

	const firestore = getFirestore()
	const articles = await getDocs(collection(firestore, 'articles'))
	const paths = []

	articles.forEach(article => {
		paths.push({
			params: {
				slugOrID: article.id,
			},
		})

		paths.push({
			params: {
				slugOrID: article.data().slug,
			},
		})
	})

	return {
		fallback: true,
		paths,
	}
}

export async function getStaticProps(context) {
	const [
		{
			collection,
			doc,
			getDoc,
			getDocs,
			getFirestore,
			query,
			where,
		},
	] = await Promise.all([
		import('firebase/firestore'),
		import('helpers/firebase'),
	])

	const { slugOrID } = context.params

	const firestore = getFirestore()
	let article = await getDoc(doc(firestore, 'articles', slugOrID))

	if (!article.exists()) {
		const articlesCollection = collection(firestore, 'articles')
		const articles = await getDocs(query(articlesCollection, where('slug', '==', slugOrID)))
		articles.forEach(item => {
			article = item
		})

		if (!article.exists()) {
			return {
				notFound: true,
				props: context.params,
			}
		}
	}

	const staticArticleData = {
		...article.data(),
		id: article.id,
	}

  return {
    props: {
			...context.params,
			id: article.id,
			staticArticleData,
		},
  }
}
