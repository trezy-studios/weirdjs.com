// Local imports
import { faker } from 'helpers'





// Local constants
const videos = new Array(3)
	.fill(null)
	.map(() => {
		return {
			summary: faker.lorem.paragraph(),
			title: faker.lorem.sentence(),
		}
	})





export function LatestVideos() {
  return (
    <section>
			<header>
				<h3>Latest Videos</h3>
			</header>

			<ol>
				{videos.map(video => (
					<li key={video.title}>
						<article>
							<header>
								<h4>{video.title}</h4>
							</header>

							<p>{video.summary}</p>
						</article>
					</li>
				))}
			</ol>
		</section>
  )
}
