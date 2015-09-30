
export function getParentPath(path){
  let parts = path.split('/');
  parts.pop();
  return parts.join('/');
}

export function getNameFromPath(path){
  let parts = path.split('/');
  return parts.pop();
}
