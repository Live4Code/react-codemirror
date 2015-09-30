import * as types from '../constants/CodeMirrorActionTypes';
//editors: { editor.path: editor.content }
//visible: [ editor.path ]
const initialState = {selected: '', editors: {}, visible: []};

export default function editorview(state = initialState, action) {
  let editors = {};
  let visible = [];

  switch (action.type) {
    case types.CREATE_EDITOR: //action.editor { path, content }
      editors = Object.assign({}, state.editors, {[action.editor.path]: action.editor.content})
      visible = [...state.visible, action.editor.path];
      return {selected: action.editor.path, editors, visible};

    case types.SELECT_EDITOR:
      let selectedEditor = state.editors[action.path];
      let existingVisible = _.indexOf(state.visible, action.path);
      if (selectedEditor) {
        if (existingVisible === -1) { //add path to visible
          visible = [...state.visible, action.path];
          return Object.assign({}, state, {visible}, {'selected': action.path});
        } else { //just select the path
          return Object.assign({}, state, {'selected': action.path});
        }
      }
      return state;

    case types.SELECT_TAB:
      return Object.assign(state, {'selected': action.path});

    case types.HIDE_EDITOR:
      let reselect = (state.selected === action.path) ? true : false;
      let selected = state.selected;
      visible = state.visible.filter((path) => {
        if (path !== action.path && reselect) { //hide current tab, select the previous one
          selected = path;
        }
        return path !== action.path;
      });
      if (!visible.length) { selected = ''};
      return Object.assign({}, state, {selected, visible});

    case types.UPDATE_EDITOR: //update content {path, content}
      editors = Object.assign({}, state.editors, {[action.path]: action.content});
      return Object.assign({}, state, {editors});

    case types.RENAME_EDITOR:
      const content = state.editors[action.oldPath];
      editors = Object.assign({}, state.editors);
      delete editors[action.oldPath]; //remove old editor
      editors[action.newPath] = content; //add the new one
      visible = state.visible.map((path) => { //change path in visible
          return path === action.oldPath ? action.newPath : path;
      });
      return {'selected': action.newPath, editors, visible};

    case types.DELETE_EDITOR:
      editors = Object.assign({}, state.editors);
      delete editors[action.path];
      visible = state.visible.filter((path) => path !== action.path);

      if (state.selected !== action.path) {
        return Object.assign({}, state, {editors}, {visible});
      } else {
        if (visible.length) {
          return {'selected': visible[visible.length-1], editors, visible};
        } else {
          return initialState;
        }
      }

    default:
      return state;
  }
}
