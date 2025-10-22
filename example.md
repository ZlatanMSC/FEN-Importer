# FEN Importer Example

This is an example of what the FEN Importer plugin produces when you use it to import a chess position.

## Starting Position
```chessboard
fen: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

## Scholar's Mate
```chessboard
fen: r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4
```

## Simple Endgame
```chessboard
fen: 8/8/8/4k3/8/8/4K3/8 w - - 0 1
```

## How It Works

1. Click the editor menu button (appears above keyboard on mobile)
2. A modal opens asking for FEN notation
3. Paste or type your FEN
4. Click "Insert" or press Ctrl/Cmd+Enter
5. The plugin inserts the formatted code block automatically

The format is compatible with the Chessboard Viewer plugin, which will render these as interactive chess boards in your notes.
