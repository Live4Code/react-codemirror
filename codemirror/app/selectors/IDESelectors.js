import { createSelector } from 'reselect';

const filetreeSelector = state => state.filetree;
const editorviewSelector = state => state.editorview;

export const ideSelector = createSelector(
  filetreeSelector,
  editorviewSelector,
  (filetree, editorview) => {
    return {
      filetree: filetree,
      editorview: {selected: editorview.selected, editors: editorview.visible}
    };
  }
);
