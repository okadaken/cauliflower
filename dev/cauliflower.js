/**
 * Cauliflower v0.1
 * Copyright (c) 2012 Ken Okada<>, Manabu Sugiura<>
 *
 * http://github.com/okadaken/cauliflower
 *
 * TODO:License書く
 * http://sourceforge.jp/projects/opensource/wiki/licenses
 *
 * やるべきことはTODOで検索
 * 例題ボタン
 * docとdomの変数名が混じっている
 * READMEの外部ライブラリ情報更新
 * previewからファイルを参照すればフォーカス問題はクリアできる
 * getElementを全部jquery方式へ
 * 特殊文字対応 http://pst.co.jp/powersoft/html/index.php?f=3401（XMLパースで失敗する）
 * 実体参照をいれるとだめ（text/htmlにすればよいがインデントがくずれる）
 * 呼び出しポイントは分からないがconsole.logブロックは欲しい。
 * HTMLパースエラーがあるときにも強引に編集できるようにする
 * HTMLフォーマット改善 ->ペンディング
 * 重要！！！再読み込み後のJavaScriptエディタの位置がおかしい（再読み込みした後にワークスペースのフォーカス領域が変更される時がある）
 * 実行プレビューにソース閲覧部分のJavaScriptがEclipseじゃない
 * windowsのsafariバージョン5.1.7でファイル保存と読込が動かない（winはサポート終了？）
 * ブラウザチェックを入れる
 * 生成コードでいやらしいところあり文字列連結など（変数はグローバル変数しか使えないから仕方ないか）
 * ブラウザの対応状況のまとめをREADMEに書くこと
 * jqueryアップデートしたいかも
 * ダイアログ表示関数にボタンとfunctionのセットを渡すように変更する
 */
//Codemirrorコンポーネント
var HTMLEditor;
var JavaScriptPreview;

// clearErrorMarks関数用
var errorMemento = {};

//JavaScriptの差分表示用
var previousCode;

//DOCTYPEタグの削除・復活フラグ
var hasDoctype;

//パースエラー時に使うDOMのnull object
var nullDOM;

function initializeTabs() {
    $('#tabs').tabs({
        cookie: {
            expires: 3
        },
        select: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case 'tab-javascript':
                        //JavaScriptタブ選択時にDOMパースをする（結果は捨てる）
                        parseHTMLToDOM(function() {
                            $('#tabs').tabs('select', 0);
                            event.preventDefault();
                        });
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
                        updateJavaScriptPreview();
                        Blockly.mainWorkspace.render();
                        Blockly.Toolbox.redraw();//Firefox、Safariではタブ切り替え時に強制再描画が必要
                        break;
                }
            }
        }
    });
    $('#tab-htmlsub').tabs({
        cookie: {
            expires: 3
        }
    });
}

function showConfirmDialog(title, message, func) {
    $('#dialog-icon').attr('src', 'img/dialog/warning.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func,
            'キャンセル': function() {
            
                $('#dialog').dialog('close');
            }
        }
    });
    $('#dialog-message').html('<p>' + message + '</p>');
    $('#dialog').dialog('open');
}

function showNoticeDialog(title, message, func) {
    $('#dialog-icon').attr('src', 'img/dialog/notice.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func
        }
    });
    $('#dialog-message').html('<p>' + message + '</p>');
    $('#dialog').dialog('open');
}

function showErrorDialog(title, message, func) {
    $('#dialog-icon').attr('src', 'img/dialog/error.png');
    $('#dialog').dialog({
        title: title,
        buttons: {
            OK: func
        }
    });
    $('#dialog-message').html('<p>' + message + '</p>');
    $('#dialog').dialog('open');
}

function removeAllWhiteSpaces(s) {
    return s.replace(/[ 　\t\r\n]/g, "");
}

//fortest
function debugdom(dom) {
    var serializer = new XMLSerializer();
    var code = serializer.serializeToString(dom);
    console.log(code);
}

function handleXMLParseError(e) {
    clearErrorMarks();
    var errorString = HTMLEditor.getRange({
        line: e.lineNumber - 1,
        ch: e.pos
    }, {
        line: e.lineNumber - 1,
        ch: e.pos + e.lineLength
    })
    var title = 'HTML構文エラー';
    var message = 'HTMLの構文エラーです。HTMLエディタのハイライト部分を修正してください。';
    message += '<div class="dialog-error-string">';
    message += 'エラー箇所 ［' + e.lineNumber + '行目］：<br>'
    message += '<code class="CodeMirror-matchhighlight">' + escapeHTML(errorString) + '</code></div>';
    showErrorDialog(title, message, function() {
        $('#dialog').dialog('close');
        $('#tabs').tabs('select', 0);
        HTMLEditor.setMarker(e.lineNumber - 1, '<span style="color: #900;">●%N%</span>');
        errorMemento.markedLine = e.lineNumber - 1;
        HTMLEditor.setCursor({
            line: e.lineNumber - 1,
            ch: e.pos
        });
        highlightErrorString(e);
        HTMLEditor.focus();
    });
}

