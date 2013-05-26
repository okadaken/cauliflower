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
 * @fileoverview Generating JavaScript for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.webapi_getjson = function() {
  // Define a procedure with a return value.
  var callback = Blockly.JavaScript.variableDB_.getName(this.getTitleText('CALLBACK'), Blockly.Procedures.NAME_TYPE);
  var url = Blockly.JavaScript.valueToCode(this, 'URL', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var param = Blockly.JavaScript.valueToCode(this, 'PARAM', Blockly.JavaScript.ORDER_NONE) || '';
  
  if (param.length == 0) {
    var code = 'jQuery.getJSON(' + url + ', ' + callback + ');\n';
  } else {
    var code = 'jQuery.getJSON(' + url + ', ' + param + ', ' + callback + ');\n';
  }
  return code;
};
