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

function allOption(){
	return [
		[
			'all', 
			[
				['HTML', 'innerHTML'],
				['値', 'value'],
			]
		],
		[
			'div', 
			[
				['スタイルの背景色', 'style.backgroundColor'],
			]
		]
	];
}

function getOption( tagName ){
	
	var allOptions = allOption();
	
	var options = [];
	for( var i=0 ; i < allOptions.length ; i++ ){
		if( allOptions[i][0] == 'all' || allOptions[i][0] == tagName ){
			options = options.concat( allOptions[i][1] );
		}
	}
	return options;	
}

Blockly.Language.myDocument_set = {
  category: null,
  init: function() {
    this.setColour(45);
	
	var ids = Blockly.MyDocument.allId();
	var first = ids[0];
	var firstTagName = first[1];
	
	var fieldDropDown = new Blockly.FieldDropdown(getOption( firstTagName ));
	var idDropDown = new Blockly.FieldDropdown(Blockly.MyDocument.dropdownCreate, Blockly.MyDocument.dropdownChange, fieldDropDown );
	
	this.appendTitle( 'ID' );
	this.appendTitle( idDropDown,'TARGET');
	this.appendTitle( 'の' );
	this.appendTitle( fieldDropDown,'ACTION');
	this.appendTitle( 'を' );
	this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', null );
	this.appendInput('に変える', Blockly.DUMMY_INPUT, null );
    this.setInputsInline(true);
	
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	//this.setOutput( false, Object );
  },
  /*
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
*/

};

