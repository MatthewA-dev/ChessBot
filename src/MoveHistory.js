import React from 'react';
import Piece from "./Others"

function Row(props){
    return (<p>{props.move.piece} {props.move.x},{props.move.y} to {props.move.toX},{props.move.toY}</p>);
}

export default class MoveHistory extends React.Component {
    constructor(props){
      super(props);
    }
    BuildRow(move){
      return <Row move={move}/>
    }
    BuildHistory(){
        console.log(this.props.history);
        var children = []
        this.props.history.forEach(element => {
            children.push(this.BuildRow(element));
        });
        return <div>{children}</div>;
    }
    render(){
      return (
        <div id="moveHistory">
          {this.BuildHistory()}
        </div>
      );
    }
  }
  export {MoveHistory};