function load() {
    var reader = new FileReader();//Safari5では実行不能
    var fileData = $('#load').get()[0].files[0];
    //onabort	abort	強制停止(abort()関数)で止めた時点
    //onerror	error	リクエストがエラーだった（404とか）
    //onloadend	loadend	リクエスト完了時（エラーでも成功でも関係なく、送信が完了した時点で呼ばれる）
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
        updateJavaScriptPreview();
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
function parseHTMLToDOM(errorFunction) {
    var html = getHTMLCode();
    if (removeAllWhiteSpaces(html).length == 0) {
        return nullDOM;
    }
    
    //前処理としてHTMLをXMLに変換する
    try {
        var xml = HTMLtoXML(html);
        if (xml.indexOf('<doctype') != -1) {
            hasDoctype = true;
        } else {
            hasDoctype = false;
        }
    } catch (e) {//XMLの変換エラーをハンドリング
        handleXMLParseError(e);
        errorFunction();//コールバック関数を実行
    }
    
    //次にDOMに変換
    try {
        var parser = new DOMParser();
        var dom = parser.parseFromString(xml, 'text/xml');
        //エラーチェック
        var parseDOMError = dom.getElementsByTagName('parsererror');
        
        if (parseDOMError.length != 0) {
            var errorString = parseDOMError[0].childNodes[0].data;
            if (errorString == null) {
                errorString = parseDOMError[0].childNodes[1].innerHTML;
            }
            if (dom.getElementsByTagName('sourcetext').length != 0) {
                errorString = dom.getElementsByTagName('sourcetext')[0].childNodes[0].nodeValue + '\n' + errorString;
                console.error(errorString);
            }
            var title = 'HTML構文エラー';
            var message = 'HTMLの構文エラーです。HTMLを修正してください。';
            message += '<div class="dialog-error-string">';
            message += 'エラーの原因：<br>'
            message += escapeHTML(errorString).replace(/\n/g, '<br>') + '</div>';
            showErrorDialog(title, message, function() {
                $('#dialog').dialog('close');
                $('#tabs').tabs('select', 0);
                HTMLEditor.focus();
            });
            errorFunction();//コールバック関数を実行
            return nullDOM;
        }
        
        //htmlタグのチェック
        if (dom.getElementsByTagName('html').length == 0) {
            var title = 'HTML構文エラー';
            var message = 'htmlタグが見つかりません。タグの対応関係等を見直し、HTMLを修正してください。';
            showErrorDialog(title, message, function() {
            
                $('#dialog').dialog('close');
                $('#tabs').tabs('select', 0);
                HTMLEditor.focus();
            });
            return nullDOM();
        }
        
        //bodyタグのチェック
        if (dom.getElementsByTagName('body').length == 0) {
            var title = 'HTML構文エラー';
            var message = 'bodyタグが見つかりません。タグの対応関係等を見直し、HTMLを修正してください。';
            showErrorDialog(title, message, function() {
                $('#dialog').dialog('close');
                $('#tabs').tabs('select', 0);
                HTMLEditor.focus();
            });
            return nullDOM;
        }
        return dom;
    } catch (e) {
        errorFunction();
        return nullDOM;//エラーの場合はダミーのDOMを返す
    }
}

//OK
function openPreviewWindow() {
    var url = 'preview.html';
    var name = 'previewWindow';
    var width = 600;
    var height = 600;
    var top = (screen.height - 600) / 2;
    var left = (screen.width - 600) / 2;
    var option = 'scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
    var previewWindow = window.open(url, name, option);
    previewWindow.focus();
}

//OK
function initializeDialogs() {
    $('#dialog').dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        show: 'clip',
        hide: 'clip'
    });
    // memo show/hideの一覧
    // 'blind', 'clip', 'drop', 'explode', 'fold', 'puff', 'slide', 'scale', 'size', 'pulsate','bounce'
}

//OK
function getAllCode(doc) {
    //JavaScriptタグとコードのノードを生成
    var js = doc.createElement('script');
    js.appendChild(doc.createTextNode('\n'));
    js.setAttribute('type', 'text/javascript');
    js.appendChild(doc.createComment(getJavaScriptCode()));
    js.appendChild(doc.createTextNode('\n'));
    
    //生成したノードを追加（docにbodyタグがあることが前提）
    var body = doc.getElementsByTagName('body')[0];
    body.insertBefore(js, body.firstChild);
    body.insertBefore(doc.createTextNode('\n'), body.firstChild);//scritpタグの前に改行を追加
    var serializer = new XMLSerializer();
    var code = serializer.serializeToString(doc);
    
    //titleが空で<title/>となるとbodyがレンダリングされない
    code = code.replace('<title/>', '<title></title>');
    
    if (hasDoctype) {
        code = code.replace(/<doctype.*?>/, '').replace('</doctype>', '');
        code = code.trim();
        code = '<!DOCTYPE html>\n' + code;
    }
    return code;
}

