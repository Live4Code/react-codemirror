import './FileTree.scss';
var jstree = require('jstree');

import React from 'react';

export default class FileTree extends React.Component {
  constructor(props) {
    super(props);
    this.treeConfig = this.initTreeConfig();
    this.getTreeData();
    this.addContextMenu();
  }

  initTreeConfig() {
    return {
      "core" : {
          'data': [{
                  "text": "Parent Node",
                  "id": "root",
                  "children": [{
                      "text": "Initially selected",
                      "state": {
                          "selected": true
                      },
                      "id": '1'
                  }, {
                      "text": "Custom Icon",
                      "icon": "fa fa-warning icon-state-danger"
                  }, {
                      "text": "Initially open",
                      "icon" : "fa fa-folder icon-state-success",
                      "state": {
                          "opened": true
                      },
                      "children": [
                          {"text": "Another node", "icon" : "fa fa-file icon-state-warning"}
                      ]
                  }, {
                      "text": "Another Custom Icon",
                      "icon": "fa fa-warning icon-state-warning"
                  }, {
                      "text": "Disabled Node",
                      "icon": "fa fa-check icon-state-success",
                      "state": {
                          "disabled": true
                      }
                  }, {
                      "text": "Sub Nodes",
                      "icon": "fa fa-folder icon-state-danger",
                      "children": [
                          {"text": "Item 1", "icon" : "fa fa-file icon-state-warning"},
                          {"text": "Item 2", "icon" : "fa fa-file icon-state-success"},
                          {"text": "Item 3", "icon" : "fa fa-file icon-state-default"},
                          {"text": "Item 4", "icon" : "fa fa-file icon-state-danger"},
                          {"text": "Item 5", "icon" : "fa fa-file icon-state-info"}
                      ]
                  }]
              },
              "Another Node"
          ]
      },
      "types" : {
          "default" : {
              "icon" : "fa fa-folder icon-state-info icon-lg"
          },
          "file" : {
              "icon" : "fa fa-file icon-state-info icon-lg"
          }
      },
      "state" : { "key" : "FileTree" },
      "plugins" : [ "state", "types" ]

    };
  }

  populateNodeChildred(node, filetree){
    if (!node.children) {
      return
    }
    for (let i=0; i< node.children.length; i++){
      node.children[i] = _.clone(filetree[node.children[i]], true);
      this.populateNodeChildred(node.children[i], filetree);
    }
  }

  getTreeData() {
    const filetree = this.props.filetree;
    let rootNode = _.clone(this.props.filetree.root, true);
    this.populateNodeChildred(rootNode, filetree);
    this.treeConfig.core.data = rootNode;
  }

  addContextMenu() {
    const filetreeActions = this.props.filetreeActions;
    let config = this.treeConfig;
    config.plugins = config.plugins || [];
    config.plugins.push("contextmenu");
    config.core = config.core || {};
    config.core.check_callback = true;
    config.contextmenu = config.contextmenu || {};
    config.contextmenu.items = function() {
      return {
        "CreateFolder": {
          "separator_before": false,
          "separator_after": false,
          "label": "New Folder",
          "action": function (obj) {
            const type = jQuery(obj.reference[0]).attr('type');
            if (type == 'file') { return; }
            const parentPath = jQuery(obj.reference[0]).attr('id').replace('_anchor','');
            let name = prompt('Enter Directory Name');
            if (name){
              const node = {id: parentPath+'/'+name, text: name, children: [], a_attr: {type: 'folder'}};
              filetreeActions.createDir(node);
            }
          }
        },
        "CreateFile": {
          "separator_before": false,
          "separator_after": false,
          "label": "New File",
          "action": function (obj) {
            const type = jQuery(obj.reference[0]).attr('type');
            if (type == 'file') { return; }
            const parentPath = jQuery(obj.reference[0]).attr('id').replace('_anchor','');
            let name = prompt('Enter File Name');
            if (name){
              const node = {id: parentPath+'/'+name, text: name, type: 'file', a_attr: {type: 'file'}};
              filetreeActions.createFile(node);
            }
          }
        },
        "Rename": {
          "separator_before": false,
          "separator_after": false,
          "label": "Rename",
          "action": function (obj) {
            const nodeId = jQuery(obj.reference[0]).attr('id').replace('_anchor','');
            var newname = prompt('Enter New Name');
            if (newname){
              filetreeActions.renameNode(nodeId, newname);
            }
          }
        },
        "Remove": {
          "separator_before": true,
          "separator_after": false,
          "label": "Remove",
          "action": function (obj) {
            if(confirm('Are you sure to remove?')){
              const nodeId = jQuery(obj.reference[0]).attr('id').replace('_anchor','');
              filetreeActions.deleteNode(nodeId);
            }
          }
        }
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    let rootNode = _.clone(nextProps.filetree.root, true);
    const filetree = nextProps.filetree;
    this.populateNodeChildred(rootNode, filetree);
    const treeNode = React.findDOMNode(this.refs.treeContainer);
    $(treeNode).jstree(true).settings.core.data = rootNode;
    $(treeNode).jstree(true).refresh();
  }

  componentDidMount() {
    const treeNode = React.findDOMNode(this.refs.treeContainer);
    $(treeNode).jstree(this.treeConfig);
    $(treeNode).on('dblclick', 'a', function(){
      let type = $(this).attr('type');
      if(type == 'file'){
        console.log($(this).parent().attr('id'));
      }
    });
  }

  componentWillUnmount() {
    const treeNode = React.findDOMNode(this.refs.treeContainer);
    $(treeNode).off('dblclick', 'a');
  }

  render() {
    return (
      <div ref="treeContainer"></div>
    );
  }

}
