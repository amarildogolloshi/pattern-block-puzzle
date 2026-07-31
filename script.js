let solution = [];
let tiles = [];
let selected = null;

const createTile = () => {
  const tile = [false, false, false, false];
  const blackPosition = Math.floor(Math.random() * 4);
  tile[blackPosition] = true;
  return tile;
};



function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function buildTargetPattern() {

    const pattern = [];

    pattern.push(
        solution[0][0], solution[0][1],
        solution[1][0], solution[1][1]
    );

    pattern.push(
        solution[0][2], solution[0][3],
        solution[1][2], solution[1][3]
    );

    pattern.push(
        solution[2][0], solution[2][1],
        solution[3][0], solution[3][1]
    );

    pattern.push(
        solution[2][2], solution[2][3],
        solution[3][2], solution[3][3]
    );

    return pattern;
}

function drawTarget() {

    const target = document.getElementById("target");
    target.innerHTML = "";

    buildTargetPattern().forEach(value => {
        const div = document.createElement("div");
        div.className =
            "cell " + (value ? "black" : "white");

        target.appendChild(div);
    });
}

function drawTiles() {

    const container =
        document.getElementById("tiles");

    container.innerHTML = "";

    tiles.forEach((tile, index) => {

        const tileDiv =
            document.createElement("div");

        tileDiv.className =
            "tile" +
            (selected === index ? " selected" : "");

        tile.forEach(cell => {

            const div =
                document.createElement("div");

            div.className =
                "cell " +
                (cell ? "black" : "white");

            tileDiv.appendChild(div);
        });

        tileDiv.onclick = () => selectTile(index);

        container.appendChild(tileDiv);
    });
}

function selectTile(index) {

    if (selected === null) {
        selected = index;
    } else {

        [tiles[selected], tiles[index]] =
            [tiles[index], tiles[selected]];

        selected = null;

        checkWin();
    }

    drawTiles();
}

function checkWin() {
    let solved = true;

    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 4; j++) {

            if (tiles[i][j] !== solution[i][j]) {
                solved = false;
                break;
            }

        }

        if (!solved) {
            break;
        }
    }

    const message = document.getElementById("message");

    if (solved) {
        showWinModal();
        message.textContent = "";
    } else {
        message.textContent = "";
    }
}

function showWinModal() {
    const modal = document.getElementById("winModal");
    const title = document.getElementById("winModalTitle");
    const message = document.getElementById("winModalMessage");

    title.textContent = "🎉 Congratulations!";
    message.textContent = "You solved the puzzle!";
    modal.style.display = "flex";
}

function closeWinModal() {
    document.getElementById("winModal").style.display = "none";
}

function startNewGameFromModal() {
    closeWinModal();
    newGame();
}


function newGame() {

    solution = [
        createTile(),
        createTile(),
        createTile(),
        createTile()
    ];

    tiles = shuffle(solution);

    selected = null;

    drawTarget();
    drawTiles();

    document.getElementById("message").textContent = "";
}

newGame();

const facts = [
    "There are 256 possible puzzle patterns when duplicate tiles are allowed.",
    "Each 2×2 tile has exactly one black square and three white squares.",
    "If all four tiles are different, there are exactly 24 unique puzzles.",
    "Puzzles help improve memory and pattern recognition.",
    "Your brain naturally looks for patterns to solve problems.",
    "Mathematicians call this counting combinations."
];

function showFactModal() {

    const randomFact =
        facts[Math.floor(Math.random() * facts.length)];

    document.getElementById("factText").innerHTML = `
        <p>${randomFact}</p>

        <hr>

        <p>
            Each tile has 4 possible black-square positions.
        </p>

        <p>
            4 × 4 × 4 × 4 = <strong>256</strong> possible puzzle patterns.
        </p>

        <p>
            That's a lot of puzzles from just four little squares!
        </p>
    `;

    document.getElementById("factModal").style.display = "block";
}

function closeFactModal() {
    document.getElementById("factModal").style.display = "none";
}

window.onclick = function(event) {

    const modal = document.getElementById("factModal");

    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//print to PDF
function generateAllTilePatterns() {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

function buildPuzzlePattern(puzzle) {
    return [
        puzzle[0][0], puzzle[0][1], puzzle[1][0], puzzle[1][1],
        puzzle[0][2], puzzle[0][3], puzzle[1][2], puzzle[1][3],
        puzzle[2][0], puzzle[2][1], puzzle[3][0], puzzle[3][1],
        puzzle[2][2], puzzle[2][3], puzzle[3][2], puzzle[3][3]
    ];
}

function generateAllPuzzleCombinations() {
    const tilePatterns = generateAllTilePatterns();
    const allPuzzles = [];

    for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 4; b++) {
            for (let c = 0; c < 4; c++) {
                for (let d = 0; d < 4; d++) {
                    allPuzzles.push([
                        tilePatterns[a],
                        tilePatterns[b],
                        tilePatterns[c],
                        tilePatterns[d]
                    ]);
                }
            }
        }
    }

    return allPuzzles;
}

