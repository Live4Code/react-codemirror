import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';
import editorview from './editorview';
import filetree from './filetree';

export default combineReducers({
  lanes,
  notes,
  editorview,
  filetree
});
