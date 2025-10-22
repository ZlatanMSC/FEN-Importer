# FEN Importer

A simple Obsidian plugin that adds a button to import FEN (Forsyth-Edwards Notation) chess positions into chessboard code blocks. Works seamlessly with the [Chessboard Viewer](https://github.com/THeK3nger/obsidian-chessboard) extension.

## Features

- **Quick Access Button**: Adds a button to your editor menu (visible on mobile keyboard toolbar in Obsidian)
- **Command Palette**: Access via command palette with "Import FEN" command
- **Sidebar Icon**: Optional ribbon icon in the left sidebar
- **Simple Input Modal**: Clean modal dialog for pasting or typing FEN notation
- **Automatic Formatting**: Automatically wraps your FEN in the correct chessboard code block format

## Installation

### Manual Installation

1. Download the latest release files (`main.js` and `manifest.json`)
2. Create a folder named `fen-importer` in your vault's `.obsidian/plugins/` directory
3. Copy the downloaded files into the `fen-importer` folder
4. Reload Obsidian
5. Enable the plugin in Settings → Community plugins

### Building from Source

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy `main.js` and `manifest.json` to your vault's plugin folder

## Usage

### Using the Editor Menu Button

1. Open a markdown note in Obsidian
2. Tap or click the editor menu button (on mobile, this appears above your keyboard)
3. Select "Import FEN"
4. Paste or type your FEN notation in the modal dialog
5. Click "Insert" or press Ctrl/Cmd+Enter

### Using the Command Palette

1. Open the command palette (Ctrl/Cmd+P)
2. Search for "Import FEN"
3. Press Enter
4. Paste or type your FEN notation
5. Click "Insert"

### Using the Ribbon Icon

1. Click the chess knight icon in the left sidebar
2. Paste or type your FEN notation
3. Click "Insert"

## Output Format

The plugin will insert a chessboard code block in the following format:

```
```chessboard
fen: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```
```

This format is compatible with the Chessboard Viewer plugin.

## Example FEN Notations

- Starting position: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
- Scholar's Mate: `r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4`
- Endgame position: `8/8/8/4k3/8/8/4K3/8 w - - 0 1`

## Requirements

- Obsidian v0.15.0 or higher
- [Chessboard Viewer](https://github.com/THeK3nger/obsidian-chessboard) plugin (to display the chessboards)

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/ZlatanMSC/FEN-Importer/issues) on GitHub.

## License

MIT