function createCell(value) {
    return `
        <div class="pdf-cell ${value === 1 ? "pdf-black" : "pdf-white"}"></div>
    `;
}

function createReusableTilesPageForAllPuzzles() {
    return `
        <h2>Reusable Puzzle Tiles</h2>

        <p>
            Cut out these four tiles once and use them
            to solve all 24 puzzles.
        </p>

        <div class="pdf-tiles">

            <div class="pdf-tile">
                ${createPDFCell(1)}
                ${createPDFCell(0)}
                ${createPDFCell(0)}
                ${createPDFCell(0)}
            </div>

            <div class="pdf-tile">
                ${createPDFCell(0)}
                ${createPDFCell(1)}
                ${createPDFCell(0)}
                ${createPDFCell(0)}
            </div>

            <div class="pdf-tile">
                ${createPDFCell(0)}
                ${createPDFCell(0)}
                ${createPDFCell(1)}
                ${createPDFCell(0)}
            </div>

            <div class="pdf-tile">
                ${createPDFCell(0)}
                ${createPDFCell(0)}
                ${createPDFCell(0)}
                ${createPDFCell(1)}
            </div>

        </div>

        <hr style="page-break-after: always;">
    `;
}

function createPrintablePuzzle(puzzle, number) {
    const pattern = buildPuzzlePattern(puzzle);

    let targetHtml = "";

    pattern.forEach(cell => {
        targetHtml += createCell(cell);
    });

    let tilesHtml = "";

    puzzle.forEach(tile => {
        let tileHtml = "";

        tile.forEach(cell => {
            tileHtml += createCell(cell);
        });

        tilesHtml += `
            <div class="pdf-tile">
                ${tileHtml}
            </div>
        `;
    });

    return `
        <div class="pdf-puzzle">
            <h3>Puzzle ${number}</h3>

            <p>Target Pattern</p>
            <div class="pdf-board">
                ${targetHtml}
            </div>

            <p>Cut and Match These Tiles</p>
            <div class="pdf-tiles">
                ${tilesHtml}
            </div>
        </div>
    `;
}

function generateAllPuzzlesPDF() {
    const allPuzzles = generateAllPuzzleCombinations();

    let puzzlesHtml = "";

    allPuzzles.forEach((puzzle, index) => {
        puzzlesHtml += createPrintablePuzzle(puzzle, index + 1);
    });

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>All Pattern Puzzle Combinations</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                }

                h1 {
                    margin-bottom: 5px;
                }

                .summary {
                    margin-bottom: 30px;
                    font-size: 16px;
                }

                .pdf-puzzle {
                    page-break-inside: avoid;
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin: 15px;
                    display: inline-block;
                    vertical-align: top;
                    width: 260px;
                }

                .pdf-board {
                    display: grid;
                    grid-template-columns: repeat(4, 28px);
                    gap: 2px;
                    justify-content: center;
                    margin: 10px auto 20px auto;
                }

                .pdf-tiles {
                    display: grid;
                    grid-template-columns: repeat(2, auto);
                    gap: 10px;
                    justify-content: center;
                    margin-top: 10px;
                }

                .pdf-tile {
                    display: grid;
                    grid-template-columns: repeat(2, 28px);
                    gap: 2px;
                    padding: 4px;
                    border: 1px dashed #555;
                }

                .pdf-cell {
                    width: 28px;
                    height: 28px;
                    border: 1px solid #333;
                }

                .pdf-black {
                    background-color: #000 !important;

                    /* Force printing of backgrounds */
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }


                .pdf-white {
                    background: white;
                }

                @media print {
                     * {  
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    button {
                        display: none;
                    }

                    .pdf-puzzle {
                        break-inside: avoid;
                    }
                }
            </style>
        </head>

        <body>
            <h1>Pattern Puzzle Worksheets</h1>

            <div class="summary">
                Each 2x2 tile has exactly one black square.
                <br>
                Total combinations: 4 x 4 x 4 x 4 = 256 puzzles.
            </div>

            <button onclick="window.print()">
                Save as PDF / Print
            </button>

            <hr>

            ${puzzlesHtml}
        </body>
        </html>
    `);

    printWindow.document.close();
}

//print 24 uniques

// print 24 unique puzzles with reusable tiles only once

function generateUniquePuzzlesPDF() {
    const uniquePuzzles = generateUniquePuzzleCombinations();

    let puzzlesHtml = "";

    // First page: reusable cut-out tiles
    puzzlesHtml += createReusableTilesPageForAllPuzzles();

    // Next pages: only target patterns
    uniquePuzzles.forEach(function(puzzle, index) {
        puzzlesHtml += createPuzzleTargetOnly(puzzle, index + 1);
    });

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>24 Unique Pattern Puzzle Worksheets</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                }

                h1 {
                    margin-bottom: 5px;
                }

                .summary {
                    margin-bottom: 25px;
                    font-size: 16px;
                }

                .reusable-page {
                    border: 2px solid #333;
                    padding: 20px;
                    margin-bottom: 30px;
                    page-break-after: always;
                }

                .pdf-puzzle {
                    page-break-inside: avoid;
                    break-inside: avoid;
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin: 12px;
                    display: inline-block;
                    vertical-align: top;
                    width: 220px;
                }

                .pdf-board {
                    display: grid;
                    grid-template-columns: repeat(4, 30px);
                    gap: 2px;
                    justify-content: center;
                    margin: 10px auto 15px auto;
                }

                .pdf-tiles {
                    display: grid;
                    grid-template-columns: repeat(2, auto);
                    gap: 25px;
                    justify-content: center;
                    margin-top: 25px;
                }

                .pdf-tile-wrapper {
                    text-align: center;
                }

                .pdf-tile {
                    display: grid;
                    grid-template-columns: repeat(2, 50px);
                    gap: 3px;
                    padding: 8px;
                    border: 2px dashed #555;
                    width: fit-content;
                    margin: auto;
                }

                .pdf-small-tile {
                    display: grid;
                    grid-template-columns: repeat(2, 30px);
                    gap: 2px;
                    padding: 4px;
                    border: 1px dashed #555;
                    width: fit-content;
                    margin: auto;
                }

                .pdf-cell {
                    width: 30px;
                    height: 30px;
                    border: 1px solid #333;
                    box-sizing: border-box;
                }

                .large-cell {
                    width: 50px;
                    height: 50px;
                    font-size: 40px;
                }

                .pdf-black {
                    background-color: #000 !important;
                    color: #000;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                .pdf-white {
                    color: #fff;
                    background-color: #fff !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                button {
                    padding: 10px 15px;
                    margin: 10px;
                    font-size: 16px;
                    cursor: pointer;
                }

                @media print {
                    button {
                        display: none;
                    }

                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    .pdf-puzzle {
                        break-inside: avoid;
                    }
                }
            </style>
        </head>

        <body>
            <h1>24 Unique Pattern Puzzle Worksheets</h1>

            <div class="summary">
                Each 2x2 tile has exactly one black square.
                <br>
                Cut the four reusable tiles one time and use them for all puzzles.
                <br>
                Total unique puzzles: 4 x 3 x 2 x 1 = 24.
            </div>

            <button onclick="window.print()">
                Save as PDF / Print
            </button>

            <hr>

            ${puzzlesHtml}
        </body>
        </html>
    `);

    printWindow.document.close();
}

