export function createSlugFromTitleString(string) {
	const lowercasedString = string.toLowerCase()
	const trimmedString = lowercasedString.trim()
	const apostrophelessString = trimmedString.replace(/'/gu, '')
	const spacelessString = apostrophelessString.replace(/[^\w]$/gu, '').replace(/[^\w]+/gu, '-')
	const singlyHyphenatedString = spacelessString.replace(/-+$/gu, '-')

	return singlyHyphenatedString
}
