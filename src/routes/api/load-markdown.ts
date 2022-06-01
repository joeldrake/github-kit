import markdownToHtml from '$lib/utils/markdownToHtml';
import fs from 'fs/promises';

export async function get() {
	const md = await fs.readFile('src/lib/markdown/test.md', { encoding: 'utf8' });

	const { html, frontmatter } = await markdownToHtml(md);

	//console.log(html)

	if (html) {
		return {
			body: { html, frontmatter }
		};
	}

	return {
		status: 404
	};
}
