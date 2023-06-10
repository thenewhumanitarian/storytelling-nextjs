export function safeLocalStorage(key, initialValue) {
	// First we check if we're running on server or client
	if (typeof window === 'undefined') {
		return initialValue
	}
	const storedValue = window.localStorage.getItem(key)
	return storedValue ? JSON.parse(storedValue) : initialValue
}
