import { App, Editor, MarkdownView, Modal, Notice, Plugin } from 'obsidian';

export default class FENImporterPlugin extends Plugin {
	async onload() {
		// Add command to command palette
		this.addCommand({
			id: 'import-fen',
			name: 'Import FEN',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new FENInputModal(this.app, editor).open();
			}
		});

		// Add editor menu item (mobile toolbar button)
		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor, view) => {
				menu.addItem((item) => {
					item
						.setTitle('Import FEN')
						.setIcon('chess-knight')
						.onClick(() => {
							new FENInputModal(this.app, editor).open();
						});
				});
			})
		);

		// Add ribbon icon (left sidebar)
		this.addRibbonIcon('chess-knight', 'Import FEN', () => {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				new FENInputModal(this.app, activeView.editor).open();
			} else {
				new Notice('Please open a markdown file to import FEN');
			}
		});
	}

	onunload() {
		// Cleanup if needed
	}
}

class FENInputModal extends Modal {
	editor: Editor;
	fenInput: HTMLTextAreaElement;

	constructor(app: App, editor: Editor) {
		super(app);
		this.editor = editor;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Import FEN Notation' });

		const description = contentEl.createEl('p', {
			text: 'Enter or paste the FEN notation for your chess position:'
		});
		description.style.marginBottom = '10px';

		// Create textarea for FEN input
		this.fenInput = contentEl.createEl('textarea', {
			placeholder: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
		});
		this.fenInput.style.width = '100%';
		this.fenInput.style.minHeight = '80px';
		this.fenInput.style.marginBottom = '10px';
		this.fenInput.style.fontFamily = 'monospace';
		this.fenInput.style.padding = '8px';
		this.fenInput.style.border = '1px solid var(--background-modifier-border)';
		this.fenInput.style.borderRadius = '4px';
		this.fenInput.style.backgroundColor = 'var(--background-primary)';
		this.fenInput.style.color = 'var(--text-normal)';

		// Auto-focus the textarea
		setTimeout(() => this.fenInput.focus(), 50);

		// Button container
		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.display = 'flex';
		buttonContainer.style.justifyContent = 'flex-end';
		buttonContainer.style.gap = '10px';

		// Cancel button
		const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelButton.addEventListener('click', () => this.close());

		// Insert button
		const insertButton = buttonContainer.createEl('button', { 
			text: 'Insert', 
			cls: 'mod-cta'
		});
		insertButton.addEventListener('click', () => this.insertFEN());

		// Handle Enter key in textarea (Ctrl/Cmd+Enter to submit)
		this.fenInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				this.insertFEN();
			}
		});
	}

	insertFEN() {
		const fen = this.fenInput.value.trim();
		
		if (!fen) {
			new Notice('Please enter a FEN notation');
			return;
		}

		// Basic FEN validation (just check if it has some structure)
		const fenParts = fen.split(' ');
		if (fenParts.length < 1 || !fenParts[0].includes('/')) {
			new Notice('Invalid FEN notation format');
			return;
		}

		// Insert the chessboard code block with FEN
		const chessboardBlock = `\`\`\`chessboard\nfen: ${fen}\n\`\`\``;
		
		const cursor = this.editor.getCursor();
		this.editor.replaceRange(chessboardBlock, cursor);
		
		// Move cursor to end of inserted text
		const lines = chessboardBlock.split('\n');
		const newCursor = {
			line: cursor.line + lines.length - 1,
			ch: lines[lines.length - 1].length
		};
		this.editor.setCursor(newCursor);

		new Notice('FEN imported successfully!');
		this.close();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
