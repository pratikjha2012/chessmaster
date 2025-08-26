// Init board and game
let game = new Chess();
let board;

// Init Stockfish engine
const engine = Stockfish();

engine.onmessage = function (event) {
  const line = event.data;
  console.log("Stockfish:", line);

  if (line.startsWith("bestmove")) {
    const move = line.split(" ")[1]; // e2e4
    if (move === "(none)") return;

    game.move({
      from: move.substring(0, 2),
      to: move.substring(2, 4),
      promotion: "q" // always promote to queen
    });

    board.position(game.fen());
  }
};

// Send a position to Stockfish and ask for best move
function makeBotMove() {
  engine.postMessage("position fen " + game.fen());
  engine.postMessage("go depth 12");
}

// Handle user moves
function onDrop(source, target) {
  let move = game.move({
    from: source,
    to: target,
    promotion: "q"
  });

  if (move === null) return "snapback"; // illegal move

  board.position(game.fen());

  // Wait a bit, then let bot move
  setTimeout(makeBotMove, 500);
}

board = Chessboard("board", {
  draggable: true,
  position: "start",
  onDrop: onDrop
});
