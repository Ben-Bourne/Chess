var whitesTurn = true;
var lastClicked;

function testFunc(){
    alert("Hi");
}

function clickMaster(){
    var colour = this.name.substring(0, 5);
    var piece = this.name.substring(6, 9);
    var buttonID = this.id;
    var validMove;
    if (this.style.backgroundColor === "green"){
        validMove = true;
    }
    else{
        validMove = false;
    }
    if (validMove){
        this.style.backgroundImage = document.getElementById(lastClicked).style.backgroundImage;
        this.name = document.getElementById(lastClicked).name;
        document.getElementById(lastClicked).style.backgroundImage = "";
        document.getElementById(lastClicked).name = "";
        whitesTurn = !whitesTurn;
    }
    colourBoard();
    if(colour === "WHITE" && whitesTurn){
        if(piece === "KNI") knightMoves(buttonID);
    }
    else if(colour === "BLACK" && !whitesTurn){
        if(piece === "KNI") knightMoves(buttonID);
    }
    lastClicked = buttonID;
}

function knightMoves(buttonID){
    var x = parseInt(buttonID.substring(0, 1));
    var y = parseInt(buttonID.substring(2, 3));
    if(x > 1 && y < 7) document.getElementById((x - 1) + "," + (y + 2)).style.backgroundColor = "green";
    if(x < 8 && y < 7) document.getElementById((x + 1) + "," + (y + 2)).style.backgroundColor = "green";
    if(x < 7 && y < 8) document.getElementById((x + 2) + "," + (y + 1)).style.backgroundColor = "green";
    if(x < 7 && y > 1) document.getElementById((x + 2) + "," + (y - 1)).style.backgroundColor = "green";
    if(x < 8 && y > 2) document.getElementById((x + 1) + "," + (y - 2)).style.backgroundColor = "green";
    if(x > 1 && y > 2) document.getElementById((x - 1) + "," + (y - 2)).style.backgroundColor = "green";
    if(x > 2 && y > 1) document.getElementById((x - 2) + "," + (y - 1)).style.backgroundColor = "green";
    if(x > 2 && y < 8) document.getElementById((x - 2) + "," + (y + 1)).style.backgroundColor = "green";
}

function createBoard(){
    var board = document.getElementById("board");
    for (var i = 8; i >= 1; --i){
        var row = document.createElement("tr");
        for (var j = 1; j <= 8; ++j){
            var cell = document.createElement("td");
            var square = document.createElement("button");
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
    var isWhite = true;
    for (var i = 8; i >= 1; --i){
        for (var j = 1; j <= 8; ++j){
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
    for (var i = 1; i <= 8; ++i){
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