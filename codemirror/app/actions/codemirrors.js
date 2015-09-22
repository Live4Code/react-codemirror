import * as types from '../constants/CodeMirrorActionTypes';

export function createEditor(cm) {
  return {
    type: types.CREATE_EDITOR,
    cm
  };
};

export function updateEditor(path, text) {
  return {
    type: types.UPDATE_EDITOR,
    path,
    text
  };
};
