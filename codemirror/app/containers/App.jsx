import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';
import * as CodeMirrorActions from '../actions/codemirrors';

import CodeMirrorEditor from '../components/CodeMirror.jsx'; //this is dump Component

//smart Component
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabs: [
        {key: 1, title: 'Tab 1', content: 'Tab 1 content' },
        {key: 2, title: 'Tab 2', content: 'Tab 2 content' },
        {key: 3, title: 'Tab 3', content: 'Tab 3 content' },
      ],
      tabKey: 1
    };
  }

  updateCode (newCode) {
    this.setState({
      code: newCode
    });
  }

  addTab () {
    let tabs = this.state.tabs;
    let key = tabs.length + 1;
    tabs.push({key, title: 'Tab '+(tabs.length+1), content: 'no content'});
    this.setState({tabs});
    this.handlerTabSelect(key);
  }

  render() {
    const {lanes, notes, codemirrors, dispatch} = this.props;
    const laneActions = bindActionCreators(LaneActions, dispatch);
    const noteActions = bindActionCreators(NoteActions, dispatch);
    const codeMirrorActions = bindActionCreators(CodeMirrorActions, dispatch);

    let options = {
			lineNumbers: true,
      theme: 'material'
		};

    let testCode = '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)';
    return (
      <div className="container">
        <div className="row">
          {/*
          <button className='btn btn-lg btn-primary' onClick={laneActions.createLane.bind(null, {
            path: 'file'
          })}>+</button> */}
        <button className='btn btn-lg btn-primary' onClick={this.addTab.bind(this)}>+</button>
        </div>
        <div className="row">
          <Tabs onSelect={this.handlerTabSelect.bind(this)} activeKey={this.state.tabKey}>
            {this.state.tabs.map(this.renderTab.bind(this))}
          </Tabs>
        </div>
      </div>
    );
  }

  renderTab(tab) {
    let testCode = tab.content;
    let options = {
			lineNumbers: true,
      theme: 'material'
		};
    let editor = this.renderEditor(tab);
    return (
      <Tab eventKey={tab.key} title={tab.title}>
        { editor }
      </Tab>
    );
  }

  renderEditor(tab) {
    let options = {
      lineNumbers: true,
      theme: 'material'
    };
    return (<CodeMirrorEditor value={tab.content} onChange={this.updateCode.bind(this)} options={options} ref={'editor'+tab.key}/>);
  }

  handlerTabSelect(key){
    this.setState({tabKey: key});
    let self = this;
    setTimeout(function(){
      self.refs['editor'+key].refresh();
    },500);
  }
}

function mapStateToProps(state) {
  return {
    lanes: state.lanes,
    notes: state.notes,
    codemirrors: state.codemirrors
  };
}

export default connect(mapStateToProps)(App);
