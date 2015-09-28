import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';
import * as EditorActions from '../actions/editors';
import * as FileTreeActions from '../actions/filetree';

import Editors from '../components/Editors.jsx'; //CodeMirror Editors wrapped in tabs
import FileTree from '../components/FileTree.jsx';

import { ideSelector } from '../selectors/IDESelectors';

//smart Component
export default class App extends React.Component {
  constructor(props){
    super(props);

    const dispatch = props.dispatch;
    this.laneActions = bindActionCreators(LaneActions, dispatch);
    this.noteActions = bindActionCreators(NoteActions, dispatch);
    this.editorActions = bindActionCreators(EditorActions, dispatch);
    this.filetreeActions = bindActionCreators(FileTreeActions, dispatch);
  }

  render() {
    const {editorview, filetree, dispatch} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <FileTree filetree={filetree} filetreeActions={this.filetreeActions} editorActions={this.editorActions} />
          </div>
          <div className="col-md-10">
            <Editors selected={editorview.selected} editors={editorview.editors} editorActions={this.editorActions} />
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    lanes: state.lanes,
    notes: state.notes,
    editorview: visibleEditors(state.editorview),
    filetree: state.filetree
  };
}

export default connect(ideSelector)(App);
