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
 * HTMLフォーマット改善 ->ペンディング
 * restore後のJavaScriptエディタの位置がおかしい気がする
 * parseHTML2DOMのException変更
 * 実行プレビューにソース閲覧機能を追加すること
 * windowsのsafariバージョン5.1.7でファイル保存と読込が動かない（winはサポート終了？）
 * ブラウザチェックを入れる
 * 生成コードでいやらしいところあり文字列連結など（変数はグローバル変数しか使えないから仕方ないか）
 * HTMLのタブはプレビューとHTMLタグリファレンスにする
 * JavaScriptのコードが長くなると、左に大きくなるのを直す。たぶん%指定が原因。
 * CodeMirrorの全部のデモチェックをすること
 * ブラウザの対応状況のまとめをREADMEに書くこと
 * 横長画面のテストをしてみること
 * 重要：エラーハンドリング全部書き直す！！！
 * 新規Windowを開くをJqueryへ
 * 中心のテスト（chromeで上下ずれる）
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
                        try {
                            validateHTML();
                        } catch (e) {
                            $('#tabs').tabs('select', 0);
                            alert(e);
                            event.preventDefault();
                            return;
                        }
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

function validateHTML() {
    var doc = parseHTML2DOM(true);
    
    if (doc.getElementsByTagName('parsererror').length != 0) {
        //        throw doc.getElementsByTagName('parsererror')[0].childNodes[0].nodeValue;
        throw 'HTMLが見つかりません';
    }
    if (doc.getElementsByTagName('html').length == 0) {
        throw 'htmlタグが見つかりません';
    }
    if (doc.getElementsByTagName('body').length == 0) {
        throw 'bodyタグが見つかりません';
    }
}

function save() {
    var data = {
        filename: guessSaveFileName(),
        contents: createXML()
    };
    var form = document.createElement('form');
    form.setAttribute('action', 'http://crew-lab.sfc.keio.ac.jp/cauliflower-support/save.php');
    form.setAttribute('method', 'post');
    form.style.display = 'none';
    document.body.appendChild(form);
    // パラメタの設定
    for (var paramName in data) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', paramName);
        input.setAttribute('value', data[paramName]);
        form.appendChild(input);
    }
    
    form.submit();
}

function guessSaveFileName() {
    var ext = '.calf';
    var defaultFileName = '新規Cauliflowerファイル' + ext;
    var doc = parseHTML2DOM(false);
    if (doc != null) {
        var titles = doc.getElementsByTagName('title');
        if (titles.length != 0) {
            var fileName = trimStringForFileName(titles[0].firstChild.nodeValue);
            if (fileName.length != 0) {
                return fileName + ext;
            } else {
                return defaultFileName;
            }
        } else {
            return defaultFileName;
        }
    } else {
        return defaultFileName;
    }
}

function trimStringForFileName(s) {
    return s.trim().replace(/[\\\/:\*\?\"\<\>\|]/gi, '');
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
        onCursorActivity: function() {
            HTMLEditor.setLineClass(hlLine, null, null);
            hlLine = HTMLEditor.setLineClass(HTMLEditor.getCursor().line, null, 'CodeMirror-activeline');
        }
    });
    HTMLEditor.setSize('50%', '480');
    var hlLine = HTMLEditor.setLineClass(0, 'CodeMirror-activeline');
}

function showConfirmDialog(title, message, func) {
    $('#dialogicon').attr('src', 'img/dialog/warning.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func,
            'キャンセル': function() {
                $(this).dialog('close');
            }
        }
    });
    $('#dialog_message').html('<p>' + message + '</p>');
    $('#dialog').dialog('open');
}

function showNoticeDialog(title, message, func) {
    $('#dialogicon').attr('src', 'img/dialog/notice.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func
        }
    });
    $('#dialog_message').html(message);
    $('#dialog').dialog('open');
}

function showErrorDialog(title, message, func) {
    $('#dialogicon').attr('src', 'img/dialog/error.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func
        }
    });
    $('#dialog_message').html(message);
    $('#dialog').dialog('open');
}