//OK
function getJavaScriptCode() {
    if (Blockly != null) {
        var code = '\n' + Blockly.Generator.workspaceToCode('JavaScript');
        return code;
    } else {
        console.error('Bockly is undefined!');
        return '\n\n';
    }
}

//OK
function createNullDOM() {
    var nullDOM = document.createElement('html');
    nullDOM.appendChild(document.createElement('body'));
    return nullDOM;
}

//OK
function highlightErrorString(e) {
    errorMemento.highlight = HTMLEditor.markText({
        line: e.lineNumber - 1,
        ch: e.pos
    }, {
        line: e.lineNumber - 1,
        ch: e.pos + e.lineLength
    }, 'CodeMirror-matchhighlight');
}

//OK
function clearErrorMarks() {
    if (errorMemento.markedLine != null) {
        HTMLEditor.clearMarker(errorMemento.markedLine);
    }
    
    if (errorMemento.highlight != null) {
        errorMemento.highlight.clear();
    }
}

//OK
function initializeHTMLReferenceAccordion() {
    $('#tab-htmlsub-ref-contents').accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });
}

//OK
function updateHTMLDesignPreview() {
    var previewFrame = $('#html-design-preview').get(0);
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(HTMLEditor.getValue());
    preview.close();
}

//OK
$(document).ready(function() {
    initializeTabs();
    initializeHTMLReferenceAccordion();
    initializeButtons();
    initializeJavaScriptPreview();
    initializeHTMLEditor();
    resetHTMLEditUndoState();//再読み込み時にはUndoできなくする
    restoreHTML();
    HTMLEditor.refresh();
    window.setTimeout(updateHTMLDesignPreview, 300);
    $(window).bind('unload', function() {
    
        backupHTML();
    });
    initializeDialogs();
    nullDOM = createNullDOM();
});

//OK
function initializeJavaScriptPreview() {
    JavaScriptPreview = CodeMirror.fromTextArea($('#blockly-text').get(0), {
        mode: 'javascript',
        theme: 'eclipse-jspreview',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        readOnly: true
    });
    JavaScriptPreview.setSize('100%', '530px');
    JavaScriptPreview.addClass('eclipse-jspreview');
}

//OK
function initializeBlocklyFrame(blockly) {
    window.Blockly = blockly;
    window.setTimeout(function() {
        Blockly.fireUiEvent(this, window, 'resize');
    }, 1);
    window.setTimeout(restoreBlocks, 0);
    Blockly.bindEvent_(window, 'unload', null, backupBlocks);
}

//OK
function initializeHTMLEditor() {
    var delay;
    HTMLEditor = CodeMirror.fromTextArea($('#html-textarea').get(0), {
        mode: 'text/html',
        theme: 'html-editor',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        closeTagIndent: true,
        autofocus: true,
        tabSize: 2,
        extraKeys: {
            "'>'": function(cm) {
                cm.closeTag(cm, '>');
            },
            "'/'": function(cm) {
                cm.closeTag(cm, '/');
            }
        },
        onChange: function() {
            clearErrorMarks();
            clearTimeout(delay);
            delay = setTimeout(updateHTMLDesignPreview, 300);
            updateHTMLToolBar();
        },
        onCursorActivity: function() {
            HTMLEditor.setLineClass(activeLine, null, null);
            activeLine = HTMLEditor.setLineClass(HTMLEditor.getCursor().line, null, 'CodeMirror-activeline');
        }
    });
    var activeLine = HTMLEditor.setLineClass(0, 'CodeMirror-activeline');
    HTMLEditor.setSize('50%', '502px');
    HTMLEditor.addClass('html-editor');
}

//OK
function getFileNameForSave(doc) {
    var ext = '.calf';
    var defaultFileName = '新規Cauliflowerファイル' + ext;
    var titles = doc.getElementsByTagName('title');
    if (titles.length != 0 && titles[0].firstChild != null) {
        var fileName = trimStringForFileName(titles[0].firstChild.nodeValue);
        if (fileName.length != 0) {
            return fileName + ext;
        }
    }
    return defaultFileName;
}

//OK
function save() {
    var dom = parseHTMLToDOM();
    debugdom(dom);
    saveToFile({
        filename: getFileNameForSave(dom),
        contents: createXML()
    });
}

