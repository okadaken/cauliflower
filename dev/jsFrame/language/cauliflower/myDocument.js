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
  return [['all', [['要素', ''], ['要素のHTML', '.innerHTML'], ['要素の値', '.value']]], ['div', [['要素のスタイルの背景色', '.style.backgroundColor']]]];
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

Blockly.Language.myDocument_onloadA = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  isRoot: true,//コード生成する
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle('ページが読み込まれたら実行する 案A');
    this.appendInput('処理', Blockly.NEXT_STATEMENT, 'DO');
    this.setTooltip('ページが読み込まれたタイミングで\n指定した処理を実行します。');
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    } else {
      for (var i in this.workspace.getTopBlocks()) {
        var top = this.workspace.getTopBlocks()[i];
        if (top != this && top.type == 'myDocument_onloadA') {
          this.setWarningText('警告（仮）：\n同じのが二個あると\n正常に動作しませんよ！！！');
          return;
        }
      }
      this.setWarningText(null);
    }
  }
};

Blockly.Language.myDocument_onloadB = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  isRoot: true,//コード生成する
  init: function() {
    this.setColour(myDocumentColor);
    this.appendTitle('ページが読み込まれたら実行する 案B');
    this.appendInput('処理', Blockly.NEXT_STATEMENT, 'DO');
    this.setTooltip('ページが読み込まれたタイミングで\n指定した処理を実行します。');
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
    this.appendTitle('を');
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', null);
    this.appendInput('に変える', Blockly.DUMMY_INPUT, null);
    this.setInputsInline(true);
    
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

Blockly.Language.myDocument_joker = {
  categoryName: null, // myDocument are handled specially.
  categoryID: null,
  helpUrl: Blockly.LANG_MYDOCUMENT_PROMPT_HELPURL,
  init: function() {
    this.setColour(myDocumentColor);
    
    this.appendInput('', Blockly.INPUT_VALUE, 'TARGET', null);
    this.appendInput('の', Blockly.DUMMY_INPUT);
    var input = new Blockly.FieldTextInput('');
    this.appendInput([input, 'ATTRIBUTE'], Blockly.DUMMY_INPUT, 'ATTRIBUTE', String);
    
    this.setInputsInline(true);
    this.setOutput(true, Object);
  }
};