function generateUniquePuzzleCombinations() {
    const tilePatterns = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    return getPermutations(tilePatterns);
}

function getPermutations(array) {
    if (array.length === 1) {
        return [array];
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        const current = array[i];

        const remaining = [
            ...array.slice(0, i),
            ...array.slice(i + 1)
        ];

        const remainingPermutations = getPermutations(remaining);

        remainingPermutations.forEach(function(permutation) {
            result.push([current, ...permutation]);
        });
    }

    return result;
}

function createReusableTilesPage() {
    const reusableTiles = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    let tilesHtml = "";

    reusableTiles.forEach(function(tile, index) {
        let tileHtml = "";

        tile.forEach(function(cell) {
            tileHtml += createPDFCell(cell, true);
        });

        tilesHtml += `
            <div class="pdf-tile-wrapper">
                <h3>Tile ${index + 1}</h3>

                <div class="pdf-tile">
                    ${tileHtml}
                </div>
            </div>
        `;
    });

    return `
        <div class="reusable-page">
            <h2>Reusable Cut-Out Tiles</h2>

            <p>
                Cut out these four tiles once.
                Use the same four tiles to solve all 24 puzzles.
            </p>

            <div class="pdf-tiles">
                ${tilesHtml}
            </div>
        </div>
    `;
}

function createPuzzleTargetOnly(puzzle, number) {
    const pattern = buildPuzzlePatternForPDF(puzzle);

    let targetHtml = "";

    pattern.forEach(function(cell) {
        targetHtml += createPDFCell(cell, false);
    });

    return `
        <div class="pdf-puzzle">
            <h3>Puzzle ${number}</h3>

            <p><strong>Target Pattern</strong></p>

            <div class="pdf-board">
                ${targetHtml}
            </div>
        </div>
    `;
}

function buildPuzzlePatternForPDF(puzzle) {
    return [
        puzzle[0][0], puzzle[0][1], puzzle[1][0], puzzle[1][1],
        puzzle[0][2], puzzle[0][3], puzzle[1][2], puzzle[1][3],

        puzzle[2][0], puzzle[2][1], puzzle[3][0], puzzle[3][1],
        puzzle[2][2], puzzle[2][3], puzzle[3][2], puzzle[3][3]
    ];
}

function createPDFCell(value, large) {
    const sizeClass = large ? "large-cell" : "";

    // Accept both 1 and true as black
    if (value === 1 || value === true) {
        return `
            <div class="pdf-cell ${sizeClass} pdf-black">■</div>
        `;
    }

    return `
        <div class="pdf-cell ${sizeClass} pdf-white"></div>
    `;
}