// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useRef,
} from 'react'
import {
	collection as firestoreCollection,
	doc as firestoreDoc,
	getFirestore,
	limit,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore'
import PropTypes from 'prop-types'





// Initialize Firebase app
import './firebase'





// Local constants
const ACTIONS = {
	CONNECTING_COLLECTION: 'Connecting collection',
	CONNECTING_DOCUMENT: 'Connecting document',
	DISCONNECTING_COLLECTION: 'Disconnecting collection',
	DISCONNECTING_DOCUMENT: 'Disconnecting document',
	MODIFY_COLLECTION: 'Modify collection',
	MODIFY_DOCUMENT: 'Modify document',
}





export function createFirestoreContext(contextProps) {
	const {
		initialState,
		reducer,
		path,
	} = contextProps

	const Context = createContext({ ...initialState })

	const ContextProvider = props => {
		const { children } = props
		const [state, dispatch] = useReducer(reducer(ACTIONS), initialState)

		const {
			current: firestore,
		} = useRef(getFirestore())

		const {
			current: reference,
		} = useRef(firestoreCollection(firestore, ...path))

		const handleCollectionSnapshot = useCallback(snapshot => {
			const payload = {}

			snapshot.docChanges().forEach(change => {
				const {
					doc,
					type,
				} = change
				const data = {
					...doc.data(),
					id: doc.id,
				}

				let key = 'update'

				if (type === 'removed') {
					key = 'remove'
				}

				if (!payload[key]) {
					payload[key] = []
				}

				payload[key].push(data)
			})

			dispatch({
				payload,
				type: ACTIONS.MODIFY_COLLECTION,
			})
		}, [dispatch])

		const handleDocumentSnapshot = useCallback(doc => {
			const data = doc.data()

			if (data) {
				data.id = doc.id
			}

			console.log('handleDocumentSnapshot', {
				payload: {
					id: doc.id,
					data,
				},
				type: ACTIONS.MODIFY_DOCUMENT,
			})

			dispatch({
				payload: {
					id: doc.id,
					data,
				},
				type: ACTIONS.MODIFY_DOCUMENT,
			})
		}, [dispatch])

		const connectCollection = useCallback((options = {}) => {
			dispatch({ type: ACTIONS.CONNECTING_COLLECTION })

			const connectionQuery = query(reference, where('isDraft', '==', false), limit(25))
			const unsubscribe = onSnapshot(connectionQuery, handleCollectionSnapshot)

			return () => {
				dispatch({ type: ACTIONS.DISCONNECTING_COLLECTION })
				unsubscribe()
			}
		}, [
			dispatch,
			handleCollectionSnapshot,
		])

		const connectDocument = useCallback(options => {
			const { id } = options

			dispatch({ type: ACTIONS.CONNECTING_DOCUMENT })
			console.log({path, id})
			const unsubscribe = onSnapshot(firestoreDoc(firestore, ...path, id), handleDocumentSnapshot)

			return () => {
				dispatch({ type: ACTIONS.DISCONNECTING_DOCUMENT })
				unsubscribe()
			}
		}, [
			dispatch,
			handleDocumentSnapshot,
		])

		const collectionHook = useCallback((options, dependencies = []) => {
			useEffect(() => connectCollection(options), [connectCollection, ...dependencies])
		}, [connectCollection])

		const documentHook = useCallback((options, dependencies = []) => {
			useEffect(() => connectDocument(options), [connectDocument, ...dependencies])
		}, [connectDocument])

		return (
			<Context.Provider
				value={{
					...state,
					collectionHook,
					documentHook,
				}}>
				{children}
			</Context.Provider>
		)
	}

	ContextProvider.propTypes = {
		children: PropTypes.node.isRequired,
	}

	return {
		ACTIONS,
		Context,
		ContextProvider,
		useContext: () => useContext(Context),
	}
}
