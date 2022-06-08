import {
	$createTableNodeWithDimensions,
	applyTableHandlers,
	INSERT_TABLE_COMMAND,
	TableCellNode,
	TableNode,
	TableRowNode,
	type InsertTableCommandPayload,
	type TableSelection
} from '@lexical/table';
import {
	$createParagraphNode,
	$getNodeByKey,
	$getSelection,
	$isRangeSelection,
	$isRootNode,
	type LexicalEditor,
	type ElementNode,
	type NodeKey
} from 'lexical';

export function registerTableCommands(editor: LexicalEditor) {
	const COMMAND_PRIORITY_EDITOR = 0;

	editor.registerCommand(
		INSERT_TABLE_COMMAND,
		(payload) => {
			console.log(payload);
			const { columns, rows, includeHeaders } = payload;
			const selection = $getSelection();
			if (!$isRangeSelection(selection)) {
				return true;
			}
			const focus = selection.focus;
			const focusNode = focus.getNode();

			if (focusNode !== null) {
				const tableNode = $createTableNodeWithDimensions(
					Number(rows),
					Number(columns),
					includeHeaders
				);
				if ($isRootNode(focusNode)) {
					const target = focusNode.getChildAtIndex(focus.offset);
					if (target !== null) {
						target.insertBefore(tableNode);
					} else {
						focusNode.append(tableNode);
					}
					tableNode.insertBefore($createParagraphNode());
				} else {
					const topLevelNode = focusNode.getTopLevelElementOrThrow();
					topLevelNode.insertAfter(tableNode);
				}
				tableNode.insertAfter($createParagraphNode());
				const firstCell = tableNode
					.getFirstChildOrThrow<ElementNode>()
					.getFirstChildOrThrow<ElementNode>();
				firstCell.select();
			}
			return true;
		},
		COMMAND_PRIORITY_EDITOR
	);

	const tableSelections = new Map<NodeKey, TableSelection>();

	editor.registerMutationListener(TableNode, (nodeMutations) => {
		for (const [nodeKey, mutation] of nodeMutations) {
			if (mutation === 'created') {
				editor.update(() => {
					const tableElement = editor.getElementByKey(nodeKey);
					const tableNode = $getNodeByKey<TableNode>(nodeKey);

					if (tableElement && tableNode) {
						const tableSelection = applyTableHandlers(tableNode, tableElement, editor);
						tableSelections.set(nodeKey, tableSelection);
					}
				});
			} else if (mutation === 'destroyed') {
				const tableSelection = tableSelections.get(nodeKey);

				if (tableSelection) {
					tableSelection.removeListeners();
					tableSelections.delete(nodeKey);
				}
			}
		}
	});
}
