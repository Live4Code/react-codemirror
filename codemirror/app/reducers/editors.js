import * as types from '../constants/CodeMirrorActionTypes';

const initialState = [];

export default function editors(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EDITOR:
      const editor = action.editor;

      return [...state, editor];

    case types.UPDATE_EDITOR:
      return state.map((editor) => {
        return editor.path === action.path ? Object.assign({}, editor, {
          content: action.content
        }) : editor;
      });

    case types.RENAME_EDITOR:
      return state.map((editor) => {
          return editor.path === action.oldPath ? Object.assign({}, editor, {
            path: action.newPath
          }) : editor;
      });

    case types.DELETE_EDITOR:
      return state.filter((editor) => editor.path !== action.path);

    default:
      return state;
  }
}
