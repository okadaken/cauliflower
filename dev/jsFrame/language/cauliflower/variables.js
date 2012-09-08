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
var valiablesColor = '#f3761d';

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.variables_get = {
  // Variable getter.
  categoryName: null, // Variables are handled specially.
  categoryID: 'variables',
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(valiablesColor);
    this.appendTitle(Blockly.LANG_VARIABLES_GET_TITLE_1);
    this.appendTitle(new Blockly.FieldDropdown(Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange), 'VAR').setText(Blockly.LANG_VARIABLES_GET_ITEM);
    this.appendTitle(Blockly.LANG_VARIABLES_GET_TITLE_2);
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};

Blockly.Language.variables_set = {
  // Variable setter.
  categoryName: null, // Variables are handled specially.
  categoryID: 'variables', // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  init: function() {
    this.setColour(valiablesColor);
    this.appendTitle(Blockly.LANG_VARIABLES_SET_TITLE_1);
    this.appendTitle(new Blockly.FieldDropdown(Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange), 'VAR').setText(Blockly.LANG_VARIABLES_SET_ITEM);
    this.appendInput(Blockly.LANG_VARIABLES_SET_TITLE_2, Blockly.INPUT_VALUE, 'VALUE', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};
