import { createSelector } from 'reselect';

function visibleEditors(editorview){
  let editors = editorview.editors.filter((editor) => {
    return editor.visible;
  });
  return Object.assign({}, editorview, {editors});
}

const filetreeSelector = state => state.filetree;
const editorviewSelector = state => state.editorview;

export const ideSelector = createSelector(
  filetreeSelector,
  editorviewSelector,
  (filetree, editorview) => {
    return {
      filetree: filetree,
      editorview: visibleEditors(editorview)
    };
  }
);
