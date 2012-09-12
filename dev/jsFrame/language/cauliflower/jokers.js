
var jokerColor = '#000000';

if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.joker_1 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);
    this.appendTitle(new Blockly.FieldTextInput(''), 'CODE');
	
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.joker_2 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);
    this.appendTitle(new Blockly.FieldTextInput(''), 'CODE');
	
    this.setOutput(true, Object);
  }
};

Blockly.Language.joker_3 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);
    this.appendInput('', Blockly.INPUT_VALUE, 'TARGET', null);
    this.appendInput('.', Blockly.DUMMY_INPUT);
    var input = new Blockly.FieldTextInput('');
    this.appendInput([input, 'ATTRIBUTE'], Blockly.DUMMY_INPUT, 'ATTRIBUTE', String);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.joker_4 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);
    this.appendInput('', Blockly.INPUT_VALUE, 'TARGET', null);
    this.appendInput('.', Blockly.DUMMY_INPUT);
    var input = new Blockly.FieldTextInput('');
    this.appendInput([input, 'ATTRIBUTE'], Blockly.DUMMY_INPUT, 'ATTRIBUTE', String);
    
    this.setInputsInline(true);
    this.setOutput(true, Object);
  }
};

Blockly.Language.joker_5 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);

    var input = new Blockly.FieldTextInput('');
    this.appendInput([input, 'TARGET'], Blockly.DUMMY_INPUT, 'TARGET', String);
    this.appendInput('.', Blockly.DUMMY_INPUT);
    this.appendInput('', Blockly.INPUT_VALUE, 'ATTRIBUTE', null);
    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.joker_6 = {
  categoryName: Blockly.LANG_CATEGORY_JOKER, 
  categoryID: 'joker',
  init: function() {
    this.setColour(jokerColor);
    
	this.appendTitle(Blockly.LANG_CATEGORY_JOKER_PREFIX);

    var input = new Blockly.FieldTextInput('');
    this.appendInput([input, 'TARGET'], Blockly.DUMMY_INPUT, 'TARGET', String);
    this.appendInput('.', Blockly.DUMMY_INPUT);
    this.appendInput('', Blockly.INPUT_VALUE, 'ATTRIBUTE', null);
   
    this.setInputsInline(true);
    this.setOutput(true, Object);
  }
};