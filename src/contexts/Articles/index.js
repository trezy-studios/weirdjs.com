// Local imports
import { createFirestoreContext } from 'helpers'
import { initialState } from './initialState'
import { reducer } from './reducer'





// Local constants
const {
	Context: ArticlesContext,
	ContextProvider: ArticlesContextProvider,
	useContext: useArticlesContext,
} = createFirestoreContext({
	initialState,
	path: ['articles'],
	reducer,
})





export {
	ArticlesContext,
	ArticlesContextProvider,
	useArticlesContext,
}
