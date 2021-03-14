import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BoardJSON from "./BoardJSON.json"
import {Piece} from "./Others"
import {Move} from "./Others"

var colors = Object.freeze({"w":0, "b":1});


function Cell(props){
    var class_name = "cell " + SetColors(props.color);
    var image = "./pieces/" + props.pieceColor + props.piece + ".png"
    var styletxt = {backgroundImage: `url(${image})`, backgroundSize: "49px"}
    return (<div className={class_name} style={styletxt} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}></div>)
}

// Used for the board, not pieces
function SetColors(color){
    return color ? "black" : "white"; 
  }
  


class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {board: this.BuildBoard(), holding: false, holdingIndex: [null,null], holdingPiece: new Piece(null,null), currentMove: colors.w}
    }
    BuildRow(type, line){
      if(type){
        return(
          <div className="chessRow">
            {this.RenderCell(0,0,line)}
            {this.RenderCell(1,1,line)}
            {this.RenderCell(0,2,line)}
            {this.RenderCell(1,3,line)}
            {this.RenderCell(0,4,line)}
            {this.RenderCell(1,5,line)}
            {this.RenderCell(0,6,line)}
            {this.RenderCell(1,7,line)}
        </div>
        );
      }else{
        return(
          <div className="chessRow">
            {this.RenderCell(1,0,line)}
            {this.RenderCell(0,1,line)}
            {this.RenderCell(1,2,line)}
            {this.RenderCell(0,3,line)}
            {this.RenderCell(1,4,line)}
            {this.RenderCell(0,5,line)}
            {this.RenderCell(1,6,line)}
            {this.RenderCell(0,7,line)}
        </div>
        );
      }
    }
    render() {
      return (
        <div className="board" onMouseLeave={() => this.registerMouseUp(this.state.holdingIndex[0],this.state.holdingIndex[1],false)} onDragStart={() => function(){return false;}} draggable="false">
          {this.BuildRow(0,0)}
          {this.BuildRow(1,1)}
          {this.BuildRow(0,2)}
          {this.BuildRow(1,3)}
          {this.BuildRow(0,4)}
          {this.BuildRow(1,5)}
          {this.BuildRow(0,6)}
          {this.BuildRow(1,7)}
        </div>
      );
    }
    registerClick(x,y){
      this.setState({holding: true, holdingIndex: [x,y], holdingPiece: this.state.board[y][x]});
      this.setState({board: this.RemovePiece(x,y)});
    }
    registerMouseUp(x,y,placePiece){
      if(!this.state.holding){
        return;
      }
      // TODO FINISH CHECKS
      if(!placePiece || (x == this.state.holdingIndex[0] && y == this.state.holdingIndex[1]) || !this.CheckValidMove(this.state.holdingIndex[0],this.state.holdingIndex[1],x,y,this.state.holdingPiece) || ){
      // If failed move
        this.setState({board: this.AddPiece(this.state.holdingIndex[0],this.state.holdingIndex[1], this.state.holdingPiece)})
      }else{
        // If successful move
        this.setState({board: this.AddPiece(x, y, this.state.holdingPiece)})
        this.props.AddMove(new Move(
          placePiece,
          this.state.holdingIndex[0],
          this.state.holdingIndex[1],
          x,
          y
        ));
      }
      this.setState({holding: false, holdingIndex: [null,null], holdingPiece: new Piece(null,null)});
    }
    CheckCheck(board, color) {
      
    }
    AddPiece(x,y,piece){
      var board = this.state.board.slice()
      if(piece.piece == 0){
        return board;
      }
      try{
        board[y][x] = piece;
      }catch(err){
        return board;
      }
      return board;
    }
    RemovePiece(x,y){
      var board = this.state.board.slice()
      board[y][x] = new Piece(0,0);
      return board;
    }
    CheckValidMove(x,y,xx,yy,piece){
      var diag = [[1,1],[-1,1],[1,-1],[-1,-1]];
      var straight = [[1,0],[-1,0],[0,1],[0,-1]];
      var knightMoves = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, 1], [-2, -1], [-1, 2], [-1, -2]];
      var validMoves = [];
      switch(piece.piece){
        case "b":
          this.GetMoves(x,y,piece,diag).forEach(element => {
            validMoves.push(element);
          });
          break;
        case "r":
          this.GetMoves(x,y,piece,straight).forEach(element => {
            validMoves.push(element);
          });
          break;
        case "n":
          this.GetMoves(x,y,piece,knightMoves,1).forEach(element => {
            validMoves.push(element);
          });
          break;
        case "p":
          var pawnMoves = {"w": -1, "b": 1};
          var pawnTakes = [1,-1];
          try{
            if(this.state.board[y + pawnMoves[piece.color]][x].piece == 0){
              validMoves.push([x,y + pawnMoves[piece.color]]);
            }
            pawnTakes.forEach(pawnTake => {
              if(this.state.board[y + pawnMoves[piece.color]][x + pawnTake].color != piece.color && this.state.board[y + pawnMoves[piece.color]][x + pawnTake].color != 0){
                validMoves.push([x + pawnTake, y + pawnMoves[piece.color]]);
              }
            });
          }catch(err){
            // Code could break if the pawn is on the eighth rank
          }
          break;
        case "q":
          this.GetMoves(x,y,piece,straight.concat(diag)).forEach(element => {
            validMoves.push(element);
          });
          break;
        case "k":
          this.GetMoves(x,y,piece,straight.concat(diag), 1).forEach(element => {
            validMoves.push(element);
          });
          break;
      }
      var move = [xx,yy];
      var valid = false;
      validMoves.forEach(element => {
        if(element[0] == move[0] && element[1] == move[1]){
          valid = true;
        }
      });
      return valid;
    }
    GetAllMoves(color){
      for (var line in this.state.board){
        for(var tile in line){
          
        }
      }
    }
    GetMoves(x,y,piece,moveset,iters){
      var validMoves = [];
      for (const index in moveset) {
        const move = moveset[index];
        var iterations = 1;
        while(true){
          try{
            if(iters != 0 && iterations > iters){
              break;
            }
            var indexy = y + move[1] * iterations;
            var indexx = x + move[0] * iterations;
            var boardpiece = this.state.board[indexy][indexx];
            if(typeof boardpiece == 'undefined'){
              break;
            }
            if(boardpiece.color == piece.color){
              break;
            }else if(boardpiece.color == 0){
              validMoves.push([indexx,indexy]);
            }else if(boardpiece.color != piece.color && boardpiece.color != 0){
              validMoves.push([indexx,indexy]);
              break;
            }
            iterations++;
          }catch(err){
            break;
          }
        }
      }
      return validMoves;
    }
    BuildBoard(){
      var board = [];
      var boardjson = JSON.parse(JSON.stringify(BoardJSON));
      for(var linekey in boardjson){
        var row = [];
        for(var cellkey in boardjson[linekey]){
          row.push(new Piece(boardjson[linekey][cellkey]["c"],boardjson[linekey][cellkey]["p"]));
        }
        board.push(row);
      }
      return board;
    }
    RenderCell(color, x, y){
      return <Cell color={color} piece={this.state.board[y][x].piece} pieceColor={this.state.board[y][x].color} onMouseDown={() => this.registerClick(x,y)} onMouseUp={() => this.registerMouseUp(x,y,true)}/>
    }
  }
export {Board};