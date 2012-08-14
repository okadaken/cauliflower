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
 */

if (!Blockly.Language) Blockly.Language = {};


Blockly.Language.event_onload = {
  category: Blockly.MSG_EVENT_CATEGORY,
  init: function() {
    this.setColour(45);
	this.appendTitle('ページが読み込まれたとき');
    this.appendInput('', Blockly.NEXT_STATEMENT, 'DO');
    this.setPreviousStatement(false);
    //this.setNextStatement(true);
  },
};

Blockly.Language.event_onclick = {
  category: Blockly.MSG_EVENT_CATEGORY,
  init: function() {
    this.setColour(45);
    this.appendTitle( new Blockly.FieldTextInput('target'), 'TARGET' );
    this.appendTitle('をクリックされた時');
    this.setInputsInline(true);

    this.appendInput('', Blockly.NEXT_STATEMENT, 'DO');
    this.setPreviousStatement(false);
  },
};

