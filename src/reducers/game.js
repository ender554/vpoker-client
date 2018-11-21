import { FETCH_GAME_REQUEST, FETCH_GAME_SUCCESS, FETCH_GAME_ERROR, FETCH_HAND, HOLD_CARD } from '../actions/game';
import { AUTH_SUCCESS } from '../actions/auth';

const initialState = {
  loggedIn: false,
  loading: false,
  cards: [
    {
      rank: "a",
      suit: "s",
      held: false
    },
    {
      rank: "a",
      suit: "s",
      held: false
    },
    {
      rank: "a",
      suit: "s",
      held: false
    },
    {
      rank: "a",
      suit: "s",
      held: false
    },
    {
      rank: "a",
      suit: "s",
      held: false
    }
  ],
  score: 0,
  error: null
}

export default function Reducer(state = initialState, action) {
  console.log(state, action);

  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        error: null
      }
    }

    case FETCH_HAND: {
      const newHand = [];
      for(let i = 0; i < action.hand.length; i++){
        const card = {
          suit: action.hand[i].suit.name,
          rank: action.hand[i].rank.shortName,
          held: false
        }
        newHand.push(card);
      }

      return{
        ...state,
        loading: false,
        cards: newHand
      }
    }

    case HOLD_CARD: {
      // console.log('holding card' + action.hand + " " + state.cards[action.hand].suit);
      const heldHand = [];
      for(let i = 0; i < state.cards.length; i++){
        if(i === action.hand){
          const card = {
            suit: state.cards[i].suit,
            rank: state.cards[i].rank,
            held: !state.cards[i].held
          }
          heldHand.push(card);
        }
        else {
          const card = {
            suit: state.cards[i].suit,
            rank: state.cards[i].rank,
            held: state.cards[i].held
          }
          heldHand.push(card);
        }
      }
      return {
        ...state,
        loading: false,
        cards: heldHand
      }
    }

    case FETCH_GAME_REQUEST: {
      console.log('fetch game request');
      return {
        state,
        loading: true,
        error: null
      }
    }
    case FETCH_GAME_SUCCESS: {
      return{
        ...state,
        cards: action.cards,
        loggedIn: true,
        loading: false
      }
    }
    case FETCH_GAME_ERROR: {
      return{
        ...state,
        loading: false,
        error: action.error
      }
    }

    

    default: {
      return state;
    }
  }
}