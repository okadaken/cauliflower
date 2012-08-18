/**
 * Cauliflower v0.1
 * Copyright (c) 2012 Ken Okada<>, Manabu Sugiura<>
 *
 * http://github.com/okadaken/cauliflower
 *
 * TODO:License書く
 * http://sourceforge.jp/projects/opensource/wiki/licenses
 *
 * 例題ボタン
 * bodyのみを抽出してプレビューすること
 * 保存形式の検討
 * HTMLフォーマット改善
 * $(window).unload(function(){でHTML保存する
 * HTML構文エラー時のアイコン追加
 * restore後のJavaScriptエディタの位置がおかしい気がする
 */
var HTMLEditor;
var JavaScriptPreview;

var errorLine;
var previousCode;

$(document).ready(function() {
    initializeTabs();
    initializeButtons();
    initializeHTMLEditor();
    initializeDialogs();
    
    restoreHTML();
    HTMLEditor.refresh();
    setTimeout(updatePreview, 300);
    
    initializeJavaScriptPreview();
});

function initializeTabs() {
    $('#tabs').tabs({
        cookie: {
            expires: 3 //選択タブをcookieで3日間保存
        },
        select: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case 'tab-javascript':
                        parseHTML2DOM()
                        break;
                }
            }
        },
        show: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case 'tab-html':
                        restoreHTML();
                        break;
                    case 'tab-javascript':
                        backupHTML();
                        updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
                        Blockly.Toolbox.redraw();//Firefoxのタブ切り替え対策
                        Blockly.mainWorkspace.render();
                        break;
                }
            }
        }
    });
}

function initializeButtons() {
    $('#new_button').button().click(function() {
        alert('新規作成');
    });
    $('#open_button').button().click(function() {
        alert('読み込み');
    });
    $('#save_button').button().click(function() {
        alert('保存する');
    });
    $('#exec_button').button().css({
        'background': '#ffcc00'
    }).click(function() {//TODO:とりあえず色を変えただけ 要グラデーション
        alert('実行する');
    });
    $('#html_new_botton').button().click(function() {
        loadHTMLTemplate();
    });
}

function initializeHTMLEditor() {
    var delay;
    HTMLEditor = CodeMirror.fromTextArea(document.getElementById('html_textarea'), {
        mode: 'text/html',
        theme: 'default',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        closeTagIndent: false,
        autofocus: true,
        extraKeys: {
            "'>'": function(cm) {
                cm.closeTag(cm, '>');
            },
            "'/'": function(cm) {
                cm.closeTag(cm, '/');
            }
        },
        onChange: function() {
            HTMLEditor.clearMarks();
            clearTimeout(delay);
            delay = setTimeout(updatePreview, 300);
        },
        onBlur: function() {
            backupHTML();
        }
    });
}

function initializeDialogs() {
    $('#HTML_syntaxerror_dialog').dialog({
        dialogClass: 'alert',
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        show: 'clip',//'explode',
        hide: 'clip',//'explode',
        title: 'HTML構文エラー',
        buttons: {
            OK: function() {
                $(this).dialog('close');
                $('#tabs').tabs('select', 0);
                mark(errorLine);
            }
        }
    });
}

function getHTMLCode() {
    return HTMLEditor.getValue();
}

//Blocklyのエディタができるまでの仮実装
function getJavaScriptCode() {
    var code = '\n' + Blockly.Generator.workspaceToCode('JavaScript');
    return code;
}

function parseHTML2DOM() {
    //前処理としてHTMLをXMLに変換
    try {
        var xml = HTMLtoXML(getHTMLCode());
    } catch (e) {//変換できなければエラー表示して終了
        errorLine = e.split('\n')[0];
        var message = '<p>HTMLの構文エラーです。</p><p>エラーの原因となった文字列:<br><b><code style="background: #ffaaaa;">' + htmlEscape(errorLine) + '</code></b></p><p>先にHTMLエディタのハイライト部分を修正してから、JavaScriptを編集してください。</p>';
        $('#HTML_syntaxerror_dialog_message').html(message);
        $('#HTML_syntaxerror_dialog').dialog('open');
        return null;
    }
    
    //DOMにパース
    var parser = new DOMParser();
    return parser.parseFromString(xml, 'text/xml');
}

function getAllCode() {
    var doc = parseHTML2DOM();
    if (doc == null) {
        return;
    }
    
    //JavaScriptタグとコードのノードを生成
    var js = doc.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.appendChild(doc.createTextNode('\n'));
    js.appendChild(doc.createComment(getJavaScriptCode()));
    js.appendChild(doc.createTextNode('\n'));
    
    //生成したノードを追加
    var body = doc.getElementsByTagName('body')[0];
    if (body != null) {
        body.insertBefore(js, body.firstChild);
        body.insertBefore(doc.createTextNode('\n'), body.firstChild);//scritpタグの前に改行を追加
        var serializer = new XMLSerializer();
        var code = serializer.serializeToString(doc);
        console.log(code); //TODO:最後に行頭のDOCTYPEを追加すること
        //console.log( serializer.serializeToString(body)); 
    } else {
        alert('bodyタグが見つかりません');//TODO:dialogにすること
    }
}

