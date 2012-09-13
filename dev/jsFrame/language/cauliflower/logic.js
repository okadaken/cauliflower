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
var logicColor = '#0494dc';

/**
 * @fileoverview Logic blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
if (!Blockly.Language) 
  Blockly.Language = {};


Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  init: function() {
    this.setColour(logicColor);
    this.setOutput(true, Boolean);
    this.appendTitle(Blockly.LANG_LOGIC_BOOLEAN_VALUE);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(dropdown, 'BOOL');
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};

Blockly.Language.logic_boolean.OPERATORS = [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'], [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];

Blockly.Language.logic_compare = {
  // Comparison operator.
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    this.setColour(logicColor);
    this.setOutput(true, Boolean);
    this.appendInput('', Blockly.INPUT_VALUE, 'A', null);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', null);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_compare.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_compare.OPERATORS = [['=', 'EQ'], ['\u2260', 'NEQ'], ['<', 'LT'], ['\u2266', 'LTE'], ['>', 'GT'], ['\u2267', 'GTE']];

Blockly.Language.logic_compare.TOOLTIPS = {
  EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
  NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
  LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
  GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
  GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
};

Blockly.Language.logic_operation = {
  // Logical operations: 'and', 'or'.
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(logicColor);
    this.setOutput(true, Boolean);
    this.appendInput('', Blockly.INPUT_VALUE, 'A', Boolean);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', Boolean);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_operation.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_operation.OPERATORS = [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'], [Blockly.LANG_LOGIC_OPERATION_OR, 'OR']];

Blockly.Language.logic_operation.TOOLTIPS = {
  AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
  OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
};

Blockly.Language.logic_negate = {
  // Negation.
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  init: function() {
    this.setColour(logicColor);
    this.setOutput(true, Boolean);
    this.appendInput('', Blockly.INPUT_VALUE, 'BOOL', Boolean);
    this.appendInput(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1);
  }
};

Blockly.Language.logic_isundefined = {
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  init: function() {
    this.setColour(logicColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', null);//nullでいいのか微妙なところ
    this.setOutput(true, Boolean);
    this.appendInput(Blockly.LANG_LOGIC_IS_UNDEFINED_INPUT, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LOGIC_IS_UNDEFINED_TOOLTIP1);
  }
};

Blockly.Language.logic_isnan = {
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'logic',
  init: function() {
    this.setColour(logicColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', Number);
    this.setOutput(true, Boolean);
    this.appendInput(Blockly.LANG_LOGIC_ISNAN_INPUT, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LOGIC_ISNAN_TOOLTIP_1);
  }
};

Blockly.Language.logic_isEmpty = {
  categoryName: Blockly.LANG_CATEGORY_LOGIC,
  categoryID: 'text',
  init: function() {
    this.setColour(logicColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', [String, Array]);
    this.setOutput(true, Boolean);
    this.appendInput(Blockly.LANG_LOGIC_ISEMPTY_INPUT_ISEMPTY, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LOGIC_ISEMPTY_TOOLTIP_1);
  }
};
