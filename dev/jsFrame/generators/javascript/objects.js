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
  for (var i = 0; i < this.itemCount_; i++) {
  
    var key = this.getTitleValue('NAME' + i);
    var value = Blockly.JavaScript.valueToCode(this, 'ADD' + i, Blockly.JavaScript.ORDER_COMMA) || '\'\'';
    if (!(key && value)) {
      continue;
    }
    
    //プロパティ名として妥当でなければ'をつける
    if (!key.match(/^[a-zA-Z$$][a-zA-Z0-9$$]*$/)) {
      key = '\'' + key.replace(/'/g, '\\\'') + '\'';
    }
    code += key + ': ' + value;
    
    if (i != this.itemCount_ - 1) {
      code += ', ';
    }
  }
  code += '}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.objects_get = function() {

  var code = '';
  var variable = this.getTitleValue('VAR');
  var property = this.getTitleValue('PROPERTY') || '';
  
  if (property.length != 0 && !property.match(/^[a-zA-Z$$][a-zA-Z0-9$$._]*$/)) {
    //プロパティ名としてそのまま記述できない場合
    property = '[\'' + property + '\']';
  } else if (property.length != 0) {
    property = '.' + property;
  }
  code = variable + property;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.objects_set = function() {

  var code = '';
  var variable = this.getTitleValue('VAR');
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var property = this.getTitleText('PROPERTY') || '';
  
  if (property.length != 0 && !property.match(/^[a-zA-Z$$][a-zA-Z0-9$$.]*$/)) {
    //プロパティ名としてそのまま記述できない場合
    property = '[\'' + property + '\']';
  } else if (property.length != 0) {
    property = '.' + property;
  }
  
  code = variable + property + " = " + value + ";\n";
  return code;
};

Blockly.JavaScript.objects_get_by_value = function() {

  var code = '';
  var variable = this.getTitleValue('VAR');
  var property = this.getTitleValue('PROPERTY') || '';
  var property = Blockly.JavaScript.valueToCode(this, 'PROPERTY', Blockly.JavaScript.ORDER_COMMA);
  property = '[' + property + ']';
  
  code = variable + property;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.objects_set_by_value = function() {

  var code = '';
  var variable = this.getTitleValue('VAR');
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var property = Blockly.JavaScript.valueToCode(this, 'PROPERTY', Blockly.JavaScript.ORDER_COMMA);
  property = '[' + property + ']';
  
  code = variable + property + " = " + value + ";\n";
  return code;
};
