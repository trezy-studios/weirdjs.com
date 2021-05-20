export default function VideoPage(props) {
	const { slug } = props

	return (
		<section>
			<header>
				<h2>Blep</h2>
			</header>
		</section>
	)
}

export async function getStaticPaths() {
	const [
		createSlugFromTitleString,
		youtube,
		{
			doc,
			getFirestore,
			setDoc,
			Timestamp,
		},
	] = await Promise.all([
		import('helpers/createSlugFromTitleString'),
		import('helpers/youtube'),
		import('firebase/firestore'),
		import('helpers/firebase'),
	])

	const firestore = getFirestore()
	const paths = []
	const videos = await youtube.getMyVideos()

	const videoSaves = []

	videos.forEach(video => {
		const id = video.id.videoId
		const slug = createSlugFromTitleString(video.snippet.title)

		paths.push({
			params: {
				slugOrID: id,
			},
		})

		paths.push({
			params: {
				slugOrID: slug,
			},
		})

		const videoDoc = doc(firestore, 'videos', id)
		videoSaves.push(setDoc(videoDoc), {
			description: video.snippet.description,
			publishedAt: Timestamp.fromDate(new Date(video.snippet.publishedAt)),
			slug,
			thumbnails: video.snippet.thumbnails,
			title: video.snippet.title,
		})
	})

	// Make sure all of the videos are added/updated in Firestore
	await Promise.all(videoSaves)

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
