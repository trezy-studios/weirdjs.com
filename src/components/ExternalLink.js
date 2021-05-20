// Module imports
import PropTypes from 'prop-types'
import React from 'react'





function ExternalLink(props) {
	return (
		<a
			{...props}
			rel={`noopener noreferrer ${props.rel}`}
			target="_blank">
			{props.children}
		</a>
	)
}

ExternalLink.defaultProps = {
	rel: '',
}

ExternalLink.propTypes = {
	children: PropTypes.node.isRequired,
	rel: PropTypes.string,
}

export { ExternalLink }