function initializeDialogs() {
    $('#dialog').dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        show: 'clip',
        hide: 'clip'
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
            errorLine = e.split('\n');
            if (errorLine.length > 1) {
                errorLine = errorLine[0] + '\n' + errorLine[1];
            } else {
                errorLine = errorLine[0];
            }
            var message = '<p>HTMLの構文エラーです。</p><p>エラー箇所:<br><b><code style="background: #ffaaaa;">' + escapeHTML(errorLine) + '</code></b></p><p>HTMLエディタのハイライト部分やその周辺を修正してください。</p>';
            
            showErrorDialog('HTML構文エラー', message, function() {
                $(this).dialog('close');
                $('#tabs').tabs('select', 0);
                mark(errorLine);
            });
            // $('#error_dialog_message').html(message);
        
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
        throw 'bodyタグが見つかりません';//TODO:dialogにすること,previewからの呼び出し時に対応すること
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
    HTMLEditor.setLineClass(HTMLEditor.getCursor().line, null, '');
    HTMLEditor.matchHighlight('CodeMirror-matchhighlight', s);
}

function clearMarks() {
    HTMLEditor.clearMarks();
}

function autoFormat() {
    var cursor = HTMLEditor.getCursor(true);
    CodeMirror.commands['selectAll'](HTMLEditor);
    var range = {
        from: HTMLEditor.getCursor(true),
        to: HTMLEditor.getCursor(false)
    };
    HTMLEditor.autoFormatRange(range.from, range.to);
    HTMLEditor.setCursor(cursor);
    HTMLEditor.focus();
}

function openPreviewWindow() {
    //事前にチェック（やり方考えること）
    //TODO:bodyタグが見つからなったときのエラー処理をしていないので追加すること
    if (parseHTML2DOM(true) != null) {
        previewWindow = window.open('preview.html', 'previewWindow', 'width=600,height=600,top=' + ((screen.height - 600) / 2) + ',left=' + ((screen.width - 600) / 2));
        previewWindow.focus();
        
    }
}

function initializeJavaScriptPreview() {
    JavaScriptPreview = CodeMirror.fromTextArea(document.getElementById('blockly_text'), {
        mode: 'javascript',
        theme: 'eclipse-jspreview',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        readOnly: true
    });
    JavaScriptPreview.setSize('400px', '500px');
    
    //独自拡張で個別にclass指定
    JavaScriptPreview.addClass('eclipse-jspreview');
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
    if (count > 2) {
        showConfirmDialog('削除の確認', count + '個のブロックを全て削除しますか？', function() {
            clearBlocklyWorkspace();
            $(this).dialog('close');
        });
    }
}

function clearBlocklyWorkspace() {
    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.render();
    updateJavaScriptPreview(Blockly.Generator.workspaceToCode('JavaScript'));
}


function load() {
    var reader = new FileReader();//Safari5では実行不能
    var fileData = $('#load').get()[0].files[0];
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
        if (count) {
            showNoticeDialog('確認', '現在配置されているブロックを消去してよろしいですか？');
        }
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
    reader.readAsText(fileData, 'utf-8');
}

function getUserEnv() {
    var ua = window.navigator.userAgent.toLowerCase();
    var env = {};
    
    //OS
    if (ua.indexOf('win') > -1) {
        env['os'] = 'Windows';
        if (ua.indexOf('nt 5.1') != -1) {
            env['winv'] = 'XP';
        } else if (ua.indexOf('nt 6.0') != -1) {
            env['winv'] = 'Vista';
        } else if (ua.indexOf('nt 6.1') != -1) {
            env['winv'] = '7';
        } else {
            env['winv'] = null;
        }
    } else if (ua.indexOf('mac') > -1) {
        env['os'] = 'Mac';
    } else {
        env['os'] = null;
    }
    
    //Browser
    if (ua.indexOf('firefox') != -1) {
        env['browser'] = 'Firefox';
    } else if (ua.indexOf('chrome') != -1) {
        env['browser'] = 'Chrome';
    } else if (ua.indexOf('safari') != -1) {
        env['browser'] = 'Safari';
        if (ua.match('Safari/(\\d+(\\.\\d+)*)')) {
            env['browserv'] = match[1];
            //Safariは6からFileAPI対応なので、調べられるようにしておく
            //テストしましょう
        }
    } else if (ua.indexOf('opera') != -1) {
        env['browser'] = 'Opera';
    } else if (ua.indexOf('msie') != -1) {
        env['browser'] = 'IE';
    } else if (ua.indexOf('gecko') != -1) {
        env['browser'] = 'Gecko';
    } else {
        env['browser'] = null;
    }
    console.log(env);
    return env;
}