//OK
function saveToFile(properties) {
    // TODO:jquery
    var form = document.createElement('form');
    form.setAttribute('action', 'http://crew-lab.sfc.keio.ac.jp/cauliflower-support/save.php');
    form.setAttribute('method', 'post');
    form.style.display = 'none';
    document.body.appendChild(form);
    for (var prop in properties) {
    
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', prop);
        input.setAttribute('value', properties[prop]);
        form.appendChild(input);
    }
    form.submit();
}

//OK
function updateHTMLToolBar() {
    var history = HTMLEditor.historySize();
    
    //undo
    if (history['undo'] > 0) {
        $('#undo-button').removeClass('inactive');
    } else {
        $('#undo-button').addClass('inactive');
    }
    
    //redo
    if (history['redo'] > 0) {
        $('#redo-button').removeClass('inactive');
    } else {
        $('#redo-button').addClass('inactive');
    }
}

//OK
function trimStringForFileName(s) {
    return s.trim().replace(/[\\\/:\*\?\"\<\>\|]/gi, '');
}

//OK
function setHTMLEditorFontLarger() {
    changeHTMLEditorFontSize(1);
    HTMLEditor.refresh();
}

//OK
function setHTMLEditorFontSmaller() {
    changeHTMLEditorFontSize(-1);
    HTMLEditor.refresh();
}

//OK
function changeHTMLEditorFontSize(increment) {
    var current = parseInt($('.html-editor').css('font-size').replace('px', ''));
    $('.html-editor').css('font-size', (current + increment) + 'px');
}

//OK
function getHTMLCode() {
    return HTMLEditor.getValue();
}

//OK
function autoFormatHTML() {
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

//OK
function resetHTMLEditUndoState() {
    HTMLEditor.clearHistory();
    updateHTMLToolBar();
}

//OK
function redoHTMLEdit() {
    HTMLEditor.redo();
}

//OK
function undoHTMLEdit() {
    HTMLEditor.undo();
}

//OK
function updateJavaScriptPreview() {
    var code = Blockly.Generator.workspaceToCode('JavaScript')
    JavaScriptPreview.setValue(code);
    if (previousCode != null) {
        diff(previousCode, code);
    }
    previousCode = code;
}

//OK
function backupBlocks() {
    if ('localStorage' in window) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        window.localStorage.setItem('cauliflower_blocks', Blockly.Xml.domToText(xml));
    }
}

//OK
function restoreBlocks() {
    if ('localStorage' in window && window.localStorage.cauliflower_blocks) {
        var xml = Blockly.Xml.textToDom(window.localStorage.cauliflower_blocks);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        updateJavaScriptPreview();
        Blockly.mainWorkspace.render();//Chromeだと再描画されないので入れてある
    }
}

//OK
function discardBlocks() {
    var count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count > 0) {
        var title = '削除の確認';
        var message = '計' + count + '個のブロックを削除しますか？';
        showConfirmDialog(title, message, function() {
            clearBlocklyWorkspace();
            $('#dialog').dialog('close');
        });
    }
}

//OK
function clearBlocklyWorkspace() {
    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.render();
    updateJavaScriptPreview();
    if ('localStorage' in window) {
        window.localStorage.removeItem('cauliflower_blocks');
    }
}

//OK
function initializeButtons() {
    initalizeNewButton();
    initalizeLoadButton();
    initalizeSaveButton();
    initalizeExecButton();
}

//OK
function initalizeNewButton() {
    $('#new-button').button({
        icons: {
            primary: 'ui-icon-document'
        }
    }).click(function() {
        var title = '編集中の内容が削除されます';
        var message = '編集中のHTMLとJavaScriptを削除し、エディタを初期化してよろしいですか？';
        showConfirmDialog(title, message, function() {
            loadHTMLTemplate();
            clearBlocklyWorkspace();
            $('#dialog').dialog('close');
        });
    });
}

//OK
function initalizeLoadButton() {
    //開くボタン（inputフォームにイベントを委譲）
    $('#load-button').button({
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
    $('#save-button').button({
        icons: {
            primary: 'ui-icon-disk'
        }
    }).click(function() {
        save();
    }).parent().buttonset();
}

//OK
function initalizeExecButton() {
    $('#exec-button').button({
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
function loadHTMLTemplateConfirm() {
    var title = '編集中のHTMLが削除されます';
    var message = '編集中のHTMLを削除し、HTMLテンプレートを読み込んでよろしいですか？';
    showConfirmDialog(title, message, function() {
        discardHTML();
        var o = $.get('html_template.txt', function() {
            HTMLEditor.setValue(o.responseText);
        }).complete(function() {
            $('#dialog').dialog('close');
        });
    });
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
    s = s.replace(/ /g, '&nbsp;');
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
    //FirefoxでXMLにxmlns属性が付与されると引数付き関数が復元できないため除去
    xml = xml.replace(' xmlns="http://www.w3.org/1999/xhtml"', '');
    
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
