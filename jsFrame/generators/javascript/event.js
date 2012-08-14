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

Blockly.JavaScript.event_onload = function() {
  var n = 0;
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  
  var code = 'function event_onload(){\n' + branch + '}';
  return code + '\n';
};

Blockly.JavaScript.event_onclick = function() {
  var n = 0;
  var target = this.getTitleText('TARGET');
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  
  var code = 'function '+target+'_onclick(){\n' + branch + '}';
  return code + '\n';
};