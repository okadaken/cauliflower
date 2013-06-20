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

//以下、仮実装
Blockly.Language.webapi_show_gmap = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle('地図を作る');
    this.setOutput(true, Array);
    this.appendInput('表示先のHTML要素', Blockly.INPUT_VALUE, 'ID', null);
    this.appendInput('オプション', Blockly.INPUT_VALUE, 'OPT', null);
    this.setTooltip('Google Mapを生成し、指定された表示先、\nオプションで表示を行います。');
  }
};

Blockly.Language.webapi_map_latlng = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle("地図用の座標を作る");
    this.appendInput('緯度', Blockly.INPUT_VALUE, 'LAT', Number);
    this.appendInput('経度', Blockly.INPUT_VALUE, 'LNG', Number);
    this.setOutput(true, Array);
    var thisBlock = this;
    this.setTooltip("Google Mapで利用するための\n緯度経度を指定したオブジェクトを生成します。");
  }
};

Blockly.Language.webapi_map_marker = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle("マーカーを作る");
    this.appendInput("地図", Blockly.INPUT_VALUE, 'MAP', [Array]);
    this.appendInput("座標", Blockly.INPUT_VALUE, 'LATLNG', [Array]);
    this.appendInput("タイトル", Blockly.INPUT_VALUE, 'TITLE', [String]);
    this.setOutput(true, Array);
    this.setTooltip("");
  }
};

Blockly.Language.webapi_map_set_center = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle("地図の中心を設定する");
    this.appendInput("地図", Blockly.INPUT_VALUE, 'MAP', [Array]);
    this.appendInput("中心の座標", Blockly.INPUT_VALUE, 'CENTER', [Array]);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

Blockly.Language.webapi_map_set_info_window = {
  categoryName: Blockly.LANG_CATEGORY_WEB_API,
  categoryID: 'gmap',
  init: function() {
    this.setColour(webapiColor);
    this.appendTitle("情報ウィンドウを設定する");
    this.appendInput("対象のマーカー", Blockly.INPUT_VALUE, 'MARKER', [Array]);
    this.appendInput('内容', Blockly.INPUT_VALUE, 'HTML', String);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

