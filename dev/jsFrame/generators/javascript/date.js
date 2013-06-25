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

Blockly.JavaScript.date_object = function() {
  var code = '';
  var type = this.getTitleValue('TYPE');
  switch (type) {
  case 'OBJECT':
    code += 'new Date()';
    break;
  case 'LOCALESTRING':
    code += 'new Date().toLocaleString()';
    break;
  default:
    throw 'Unknown type.'
  }
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.date_properties = function() {
  var code = 'new Date()';
  var type = this.getTitleValue('TYPE');
  switch (type) {
  case 'YEAR':
    code += '.getFullYear()';
    break;
  case 'MONTH':
    code += '.getMonth()+1';
    break;
  case 'DATE':
    code += '.getDate()';
    break;
  case 'DAY':
    code += '.getDay()';
    break;
  case 'HOUR':
    code += '.getHours()';
    break;
  case 'MINUTE':
    code += '.getMinutes()';
    break;
  case 'SECOND':
    code += '.getSeconds()';
    break;
  case 'MS':
    code += '.getMilliseconds()';
    break;
  default:
    throw 'Unknown type.'
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.date_time = function() {
  var code = 'new Date().getTime()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
