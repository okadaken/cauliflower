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
	var funcNameList = new Array();
	
	var htmltext = parent.document.getElementById('textarea_html').value;
	if (htmltext != '') {
		var dom = new DOMParser().parseFromString(htmltext, "text/xml");
		var list = dom.getElementsByTagName("button");
		for( var i=0 ; i < list.length ; i++ ){
			funcNameList.push( list[i].getAttribute("onclick") );
		}
	}

	return funcNameList;
};

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Events.flyoutCategory = function(blocks, gaps, margin, workspace) {
  var funcList = Blockly.Events.allEventFunctions();
  funcList.sort(Blockly.caseInsensitiveComparator);
  // In addition to the user's variables, we also want to display the default
  // variable name at the top.  We also don't want this duplicated if the
  // user has created a variable of the same name.
  //funcList.unshift(null);
  
  for (var i = 0; i < funcList.length; i++) {
	
    var getBlock = Blockly.Language.event_onclick ?
        new Blockly.Block(workspace, 'event_onclick') : null;

    getBlock && getBlock.initSvg();

    getBlock && getBlock.setTitleText(funcList[i], 'FUNC');
	//getBlock.appendTitle(funcList[i]);
	
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
