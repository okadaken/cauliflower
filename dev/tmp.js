    $("#rerun").button().click(function() {
        alert("Running the last action");
    }).next().button({
        text: false,
        icons: {
            primary: "ui-icon-triangle-1-s"
        }
    }).click(function() {
        alert("Could display a menu to select an action");
    });
    
                                   var editor;
                                    $(function(){
                                    	var delay;
                                        editor = CodeMirror.fromTextArea(document.getElementById("html_textarea"), {
                                          mode: "text/html",
                                          theme: "default",
                                          tabMode: "indent",
                                          lineNumbers: "true",
                                          fixedGutter: "true",
                                          electricChars: "true",
                                          onChange: function() {
                                            clearTimeout(delay);
                                            delay = setTimeout(updatePreview, 300);
                                          }
                                          
                                          
                                        });
                                        
                        
                                        
                                   
                                        
                                        
                                        function updatePreview() {
                                          var previewFrame = document.getElementById("html_preview");
                                          var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
                                          preview.open();
                                          preview.write(editor.getValue());
                                          preview.close();
                                        }
                                        setTimeout(updatePreview, 300);
                                    });
                                    

                                    
                                    /**
                                     * Initialize Blockly.  Called on page load.
                                     * @param {!Blockly} blockly Instance of Blockly from iframe.
                                     */
                                    function init(blockly) {
                                      //window.onbeforeunload = function() {
                                      //  return 'Leaving this page will result in the loss of your work.';
                                      //};
                                    
                                      window.Blockly = blockly;
                                    
                                      // Make the 'Blocks' tab line up with the toolbox.
                                      if (Blockly.Toolbox) {
                                        Blockly.bindEvent_(window, 'resize', null, function() {
                                          document.getElementById('tab_blocks').style.minWidth =
                                              (Blockly.Toolbox.width - 38) + 'px';
                                              // Account for the 19 pixel margin and on each side.
                                          });
                                        window.setTimeout(function() {
                                            Blockly.fireUiEvent(document, window, 'resize');
                                          }, 1);
                                      }
                                    
                                      // Restore/backup current works.
                                      restore_blocks();
                                      restore_htmls();
                                      Blockly.bindEvent_(window, 'unload', null, backup_blocks);
                                      Blockly.bindEvent_(window, 'unload', null, backup_htmls);
                                      tabClick('tab_' + selected);
                                    
                                      // Init load event.
                                      var loadInput = document.getElementById('load');
                                      loadInput.addEventListener('change', load, false);
                                      document.getElementById('fakeload').onclick = function() {
                                        loadInput.click();
                                      };
                                    }