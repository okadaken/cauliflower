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
Blockly.WebAPI = {};
var webapiColor = '#708090';

if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.webapi_getjson = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'webapi',
  //helpUrl: Blockly.LANG_TEXT_TEXT_HELPURL,
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_GET_JSON);
    var name = Blockly.Procedures.findLegalName(Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    var dropdown = new Blockly.FieldDropdown(Blockly.Procedures.dropdownCreate2, Blockly.Procedures.dropdownChange, null, name);
    this.appendTitle(Blockly.LANG_WEB_API_CALLBACK);
    this.appendInput([dropdown, 'CALLBACK'], Blockly.DUMMY_INPUT, '', null);
    this.appendInput(Blockly.LANG_WEB_API_URL, Blockly.INPUT_VALUE, 'URL', [String]);
    this.appendInput(Blockly.LANG_WEB_API_PARAM, Blockly.INPUT_VALUE, 'PARAM', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_WEB_API_TOOLTIP);
  }
};
