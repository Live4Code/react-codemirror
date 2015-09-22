import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';
import codemirrors from './codemirrors';

export default combineReducers({
  lanes,
  notes,
  codemirrors
});
