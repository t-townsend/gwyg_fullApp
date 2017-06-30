import React from 'react';

export default class Voting extends React.Component {
  render() {
    return (
      <div className="voting">
        <h1>I just voted</h1>
      </div>
    );
  }
}

// export default class Voting extends React.Component {
//
//   getPair = () => {
//     return this.props.pair || [];
//   }
//
//   render() {
//     return (
//       <div className="voting">
//         {this.getPair().map(entry =>
//           <button key={entry}>
//             <h1>{entry}</h1>
//           </button>)}
//       </div>
//     );
//   }
//
// }
