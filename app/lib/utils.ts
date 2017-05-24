/** Returns the remaining amount of scroll height remaining in the given element (in pixels) */
export function scrollHeightRemaining(element: HTMLElement) {
	const elementHeight = element.getBoundingClientRect().height;
	return element.scrollHeight - elementHeight - element.scrollTop;
}