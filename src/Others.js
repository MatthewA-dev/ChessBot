class Piece{
  constructor(color, piece){
    this.piece = piece;
    this.color = color;
  }
}

class Move{
  constructor(piece,x,y,toX,toY,promotion){
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.toX = toX;
    this.toY = toY;
    this.promotion = promotion;
  }
}
export {Piece, Move};