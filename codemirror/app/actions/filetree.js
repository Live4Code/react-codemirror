import * as types from '../constants/FileTreeTypes';

export function createDir(dirNode) {
  return {
    type: types.CREATE_DIR,
    node: dirNode
  };
}

export function createFile(fileNode) {
  return {
    type: types.CREATE_FILE,
    node: fileNode
  };
}

export function renameNode(nodeId, newName, newPath) {
  return {
    type: types.RENAME_NODE,
    nodeId,
    newName,
    newPath
  };
}

export function deleteNode(nodeId) {
  return {
    type: types.DELETE_NODE,
    nodeId
  };
}
