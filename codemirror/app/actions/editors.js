import * as types from '../constants/CodeMirrorActionTypes';

export function createEditor(editor) {
  return {
    type: types.CREATE_EDITOR,
    editor
  };
};

export function selectEditor(path) {
  return {
    type: types.SELECT_EDITOR,
    path
  };
}

export function selectTab(path) {
  return {
    type: types.SELECT_TAB,
    path
  };
}

export function hideEditor(path) {
  return {
    type: types.HIDE_EDITOR,
    path
  };
}

export function updateEditor(path, content) {
  return {
    type: types.UPDATE_EDITOR,
    path,
    content
  };
};

export function renameEditor(oldPath, newPath) {
  return {
    type: types.RENAME_EDITOR,
    oldPath,
    newPath
  };
}

export function deleteEditor(path) {
  return {
    type: types.DELETE_EDITOR,
    path
  };
}