function updatePreview() {
    var previewFrame = document.getElementById('html_preview');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(HTMLEditor.getValue());
    preview.close();
}

function mark(s) {
    HTMLEditor.matchHighlight('CodeMirror-matchhighlight', s);
}

function clearMarks() {
    HTMLEditor.clearMarks();
}

function autoFormat() {
    CodeMirror.commands['selectAll'](HTMLEditor);
    var range = {
        from: HTMLEditor.getCursor(true),
        to: HTMLEditor.getCursor(false)
    };
    HTMLEditor.autoFormatRange(range.from, range.to);
}

function restoreHTML() {
    if ('localStorage' in window && window.localStorage.cauliflower_html) {
        HTMLEditor.setValue(window.localStorage.cauliflower_html);
    } else {
        loadHTMLTemplate();
    }
}

function backupHTML() {
    if ('localStorage' in window) {
        window.localStorage.setItem('cauliflower_html', getHTMLCode());
    }
}

function loadHTMLTemplate() {
    discardHTML();
    var httpObj = $.get('html_template.txt', function() {
        HTMLEditor.setValue(httpObj.responseText);
    });
    backupHTML();
}

function discardHTML() {
    if ('localStorage' in window) {
        window.localStorage.removeItem('cauliflower_html');
    }
}

function htmlEscape(s) {
    s = s.replace(/&/g, '&amp;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/</g, '&lt;');
    return s;
}

function initializeJavaScriptPreview() {
    JavaScriptPreview = CodeMirror.fromTextArea(document.getElementById('blockly_text'), {
        mode: 'javascript',
        theme: 'eclipse',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        readOnly: true
    });
    JavaScriptPreview.setSize(350, 495);//TODO:CSSでやりたいけど、複数エディタの指定方法が分からない
}

function updateJavaScriptPreview(code) {
    JavaScriptPreview.setValue(code);
    if (previousCode != null) {
        diff(previousCode, code);
    }
    previousCode = code;
}

function backupBlocks() {
    if ('localStorage' in window) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        window.localStorage.setItem('cauliflower_blocks', Blockly.Xml.domToText(xml));
    }
}

function restoreBlocks() {
    if ('localStorage' in window && window.localStorage.cauliflower_blocks) {
        var xml = Blockly.Xml.textToDom(window.localStorage.cauliflower_blocks);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
    }
}

function discardBlocks() {
    var count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count < 2 || window.confirm(count + '個のブロックを全て削除しますか？')) {
        Blockly.mainWorkspace.clear();
        Blockly.mainWorkspace.render();
        updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
    }
}

function diff(text1, text2) {
    var dmp = new diff_match_patch();
    var diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
    //$('#diff').html(dmp.diff_prettyHtml(diffs)); for test
    var line = 0;
    var cIndex = 0;
    for (var diff in diffs) {
        switch (diffs[diff][0]) {
            case 1://insert
                var start = createStartObject(line, cIndex);
                for (var i = 0; i < diffs[diff][1].length; i++) {
                    if (diffs[diff][1][i] == '\n') {
                        highLightJavaScriptPreview(start.line, start.ch, line, cIndex, 'CodeMirror-update');
                        line++;
                        cIndex = 0;
                    } else if (diffs[diff][1][i] == ' ') {
                        highLightJavaScriptPreview(start.line, start.ch, line, cIndex, 'CodeMirror-update');
                        if (cIndex > 0 && i > 0 && diffs[diff][1][i - 1] != ' ') {
                            cIndex++;
                        } else {
                            cIndex++;
                            var start = createStartObject(line, cIndex);
                        }
                    } else {
                        cIndex++;
                    }
                }
                highLightJavaScriptPreview(start.line, start.ch, line, cIndex, 'CodeMirror-update');
                break;
            case 0://equality
                for (var i = 0; i < diffs[diff][1].length; i++) {
                    if (diffs[diff][1][i] == '\n') {
                        line++;
                        cIndex = 0;
                    } else {
                        cIndex++;
                    }
                }
                break;
        }
    }
}

function createStartObject(line, ch) {
    return {
        line: line,
        ch: ch
    };
}

function highLightJavaScriptPreview(startLine, startCh, endLine, endCh, className) {
    JavaScriptPreview.markText({
        line: startLine,
        ch: startCh
    }, {
        line: endLine,
        ch: endCh
    }, className);
}
