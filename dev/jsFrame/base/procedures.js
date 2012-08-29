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
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 */
Blockly.Procedures = {};

Blockly.Procedures.NAME_TYPE = 'procedure';

/**
 * Find all user-created procedure definitions.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.Procedures.allProcedures = function() {
  var blocks = Blockly.mainWorkspace.getAllBlocks(false);
  var proceduresReturn = [];
  var proceduresNoReturn = [];
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getProcedureDef;
    if (func) {
      var tuple = func.call(blocks[x]);
      if (tuple) {
        if (tuple[2]) {
          proceduresReturn.push(tuple);
        } else {
          proceduresNoReturn.push(tuple);
        }
      }
    }
  }

  function tupleComparator(ta, tb) {
    a = ta[0].toLowerCase();
    b = tb[0].toLowerCase();
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  proceduresNoReturn.sort(tupleComparator);
  proceduresReturn.sort(tupleComparator);
  return [proceduresNoReturn, proceduresReturn];
};

/**
 * Ensure two identically-named procedures don't exist.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Procedures.findLegalName = function(name, block) {

  function getLegalName( name, workspace, block ){
	  while (!Blockly.Procedures.isLegalName(name, workspace, block)) {
	    // Collision with another procedure.
	    var r = name.match(/^(.*?)(\d+)$/);
	    if (!r) {
	      name += '2';
	    } else {
	      name = r[1] + (parseInt(r[2], 10) + 1);
	    }
	  }
	  return name;
  }

  if (!block.workspace.editable) {
    //return name;
	//主workspaceではなく、メニュー内workspaceであると仮定する。
	return getLegalName( name, Blockly.mainWorkspace, block );
	
  } else {
  	return getLegalName( name, block.workspace, block );
  }
};

/**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 */
Blockly.Procedures.isLegalName = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x] == opt_exclude) {
      continue;
    }
    var func = blocks[x].getProcedureDef;
    if (func) {
      var procName = func.call(blocks[x]);
      if (Blockly.Names.equals(procName[0], name)) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} text The proposed new name.
 * @return {?string} The accepted name, or null if rejected.
 */
