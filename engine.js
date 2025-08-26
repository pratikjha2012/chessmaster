// Start Stockfish engine
const engine = Stockfish();

// When Stockfish sends output
engine.onmessage = function(event) {
  console.log("Stockfish:", event.data);
};

// Example: Initialize engine
engine.postMessage("uci");        // Tell engine to use UCI protocol
engine.postMessage("isready");    // Wait for "readyok"
engine.postMessage("ucinewgame"); // New game
engine.postMessage("position startpos"); // Start position

// Example: Ask engine to find best move
engine.postMessage("go depth 10");
