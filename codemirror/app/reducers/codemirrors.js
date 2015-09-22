import * as types from '../constants/CodeMirrorActionTypes';

const initialState = [];

export default function codemirrors(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EDITOR:
      const cm = action.cm;

      return [...state, cm];

    case types.UPDATE_EDITOR:
      return state.map((cm) => {
        return cm.path === action.path ? Object.assign({}, cm, {
          content: action.content
        }) : cm;
      });

    case types.DELETE_EDITOR:
      return state.filter((cm) => cm.id !== action.id);

    default:
      return state;
  }
}
