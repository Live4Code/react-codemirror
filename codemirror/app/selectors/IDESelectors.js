import { createSelector } from 'reselect';

const filetreeSelector = state => state.filetree;
const editorviewSelector = state => state.editorview;

function getVisibleEditors(editorview) {
  let visibleEditors = editorview.visible.map((path) => {
    return {path, 'content': editorview.editors[path]};
  });
  return {selected: editorview.selected, editors: visibleEditors};
}

export const ideSelector = createSelector(
  filetreeSelector,
  editorviewSelector,
  (filetree, editorview) => {
    return {
      filetree: filetree,
      editorview: getVisibleEditors(editorview)
    };
  }
);
