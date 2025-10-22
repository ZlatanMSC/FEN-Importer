# FEN Importer Plugin - Technical Documentation

## Overview

This Obsidian plugin provides a convenient way to import FEN (Forsyth-Edwards Notation) chess positions into chessboard code blocks compatible with the Chessboard Viewer extension.

## Architecture

### Main Components

1. **FENImporterPlugin** (main.ts)
   - Main plugin class that extends Obsidian's Plugin class
   - Registers commands, menu items, and ribbon icons
   - Manages plugin lifecycle (load/unload)

2. **FENInputModal** (main.ts)
   - Modal dialog for FEN input
   - Handles user input validation
   - Formats and inserts chessboard code blocks

### Features Implementation

#### 1. Editor Menu Button (Mobile Keyboard Toolbar)
```typescript
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
```

This is the key feature requested - adds a button that appears on mobile devices above the keyboard, similar to other Obsidian editor actions.

#### 2. Command Palette Integration
```typescript
this.addCommand({
  id: 'import-fen',
  name: 'Import FEN',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    new FENInputModal(this.app, editor).open();
  }
});
```

Allows users to access the functionality via Cmd/Ctrl+P command palette.

#### 3. Ribbon Icon
```typescript
this.addRibbonIcon('chess-knight', 'Import FEN', () => {
  const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
  if (activeView) {
    new FENInputModal(this.app, activeView.editor).open();
  } else {
    new Notice('Please open a markdown file to import FEN');
  }
});
```

Adds a chess knight icon to the left sidebar for quick access.

### Output Format

The plugin generates chessboard code blocks in this format:

```
```chessboard
fen: <FEN_NOTATION_HERE>
```
```

This format is fully compatible with the Chessboard Viewer plugin.

### Input Validation

Basic validation is performed on the FEN input:
- Checks if input is not empty
- Verifies FEN has at least one part and contains '/' characters
- Shows user-friendly error messages for invalid input

### User Experience Features

- Auto-focus on textarea when modal opens
- Ctrl/Cmd+Enter keyboard shortcut to submit
- Visual feedback with Notice messages
- Cursor positioning after insertion
- Styled input field that matches Obsidian theme

## Build System

### Dependencies
- TypeScript 4.7.4
- esbuild 0.17.3 (bundler)
- Obsidian API (latest)
- ESLint for code quality

### Build Commands
- `npm run dev` - Development build with watch mode
- `npm run build` - Production build
- `npm run version` - Bump version and update manifest

### Output
- `main.js` - Bundled plugin code (excluded from git)
- Source maps included in development builds

## Installation for End Users

1. Download `main.js` and `manifest.json` from releases
2. Create folder: `<vault>/.obsidian/plugins/fen-importer/`
3. Copy files to the folder
4. Enable in Settings → Community plugins

## Development Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Copy output files to Obsidian vault for testing

## Testing

Manual testing steps:
1. Install plugin in test vault
2. Open a markdown file
3. Test editor menu button
4. Test command palette
5. Test ribbon icon
6. Verify output format matches Chessboard Viewer requirements
7. Test on mobile device (if available)

## Compatibility

- Minimum Obsidian version: 0.15.0
- Works on desktop and mobile
- Compatible with Chessboard Viewer plugin

## Future Enhancements

Potential improvements:
- FEN clipboard detection and auto-populate
- FEN validation improvements
- Recent FEN history
- FEN presets/templates
- Board orientation option
- Visual board preview in modal
