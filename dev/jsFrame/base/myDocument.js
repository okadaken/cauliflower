/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling variables and procedure names.
 * Note that variables and procedures share the same name space, meaning that
 * one can't have a variable and a procedure of the same name.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class for a database of variables.
 * @param {Array.<string>} reservedWords An array of words that are illegal for
 *     use as variable names in a language (e.g. ['new', 'if', 'this', ...]).
 * @constructor
 */
Blockly.MyDocument = {};

Blockly.MyDocument.NAME_TYPE = 'Document';

/**
 * Find all user-created variables.
 * @param {Blockly.Block} opt_block Optional root block.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.MyDocument.allId = function(opt_block) {
	var idList = new Array();
	
	var dom = window.parent.parseHTMLToDOM();
    if (dom != null) {
        var body = dom.getElementsByTagName("body");
        search(idList, body[0]);
    }

	return idList;
};
/**
 * 再帰的にElement内に存在するIDとタグ名一覧を取り出す。
 * 
 * @param {Object} idList
 * @param {Object} element
 */
function search( idList, element ){
	if( element.nodeType == 3 || element.nodeType == 8){ // skip Text & Comment node
		return;
	}
	if( element.getAttribute('id') != null && element.getAttribute('id').length != 0){
		idList.push( [element.getAttribute('id'), element.tagName ] );
	}
	for( var i=0 ; i < element.childNodes.length ; i++ ){
		search( idList, element.childNodes[i] );
	}
}

Blockly.MyDocument.dropdownCreate = function(){
	var idList = Blockly.MyDocument.allId();
	
	// 選択肢の中に内部保持している文字列が存在しない場合、これも選択肢として追加する。
	// （HTML側でIDを変更したのにJavascript側では変更前のIDが残る場合に起こる）
	// （この措置により、再読み込み時のブロック消滅を防止できる）
	if( this.getText() ){
		var ids = [];
		for( var i=0 ; i<idList.length ; i++ ){
			ids.push( idList[i][0] );
		}
		if( ids.indexOf( this.getText() ) == -1 ){
		idList.push( [this.getText(),''] );
		}
	}

	var dropdown = [];
	for( var i=0 ; i < idList.length ; i++ ){
		dropdown[i] = [ idList[i][0], idList[i][0] ];
	}
	return dropdown;
}

Blockly.MyDocument.dropdownChange = function(text) {
	
	if( text ){
		this.setText(text);
		
		var ids = Blockly.MyDocument.allId();
		var tag = "";
		for( var i=0 ; i < ids.length ; i++ ){
			if( ids[i][0] == text ){
				tag = ids[i][1];
				break;
			}
		}
		
		this.getLinkedDropdown().setOptions( getOption( tag ) );

	}
    window.setTimeout(Blockly.MyDocument.refreshFlyoutCategory, 1);
};
/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.MyDocument.flyoutCategory = function(blocks, gaps, margin, workspace) {
  
  if (Blockly.Language.myDocument_direct) {
    var block = new Blockly.Block(workspace, 'myDocument_direct');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  
  if (Blockly.Language.myDocument_onload) {
    var block = new Blockly.Block(workspace, 'myDocument_onload');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  
  if (Blockly.Language.myDocument_write) {
    var block = new Blockly.Block(workspace, 'myDocument_write');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
    
  if (Blockly.Language.myDocument_print) {
    var block = new Blockly.Block(workspace, 'myDocument_print');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  if (Blockly.Language.myDocument_prompt) {
    var block = new Blockly.Block(workspace, 'myDocument_prompt');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  
  if (Blockly.Language.myDocument_consolelog) {
    var block = new Blockly.Block(workspace, 'myDocument_consolelog');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }

  var idList = Blockly.MyDocument.allId();

  if( idList.length > 0 ){	
    var setBlock = Blockly.Language.myDocument_set ?
        new Blockly.Block(workspace, 'myDocument_set') : null;

    setBlock && setBlock.setTitleText( idList[0][0], 'TARGET');
    setBlock && setBlock.initSvg();
    setBlock && blocks.push(setBlock);
    if (setBlock) {
      gaps.push(margin, margin * 3);
    } else {
      gaps.push(margin * 2);
    }

    var getBlock = Blockly.Language.myDocument_get ?
        new Blockly.Block(workspace, 'myDocument_get') : null;

    getBlock && getBlock.setTitleText( idList[0][0], 'TARGET');
    getBlock && getBlock.initSvg();
    getBlock && blocks.push(getBlock);
    if (getBlock) {
      gaps.push(margin, margin * 3);
    } else {
      gaps.push(margin * 2);
    }

  }
};

/**
 * Refresh the variable flyout if it is open.
 * Only used if the flyout's autoClose is false.
 */
Blockly.MyDocument.refreshFlyoutCategory = function() {
  if (Blockly.Toolbox && Blockly.Toolbox.flyout_.isVisible() &&
      Blockly.Toolbox.selectedOption_.cat == Blockly.MSG_MYDOCUMENT_CATEGORY) {
    Blockly.Toolbox.flyout_.hide();
    Blockly.Toolbox.flyout_.show(Blockly.MSG_MYDOCUMENT_CATEGORY);
  }
};
