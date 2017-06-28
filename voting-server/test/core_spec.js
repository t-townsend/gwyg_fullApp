import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe ('application logic', () => {
  describe('setEntries', () => {

      it ('adds the entries to the state', () => {
        const state = Map();
        const entries = List.of('Sushi', 'Italian');
        const nextState = setEntries(state, entries);

        expect(nextState).to.equal(Map({
          entries: List.of('Sushi', 'Italian')
        }));
      });

      it('converts to immutable', () => {
          const state = Map();
          const entries = ['Sushi', 'Italian'];
          const nextState = setEntries(state, entries);
          expect(nextState).to.equal(Map({
            entries: List.of('Sushi', 'Italian')
          }));
      });
  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Sushi', 'Italian', 'Ramen')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sushi', 'Italian')
        }),
        entries: List.of('Ramen')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Sushi', 'Italian'),
          tally: Map({
            'Sushi': 4,
            'Italian': 2
          })
        }),
        entries: List.of('Ramen', 'Poke', 'Pizza')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ramen', 'Poke')
        }),
        entries: List.of('Pizza', 'Sushi')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Sushi', 'Italian'),
          tally: Map({
            'Sushi': 4,
            'Italian': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Sushi'
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
          pair: List.of('Sushi', 'Italian')
      });
      const nextState = vote(state, 'Sushi');
      expect(nextState).to.equal(Map({
          pair: List.of('Sushi', 'Italian'),
          tally: Map({
            'Sushi': 1
          })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
          pair: List.of('Sushi', 'Italian'),
          tally: Map({
            'Sushi': 3,
            'Italian': 2,
          })
      });
      const nextState = vote(state, 'Sushi');
      expect(nextState).to.equal(Map({
          pair: List.of('Sushi', 'Italian'),
          tally: Map({
            'Sushi': 4,
            'Italian': 2
          })
      }));
    });
  });
});
