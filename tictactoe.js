
    var board, term;
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    document.getElementById("reset").addEventListener("click", function(){
      board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      document.getElementById("s1").innerHTML="&nbsp;";
      document.getElementById("s1").disabled = false;
      document.getElementById("s2").innerHTML="&nbsp;";
      document.getElementById("s2").disabled = false;

      document.getElementById("s3").innerHTML="&nbsp;";
      document.getElementById("s3").disabled = false;

      document.getElementById("s4").innerHTML="&nbsp;";
      document.getElementById("s4").disabled = false;

      document.getElementById("s5").innerHTML="&nbsp;";
      document.getElementById("s5").disabled = false;

      document.getElementById("s6").innerHTML="&nbsp;";
      document.getElementById("s6").disabled = false;

      document.getElementById("s7").innerHTML="&nbsp;";
      document.getElementById("s7").disabled = false;

      document.getElementById("s8").innerHTML="&nbsp;";
      document.getElementById("s8").disabled = false;

      document.getElementById("s9").innerHTML="&nbsp;";
      document.getElementById("s9").disabled = false;

      document.getElementById("message").innerHTML = "&nbsp;";
      document.getElementById('message').style.animation = "";


    })

  
   /* if (checkWinner(board, "X")) {
      console.log("X wins!");
    } else {
      if (checkWinner(board, "O")) {
        console.log("O wins!");
      } else {
        console.log("Draw!");
      }
    }*/
  
  
  
  function checkWinner(board, player) {
    if (board[0] === player && board[1] === player && board[2] === player) {
      return true;
    }
  
    if (board[0] === player && board[3] === player && board[6] === player) {
      return true;
    }
  
    if (board[0] === player && board[4] === player && board[8] === player) {
      return true;
    }
  
    if (board[1] === player && board[4] === player && board[7] === player) {
      return true;
    }
  
    if (board[2] === player && board[4] === player && board[6] === player) {
      return true;
    }
  
    if (board[2] === player && board[5] === player && board[8] === player) {
      return true;
    }
  
    if (board[3] === player && board[4] === player && board[5] === player) {
      return true;
    }
  
    if (board[6] === player && board[7] === player && board[8] === player) {
      return true;
    }
  
    return false;
  }
  
  function checkDraw(board) {
    if (checkWinner(board, "X") === false && checkWinner(board, "O") === false && getPossibleMoves(board).length === 0) {
      return true;
    }
  
    return false;
  }
  
  function getPossibleMoves(board) {
    var moves;
    moves = [];
  
    for (var i = 0; i < board.length; i += 1) {
      if (board[i] === " ") {
        moves.push(i);
      }
    }
  
    return moves;
  }
  
  function terminal(board, player) {
    if (checkDraw(board) || checkWinner(board, "X") || checkWinner(board, "O")) {
      return true;
    } else {
      return false;
    }
  }
  
  function playerMove(cell){
    document.getElementById(cell).style.color = "#45a9a3";
    document.getElementById(cell).innerHTML = "X"
    c = parseInt(cell[1]);
    board[c-1] = 'X';
    document.getElementById(cell).disabled = true;
    document.querySelector('#board').disabled = true;
    if (terminal(board, "X")){
      if(checkWinner(board, "X")){
        document.getElementById("message").innerHTML = "X Wins!";
        document.getElementById('message').style.animation="grow 2s linear";

      }
      else if(checkDraw(board)){
        document.getElementById("message").innerHTML = "Draw!";
        document.getElementById('message').style.animation="grow 2s linear";
      }
      }
    else{
      var cp = compMove(board);
      board[cp] = "O"; 
      setTimeout(function(){
        document.getElementById("s" + (cp+1).toString()).style.color = "#e09526";
      document.getElementById("s" + (cp+1).toString()).innerHTML = "O";
      document.getElementById("s" + (cp+1).toString()).disabled = true;
      console.log(board);
      if (terminal(board, "O")){
        if(checkWinner(board, "O")){
          document.getElementById("message").innerHTML = "O Wins!";
          document.getElementById('message').style.animation="grow 2s linear";

        }
        else if(checkDraw(board)){
          document.getElementById("message").innerHTML = "Draw!";
          document.getElementById('message').style.animation="grow 2s linear";
          

        }
      }
    }, 1000);
      
    }

}
  
  function compMove(board) {
    var bestMove, bestScore, moves, score;
    bestMove = -1;
    bestScore = -1000;
    moves = getPossibleMoves(board);
    for (var i = 0; i < board.length; i += 1) {
      board[moves[i]] = "O";
      score = minimax(board, 1, false);
      board[moves[i]] = " ";
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = moves[i];
      }
    }
    return bestMove;
  }
  
  function checkTurn(board) {
    let countO = 0;
    let countX = 0;
    for (var i = 0; i < board.length; i+=1){
        if (board[i] === "X")
            countX +=1;
        if (board[i] === "O")
            countO +=1;
    }
    if (countX > countO) {
      return "O";
    } 
    else {
      return "X";
    }
  }
  
  function minimax(board, depth, isMaximizing) {
    var bestScore, moves, score;  
    if (terminal(board, checkTurn(board))) {
      if (checkWinner(board, "O")) {
        return 100;
      } 
      else {
        if (checkWinner(board, "X")) {
          return -100;
        } 
        else {
          if (checkDraw(board)) {
            return 0;
          }
        }
      }
    }
  
    if (isMaximizing) {
      bestScore = -1000;
      moves = getPossibleMoves(board);

  
      for (var i = 0; i < moves.length; i += 1) {
        board[moves[i]] = "O";
        score = minimax(board, depth + 1, false);
        board[moves[i]] = " ";

  
        if (score > bestScore) {
          bestScore = score;
        }
      }
  
      return bestScore;
    } 
    else {
      bestScore = 1000;
      moves = getPossibleMoves(board);
  
      for (var i = 0; i < moves.length; i += 1) {
        board[moves[i]] = "X";
        score = minimax(board, depth + 1, true);
        board[moves[i]] = " ";
  
        if (score < bestScore) {
          bestScore = score;
        }
      }
  
      return bestScore;
    }
  }
  
