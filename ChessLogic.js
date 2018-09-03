var whitesTurn = true;
var lastClicked;

function clickMaster(){
    let colour = this.name.substring(0, 5);
    let piece = this.name.substring(6, 9);
    let buttonID = this.id;
    let moved = false;
    if (this.style.backgroundColor === "green"){
        this.style.backgroundImage = document.getElementById(lastClicked).style.backgroundImage;
        this.name = document.getElementById(lastClicked).name;
        document.getElementById(lastClicked).style.backgroundImage = "";
        document.getElementById(lastClicked).name = "";
        whitesTurn = !whitesTurn;
        moved = true;
    }
    colourBoard();
    if((colour === "WHITE" && whitesTurn && !moved) || (colour === "BLACK" && !whitesTurn && !moved)){
        let x = parseInt(buttonID.substring(0, 1));
        let y = parseInt(buttonID.substring(2, 3));
        if(piece === "KNI") colourValid(knightMoves(x, y, colour));
        if(piece === "ROO") colourValid(rookMoves(x, y, colour));
        if(piece === "BIS") colourValid(bishopMoves(x, y, colour));
        if(piece === "QUE") colourValid(queenMoves(x, y, colour));
        if(piece === "KIN") colourValid(kingMoves(x, y, colour));
        if(piece === "PAW") colourValid(pawnMoves(x, y, colour));
    }
    lastClicked = buttonID;
}

function colourValid(moveArray){
    for (let i = 0; i < moveArray.length; ++i){
        if(moveArray[i] !== "invalid"){
            document.getElementById(moveArray[i]).style.backgroundColor = "green";
        }
    }
}

function incheck(){
    return false;
}

function validMove(x, y, colour){
    let squareToID = x + "," + y;
    if (x >= 1 && x <= 8 && y >= 1 && y <= 8){
        if (document.getElementById(squareToID).name.substring(0, 5) !== colour){
            if(!incheck()){
                return squareToID;
            }
        }
    }
    return "invalid";
}

function stopLooking(x, y){
    if (x < 1 || x > 8 || y < 1 || y > 8){
        return true;
    }
    let piece = document.getElementById(x + "," + y).name.substring(0, 5);
    if (piece === "WHITE" || piece === "BLACK"){
        return true;
    }
    return false;
}

function rookMoves(x, y, colour){
    let moves = [];
    for (let i = 1; i < 8; ++i){
        let move = validMove(x, y + i, colour);
        moves.push(move);
        if (stopLooking(x, y + i)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x, y - i, colour);
        moves.push(move);
        if (stopLooking(x, y - i)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x + i, y, colour);
        moves.push(move);
        if (stopLooking(x + i, y)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x - i, y, colour);
        moves.push(move);
        if (stopLooking(x - i, y)){
            break;
        }
    }
    return moves;
}

function bishopMoves(x, y, colour){
    let moves = [];
    for (let i = 1; i < 8; ++i){
        let move = validMove(x + i, y + i, colour);
        moves.push(move);
        if (stopLooking(x + i, y + i)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x - i, y + i, colour);
        moves.push(move);
        if (stopLooking(x - i, y + i)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x + i, y - i, colour);
        moves.push(move);
        if (stopLooking(x + i, y - i)){
            break;
        }
    }
    for (let i = 1; i < 8; ++i){
        let move = validMove(x - i, y - i, colour);
        moves.push(move);
        if (stopLooking(x - i, y - i)){
            break;
        }
    }
    return moves;
}

function queenMoves(x, y, colour){
    let moves = rookMoves(x, y, colour);
    moves = moves.concat(bishopMoves(x, y, colour));
    return moves;
}

function kingMoves(x, y, colour){
    let moves = [];
    moves.push(validMove(x + 1, y - 1, colour));
    moves.push(validMove(x + 1, y, colour));
    moves.push(validMove(x + 1, y + 1, colour));
    moves.push(validMove(x, y + 1, colour));
    moves.push(validMove(x, y - 1, colour));
    moves.push(validMove(x - 1, y - 1, colour));
    moves.push(validMove(x - 1, y, colour));
    moves.push(validMove(x - 1, y + 1, colour));
    return moves;
}

function knightMoves(x, y, colour){
    let moves = [];
    moves.push(validMove(x + 2, y + 1, colour));
    moves.push(validMove(x + 2, y - 1, colour));
    moves.push(validMove(x + 1, y + 2, colour));
    moves.push(validMove(x + 1, y - 2, colour));
    moves.push(validMove(x - 1, y + 2, colour));
    moves.push(validMove(x - 1, y - 2, colour));
    moves.push(validMove(x - 2, y + 1, colour));
    moves.push(validMove(x - 2, y - 1, colour));
    return moves;
}

