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
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.controls_if = {
  // If/elseif/else condition.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendInput("なら", Blockly.INPUT_VALUE, 'IF0', Boolean);

    //this.setInputsInline(true);
    //this.setNextStatement(true);

    this.appendInput("を実行する", Blockly.NEXT_STATEMENT, 'DO0');

    //this.setNextStatement(true);
    //this.setInputsInline(true);

    //this.appendInput("を実行する", Blockly.DUMMY_INPUT, '');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif', 'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  MSG_IF: Blockly.LANG_CONTROLS_IF_MSG_IF,
  MSG_ELSEIF: Blockly.LANG_CONTROLS_IF_MSG_ELSEIF,
  MSG_ELSE: Blockly.LANG_CONTROLS_IF_MSG_ELSE,
  MSG_THEN: Blockly.LANG_CONTROLS_IF_MSG_THEN,
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
    for (var x = 1; x <= this.elseifCount_; x++) {

      this.appendInput("そうでなく", Blockly.DUMMY_INPUT, '');

      this.appendInput(this.MSG_ELSEIF, Blockly.INPUT_VALUE, 'IF' + x, Boolean);
      this.setInputsInline(true);

      this.appendInput(this.MSG_THEN, Blockly.NEXT_STATEMENT, 'DO' + x);
    }
    if (this.elseCount_) {
      this.appendInput(this.MSG_ELSE, Blockly.NEXT_STATEMENT, 'ELSE');
    }
  },
  decompose: function(workspace) {
    var ifBlock = new Blockly.Block(workspace, 'controls_if_if');
    ifBlock.initSvg();
    var connection = ifBlock.inputList[0];
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = new Blockly.Block(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      // Store a pointer to any connected blocks.
      elseifBlock.valueInput_ = this.getInput('IF' + x).targetConnection;
      elseifBlock.statementInput_ = this.getInput('DO' + x).targetConnection;
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = new Blockly.Block(workspace, 'controls_if_else');
      elseBlock.initSvg();
      elseBlock.statementInput_ = this.getInput('ELSE').targetConnection;
      connection.connect(elseBlock.previousConnection);
    }
    return ifBlock;
  },
  compose: function(ifBlock) {
    // Disconnect all the elseif input blocks and destroy the inputs.
    for (var x = 1; x <= this.elseifCount_; x++) {
      this.removeInput('IF' + x);
      this.removeInput('DO' + x);
    }
    // Disconnect the else input blocks and destroy the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = ifBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;

	      var dummy = this.appendInput("そうでなくて", Blockly.DUMMY_INPUT, '');

          var ifInput = this.appendInput("なら", Blockly.INPUT_VALUE,
              'IF' + this.elseifCount_, Boolean);
          var doInput = this.appendInput(this.MSG_THEN, Blockly.NEXT_STATEMENT,
              'DO' + this.elseifCount_);
          // Reconnect any child blocks.
          if (clauseBlock.valueInput_) {
			dummy.connect(clauseBlock.valueInput_);
            ifInput.connect(clauseBlock.valueInput_);
          }
          if (clauseBlock.statementInput_) {
            doInput.connect(clauseBlock.statementInput_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
	      this.appendInput("いずれもそうでなければ", Blockly.DUMMY_INPUT, '');
          this.appendInput("を実行する", Blockly.NEXT_STATEMENT, 'ELSE');
          // Reconnect any child blocks.
          if (clauseBlock.statementInput_) {
            this.inputList[x].connect(clauseBlock.statementInput_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.controls_if_if = {
  // If condition.
  init: function() {
    this.setColour(120);
    this.appendTitle(Blockly.LANG_CONTROLS_IF_IF_TITLE_IF);
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip(Blockly.LANG_CONTROLS_IF_IF_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_elseif = {
  // Else-If condition.
  init: function() {
    this.setColour(120);
    this.appendTitle(Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_else = {
  // Else condition.
  init: function() {
    this.setColour(120);
    this.appendTitle(Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP_1);
    this.contextMenu = false;
  }
};
