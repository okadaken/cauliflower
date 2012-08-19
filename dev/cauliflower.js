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
 * HTMLフォーマット改善
 * restore後のJavaScriptエディタの位置がおかしい気がする
 * parseHTML2DOMのException変更
 * 実行プレビューにソース閲覧機能を追加すること
 * windowsのsafariバージョン5.1.7でファイル保存と読込が動かない（winはサポート終了？）
 * body><<で試してみて
 * ブラウザチェックを入れる
 */
var HTMLEditor;
var JavaScriptPreview;

var errorLine;
var previousCode;

var previewWindow;

$(document).ready(function() {
    initializeTabs();
    initializeButtons();
    initializeHTMLEditor();
    initializeDialogs();
    
    restoreHTML();
    HTMLEditor.refresh();
    setTimeout(updatePreview, 300);
    
    initializeJavaScriptPreview();
    
    adjustCSS();
});

$(window).unload(function() {
    backupHTML();
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
                        parseHTML2DOM(true)
                        break;
                }
            }
        },
        show: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case 'tab-html':
                        HTMLEditor.refresh();
                        HTMLEditor.focus();
                        break;
                    case 'tab-javascript':
                        updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
                        Blockly.mainWorkspace.render();
                        Blockly.Toolbox.redraw();//Firefox、Safariではタブ切り替え時に強制再描画が必要
                        break;
                }
            }
        }
    });
}

function initializeButtons() {

    $('#load').bind('change', function() {
        loadFile();
    });
    
    $('#new_button').button({
        icons: {
            primary: 'ui-icon-document'
        }
    }).click(function() {
        alert('新規作成は未実装');
    })
    $('#load_button').button({
        icons: {
            primary: 'ui-icon-folder-open'
        }
    }).click(function() {
        //document.getElementById('load').click();
        $('#load').click();
    });
    $('#save_button').button({
        icons: {
            //primary: 'ui-icon-disk'
        }
    }).click(function() {
        save();
    }).parent().buttonset();
    
    Downloadify.create('downloadify', {
        filename: function() {
            return guessSaveFileName();
        },
        data: function() {
            return createXML();
        },
        onComplete: function() {
            alert('保存が完了しました');
        },
        onCancel: function() {
            //alert('You have cancelled the saving of this file.');
        },
        onError: function() {
            alert('You must put something in the File Contents or there will be nothing to save!');
        },
        swf: 'downloadify/media/downloadify.swf',
        downloadImage: 'downloadify/images/download.png',
        width: 70,
        height: 32,
        transparent: true,
        append: false
    });
    
    $('#exec_button').button({
        icons: {
            primary: 'ui-icon-flag'
            //primary: 'ui-icon-circle-triangle-e'
            //primary: 'ui-icon-play'
        }
    }).click(function() {//TODO:とりあえず色を変えただけ 要グラデーション
        openPreviewWindow();
    });
    
    /** ボタンにする予定実装していない **/
    $('#html_new_botton').button().click(function() {
        loadHTMLTemplate();
    });
}

function guessSaveFileName() {
    var ext = '.calf';
    var defaultFileName = '新規JavaScriptプログラム' + ext;
    var dom = parseHTML2DOM(false);
    if (dom != null) {
        var titles = dom.getElementsByTagName('title');
        if (titles.length != 0) {
            return titles[0].firstChild.nodeValue + ext;
        } else {
            return defaultFileName;
        }
    } else {
        return defaultFileName;
    }
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
        }
    });
    HTMLEditor.setSize('55%', '480');
    
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

//Blocklyがreference errorになる場合があるのをチェック
function getJavaScriptCode() {
    if (typeof Blockly === 'undefined') {
        return '\n\n';
    }
    var code = '\n' + Blockly.Generator.workspaceToCode('JavaScript');
    return code;
}

//ここで再度throwするように変更せよ
function parseHTML2DOM(dialog) {
    //前処理としてHTMLをXMLに変換
    try {
        var xml = HTMLtoXML(getHTMLCode());
    } catch (e) {//変換できなければエラー表示して終了
        if (dialog) {
            errorLine = e.split('\n')[0];
            var message = '<p>HTMLの構文エラーです。</p><p>エラーの原因となった文字列:<br><b><code style="background: #ffaaaa;">' + htmlEscape(errorLine) + '</code></b></p><p>HTMLエディタのハイライト部分を修正してください。</p>';
            $('#HTML_syntaxerror_dialog_message').html(message);
            $('#HTML_syntaxerror_dialog').dialog('open');
        }
        return null;
    }
    
    //DOMにパース
    var parser = new DOMParser();
    return parser.parseFromString(xml, 'text/xml');
}

