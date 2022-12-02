/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = "Eagles"; // active player: 1 or 2 (personalized to Eagles or Steelers)
 const board = []; 
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 //
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   //should set the global board variable to be an array of 6 arrays (height), each containing 7 items (width) - board[y][x]
// The parameter {length: } is an Array-like object with length that contains only holes which turn into undefined spots in the array based on the variable given of WIDTH. https://2ality.com/2018/12/creating-arrays.html
   for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector("#board");
   // TODO: add comment for this code
   ////add first table row with column top id to have a dashed border and hover feature with gold background then adding a click listener to the top row of the table. handleClick will populate the player's piece within the given "x" column
   const top = document.createElement("tr"); 
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick); 

   for (let x = 0; x < WIDTH; x++) { 
     const headCell = document.createElement("td"); 
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
   //setting rows based on height and adding cells to those rows based on width then add id to reflect y,x coordinate
   for (let y = 0; y < HEIGHT; y++) { 
     const row = document.createElement("tr"); 
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td"); 
       cell.setAttribute("id", `${y}-${x}`); 
       row.append(cell); 
     }
     htmlBoard.append(row); 
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   //this will run again for the next x it's given so return null if there are no empty y's
    //use board variable and get id with y,x array information, then subtract 1 from y to get the next empty y position -- fill board with player1 or player2 so you can check later if diag, horiz, or vert === currPlayer with each turn
    for (let y = HEIGHT - 1; y >= 0; y--) { 
      if (!board[y][x]) { 
        return y; 
      }
    }
   return null; 
 }

 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell 
   //create new div and add class based on player1 or player2 to determine color. classList addition for .piece and .player1 - to start
   //add div to correct "td" cell in the board. identify correct table cell from findSpotForCol based on id of board then append the new div 
   //need to add color to cell to "set" it as the currPlayer's cell when checking for tie/win
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`${currPlayer}`)
    // const start = start at top x position
    //const end = end at y,x
    const position = document.getElementById(`${y}-${x}`); 
    // piece.animate([
    //   {transform: `translateY${start}`}, 
    //   {transform: `translateY${end}`},
    // ])
    position.append(piece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
   location.reload();
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id; 
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board -- update currPlayer at board position 
   board[y][x] = currPlayer; //updates the value at x of y spot in global board variable to reflect the status of the currPlayer variable
   placeInTable(y, x) //runs to insert the new piece div based on currPlayer into the correct position in htmlTable
   // check for win
   if (checkForWin()) {
     return endGame(`The ${currPlayer} won Connect4!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call endGame
   //feedback: this is crossing the boundaries of responsibilities for global board and htmlTable, loop through global board instead so you're not checking html for any data driven outcomes
   const totalCells = WIDTH * HEIGHT;
   const pieces = document.querySelectorAll(".piece").length;
   if (totalCells === pieces) {
    endGame("It's a draw!");
    return location.reload();
   }
   
   // TODO: switch currPlayer 1 <-> 2 -- Feedback: don't hardcode names, add as variables at start (p1, p2)
   if (currPlayer === "Eagles") { 
    currPlayer = "Steelers";
    }
   else if (currPlayer === "Steelers") {
     currPlayer = "Eagles";
    };
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every( 
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 //Feedback: this doesn't need to run every time, could set these parameters at the start and have it check them with _win each time
   for (let y = 0; y < HEIGHT; y++) { 
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; 
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; 
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; 
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; 
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { 
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();