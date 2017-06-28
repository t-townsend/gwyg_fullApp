import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Sushi']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Sushi']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Sushi', 'Italian']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sushi', 'Italian']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Sushi', 'Italian']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Sushi'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sushi', 'Italian'],
        tally: {Sushi: 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Sushi']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Sushi']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Sushi', 'Italian']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Sushi'},
      {type: 'VOTE', entry: 'Italian'},
      {type: 'VOTE', entry: 'Sushi'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Sushi'
    }));
  });
});
