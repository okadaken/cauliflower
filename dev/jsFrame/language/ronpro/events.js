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
  category: null,
  isRoot: true,
  init: function() {
    this.setColour(45);
	this.appendTitle('ページが読み込まれたとき');
    this.appendInput('', Blockly.NEXT_STATEMENT, 'DO');
    this.setPreviousStatement(false);
    //this.setNextStatement(true);
  },
};

Blockly.Language.event_onclick = {
  category: null,
  isRoot: true,
  init: function() {
  		
    this.setColour(45);
	
	
	if (this.getTitleText('FUNC') == null) {
		this.appendTitle('','FUNC');
	} else {
		this.appendTitle(this.getTitleText('FUNC'),'FUNC');
	}
	
	
	//this.appendTitle('', 'FUNC');
	//this.appendInput('{', Blockly.DUMMY_INPUT, null );

    //this.appendTitle( new Blockly.FieldTextInput('target'), 'TARGET' );
    //this.appendTitle('をクリックされた時');
    //this.setInputsInline(true);

    this.appendInput('', Blockly.NEXT_STATEMENT, 'DO');
	this.appendInput('}', Blockly.DUMMY_INPUT, null );
    this.setPreviousStatement(false);
  },
  
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleText('FUNC'));
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.setTitleText( xmlElement.getAttribute('name'), 'FUNC');
  },


};

