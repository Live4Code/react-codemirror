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

export function renameNode(nodeId, name) {
  return {
    type: types.RENAME_NODE,
    nodeId,
    name
  };
}

export function deleteNode(nodeId) {
  return {
    type: types.DELETE_NODE,
    nodeId
  };
}
