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
var textColor = '#4a6cd4';

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.text = {
  // Text value.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_TEXT_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.appendTitle(Blockly.LANG_TEXT_TEXT_TITLE);
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP_1);
  }
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_JOIN_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD0', null);
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD1', null);
    this.setOutput(true, String);
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP_1);
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      this.appendInput('', Blockly.INPUT_VALUE, 'ADD' + x, null);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.inputList[0];
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and destroy all inputs.
    for (var x = this.itemCount_ - 1; x >= 0; x--) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendInput('', Blockly.INPUT_VALUE, 'ADD' + this.itemCount_, null);
      // Reconnect any child blocks.
      if (itemBlock.valueInput_) {
        input.connect(itemBlock.valueInput_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueInput_ = input && input.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.text_create_join_container = {
  // Container.
  init: function() {
    this.setColour(textColor);
    this.appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(textColor);
    this.appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_length = {
  // String length.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_LENGTH_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', [String]);
    this.setOutput(true, Number);
    this.appendInput(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_LENGTH_TOOLTIP_1);
  }
};

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_INDEXOF_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.setOutput(true, Number);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(menu, 'END');
    this.appendTitle(Blockly.LANG_TEXT_INDEXOF_TITLE_FIND);
    this.appendInput(Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE, Blockly.INPUT_VALUE, 'FIND', String);
    this.appendInput(Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT, Blockly.INPUT_VALUE, 'VALUE', String);
    this.setTooltip(Blockly.LANG_TEXT_INDEXOF_TOOLTIP_1);
  }
};

Blockly.Language.text_indexOf.OPERATORS = [[Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'], [Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST, 'LAST']];


Blockly.Language.text_charAt = {
  // Get a character from the string.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_CHARAT_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', String);
    this.setOutput(true, String);
    this.appendInput(Blockly.LANG_TEXT_CHARAT_INPUT_AT, Blockly.INPUT_VALUE, 'AT', Number);
    this.appendInput(Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_CHARAT_TOOLTIP_1);
  }
};

Blockly.Language.text_endString = {
  // Return a leading or trailing substring.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_ENDSTRING_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.setOutput(true, String);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', String);
    this.appendInput(Blockly.LANG_TEXT_ENDSTRING_INPUT1, Blockly.DUMMY_INPUT, '', null);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'END'], Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput(Blockly.LANG_TEXT_ENDSTRING_INPUT2, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_ENDSTRING_TOOLTIP_1);
  }
};

Blockly.Language.text_endString.OPERATORS = [[Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST, 'FIRST'], [Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST, 'LAST']];





Blockly.Language.text_changeCase = {
  // Change capitalization.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_CHANGECASE_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.setOutput(true, String);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', String);
    this.appendInput(Blockly.LANG_TEXT_CHANGECASE_TITLE_TO1, Blockly.DUMMY_INPUT, '', null);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'CASE'], Blockly.DUMMY_INPUT, '', null);
    this.appendInput(Blockly.LANG_TEXT_CHANGECASE_TITLE_TO2, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_1);
  }
};

Blockly.Language.text_changeCase.OPERATORS = [[Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'], [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE']//, [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']//タイトルケースは不要と判断
];


Blockly.Language.text_append = {
  // Append to a variable in place.
  categoryName: Blockly.LANG_CATEGORY_TEXT,
  categoryID: 'text',
  helpUrl: Blockly.LANG_TEXT_APPEND_HELPURL,
  init: function() {
    this.setColour(textColor);
    this.appendTitle(Blockly.LANG_TEXT_APPEND_TO);
    this.appendTitle(new Blockly.FieldDropdown(Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange), 'VAR').setText(Blockly.LANG_TEXT_APPEND_VARIABLE);
    this.appendInput(Blockly.LANG_TEXT_APPEND_APPENDTEXT1, Blockly.INPUT_VALUE, 'TEXT', null);
    this.appendInput(Blockly.LANG_TEXT_APPEND_APPENDTEXT2, Blockly.DUMMY_INPUT, '', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_TEXT_APPEND_TOOLTIP_1.replace('%1', thisBlock.getTitleText('VAR'));
    });
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

//トリムは不要と判断
/*

 Blockly.Language.text_trim = {

 // Trim spaces.

 categoryName: Blockly.LANG_CATEGORY_TEXT,

 categoryID: 'text',

 helpUrl: Blockly.LANG_TEXT_TRIM_HELPURL,

 init: function() {

 this.setColour(textColor);

 this.appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SPACE);

 var menu = new Blockly.FieldDropdown(this.OPERATORS, function(text) {

 var newTitle = (text == Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH) ? Blockly.LANG_TEXT_TRIM_TITLE_SIDES : Blockly.LANG_TEXT_TRIM_TITLE_SIDE;

 this.sourceBlock_.setTitleText(newTitle, 'SIDES');

 this.setText(text);

 });

 this.appendTitle(menu, 'MODE');

 this.appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SIDES, 'SIDES');

 this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', String);

 this.setOutput(true, String);

 this.setTooltip(Blockly.LANG_TEXT_TRIM_TOOLTIP_1);

 },

 mutationToDom: function() {

 // Save whether the 'sides' title should be plural or singular.

 var container = document.createElement('mutation');

 var plural = (this.getTitleValue('MODE') == 'BOTH');

 container.setAttribute('plural', plural);

 return container;

 },

 domToMutation: function(xmlElement) {

 // Restore the 'sides' title as plural or singular.

 var plural = (xmlElement.getAttribute('plural') == 'true');

 this.setTitleText(plural ? Blockly.LANG_TEXT_TRIM_TITLE_SIDES : Blockly.LANG_TEXT_TRIM_TITLE_SIDE, 'SIDES');

 }

 };

 Blockly.Language.text_trim.OPERATORS = [[Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH, 'BOTH'], [Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT, 'LEFT'], [Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']];

 */