Blockly.Procedures.rename = function(text) {
  if (!this.sourceBlock_.editable) {
    return text;
  }
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  text = text.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  if (!text) {
    return null;
  }
  // Ensure two identically-named procedures don't exist.
  text = Blockly.Procedures.findLegalName(text, this.sourceBlock_);
  // Rename any callers.
  var blocks = this.sourceBlock_.workspace.getAllBlocks(false);
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].renameProcedure;
    if (func) {
      func.call(blocks[x], this.text_, text);
    }
  }
  window.setTimeout(Blockly.Procedures.refreshFlyoutCategory, 1);
  return text;
};

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Procedures.flyoutCategory = function(blocks, gaps, margin, workspace) {
  if (Blockly.Language.procedures_defnoreturn) {
    var block = new Blockly.Block(workspace, 'procedures_defnoreturn');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  if (Blockly.Language.procedures_defreturn) {
    var block = new Blockly.Block(workspace, 'procedures_defreturn');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }

  function populateProcedures(procedureList, templateName) {
    for (var x = 0; x < procedureList.length; x++) {
      var block = new Blockly.Block(workspace, templateName);
      block.setTitleText(procedureList[x][0], 'NAME');
      var tempIds = [];
      for (var t = 0; t < procedureList[x][1].length; t++) {
        tempIds[t] = 'ARG' + t;
      }
      block.setProcedureParameters(procedureList[x][1], tempIds);
      block.initSvg();
      blocks.push(block);
      gaps.push(margin * 2);
    }
  }

  var tuple = Blockly.Procedures.allProcedures();
  populateProcedures(tuple[0], 'procedures_callnoreturn');
  populateProcedures(tuple[1], 'procedures_callreturn');
};

/**
 * Refresh the procedure flyout if it is open.
 * Only used if the flyout's autoClose is false.
 */
Blockly.Procedures.refreshFlyoutCategory = function() {
  if (Blockly.Toolbox && Blockly.Toolbox.flyout_.isVisible() &&
      Blockly.Toolbox.selectedOption_.cat == Blockly.MSG_PROCEDURE_CATEGORY) {
    Blockly.Toolbox.flyout_.hide();
    Blockly.Toolbox.flyout_.show(Blockly.MSG_PROCEDURE_CATEGORY);
  }
};

/**
 * Find all the callers of a named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Blockly.Procedures.getCallers = function(name, workspace) {
  callers = [];
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getProcedureCall;
    if (func) {
      var procName = func.call(blocks[x]);
      // Procedure name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[x]);
      }
    }
  }
  return callers;
};

/**
 * When a procedure definition is destroyed, find and destroy all its callers.
 * @param {string} name Name of deleted procedure definition.
 * @param {!Blockly.Workspace} workspace The workspace to delete callers from.
 */
Blockly.Procedures.destroyCallers = function(name, workspace) {
  var callers = Blockly.Procedures.getCallers(name, workspace);
  for (var x = 0; x < callers.length; x++) {
    callers[x].destroy(true);
  }
  window.setTimeout(Blockly.Procedures.refreshFlyoutCategory, 1);
};

/**
 * When a procedure definition changes its parameters, find and edit all its
 * callers.
 * @param {string} name Name of edited procedure definition.
 * @param {!Blockly.Workspace} workspace The workspace to delete callers from.
 * @param {!Array.<string>} paramNames Array of parameter names.
 * @param {!Array.<string>} paramIds Array of unique parameter IDs.
 */
Blockly.Procedures.mutateCallers = function(name, workspace,
                                            paramNames, paramIds) {
  var callers = Blockly.Procedures.getCallers(name, workspace);
  for (var x = 0; x < callers.length; x++) {
    callers[x].setProcedureParameters(paramNames, paramIds);
  }
};

//-------------------------------------------------------------------------------

Blockly.Procedures.allEventFunctions = function() {
	var funcNameList = [];
	var dom = window.parent.parseHTML2DOM(false);
	var body = dom.getElementsByTagName("body");

	Blockly.Procedures.searchEventFunctions( body[0], funcNameList );

	return funcNameList;
};

Blockly.Procedures.eventTarget = [
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
	'onblur'
];

Blockly.Procedures.searchEventFunctions = function( element, funcNameList ){
	if( element.nodeType == 3 || element.nodeType == 8){ // skip Text & Comment node
		return;
	}
	for ( var i=0 ; i < Blockly.Procedures.eventTarget.length ; i++ ) {
		var func = element.getAttribute( Blockly.Procedures.eventTarget[i] );
		if ( func && funcNameList.indexOf(func)==-1 ) {
			funcNameList.push(func);
		}
	}
	for( var i=0 ; i < element.childNodes.length ; i++ ){
		Blockly.Procedures.searchEventFunctions( element.childNodes[i], funcNameList );
	}
}

function removeBrackets( funcList ){
	for( var i=0 ; i<funcList.length ; i++ ){
		var tmp = funcList[i].replace(' ','');
		if( tmp.slice(tmp.length-2) == '()' ){
			funcList[i] = tmp.slice( 0, tmp.length-2 );
		}
	}
}

Blockly.Procedures.dropdownCreate = function( initValue ) {

  var funcList = Blockly.Procedures.allEventFunctions();
  removeBrackets( funcList );
  funcList.sort(Blockly.caseInsensitiveComparator);
  
  if (initValue && funcList.indexOf(initValue) == -1) {
    funcList.unshift(initValue);
  }
  
  funcList.push(Blockly.MSG_RENAME_PROCEDURE);

  var options = [];
  for (var x = 0; x < funcList.length; x++) {
    options[x] = [funcList[x], funcList[x]];
  }
  return options;
};

Blockly.Procedures.dropdownChange = function(text) {
  function promptName(promptText, defaultText) {
    Blockly.hideChaff();
    var newVar = window.prompt(promptText, defaultText);
    // Merge runs of whitespace.  Strip leading and trailing whitespace.
    // Beyond this, all names are legal.
    return newVar && newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
  }
  if (text == Blockly.MSG_RENAME_PROCEDURE) {
    var oldVar = this.getText();
    text = promptName(Blockly.MSG_RENAME_PROCEDURE_TITLE.replace('%1', oldVar),
                      oldVar);
    if (text) {
      Blockly.Procedures.renameProcedure(oldVar, text);
    }
  } else if( text ){
	this.setText(text);
  }
  window.setTimeout(Blockly.Procedures.refreshFlyoutCategory, 1);
};

Blockly.Procedures.renameProcedure = function(oldName, newName) {
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].renameProcedure;
    if (func) {
      func.call(blocks[x], oldName, newName);
    }
  }
};
