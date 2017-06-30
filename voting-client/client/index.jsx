import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './Voting';

const pair = ['Sushi', 'Italian'];

// class Voting extends React.Component {
//   render() {
//     return (
//       <div className="voting">
//         <h1>I just voted</h1>
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);

// ReactDOM.render(
//   <h1>Hello World</h1>,
//   document.getElementById('app')
// );
