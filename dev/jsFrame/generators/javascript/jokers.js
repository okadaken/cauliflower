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

Blockly.JavaScript.joker_1 = function() {
  return this.getTitleText('CODE')+'\n';
};

Blockly.JavaScript.joker_2 = function() {
  return [this.getTitleText('CODE'),Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.joker_3 = function() {
  var target = Blockly.JavaScript.valueToCode(this, 'TARGET', Blockly.JavaScript.ORDER_NONE);
  var attr = this.getTitleText('ATTRIBUTE');
  var code = target;
  
  if (target.length != 0 && attr.length != 0) {
    code += '.' + attr;
  }
  return code+'\n';
};

Blockly.JavaScript.joker_4 = function() {
  var target = Blockly.JavaScript.valueToCode(this, 'TARGET', Blockly.JavaScript.ORDER_NONE);
  var attr = this.getTitleText('ATTRIBUTE');
  var code = target;
  
  if (target.length != 0 && attr.length != 0) {
    code += '.' + attr;
  }

  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.joker_5 = function() {

  var attr = Blockly.JavaScript.valueToCode(this, 'ATTRIBUTE', Blockly.JavaScript.ORDER_NONE);
  var target = this.getTitleText('TARGET');
  var code = target;
  
  if (target.length != 0 && attr.length != 0) {
    code += '.' + attr;
  }
  return code+'\n';
};
Blockly.JavaScript.joker_6 = function() {
  var attr = Blockly.JavaScript.valueToCode(this, 'ATTRIBUTE', Blockly.JavaScript.ORDER_NONE);
  var target = this.getTitleText('TARGET');
  var code = target;
  
  if (target.length != 0 && attr.length != 0) {
    code += '.' + attr;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
