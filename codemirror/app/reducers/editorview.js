import * as types from '../constants/CodeMirrorActionTypes';

const initialState = {selected: '', editors: []};

export default function editorview(state = initialState, action) {
  let editors = [];

  switch (action.type) {
    case types.CREATE_EDITOR:
      editors = [...state.editors, action.editor];
      return {selected: action.editor.path, editors};

    case types.SELECT_EDITOR:
      editors = state.editors.filter((editor) => {
        return editor.path === action.path ? Object.assign({}, editor, {visible: true})
          : editor;
      });
      return {selected: action.path, editors};

    case types.HIDE_EDITOR:
      let reselect = (state.selected === action.path) ? true : false;
      let selected = state.selected;
      editors = state.editors.filter((editor) => {
        if (editor.visible && editor.path !== action.path && reselect) {
          selected = editor.path;
        }
        return editor.path === action.path ? Object.assign({}, editor, {visible: false})
          : editor;
      });
      return {selected, editors};

    case types.UPDATE_EDITOR:
      editors = state.editors.map((editor) => {
        return editor.path === action.path ? Object.assign({}, editor, {
          content: action.content
        }) : editor;
      });
      return Object.assign({}, state, {editors});

    case types.RENAME_EDITOR:
      editors = state.editors.map((editor) => {
          return editor.path === action.oldPath ? Object.assign({}, editor, {
            path: action.newPath
          }) : editor;
      });
      return {selected: action.newPath, editors};

    case types.DELETE_EDITOR:
      editors = state.editors.filter((editor) => editor.path !== action.path);
      if (editors.length) {
        return {selected: editors[editors.length-1].path, editors};
      }
      return initialState;

    default:
      return state;
  }
}
