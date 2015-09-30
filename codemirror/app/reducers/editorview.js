import * as types from '../constants/CodeMirrorActionTypes';

const initialState = {selected: '', editors: [], visible: []};

function getEditor(editors, path) {
  return _.find(editors, ((editor) => {
    return editor.path === path;
  }));
}

function getIndex(editors, path) {
  return _.findIndex(editors, ((editor) => {
    return editor.path === path;
  }));
}

export default function editorview(state = initialState, action) {
  let editors = [];
  let visible = [];

  switch (action.type) {
    case types.CREATE_EDITOR:
      editors = [...state.editors, action.editor];
      visible = [...state.visible, action.editor];
      return {selected: action.editor.path, editors, visible};

    case types.SELECT_EDITOR:
      let selectedEditor = getEditor(state.editors, action.path);
      let existingVisible = getEditor(state.visible, action.path);
      if (selectedEditor && !existingVisible) {
        visible = [...state.visible, selectedEditor];
        return Object.assign({}, state, {visible}, {selected: selectedEditor.path});
      }
      return state;

    case types.SELECT_TAB:
      return Object.assign(state, {selected: action.path});

    case types.HIDE_EDITOR:
      let reselect = (state.selected === action.path) ? true : false;
      let selected = state.selected;
      visible = state.visible.filter((editor) => {
        if (editor.path !== action.path && reselect) {
          selected = editor.path;
        }
        return editor.path !== action.path;
      });
      return Object.assign({}, state, {selected, visible});

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
      visible = state.visible.map((editor) => {
          return editor.path === action.oldPath ? Object.assign({}, editor, {
            path: action.newPath
          }) : editor;
      });
      return {selected: action.newPath, editors, visible};

    case types.DELETE_EDITOR:
      editors = state.editors.filter((editor) => editor.path !== action.path);
      visible = state.visible.filter((editor) => editor.path !== action.path);
      if (state.selected === action.path && visible.length) {
        return {selected: visible[visible.length-1].path, editors, visible};
      }
      return initialState;

    default:
      return state;
  }
}
