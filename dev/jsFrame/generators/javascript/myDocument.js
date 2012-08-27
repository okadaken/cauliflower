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
 * @fileoverview Generating JavaScript for control blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.myDocument_set = function() {
	
  var target = this.getTitleText( 'TARGET' );
  var action = this.getTitleValue( 'ACTION');
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE');
  
  var code = 'document.getElementById(\'' + target + '\').' + action + ' = ' + value + ';';
  return code + '\n';
};

Blockly.JavaScript.myDocument_get = function() {
	
  var target = this.getTitleText( 'TARGET' );
  var attr = this.getTitleValue( 'ATTRIBUTE');
  
  var code = 'document.getElementById(\'' + target + '\').' + attr;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

