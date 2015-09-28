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
      this.handlerTabSelect(selected);
    }
    else if (editors.length) {
      this.handlerTabSelect(editors[0].path);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {selected} = nextProps
    if (selected && selected !== this.state.tabKey) {
      this.handlerTabSelect(selected);
    }
  }

  render() {
    const {editors} = this.props;
    return (
      <div className="row">
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
    const title = editor.path.split('/').pop();
    return (
      <Tab eventKey={editor.path} title={title}>
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

  updateCode (path, content) {
    const editorActions = this.props.editorActions;
    editorActions.updateEditor(path, content);
  }

  addEditor () {
    const editorActions = this.props.editorActions;
    const path = prompt('Enter file name');
    if (path) {
      const editor = {path, content: ''};
      editorActions.createEditor(editor);
      //this.handlerTabSelect(path);
    }
  }

  renameEditor() {
    const editorActions = this.props.editorActions;
    const newPath = prompt('Enter new name for the active editor');
    if (newPath) {
      const oldPath = this.state.tabKey;
      editorActions.renameEditor(oldPath, newPath);
      //this.handlerTabSelect(newPath);
    }
  }

  deleteEditor() {
    const editorActions = this.props.editorActions;
    const ok = confirm('Are you sure to remove the active editor?');
    if (ok) {
      const path = this.state.tabKey;
      const {editors} = this.props;
      editorActions.deleteEditor(path);
      /*
      const remainingEditors = editors.filter((editor) => {
        return editor.path !== path;
      });
      if (remainingEditors.length) {
        this.handlerTabSelect(remainingEditors[0].path);
      } */
    }
  }

  handlerTabSelect(key){
    this.setState({tabKey: key});
    let self = this;
    setTimeout(function(){
      self.refs['editor'+key].refresh();
    },500);
  }
}
