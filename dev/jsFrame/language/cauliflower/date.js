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
var dateColor = '#c71585';

if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.date_object = {
  categoryName: Blockly.LANG_CATEGORY_DATE,
  categoryID: 'date',
  init: function() {
    this.setColour(dateColor);
    this.setOutput(true);
    this.appendTitle(Blockly.LANG_DATE);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(dropdown, 'TYPE');
    var thisBlock = this;
    this.setTooltip(function() {
      var type = thisBlock.getTitleValue('TYPE');
      return Blockly.Language.date_object.TOOLTIPS[type];
    });
  }
};

Blockly.Language.date_object.OPERATORS = [[Blockly.LANG_DATE_OBJECT, 'OBJECT'], [Blockly.LANG_DATE_LOCALESTRING, 'LOCALESTRING']];
Blockly.Language.date_object.TOOLTIPS = {
  OBJECT: Blockly.LANG_DATE_OBJECT_TOOLTIP,
  LOCALESTRING: Blockly.LANG_DATE_LOCALESTRING_TOOLTIP
};

Blockly.Language.date_properties = {
  categoryName: Blockly.LANG_CATEGORY_DATE,
  categoryID: 'date',
  init: function() {
    this.setColour(dateColor);
    this.appendTitle(Blockly.LANG_DATE_PROPERTIES_TITLE);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(dropdown, 'TYPE');
    var thisBlock = this;
    this.setTooltip(function() {
      var type = thisBlock.getTitleValue('TYPE');
      return Blockly.Language.date_properties.TOOLTIPS[type];
    });
    this.setOutput(true, Number);
  }
};

Blockly.Language.date_properties.OPERATORS = [[Blockly.LANG_DATE_YEAR, 'YEAR'], [Blockly.LANG_DATE_MONTH, 'MONTH'], [Blockly.LANG_DATE_DATE, 'DATE'], [Blockly.LANG_DATE_DAY, 'DAY'], [Blockly.LANG_DATE_HOUR, 'HOUR'], [Blockly.LANG_DATE_MINUTE, 'MINUTE'], [Blockly.LANG_DATE_SECOND, 'SECOND'], [Blockly.LANG_DATE_MS, 'MS']];

Blockly.Language.date_properties.TOOLTIPS = {
  YEAR: Blockly.LANG_DATE_YEAR_TOOLTIP,
  MONTH: Blockly.LANG_DATE_MONTH_TOOLTIP,
  DATE: Blockly.LANG_DATE_DATE_TOOLTIP,
  DAY: Blockly.LANG_DATE_DAY_TOOLTIP,
  HOUR: Blockly.LANG_DATE_HOUR_TOOLTIP,
  MINUTE: Blockly.LANG_DATE_MINUTE_TOOLTIP,
  SECOND: Blockly.LANG_DATE_SECOND_TOOLTIP,
  MS: Blockly.LANG_DATE_MS_TOOLTIP
};

Blockly.Language.date_time = {
  categoryName: Blockly.LANG_CATEGORY_DATE,
  categoryID: 'date',
  init: function() {
    this.setColour(dateColor);
    this.appendTitle(Blockly.LANG_DATE_TIME_TITLE);
    this.setTooltip(Blockly.LANG_DATE_TIME_TOOLTIP);
    this.setOutput(true, Number);
  }
};

