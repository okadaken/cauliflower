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
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.objects = function() {

	var code = '{';
	for( var i=0 ; i<this.itemCount_ ; i++ ){
		
		var key = this.getTitleValue('NAME'+i);
		var value = Blockly.JavaScript.valueToCode(this, 'ADD' + i, Blockly.JavaScript.ORDER_COMMA);
		if( !(key && value) ){
			continue;
		}
		
		code += key + ":" + value;
		
		if( i+1 != this.itemCount_ ){
			code += ',';
		}
	}
	code += '}';
	return [code,Blockly.JavaScript.ORDER_ATOMIC];
};
