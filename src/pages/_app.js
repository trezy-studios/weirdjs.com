// Style imports
import 'scss/reset.scss'
import 'scss/lib.scss'
import 'scss/app.scss'





// Local imports
import {
	ApplicationBanner,
	ApplicationNavigation,
} from 'components'
import { ArticlesContextProvider } from 'contexts'





export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

  return (
		<ArticlesContextProvider>
			<div id="application-wrapper">
				<ApplicationBanner />

				<ApplicationNavigation />

				<main>
					<Component {...pageProps} />
				</main>
			</div>
		</ArticlesContextProvider>
	)
}
