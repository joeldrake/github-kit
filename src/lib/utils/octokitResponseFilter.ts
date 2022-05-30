export function octokitResponseFilter(item: App.OctokitResponseItem) {
	return item?.name?.endsWith('.md') || item?.type === 'dir';
}
