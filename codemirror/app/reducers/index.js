import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';
import editors from './editors';
import filetree from './filetree';

export default combineReducers({
  lanes,
  notes,
  editors,
  filetree
});
