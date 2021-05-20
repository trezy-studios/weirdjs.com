// Local imports
import { calculateReadtime } from 'helpers'
import { initialState } from './initialState'





export const reducer = actions => (state, action) => {
	const {
		payload,
		type,
	} = action
	const newState = {
		...state,
		articles: [...state.articles],
		articlesByID: { ...state.articlesByID },
		articlesBySlug: { ...state.articlesBySlug },
		drafts: [...state.drafts],
		draftsByID: { ...state.draftsByID },
		draftsBySlug: { ...state.draftsBySlug },
	}

	switch(type) {
		case actions.MODIFY_COLLECTION:
			newState.isConnected = true
			newState.isLoading = false

			payload.remove?.forEach(item => {
				if (item.isDraft) {
					delete newState.draftsByID[item.id]
					delete newState.draftsBySlug[item.slug]
				} else {
					delete newState.articlesByID[item.id]
					delete newState.articlesBySlug[item.slug]
				}
			})

			payload.update?.forEach(item => {
				if (item.isDraft) {
					newState.draftsByID[item.id] = item
					newState.draftsBySlug[item.slug] = item
				} else {
					// item.readtime = calculateReadtime(item.body)
					newState.articlesByID[item.id] = item
					newState.articlesBySlug[item.slug] = item
				}
			})

			newState.drafts = Object.values(newState.draftsByID)
			newState.articles = Object.values(newState.articlesByID)
			newState.isEmpty = !newState.articles.length

			return newState

		case actions.MODIFY_DOCUMENT:
			if (!payload.data) {
				const { slug } = (newState.articlesByID[payload.id] || {})
				newState.articles = newState.articles.filter(id => id !== payload.id)
				delete newState.articlesByID[payload.id]
				delete newState.articlesBySlug[slug]
			} else {
				newState.articlesByID[payload.id] = payload.data
				newState.articlesBySlug[payload.data.slug] = payload.data
			}

			console.log(action)
			return newState

		case actions.CONNECTING_COLLECTION:
			newState.isLoading = true
			return newState

		case actions.DISCONNECTING_COLLECTION:
			newState.isConnected = false
			newState.isLoading = false
			return newState

		default:
			return state
	}
}
