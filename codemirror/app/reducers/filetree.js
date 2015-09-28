import * as types from '../constants/FileTreeTypes';

const rootNode = { id: 'root', text: 'root', children: [] };
const initialState = { [rootNode.id]: rootNode, updated: (new Date()).valueOf() };

function createNode(state, node) {
  const parentId = node.id.substring(0,node.id.length-node.text.length-1);
  let parentNode = state[parentId];
  if (!parentNode || !parentNode.children) {
    return state;
  }
  parentNode.children.push(node.id);
  parentNode.children = parentNode.children.sort((a, b)=>{ //sort alphabetically
    return (a <= b) ? -1 : 1;
  });
  return Object.assign({}, state, { [parentNode.id]: parentNode }, { [node.id]: node}, {updated: (new Date()).valueOf()});
}

function deleteNode(state, node) {
  if (!node){
    return state;
  }
  const parentId = node.id.substring(0,node.id.length-node.text.length-1);
  let parentNode = state[parentId];
  if (!parentNode || !parentNode.children) {
    return state;
  }
  let stateCopy = Object.assign({}, state, {updated: (new Date()).valueOf()});
  delete stateCopy[node.id];
  parentNode = stateCopy[parentId];
  parentNode.children = parentNode.children.filter((childId) => {
    return childId !== node.id;
  });
  return stateCopy;
}

export default function filetree(state = initialState, action){
  switch (action.type) {
    case types.CREATE_DIR:
      return createNode(state, action.node);

    case types.CREATE_FILE:
      return createNode(state, action.node);

    case types.RENAME_NODE:
      let node = state[action.nodeId];
      let state1 = deleteNode(state, node);
      let newNode = Object.assign({}, node);
      newNode.id = action.newPath;
      newNode.text = action.newName;
      return createNode(state1, newNode);

    case types.DELETE_NODE:
      return deleteNode(state, state[action.nodeId]);

    default:
      return state;
  }
}
