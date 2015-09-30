import './Editors.scss';
import * as util from '../util/editor';

import React from 'react';
import { Tabs, Tab} from 'react-bootstrap';

import CodeMirrorEditor from './CodeMirror.jsx'; //CodeMirror Editor

export default class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: '',
    };
  }

  componentDidMount() {
    const {selected, editors} = this.props;
    if (selected) {
      this.handlerTabSelect(selected, true);
    }
    else if (editors.length) {
      this.handlerTabSelect(editors[0].path, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {selected} = nextProps
    if (selected && selected !== this.state.tabKey) {
      this.handlerTabSelect(selected, true);
    }
  }

  render() {
    const {editors} = this.props;
    return (
      <div className="row Editors-wrapper">
        <div className="col-md-12">
          <button className='btn btn-primary' onClick={this.addEditor.bind(this)}>+ New</button>
          <button className='btn btn-warning' onClick={this.renameEditor.bind(this)}>Rename</button>
          <button className='btn btn-danger' onClick={this.deleteEditor.bind(this)}>Delete</button>
        </div>
        <div className="col-md-12">
          <Tabs onSelect={this.handlerTabSelect.bind(this)} activeKey={this.state.tabKey}>
            {editors.map(this.renderTab.bind(this))}
          </Tabs>
        </div>
      </div>
    )
  }

  renderTab(editor) {
    const codemirror = this.renderEditor(editor);
    const title = util.getNameFromPath(editor.path);
    const header = (
      <div>
        <span className='editor-title'>{title}</span>
        <span className='fa fa-close close-tab' onClick={this.closeEditor.bind(this, editor.path)}></span>
      </div>
    );
    return (
      <Tab eventKey={editor.path} title={header}>
        { codemirror }
      </Tab>
    );
  }

  renderEditor(editor) {
    const options = {
      lineNumbers: true,
      theme: 'material'
    };
    return (<CodeMirrorEditor value={editor.content} path={editor.path} onChange={this.updateCode.bind(this, editor.path)}
      options={options} ref={'editor'+editor.path}/>);
  }

  closeEditor(path, e) {
    this.props.editorActions.hideEditor(path);
    return false;
  }

  updateCode (path, content) {
    this.props.editorActions.updateEditor(path, content);
  }

  addEditor () {
    let path = prompt('Enter file name');
    if (path) {
      if (path.indexOf('root')!==0) {
        if (path[0] === '/') {
          path  = 'root'+path;
        } else {
          path = 'root/'+path;
        }
      }
      const node = {id: path, text: util.getNameFromPath(path), type: 'file', a_attr: {type: 'file'}};
      this.props.filetreeActions.createFile(node);
      const editor = {path: path, content: ''};
      this.props.editorActions.createEditor(editor);
    }
  }

  renameEditor() {
    const newName = prompt('Enter new name for the active editor');
    if (newName) {
      const oldPath = this.state.tabKey;
      const parentId = util.getParentPath(oldPath);
      const newPath = parentId+'/'+newName;
      this.props.filetreeActions.renameNode(oldPath, newName, newPath);
      this.props.editorActions.renameEditor(oldPath, newPath);
    }
  }

  deleteEditor() {
    const ok = confirm('Are you sure to remove the active editor?');
    if (ok) {
      const path = this.state.tabKey;
      const {editors} = this.props;
      this.props.editorActions.deleteEditor(path);
      this.props.filetreeActions.deleteNode(path);
    }
  }

  handlerTabSelect(key, fromProps){
    this.setState({tabKey: key});
    if (!fromProps) {
      this.props.editorActions.selectTab(key);
    }
    let self = this;
    setTimeout(function(){
      self.refs['editor'+key].refresh();
    },200);
  }
}
