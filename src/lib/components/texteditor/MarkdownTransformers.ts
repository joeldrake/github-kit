/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementTransformer, TextMatchTransformer, Transformer } from '@lexical/markdown';
import type { ElementNode, LexicalNode } from 'lexical';

import { CHECK_LIST, TRANSFORMERS } from '@lexical/markdown';
import { $createHorizontalRuleNode, $isHorizontalRuleNode } from './plugins/HorizontalRuleNode';
import {
	$createTableCellNode,
	$createTableNode,
	$createTableRowNode,
	$isTableNode,
	$isTableRowNode,
	TableCellHeaderStates,
	TableCellNode,
	TableNode
} from '@lexical/table';
import { $createTextNode, $isElementNode, $isParagraphNode, $isTextNode } from 'lexical';

import { $createImageNode, $isImageNode } from './plugins/ImageNode';

export const HR: ElementTransformer = {
	export: (node: LexicalNode) => {
		return $isHorizontalRuleNode(node) ? '***' : null;
	},
	regExp: /^(---|\*\*\*|___)\s?$/,
	replace: (parentNode, _1, _2, isImport) => {
		const line = $createHorizontalRuleNode();

		// TODO: Get rid of isImport flag
		if (isImport || parentNode.getNextSibling() != null) {
			parentNode.replace(line);
		} else {
			parentNode.insertBefore(line);
		}

		line.selectNext();
	},
	type: 'element'
};

export const IMAGE: TextMatchTransformer = {
	export: (node, exportChildren, exportFormat) => {
		if (!$isImageNode(node)) {
			return null;
		}

		return `![${node.getAltText()}](${node.getSrc()})`;
	},
	importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
	regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
	replace: (textNode, match) => {
		const [, altText, src] = match;
		const imageNode = $createImageNode({
			altText,
			maxWidth: 800,
			src
		});
		textNode.replace(imageNode);
	},
	trigger: ')',
	type: 'text-match'
};

// Very primitive table setup
const TABLE_ROW_REG_EXP = /^(?:\|)(.+)(?:\|)\s?$/;

export const TABLE: ElementTransformer = {
	export: (node: LexicalNode, exportChildren: (elementNode: ElementNode) => string) => {
		if (!$isTableNode(node)) {
			return null;
		}

		const output = [];

		for (const row of node.getChildren()) {
			const rowOutput = [];

			if ($isTableRowNode(row)) {
				for (const cell of row.getChildren()) {
					// It's TableCellNode (hence ElementNode) so it's just to make flow happy
					if ($isElementNode(cell)) {
						rowOutput.push(exportChildren(cell));
					}
				}
			}

			output.push(`| ${rowOutput.join(' | ')} |`);
		}

		return output.join('\n');
	},
	regExp: TABLE_ROW_REG_EXP,
	replace: (parentNode, _1, match) => {
		const matchCells = mapToTableCells(match[0]);

		if (matchCells == null) {
			return;
		}

		const rows = [matchCells];
		let sibling = parentNode.getPreviousSibling();
		let maxCells = matchCells.length;

		while (sibling) {
			if (!$isParagraphNode(sibling)) {
				break;
			}

			if (sibling.getChildrenSize() !== 1) {
				break;
			}

			const firstChild = sibling.getFirstChild();

			if (!$isTextNode(firstChild)) {
				break;
			}

			const cells = mapToTableCells(firstChild.getTextContent());

			if (cells == null) {
				break;
			}

			maxCells = Math.max(maxCells, cells.length);
			rows.unshift(cells);
			const previousSibling = sibling.getPreviousSibling();
			sibling.remove();
			sibling = previousSibling;
		}

		const table = $createTableNode();

		for (const cells of rows) {
			const tableRow = $createTableRowNode();
			table.append(tableRow);

			for (let i = 0; i < maxCells; i++) {
				tableRow.append(i < cells.length ? cells[i] : createTableCell(null));
			}
		}

		const previousSibling = parentNode.getPreviousSibling() as LexicalNode | undefined;
		if ($isTableNode(previousSibling) && getTableColumnsSize(previousSibling) === maxCells) {
			previousSibling.append(...table.getChildren());
			parentNode.remove();
		} else {
			parentNode.replace(table);
		}

		table.selectEnd();
	},
	type: 'element'
};

function getTableColumnsSize(table: TableNode) {
	const row = table.getFirstChild() as LexicalNode | undefined;
	return $isTableRowNode(row) ? row.getChildrenSize() : 0;
}

const createTableCell = (
	textContent: string | null | undefined,
	prevWasHeader?: boolean
): TableCellNode => {
	const status = prevWasHeader ? TableCellHeaderStates.ROW : TableCellHeaderStates.NO_STATUS;

	const cell = $createTableCellNode(status);
	cell.prevWasHeader = prevWasHeader;

	if (textContent != null) {
		cell.append($createTextNode(textContent.trim()));
	}

	return cell;
};

const mapToTableCells = (textContent: string): Array<TableCellNode> | null => {
	// TODO:
	// For now plain text, single node. Can be expanded to more complex content
	// including formatted text
	const match = textContent.match(TABLE_ROW_REG_EXP);

	if (!match || !match[1]) {
		return null;
	}

	//todo: find better way to save escaped piplines
	const cleanMatch = match[1].replaceAll('\\|', '_hacky_escaped_pipeline_replacer_');

	const prevWasHeader = /^[-| ]+$/.test(cleanMatch);

	return cleanMatch.split('|').map((text) => {
		const dirtyText = text.replaceAll('_hacky_escaped_pipeline_replacer_', '|');
		return createTableCell(dirtyText, prevWasHeader);
	});
};

export const CUSTOM_TRANSFORMERS: Array<Transformer> = [
	TABLE,
	HR,
	IMAGE,
	CHECK_LIST,
	...TRANSFORMERS
];
