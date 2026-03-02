import "./style/file.css"
import { useState } from "react"

export default function File() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(1);
    const [winner, setWinner] = useState(null);

    const winningPatterns = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6],
    ];

    function checkWinner(board) {
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;

            if (
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return board[a]; // "X" or "O"
            }
        }
        return null;
    }

    function check(id) {
        if (board[id] !== null || winner) return;

        const newBoard = [...board];

        newBoard[id] = turn === 1 ? "X" : "O";
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setTurn(turn === 1 ? 2 : 1);
        }
    }

    return (
        <div className="container">
            <div className="turn">
                {winner ? `Winner: ${winner}` : `Turn: ${turn === 1 ? "X" : "O"}`}
            </div>

            <div className="board">
                {board.map((value, i) => (
                    <div
                        key={i}
                        className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
                        onClick={() => check(i)}
                    >
                        {value}
                    </div>
                ))}
            </div>

            {winner && (
                <div className="winner">
                    🎉 Winner: {winner}
                </div>
            )}
        </div>
    );
}