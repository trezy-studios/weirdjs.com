// Local imports
import {
	LatestArticles,
	LatestPodcastEpisodes,
	LatestVideos,
} from 'components'





export default function HomePage () {
  return (
		<>
			<LatestVideos />

			<LatestPodcastEpisodes />

			<LatestArticles />
		</>
  )
}
