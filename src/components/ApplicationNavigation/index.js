// Module imports
import Link from 'next/link'





export function ApplicationNavigation() {
	return (
		<nav id="application-navigation">
			<Link href="/blog">
				<a>Blog</a>
			</Link>

			<Link href="/podcast">
				<a>Podcast</a>
			</Link>

			<Link href="/about">
				<a>About</a>
			</Link>
		</nav>
	)
}
