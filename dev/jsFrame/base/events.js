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
Blockly.Events = {};

Blockly.Events.NAME_TYPE = 'event';

/**
 * Find all user-created variables.
 * @param {Blockly.Block} opt_block Optional root block.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.Events.allEventFunctions = function(opt_block) {
	var funcNameList = [];
	var dom = window.parent.parseHTML2DOM(false);
	var body = dom.getElementsByTagName("body");

	searchEventFunctions( body[0], funcNameList );

	return funcNameList;
};

var eventTarget = [
	'onload',
	'onunload',
	'onresize',
	'onscroll',
	
	'onclick',
	'ondblclick',
	'onmousedown',
	'onmouseup',
	'onmouseover',
	'onmouseout',
	
	'onkeydown',
	'onkeypress',
	'onkeyup',
	
	'onchange',
	'onsubmit',
	'onreset',
	
	'onfocus',
	'onblur',
];

function searchEventFunctions( element, funcNameList ){
	if( element.nodeType == 3 || element.nodeType == 8){ // skip Text & Comment node
		return;
	}
		
	for ( var i=0 ; i < eventTarget.length ; i++ ) {
		if (element.getAttribute(eventTarget[i]) != null) {
			funcNameList.push(element.getAttribute(eventTarget[i]));
		}
	}
	for( var i=0 ; i < element.childNodes.length ; i++ ){
		searchEventFunctions( element.childNodes[i], funcNameList );
	}
}

Blockly.Events.dropdownCreate = function(){
	var funcList = Blockly.Events.allEventFunctions();
	var dropdown = [];
	for( var i=0 ; i < funcList.length ; i++ ){
		dropdown[i] = [ funcList[i], funcList[i] ];
	}
	return dropdown;
}


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Events.flyoutCategory = function(blocks, gaps, margin, workspace) {
  var funcList = Blockly.Events.allEventFunctions();

  if( funcList.length > 0 ){
  	
    var getBlock = Blockly.Language.eventFunction ?
        new Blockly.Block(workspace, 'eventFunction') : null;

    getBlock && getBlock.setTitleText( funcList[0], 'FUNC');
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
Blockly.Events.refreshFlyoutCategory = function() {
  if (Blockly.Toolbox && Blockly.Toolbox.flyout_.isVisible() &&
      Blockly.Toolbox.selectedOption_.cat == Blockly.MSG_EVENT_CATEGORY) {
    Blockly.Toolbox.flyout_.hide();
    Blockly.Toolbox.flyout_.show(Blockly.MSG_EVENT_CATEGORY);
  }
};
