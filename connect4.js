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
   //for loop to populate subarrays  -- array of arrays; Array.from() converts iterables and Array-like values to Arrays. 
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
   const top = document.createElement("tr"); //add first table row with column top id to have a dashed border and hover feature with gold background then adding a click listener to the top row of the table. handleClick will populate the player's piece within the given "x" column
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick); //addition of click listener to the top row of cells for piece drop down in game play

   for (let x = 0; x < WIDTH; x++) { 
     const headCell = document.createElement("td"); //top cell for each column with "x" id then appended to the top tr
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top); //physically adding top row to htmlBoard element
 
   // TODO: add comment for this code
   for (let y = 0; y < HEIGHT; y++) { //If height = 6, this first for loop adds 6 new table rows
     const row = document.createElement("tr"); //creating a new row every time through the loop
     for (let x = 0; x < WIDTH; x++) { // this second for loop sets the cells into the table row as td's with the y,x attribute which will populate into findSpotForCol
       const cell = document.createElement("td"); 
       cell.setAttribute("id", `${y}-${x}`); //id to be pulled later to determine positioning in table
       row.append(cell); //physically adds the new cells to each table row, 7 across because width = 7;
     }
     htmlBoard.append(row); //physically adds the new rows, 7 across, to the htmlBoard element
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   //this will run again for the next x it's given so return null if there are no empty y's
    //use board variable and get id with y,x array information, then subtract 1 from y to get the next empty y position -- fill board with player1 or player2 so you can check later if diag, horiz, or vert === currPlayer with each turn
    for (let y = HEIGHT - 1; y >= 0; y--) { //subtract 1 to work backwards through the table, y starts at HEIGHT - 1 because a new cell is added each time to the table so current y would be filled no matter what
      if (!board[y][x]) { //if y and x aren't filled
        return y; //looking for y position
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
    const position = document.getElementById(`${y}-${x}`); //create a new position every time then reflect the updated board variable position
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
   //if board is full, aka # of divs with class of .piece equals however many squares there are (WIDTHxHEIGHT) --  if the board is full with still no winner (4 in a row) then it's a tie
   const totalCells = WIDTH * HEIGHT;
   const pieces = document.querySelectorAll(".piece").length;
   if (totalCells === pieces) {
    endGame("It's a draw!");
    return location.reload();
   }
   // switch players
   // TODO: switch currPlayer 1 <-> 2
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
 
     return cells.every( // check every spot in the passed in argument to see if the array matches all conditions
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) { //setting height as the outer loop and x as inner loop to check the entire array matrix in all directions to see if there are 4 divs in a row with same "x" of currPlayer
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //checking 4 x values across to see if they match player name
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //checking 4 y values vertically to see if they match player names
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //checking diagonally toward the right
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //checking diagonally toward the left
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //compare _win function return values of each direction variable previously created. If any are true, return true that the game has been won
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();