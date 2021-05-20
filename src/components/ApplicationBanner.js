// Local imports
import { ExternalLink } from 'components'





export function ApplicationBanner() {
	return (
		<header
			id="application-banner"
			role="banner">
			<h1 id="brand">Weird JavaScript</h1>

			<nav className="social-links">
				<ExternalLink href="/twitter">
					Twitter
				</ExternalLink>

				<ExternalLink href="/youtube">
					Youtube
				</ExternalLink>

				<ExternalLink href="/twitch">
					Twitch
				</ExternalLink>
			</nav>
		</header>
	)
}
