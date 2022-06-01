import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm'; // for github tables
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import yamlToJson from 'js-yaml';

export default async function markdownToHtml(markdown: string) {
	let frontmatter: string | undefined = undefined;
	const result = await remark()
		.use(remarkFrontmatter)
		.use(() => (tree) => {
			const yaml: any = tree.children.find((item) => item.type === 'yaml');
			if (yaml) frontmatter = yamlToJson.load(yaml.value);
		})
		.use(remarkRehype)
		.use(rehypeHighlight)
		.use(remarkGfm)
		.use(rehypeStringify)
		.process(markdown);

	return { frontmatter, html: result.toString() };
}
