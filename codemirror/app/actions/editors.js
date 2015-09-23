import * as types from '../constants/CodeMirrorActionTypes';

export function createEditor(editor) {
  return {
    type: types.CREATE_EDITOR,
    editor
  };
};

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
