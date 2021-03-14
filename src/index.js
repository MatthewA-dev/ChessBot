import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from "./Board";
import { MoveHistory } from "./MoveHistory"

var root = document.getElementById('root');
var pieces = Object.freeze({"r": 0,"b": 1,"n": 2,"p": 3,"q": 4,"k": 5});
var piece_values = Object.freeze({"r": 3,"b": 3,"n": 3, "p": 1,"q": 9,"k": 1});
var colors = Object.freeze({"w":0, "b":1});


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {history: []}
  }
  render() {
    return (
      <div>
        <Board AddMove={this.AddMove.bind(this)} />
        <MoveHistory history={this.state.history} />
      </div>
    )
  }
  AddMove(move){
    var his = this.state.history.slice();
    his.push(move);
    this.setState({history: his});
  }
}
ReactDOM.render(
  <App />,
  root  
);