// Local imports
import { useArticlesContext } from 'contexts'
import { faker } from 'helpers'





// Local constants
// const articles = new Array(3)
// 	.fill(null)
// 	.map(() => {
// 		return {
// 			summary: faker.lorem.paragraph(),
// 			title: faker.lorem.sentence(),
// 		}
// 	})





export function LatestArticles() {
	const {
		articles,
		collectionHook: useArticles,
		isLoading,
	} = useArticlesContext()

	useArticles()

  return (
    <section>
			<header>
				<h3>Latest Articles</h3>
			</header>

			{isLoading && (
				'Loading...'
			)}

			{!isLoading && (
				<ol className="card-list">
					{articles.map(article => (
						<li key={article.title}>
							<article className="card">
								<header>
									<h4>{article.title}</h4>
								</header>

								<p>{article.summary}</p>
							</article>
						</li>
					))}
				</ol>
			)}
		</section>
  )
}
