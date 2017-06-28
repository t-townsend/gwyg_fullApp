import {expect} from 'chai';
import {List, Map} from 'immutable';

describe ('immutablility', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('A List', () => {
    function addFood(currentState, food) {
      return currentState.push(food);
    }

    it('is immutable', () => {
      let state = List.of('sushi', 'italian');
      let nextState = addFood(state, 'ramen');

      expect(nextState).to.equal(List.of(
        'sushi',
        'italian',
        'ramen'
      ));
      expect(state).to.equal(List.of(
        'sushi',
        'italian'
      ));
    });
  });

  describe ('a tree', () => {
    function addFood(currentState, food){
      return currentState.update('foods', foods => foods.push(food));
    }

    it('is immutable', () => {
      let state = Map({
        foods: List.of('Noodles', 'Dim Sum')
      });
      let nextState = addFood(state, 'Burgers');

      expect(nextState).to.equal(Map({
        foods: List.of(
          'Noodles',
          'Dim Sum',
          'Burgers'
        )
      }));
      expect(state).to.equal(Map({
        foods: List.of(
          'Noodles',
          'Dim Sum'
        )
      }));
    });
  });

});
