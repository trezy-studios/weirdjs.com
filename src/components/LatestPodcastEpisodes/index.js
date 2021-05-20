// Local imports
import { faker } from 'helpers'





// Local constants
const episodes = new Array(3)
	.fill(null)
	.map(() => {
		return {
			summary: faker.lorem.paragraph(),
			title: faker.lorem.sentence(),
		}
	})





export function LatestPodcastEpisodes() {
  return (
    <section>
			<header>
				<h3>Latest Podcast Episodes</h3>
			</header>

			<ol>
				{episodes.map(episode => (
					<li key={episode.title}>
						<article>
							<header>
								<h4>{episode.title}</h4>
							</header>

							<p>{episode.summary}</p>
						</article>
					</li>
				))}
			</ol>
		</section>
  )
}