function getAllCode(dialog) {
    var doc = parseHTML2DOM(dialog);
    if (doc == null) {
        return '解析不能';//一時的にnullは返さないようにしておく
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
        return code;//TODO:最後に行頭のDOCTYPEを追加すること
        //console.log( serializer.serializeToString(body)); 
    } else {
        alert('bodyタグが見つかりません');//TODO:dialogにすること
    }
}

function updatePreview() {
    var previewFrame = document.getElementById('html_preview');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write('<p>↓これはJavaScript統合前のHTMLなので動作しない（後で削除します）<br>ここにタグ辞典を入れるのがいいかも。</p>' + HTMLEditor.getValue());
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

function openPreviewWindow() {
    //事前にチェック（やり方考えること）
    //TODO:bodyタグが見つからなったときのエラー処理をしていないので追加すること
    if (parseHTML2DOM(true) != null) {
        previewWindow = window.open('preview.html', 'previewWindow', 'width=600,height=600,previewWindow.focus();');
        previewWindow.focus();
    }
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
    JavaScriptPreview.setSize('100%', '495');//TODO:CSSでやりたいけど、複数エディタの指定方法が分からない
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

function createDOMDocument() {
    if (typeof DOMDocument != "undefined") {
        return new DOMDocument();
    } else if (typeof document != "undefined" && document.implementation && document.implementation.createDocument) {
        return document.implementation.createDocument("", "", null);
    } else if (typeof ActiveX != "undefined") {
        return new ActiveXObject("Msxml.DOMDocument");
    }
}

function createXML() {
    //HTML
    var doc = createDOMDocument();
    var cauliflower = doc.createElement("cauliflower");
    cauliflower.setAttribute('v', '1'); //後方互換のため
    var html = doc.createElement('html');
    html.appendChild(doc.createTextNode(getHTMLCode()));
    doc.appendChild(cauliflower);
    cauliflower.appendChild(html);
    
    //Blocks
    var blocks = doc.createElement('blocks');
    var bloksDoc = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var blockElements = bloksDoc.getElementsByTagName('block');
    while (blockElements.length != 0) {
        blocks.appendChild(blockElements[0]);
    }
    cauliflower.appendChild(blocks);
    
    var serializer = new XMLSerializer();
    var xml = serializer.serializeToString(doc);
    return xml;
}

function loadFile() {
    var file = document.getElementById('load').files[0];
    var reader = new FileReader();
    var fileData = document.getElementById("load").files[0];
    
    //Safariのエラー処理を追加すること
    var reader = new FileReader();
    reader.onload = function(evt) {
        try {
            var parser = new DOMParser();
            var xml = parser.parseFromString(evt.target.result, 'text/xml');
        } catch (e) {
            alert('Error parsing XML:\n' + e);
            return;
        }
        var htmls = xml.getElementsByTagName('html');
        if (htmls.length != 0) {
            HTMLEditor.setValue(htmls[0].firstChild.nodeValue);
        }
        var count = Blockly.mainWorkspace.getAllBlocks().length;
        if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
            Blockly.mainWorkspace.clear();
        }
        
        var blockxml = document.createElement('xml');
        var blocks = xml.getElementsByTagName('block');
        while (blocks.length != 0) {
            blockxml.appendChild(blocks[0]);
        }
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, blockxml);
        updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
        Blockly.mainWorkspace.render();
        Blockly.Toolbox.redraw();
        $('#load').val('');
    }
    reader.readAsText(fileData, "utf-8");
}

function diff(text1, text2) {
    var dmp = new diff_match_patch();
    var diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
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

function adjustCSS() {
    if (getWindowsOSVersion() >= 7) {//7以上のchrome対策
        $('#downloadify').css('cursor', 'pointer').css('position', 'relative').css('top', '10px').css('left', '0px');
    } else if (getWindowsOSVersion() == -1) {//mac
        $('#downloadify').css('cursor', 'pointer').css('position', 'relative').css('top', '10px').css('left', '0px');
        if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            $('#downloadify').css('cursor', 'pointer').css('position', 'relative').css('top', '10px').css('left', '-1px');
        }
    }
    //safariの場合は保存と読込を隠す
}


function getWindowsOSVersion() {
    if ((window.navigator.userAgent).indexOf("NT 6.0") != -1) {
        return 6;
    } else if ((window.navigator.userAgent).indexOf("NT 6.1") != -1) {
        return 7;
    } else {
        return -1;
    }
    /*
     var ua = window.navigator.userAgent.toLowerCase();
     if (ua.indexOf("NT 6.0") != -1) {
     return 6;
     } else if (ua.indexOf("NT 6.1") != -1) {
     return 7;
     } else {
     return -1;
     }*/
}
