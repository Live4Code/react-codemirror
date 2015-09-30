import './CodeMirror.scss';

import React from 'react';
//CodeMirror requires navigator, which is not available in the compiling stage
const isBrowser = typeof navigator !== 'undefined';
var CodeMirror = isBrowser ? require('codemirror') : undefined;
//language mode
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/javascript/javascript.js');

export default class CodeMirrorEditor extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

	componentDidMount () {
    let options = this.props.options;
    const mode = this.getMode(this.props.path);
    if (mode) { options.mode = mode; }

		var textareaNode = React.findDOMNode(this.refs.textarea);
		this.codeMirror = CodeMirror.fromTextArea(textareaNode, options);
		this.codeMirror.on('change', this.codemirrorValueChanged.bind(this));
		this.codeMirror.on('focus', this.focusChanged.bind(this));
		this.codeMirror.on('blur', this.focusChanged.bind(this));
		this._currentCodemirrorValue = this.props.value;
	}

	componentWillUnmount () {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	}

	componentWillReceiveProps (nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	}

  getMode(path) {
    const extRe = /(?:\.([^.]+))?$/;
    const ext = extRe.exec(path)[1];
    var mode = undefined;
    if (!ext) { return mode; }
    switch (ext) {
      case "js":
        mode = "javascript";
        break;
      case "jsx":
        mode = "javascript";
      case "html":
        mode = "htmlmixed";
        break;
      case "css":
        mode = "css";
        break;
      default:
        break;
    }
    return mode;
  }

	getCodeMirror () {
		return this.codeMirror;
	}

	focus () {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	}

  refresh() {
    if (this.codeMirror) {
      this.codeMirror.refresh();
    }
    this.setState({isFocused: true});
  }

	focusChanged (focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	}

	codemirrorValueChanged (doc, change) {
		let newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	}

	render () {
		let className = 'CodeMirror-wrapper ReactCodeMirror';
		if (this.state.isFocused) {
			className += ' ReactCodeMirror--focused';
		}
		return (
			<div className={className}>
				<textarea ref="textarea" defaultValue={this.props.value} autoComplete="off" />
			</div>
		);
	}
}

CodeMirrorEditor.propTypes = {
  onChange: React.PropTypes.func,
	onFocusChange: React.PropTypes.func,
	options: React.PropTypes.object,
	value: React.PropTypes.string
};
