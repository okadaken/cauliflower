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

Blockly.Language.webapi_getjson_proxy = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'webapi',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_GET_JSON2);
    var name = Blockly.Procedures.findLegalName(Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    var dropdown = new Blockly.FieldDropdown(Blockly.Procedures.dropdownCreate2, Blockly.Procedures.dropdownChange, null, name);
    this.appendTitle(Blockly.LANG_WEB_API_CALLBACK);
    this.appendInput([dropdown, 'CALLBACK'], Blockly.DUMMY_INPUT, '', null);
    this.appendInput(Blockly.LANG_WEB_API_URL, Blockly.INPUT_VALUE, 'URL', [String]);
    this.appendInput(Blockly.LANG_WEB_API_PARAM, Blockly.INPUT_VALUE, 'PARAM', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_WEB_API_TOOLTIP2);
  }
};

Blockly.Language.webapi_show_gmap = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_MAP_CREATE);
    this.setOutput(true, Array);
    this.appendInput(Blockly.LANG_WEB_API_MAP_HTMLELEM, Blockly.INPUT_VALUE, 'ID', null);
    this.appendInput(Blockly.LANG_WEB_API_MAP_OPTION, Blockly.INPUT_VALUE, 'OPT', null);
    this.setTooltip(Blockly.LANG_WEB_API_MAP_TOOLTIP);
  }
};

Blockly.Language.webapi_map_latlng = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_MAP_LATLNG_TITLE);
    this.appendInput(Blockly.LANG_WEB_API_MAP_LAT, Blockly.INPUT_VALUE, 'LAT', Number);
    this.appendInput(Blockly.LANG_WEB_API_MAP_LNG, Blockly.INPUT_VALUE, 'LNG', Number);
    this.setOutput(true, Array);
    var thisBlock = this;
    this.setTooltip(Blockly.LANG_WEB_API_MAP_LATLNG_TOOLTIP);
  }
};

Blockly.Language.webapi_map_marker = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_MAP_MARKER_TITLE);
    this.appendInput(Blockly.LANG_WEB_API_MAP_MAP, Blockly.INPUT_VALUE, 'MAP', [Array]);
    this.appendInput(Blockly.LANG_WEB_API_MAP_LATLNG, Blockly.INPUT_VALUE, 'LATLNG', [Array]);
    this.appendInput(Blockly.LANG_WEB_API_MAP_TITLE, Blockly.INPUT_VALUE, 'TITLE', [String]);
    this.setOutput(true, Array);
    this.setTooltip(Blockly.LANG_WEB_API_MAP_MARKER_TOOLTIP);
  }
};

Blockly.Language.webapi_map_set_center = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_MAP_CENTER_TITLE);
    this.appendInput(Blockly.LANG_WEB_API_MAP_MAP, Blockly.INPUT_VALUE, 'MAP', [Array]);
    this.appendInput(Blockly.LANG_WEB_API_MAP_CENTER_LATLNG, Blockly.INPUT_VALUE, 'CENTER', [Array]);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_WEB_API_MAP_CENTER_TOOLTIP);
  }
};

Blockly.Language.webapi_map_set_info_window = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle(Blockly.LANG_WEB_API_MAP_INFO_TITLE);
    this.appendInput(Blockly.LANG_WEB_API_MAP_INFO_MARKER, Blockly.INPUT_VALUE, 'MARKER', [Array]);
    this.appendInput(Blockly.LANG_WEB_API_MAP_INFO_CONTENT, Blockly.INPUT_VALUE, 'HTML', String);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_WEB_API_MAP_INFO_TOOLTIP);
  }
};

//以下、仮実装

Blockly.Language.webapi_geo_boolean = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle('現在位置が取得できるか');
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Language.webapi_geo_get = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'webapi',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle("現在位置を取得する");
    var name = Blockly.Procedures.findLegalName(Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    var dropdown = new Blockly.FieldDropdown(Blockly.Procedures.dropdownCreate2, Blockly.Procedures.dropdownChange, null, name);
    this.appendTitle("コールバック関数");
    this.appendTitle(dropdown, 'CALLBACK');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};



