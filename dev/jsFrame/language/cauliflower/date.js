
var dateColor = '#c71585';//'#191970';
if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.date_object = {
  categoryName: "日付",
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
  categoryName: "日付",
  categoryID: 'date',
  init: function() {
    this.setColour(dateColor);
    this.appendTitle("現在の");
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

Blockly.Language.date_properties.OPERATORS = [['年', 'YEAR'], ['月', 'MONTH'], ['日', 'DATE'], ['曜日', 'DAY'], ['時', 'HOUR'], ['分', 'MINUTE'], ['秒', 'SECOND'], ['ミリ秒', 'MS']];

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
  categoryName: "日付",
  categoryID: 'date',
  init: function() {
    this.setColour(dateColor);
    this.appendTitle("1970/1/1 0:00からの経過ミリ秒");
    this.setTooltip("");
    this.setOutput(true, Number);
  }
};

