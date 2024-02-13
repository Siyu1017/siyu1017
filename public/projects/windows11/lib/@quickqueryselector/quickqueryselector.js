/**
 * Query Selector
 * @returns {HTMLElement}
 */
function $(s, a) {
	return a == true ? document.querySelectorAll(s) : document.querySelector(s);
}

export default $;