/**************************************************
 * 以下OK
 **************************************************/
//OK
function initializeButtons() {
    initalizeNewButton();
    initalizeLoadButton();
    initalizeSaveButton();
    initalizeExecButton();
}

//OK
function initalizeNewButton() {
    $('#new_button').button({
        icons: {
            primary: 'ui-icon-document'
        }
    }).click(function() {
        var title = '編集中の内容が削除されます';
        var message = '編集中のHTMLとJavaScriptを削除し、エディタを初期化してよろしいですか？';
        showConfirmDialog(title, message, function() {
            loadHTMLTemplate();
            clearBlocklyWorkspace();
            $(this).dialog('close');
        });
    });
}

//OK
function initalizeLoadButton() {
    //開くボタン（inputフォームにイベントを委譲）
    $('#load_button').button({
        icons: {
            primary: 'ui-icon-folder-open'
        }
    }).click(function() {
        $('#load').click();
    });
    
    //開くボタンのinputフォーム
    $('#load').bind('change', function() {
        load();
    });
}

//OK
function initalizeSaveButton() {
    $('#save_button').button({
        icons: {
            primary: 'ui-icon-disk'
        }
    }).click(function() {
        save();
    }).parent().buttonset();
}

//OK
function initalizeExecButton() {
    $('#exec_button').button({
        icons: {
            primary: 'ui-icon-play'
            //他のicon候補 'ui-icon-flag' 'ui-icon-gear' 'ui-icon-circle-triangle-e'
        }
    }).click(function() {
        openPreviewWindow();
    });
}

//OK
function restoreHTML() {
    if ('localStorage' in window && window.localStorage.cauliflower_html) {
        HTMLEditor.setValue(window.localStorage.cauliflower_html);
    } else {
        loadHTMLTemplate();
    }
}

//OK
function backupHTML() {
    if ('localStorage' in window) {
        window.localStorage.setItem('cauliflower_html', getHTMLCode());
    }
}

//OK
function loadHTMLTemplate() {
    discardHTML();
    var o = $.get('html_template.txt', function() {
        HTMLEditor.setValue(o.responseText);
    });
}

//OK
function discardHTML() {
    if ('localStorage' in window) {
        window.localStorage.removeItem('cauliflower_html');
    }
}

//OK
function escapeHTML(s) {
    s = s.replace(/&/g, '&amp;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/</g, '&lt;');
    return s;
}

//OK
function createXML() {
    //version属性は保存ファイルの後方互換用に付与
    var root = document.createElement('cauliflower');
    root.setAttribute('version', '1.0');
    
    var htmTag = document.createElement('html');
    htmTag.appendChild(document.createTextNode(getHTMLCode()));
    root.appendChild(htmTag);
    
    var blocksTag = document.createElement('blocks');
    var blocksDOM = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var blocks = blocksDOM.getElementsByTagName('block');
    while (blocks.length != 0) {
        blocksTag.appendChild(blocks[0]);
    }
    root.appendChild(blocksTag);
    
    var serializer = new XMLSerializer();
    var xml = serializer.serializeToString(root);
    return formatXML(xml);
}

//OK
function formatXML(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    $.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }
        
        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }
        
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
}

//OK
function diff(text1, text2) {
    var dmp = new diff_match_patch();
    var diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
    var line = 0;
    var cIndex = 0;
    for (var diff in diffs) {
        switch (diffs[diff][0]) {
            case 1://Insert
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
            case 0://Equality
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

//OK
function createStartObject(line, ch) {
    return {
        line: line,
        ch: ch
    };
}

//OK
function highLightJavaScriptPreview(startLine, startCh, endLine, endCh, className) {
    JavaScriptPreview.markText({
        line: startLine,
        ch: startCh
    }, {
        line: endLine,
        ch: endCh
    }, className);
}
