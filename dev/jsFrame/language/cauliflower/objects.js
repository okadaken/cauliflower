
var objColor = '#008B8B';

if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.objects = {
  // Create a list with any number of elements of any type.
  categoryName: Blockly.LANG_CATEGORY_OBJECT,
  categoryID: 'object',
  helpUrl: '',
  init: function() {
    this.setColour(objColor);
    this.appendTitle(Blockly.LANG_OBJECT_CREATE);
    this.appendInput([new Blockly.FieldTextInput(''), 'NAME0'], Blockly.INPUT_VALUE, 'ADD0', String);
    this.appendInput([new Blockly.FieldTextInput(''), 'NAME1'], Blockly.INPUT_VALUE, 'ADD1', String);
    this.appendInput([new Blockly.FieldTextInput(''), 'NAME2'], Blockly.INPUT_VALUE, 'ADD2', String);

    this.setInputsInline(false);
    this.setOutput(true, Array);
    this.setMutator(new Blockly.Mutator(['objects_create_with_item']));
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP_1);
    this.itemCount_ = 3;
  },
  
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
	console.log(container);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      this.appendInput([new Blockly.FieldTextInput(''), 'NAME'+x] , Blockly.INPUT_VALUE, 'ADD' + x, null);
    }
  },
  
  decompose: function(workspace) {
   var containerBlock = new Blockly.Block(workspace, 'objects_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.inputList[0];
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'objects_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {

	// NAMEを保存する
	var names = [];
    for (var x = 0 ; x < this.itemCount_ ; x++ ) {
	  names.push( this.getTitleValue('NAME'+x ) );
    }
	
    // Disconnect all input blocks and destroy all inputs.
    for (var x = this.itemCount_ - 1; x >= 0; x--) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = 0;
	
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendInput([new Blockly.FieldTextInput(''), 'NAME'+ this.itemCount_ ] , Blockly.INPUT_VALUE, 'ADD' + this.itemCount_, null);
      // Reconnect any child blocks.
      if (itemBlock.valueInput_) {
        input.connect(itemBlock.valueInput_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
	
	// NAMEを元に戻す
    for (var x = 0 ; x < this.itemCount_ ; x++ ) {
	  this.setTitleValue( names[x], 'NAME'+x );
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueInput_ = input && input.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.objects_create_with_container = {
  // Container.
  init: function() {
    this.setColour(listColor);
    this.appendTitle(Blockly.LANG_OBJECT_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip(Blockly.LANG_OBJECT_CREATE_WITH_CONTAINER_TOOLTIP_1);
    this.contextMenu = false;
  }
};
Blockly.Language.objects_create_with_item = {
  // Add items.
  init: function() {
    this.setColour(listColor);
    this.appendTitle(Blockly.LANG_OBJECT_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_OBJECT_CREATE_WITH_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};
