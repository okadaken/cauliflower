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

Blockly.JavaScript.webapi_getjson_proxy = function() {
  var url = Blockly.JavaScript.valueToCode(this, 'URL', Blockly.JavaScript.ORDER_NONE) || '';
  var callback = Blockly.JavaScript.variableDB_.getName(this.getTitleText('CALLBACK'), Blockly.Procedures.NAME_TYPE);
  var param = Blockly.JavaScript.valueToCode(this, 'PARAM', Blockly.JavaScript.ORDER_NONE) || null;
  
  var code = 'getJSONProxy(' + url + ', ' + callback + ', ' + param + ');\n';
  return code;
};

Blockly.JavaScript.webapi_show_gmap = function() {
  var id = Blockly.JavaScript.valueToCode(this, 'ID', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var option = Blockly.JavaScript.valueToCode(this, 'OPT', Blockly.JavaScript.ORDER_NONE) || 'null';
  var code = 'new google.maps.Map(' + id + ', ' + option + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.webapi_map_latlng = function() {
  var lat = Blockly.JavaScript.valueToCode(this, 'LAT', Blockly.JavaScript.ORDER_COMMA) || '0';
  var lng = Blockly.JavaScript.valueToCode(this, 'LNG', Blockly.JavaScript.ORDER_COMMA) || '0';
  var code = 'new google.maps.LatLng(' + lat + ', ' + lng + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.webapi_map_marker = function() {
  var map = Blockly.JavaScript.valueToCode(this, 'MAP', Blockly.JavaScript.ORDER_NONE) || null;
  var latlng = Blockly.JavaScript.valueToCode(this, 'LATLNG', Blockly.JavaScript.ORDER_NONE) || null;
  var title = Blockly.JavaScript.valueToCode(this, 'TITLE', Blockly.JavaScript.ORDER_NONE) || null;
  if (title == null) {
    var code = 'new google.maps.Marker({' +
    'position:' +
    latlng +
    ',' +
    'map:' +
    map +
    //',' +
    //"animation: google.maps.Animation.DROP" +
    '})'
  } else {
    var code = 'new google.maps.Marker({' +
    'position:' +
    latlng +
    ',' +
    'map:' +
    map +
    ',' +
    'title:' +
    title +
    //',' +
    //"animation: google.maps.Animation.DROP" +
    '})'
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.webapi_map_set_center = function() {
  var map = Blockly.JavaScript.valueToCode(this, 'MAP', Blockly.JavaScript.ORDER_NONE) || null;
  var center = Blockly.JavaScript.valueToCode(this, 'CENTER', Blockly.JavaScript.ORDER_NONE) || null;
  var code = map + '.setCenter(' +
  center +
  ');\n'
  return code;
};

Blockly.JavaScript.webapi_map_set_info_window = function() {
  var marker = Blockly.JavaScript.valueToCode(this, 'MARKER', Blockly.JavaScript.ORDER_NONE) || null;
  var html = Blockly.JavaScript.valueToCode(this, 'HTML', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = "(function(target, content) {" +
  "google.maps.event.addListener(target, 'click', function(event) {" +
  " new google.maps.InfoWindow({" +
  "content:content" +
  "}).open(target.getMap(), target);" +
  "});" +
  "})(" +
  marker +
  ", " +
  html +
  ");\n";
  +"}";
  return code;
};

Blockly.JavaScript.webapi_map_info_window = function() {
  var html = Blockly.JavaScript.valueToCode(this, 'HTML', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'new google.maps.InfoWindow({content:' + html + '})';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.webapi_geo_get = function() {
  var callback = Blockly.JavaScript.variableDB_.getName(this.getTitleText('CALLBACK'), Blockly.Procedures.NAME_TYPE);
  var code = 'navigator.geolocation.getCurrentPosition(' + callback + ',geolocation_error);\n';
  return code;
};

Blockly.JavaScript.webapi_geo_boolean = function() {
  return ['navigator.geolocation', Blockly.JavaScript.ORDER_LOGICAL_NOT];
};