function pawnMoves(x, y, colour){
    let moves = [];
    if(colour === "WHITE"){
        let piece = document.getElementById(x + "," + (y + 1)).name.substring(0, 5);
        if(piece !== "WHITE" && piece !== "BLACK" && !incheck()){
            moves.push(x + "," + (y + 1));
            if (y === 2){
                piece = document.getElementById(x + "," + (y + 2)).name.substring(0, 5);
                if(piece !== "WHITE" && piece !== "BLACK" && !incheck()) moves.push(x + "," + (y + 2));
            }
        }
        if(x > 1){
            if(document.getElementById((x - 1) + "," + (y + 1)).name.substring(0, 5) === "BLACK" && !incheck()){
                moves.push((x - 1) + "," + (y + 1));
            }
        }
        if(x < 8){
            if(document.getElementById((x + 1) + "," + (y + 1)).name.substring(0, 5) === "BLACK" && !incheck()){
                moves.push((x + 1) + "," + (y + 1));
            }
        }
    }
    else if(colour === "BLACK"){
        let piece = document.getElementById(x + "," + (y - 1)).name.substring(0, 5);
        if(piece !== "WHITE" && piece !== "BLACK" && !incheck()){
            moves.push(x + "," + (y - 1));
            if (y === 7){
                piece = document.getElementById(x + "," + (y - 2)).name.substring(0, 5);
                if(piece !== "WHITE" && piece !== "BLACK" && !incheck()) moves.push(x + "," + (y - 2));
            }
        }
        if(x > 1){
            if(document.getElementById((x - 1) + "," + (y - 1)).name.substring(0, 5) === "WHITE" && !incheck()){
                moves.push((x - 1) + "," + (y - 1));
            }
        }
        if(x < 8){
            if(document.getElementById((x + 1) + "," + (y - 1)).name.substring(0, 5) === "WHITE" && !incheck()){
                moves.push((x + 1) + "," + (y - 1));
            }
        }
    }    
    return moves;
}

function createBoard(){
    let board = document.getElementById("board");
    for (let i = 8; i >= 1; --i){
        let row = document.createElement("tr");
        for (let j = 1; j <= 8; ++j){
            let cell = document.createElement("td");
            let square = document.createElement("button");
            square.id = j + "," + i;
            square.style = "height: 70px; width: 70px; background-repeat: no-repeat";
            square.onclick = clickMaster;
            cell.appendChild(square);
            row.appendChild(square);
        }
        board.appendChild(row);
    }
    colourBoard();
    populateBoard();
}

function colourBoard(){
    let isWhite = true;
    for (let i = 8; i >= 1; --i){
        for (let j = 1; j <= 8; ++j){
            square = document.getElementById(j + "," + i);
            if(isWhite){
                square.style.backgroundColor = "rgb(219, 188, 130)";
            }
            else{
                square.style.backgroundColor = "rgb(71, 30, 13)";
            }
            isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }
}

function populateBoard(){
    document.getElementById("1,1").style.backgroundImage = "url(WHITE_ROOK.png)";
    document.getElementById("1,1").name = "WHITE_ROOK";
    document.getElementById("2,1").style.backgroundImage = "url(WHITE_KNIGHT.png)";
    document.getElementById("2,1").name = "WHITE_KNIGHT";
    document.getElementById("3,1").style.backgroundImage = "url(WHITE_BISHOP.png)";
    document.getElementById("3,1").name = "WHITE_BISHOP";
    document.getElementById("4,1").style.backgroundImage = "url(WHITE_QUEEN.png)";
    document.getElementById("4,1").name = "WHITE_QUEEN";
    document.getElementById("5,1").style.backgroundImage = "url(WHITE_KING.png)";
    document.getElementById("5,1").name = "WHITE_KING";
    document.getElementById("6,1").style.backgroundImage = "url(WHITE_BISHOP.png)";
    document.getElementById("6,1").name = "WHITE_BISHOP";
    document.getElementById("7,1").style.backgroundImage = "url(WHITE_KNIGHT.png)";
    document.getElementById("7,1").name = "WHITE_KNIGHT";
    document.getElementById("8,1").style.backgroundImage = "url(WHITE_ROOK.png)";
    document.getElementById("8,1").name = "WHITE_ROOK";
    for (let i = 1; i <= 8; ++i){
        document.getElementById(i + ",2").style.backgroundImage = "url(WHITE_PAWN.png)";
        document.getElementById(i + ",2").name = "WHITE_PAWN";
        document.getElementById(i + ",7").style.backgroundImage = "url(BLACK_PAWN.png)";
        document.getElementById(i + ",7").name = "BLACK_PAWN";
    }
    document.getElementById("1,8").style.backgroundImage = "url(BLACK_ROOK.png)";
    document.getElementById("1,8").name = "BLACK_ROOK";
    document.getElementById("2,8").style.backgroundImage = "url(BLACK_KNIGHT.png)";
    document.getElementById("2,8").name = "BLACK_KNIGHT";
    document.getElementById("3,8").style.backgroundImage = "url(BLACK_BISHOP.png)";
    document.getElementById("3,8").name = "BLACK_BISHOP";
    document.getElementById("4,8").style.backgroundImage = "url(BLACK_QUEEN.png)";
    document.getElementById("4,8").name = "BLACK_QUEEN";
    document.getElementById("5,8").style.backgroundImage = "url(BLACK_KING.png)";
    document.getElementById("5,8").name = "BLACK_KING";
    document.getElementById("6,8").style.backgroundImage = "url(BLACK_BISHOP.png)";
    document.getElementById("6,8").name = "BLACK_BISHOP";
    document.getElementById("7,8").style.backgroundImage = "url(BLACK_KNIGHT.png)";
    document.getElementById("7,8").name = "BLACK_KNIGHT";
    document.getElementById("8,8").style.backgroundImage = "url(BLACK_ROOK.png)";
    document.getElementById("8,8").name = "BLACK_ROOK";
}