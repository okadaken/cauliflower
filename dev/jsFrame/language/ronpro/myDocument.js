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


Blockly.Language.myDocument_innerHTML = {
  category: null,
  init: function() {
    this.setColour(45);
	
	this.appendTitle( 'document.getElementById(\'' );
	this.appendTitle( '_', 'TARGET' );
	this.appendTitle( '\').innerHTML = ' );
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setOutput( false, Object );
  },
  
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleText('TARGET'));
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.setTitleText( xmlElement.getAttribute('name'), 'TARGET');
  },


};

