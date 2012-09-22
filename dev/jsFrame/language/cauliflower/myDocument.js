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
var myDocumentColor = '#8e56e3';

/**
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
if (!Blockly.Language) 
  Blockly.Language = {};

function allOption() {

  var options = [];
  
  {
    var allOptions = [];
    allOptions.push(['要素', '']);
    allOptions.push(['要素の値', '.value']);
    allOptions.push(['要素のHTML', '.innerHTML']);
    
    options.push(['all', allOptions]);
  }
  {
    var divOptions = [];
    divOptions.push(['要素のスタイルの文字色', '.style.color']);
    divOptions.push(['要素のスタイルの背景色', '.style.backgroundColor']);
    
    options.push(['div', divOptions]);
  }
  {
    var inputOptions = [];
    inputOptions.push(['要素のスタイルの背景色', '.style.backgroundColor']);
    
    options.push(['input', inputOptions]);
  }
  
  return options;
}

function getOption(tagName) {

  var allOptions = allOption();
  
  var options = [];
  for (var i = 0; i < allOptions.length; i++) {
    if (allOptions[i][0] == 'all' || allOptions[i][0] == tagName) {
      options = options.concat(allOptions[i][1]);
    }
  }
  return options;
}

Blockly.Language.myDocument_direct = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  isRoot: true,//コード生成する
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle(Blockly.LANG_MYDOCUMENT_DIRECT_TITLE);
    this.appendInput(Blockly.LANG_MYDOCUMENT_DIRECT_DO, Blockly.NEXT_STATEMENT, 'DO');
    this.setTooltip(Blockly.LANG_MYDOCUMENT_DIRECT_TOOLTIP_1);
  }
};

Blockly.Language.myDocument_onload = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  isRoot: true,//コード生成する
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle(Blockly.LANG_MYDOCUMENT_ONLOAD_TITLE);
    this.appendInput(Blockly.LANG_MYDOCUMENT_ONLOAD_DO, Blockly.NEXT_STATEMENT, 'DO');
    this.setTooltip(Blockly.LANG_MYDOCUMENT_ONLOAD_TOOLTIP_1);
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    } else {
      for (var i in this.workspace.getTopBlocks()) {
        var top = this.workspace.getTopBlocks()[i];
        if (top != this && top.type == 'myDocument_onload') {
          this.setWarningText(Blockly.LANG_MYDOCUMENT_ONLOAD_WARNING);
          return;
        }
      }
      this.setWarningText(null);
    }
  }
};

Blockly.Language.myDocument_write = {
  // Print statement.
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle(Blockly.LANG_MYDOCUMENT_WRITE_TITLE);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_MYDOCUMENT_WRITE_TOOLTIP_1);
  }
};

Blockly.Language.myDocument_print = {
  // Print statement.
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  helpUrl: Blockly.LANG_MYDOCUMENT_PRINT_HELPURL,
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle(Blockly.LANG_MYDOCUMENT_PRINT_TITLE_PRINT);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_MYDOCUMENT_PRINT_TOOLTIP_1);
  }
};

Blockly.Language.myDocument_prompt = {
  // Prompt function.
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  helpUrl: Blockly.LANG_MYDOCUMENT_PROMPT_HELPURL,
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle(Blockly.LANG_MYDOCUMENT_PROMPT_TITLE1);
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.appendTitle(Blockly.LANG_MYDOCUMENT_PROMPT_TITLE2);
    var menu = new Blockly.FieldDropdown(this.TYPES);
    this.appendTitle(menu, 'TYPE');
    this.setOutput(true, [Number, String]);
    this.setTooltip(Blockly.LANG_MYDOCUMENT_PROMPT_TOOLTIP_1);
  }
};

Blockly.Language.myDocument_prompt.TYPES = [[Blockly.LANG_MYDOCUMENT_PROMPT_TYPE_TEXT, 'TEXT'], [Blockly.LANG_MYDOCUMENT_PROMPT_TYPE_NUMBER, 'NUMBER']];


Blockly.Language.myDocument_consolelog = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  init: function() {
    this.setColour('#AA80EA');//#3C3C3C'
    this.appendTitle(Blockly.LANG_MYDOCUMENT_CONSOLE_LOG);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_MYDOCUMENT_CONSOLE_LOG_TOOLTIP_1);
  }
};

Blockly.Language.myDocument_set = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  init: function() {
    this.setColour(myDocumentColor);
    
    var ids = Blockly.MyDocument.allId();
    var first = ids[0];
    var firstTagName = first[1];
    
    var fieldDropDown = new Blockly.FieldDropdown(getOption(firstTagName));
    var idDropDown = new Blockly.FieldDropdown(Blockly.MyDocument.dropdownCreate, Blockly.MyDocument.dropdownChange, fieldDropDown);
    
    this.appendTitle('ID');
    this.appendTitle(idDropDown, 'TARGET');
    this.appendTitle('の');
    this.appendTitle(fieldDropDown, 'ACTION');
    this.appendInput('に代入', Blockly.INPUT_VALUE, 'VALUE', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.myDocument_get = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  init: function() {
    this.setColour(myDocumentColor);
    
    var ids = Blockly.MyDocument.allId();
    var first = ids[0];
    var firstTagName = first[1];
    
    var fieldDropDown = new Blockly.FieldDropdown(getOption(firstTagName));
    var idDropDown = new Blockly.FieldDropdown(Blockly.MyDocument.dropdownCreate, Blockly.MyDocument.dropdownChange, fieldDropDown);
    
    this.appendTitle('ID');
    this.appendTitle(idDropDown, 'TARGET');
    this.appendTitle('の');
    this.appendTitle(fieldDropDown, 'ATTRIBUTE');
    
    this.setOutput(true, Object);
  }
};


