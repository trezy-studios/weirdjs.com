// Local imports
import { convertObjectToQueryParams } from 'helpers/convertObjectToQueryParams'





function youtubeFetch(route, queryObject) {
	const queryParams = convertObjectToQueryParams(queryObject)

	return fetch(`https://youtube.googleapis.com/youtube/v3/${route}?${queryParams}`, {
		headers: {
			Accept: 'application/json',
		},
	})
}

export async function getMyVideos() {
	const response = await youtubeFetch('search', {
		channelId: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
		key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
		maxResults: 100,
		part: 'snippet',
		type: 'video',
	})

	const responseJSON = await response.json()

	return responseJSON.items
}
