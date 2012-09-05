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
 * ヘルプ実装
 * docとdomの変数名が混じっている
 * READMEの外部ライブラリ情報更新
 * previewからファイルを参照すればフォーカス問題はクリアできる
 * getElementを全部jquery方式へ
 * 特殊文字対応 http://pst.co.jp/powersoft/html/index.php?f=3401（XMLパースで失敗する）
 * 実体参照をいれるとだめ（text/htmlにすればよいがインデントがくずれる）
 * 呼び出しポイントは分からないがconsole.logブロックは欲しい。
 * HTMLフォーマット改善 ->ペンディング
 * 重要！！！再読み込み後のJavaScriptエディタの位置がおかしい（再読み込みした後にワークスペースのフォーカス領域が変更される時がある）
 * 実行プレビューにソース閲覧部分のJavaScriptがEclipseじゃない
 * ブラウザチェックを入れる
 * 生成コードでいやらしいところあり文字列連結など（変数はグローバル変数しか使えないから仕方ないか）
 * ブラウザの対応状況のまとめをREADMEに書くこと
 * jqueryアップデートしたいかも
 * jquery/menuの余分なファイル削除
 * 追加読み込み時にブロックが重なるのが嫌
 */
//CodeMirrorコンポーネント
var HTMLEditor;
var JavaScriptPreview;

//clearErrorMarks関数用
var errorMemento = {};

//JavaScriptの差分表示用
var previousCode;

//DOCTYPEタグの削除・復活フラグ
var hasDoctype;

//パースエラー時に使うDOMのNull Object
var nullDOM;

//タブクリックイベントのキャンセルフラグ
var ignore = false;

$(document).ready(function() {
    initializeTabs();
    initializeHTMLReferenceAccordion();
    initializeButtons();
    initializeJavaScriptPreview();
    initializeHTMLEditor();
    restoreHTML();
    resetHTMLEditUndoState();//再読み込み時にはUndoできなくする
    HTMLEditor.refresh();
    window.setTimeout(updateHTMLDesignPreview, 300);
    $(window).bind('unload', function() {
        backupHTML();
    });
    initializeDialogs();
    nullDOM = createNullDOM();
});

/**************************************************
 * コンポーネント初期化関連
 **************************************************/
function initializeTabs() {
    $('#tabs').tabs({
        cookie: {
            expires: 3
        },
        select: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case 'tab-html':
                        ignore = false;
                        break;
                    case 'tab-javascript':
                        if (!ignore) {
                            //JavaScriptタブ選択時にDOMにパースをする（結果は捨てる）
                            parseHTMLToDOM(function() {
                                $('#tabs').tabs('select', 0);
                                event.preventDefault();
                            });
                        }
                        ignore = false;
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
                        updateJavaScriptPreview();
                        Blockly.Toolbox.redraw();//Firefox、Safariではタブ切り替え時に強制再描画が必要
                        Blockly.mainWorkspace.render();
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

function initializeHTMLReferenceAccordion() {
    $('#tab-htmlsub-ref-contents').accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });
}

function initializeButtons() {
    initalizeNewButton();
    initalizeLoadButton();
    initalizeSaveButton();
    initalizeSampleButton();
    initalizeExecButton();
    initalizeHelpButton();
}

function initalizeNewButton() {
    $('#new-button').button({
        icons: {
            primary: 'ui-icon-document'
        }
    }).click(function() {
        newFile();
    });
}

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
    $('#load').bind('change', function(event) {
        load(event);
    });
}

function initalizeSaveButton() {
    $('#save-button').button({
        icons: {
            primary: 'ui-icon-disk'
        }
    }).click(function() {
        save();
    });
}

function initalizeSampleButton() {
    $('#sample-button').button({
        icons: {
            primary: 'ui-icon-triangle-1-s'
        }
    });
    
    $.get('samples.html', function(data) {
        $('#sample-button').menu({
            content: data,
            width: '240px',
            flyOut: true,
            showSpeed: 100
        });
    });
}

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

function initalizeHelpButton() {
    $('#help-button').button({
        icons: {
            primary: 'ui-icon-help'
        }
    }).click(function() {
        help();
    }).parent().buttonset();
    ;
}

function initializeDialogs() {
    $('#dialog').dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        show: 'clip',
        hide: 'clip',
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close").hide();//閉じるボタンを消す
        }
    });
    // memo show/hideの一覧
    // 'blind', 'clip', 'drop', 'explode', 'fold', 'puff', 'slide', 'scale', 'size', 'pulsate','bounce'
}

function initializeJavaScriptPreview() {
    JavaScriptPreview = CodeMirror.fromTextArea($('#blockly-text').get(0), {
        mode: 'javascript',
        theme: 'eclipse-jspreview',
        tabMode: 'indent',
        lineNumbers: true,
        fixedGutter: true,
        electricChars: true,
        readOnly: true,
        indentWithTabs: true,
        tabSize: 3
    });
    JavaScriptPreview.setSize('100%', '530px');
    JavaScriptPreview.addClass('eclipse-jspreview');
}

function initializeHTMLEditor() {
    var delay;
    HTMLEditor = CodeMirror.fromTextArea($('#html-textarea').get(0), {
        mode: 'text/html',
        theme: 'html-editor',
        tabMode: 'indent',
        indentWithTabs: true,
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

function initializeBlocklyFrame(blockly) {
    window.Blockly = blockly;
    window.setTimeout(function() {
        Blockly.fireUiEvent(this, window, 'resize');
    }, 1);
    window.setTimeout(restoreBlocks, 0);
    Blockly.bindEvent_(window, 'unload', null, backupBlocks);
}

/**************************************************
 * メインメニュー関連
 **************************************************/
function newFile() {
    var title = '編集中の内容が削除されます';
    var message = '編集中のHTMLとJavaScriptを削除し、エディタを初期化してよろしいですか？';
    var buttons = {
        OK: function() {
            loadHTMLTemplate();
            clearBlocklyWorkspace();
            $('#dialog').dialog('close');
        },
        'キャンセル': function() {
            $('#dialog').dialog('close');
        }
    };
    showDialog('confirm', title, message, buttons);
}

function load(event) {
    var exception = false;
    try {
        var reader = new FileReader();
    } catch (e) {
        //Safari v5.1.7はFileReader未対応
        var title = 'ファイルの読み込みエラー';
        var message = 'お使いのブラウザではファイルを開くことができません。ヘルプから対応ブラウザを確認してください。';
        var buttons = {
            OK: function() {
                $('#dialog').dialog('close');
            }
        };
        showDialog('error', title, message, buttons);
        $('#load').val('');
        return;
    }
    
    var fileData = $('#load').get()[0].files[0];
    
    reader.onerror = function(evt) {
        exception = true;
        showLoadErrorDialog();
        switch (evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
                console.error('File Not Found');
                break;
            case evt.target.error.NOT_READABLE_ERR:
                console.error('File is not readable');
                break;
            case evt.target.error.ABORT_ERR:
                console.error('Event aborted')
                break;
            default:
                alert('An error occurred reading this file.');
        }
        return;
    }
    
    reader.onload = function(evt) {
        try {
            var parser = new DOMParser();
            var xml = parser.parseFromString(evt.target.result, 'text/xml');
        } catch (e) {//想定しているブラウザはExceptionをthrowしないはず
            // http://mzl.la/QSDcPS | http://bit.ly/PZ0sIh
            exception = true;
            showLoadErrorDialog();
            console.error('Error parsing XML:\n' + e);
            return;
        }
        
        if (xml.getElementsByTagName('parsererror').length != 0) {
            exception = true;
            showLoadErrorDialog();
            return;
        }
        
        var htmls = xml.getElementsByTagName('html');
        if (htmls.length != 0) {
            HTMLEditor.setValue(htmls[0].firstChild.nodeValue);
        }
        var count = Blockly.mainWorkspace.getAllBlocks().length;
        if (count) {
            var title = '編集のブロックがあります';
            var message = 'JavaScriptエディタに編集中のブロックがあります。編集中のブロックの扱いを選択してください。';
            var buttons = {
                '削除': function() {
                    Blockly.mainWorkspace.clear();
                    $('#dialog').dialog('close');
                    loadXML(xml);
                },
                '残す': function() {
                    $('#dialog').dialog('close');
                    loadXML(xml);
                },
                'キャンセル': function() {
                    $('#dialog').dialog('close');
                }
            };
            showDialog('confirm', title, message, buttons);
        } else {
            loadXML(xml);
        }
    }
    reader.readAsText(fileData, 'UTF-8');
}

function save() {
    var dom = parseHTMLToDOM();
    saveToFile({
        filename: getFileNameForSave(dom),
        contents: createXML()
    });
}

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

function help() {
    alert('未実装（最低でも対応ブラウザは書くこと）');
}

/**************************************************
 * ファイル読み込み関連
 **************************************************/
function loadXML(xml) {
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
    
    var title = '読み込み完了';
    var message = '<div style="margin-top:1.5em;">ファイルの読み込みが完了しました。</div>';
    var buttons = {
        OK: function() {
            $('#dialog').dialog('close');
        }
    };
    showDialog('notice', title, message, buttons);
}

function showLoadErrorDialog() {
    var title = 'ファイル読み込みエラー';
    var message = 'ファイルの読み込みに失敗しました。ファイルが壊れている可能性があります。';
    var buttons = {
        OK: function() {
            $('#dialog').dialog('close');
        }
    };
    showDialog('error', title, message, buttons);
    $('#load').val('');
}

function loadSample(path) {

    if (path == '#') {//#はカテゴリなので無視
        return;
    }
    
    //FIX:load関数と重複コードあり
    //エラー処理なし（正しいpath、ネットワーク接続ありと仮定）
    $.get(path, function(data) {
        var xml;
        try {
            if (!(data instanceof Document)) {
                var parser = new DOMParser();
                xml = parser.parseFromString(data, 'text/xml');
            } else {
                xml = data;
            }
        } catch (e) {//想定しているブラウザはExceptionをthrowしないはず
            console.error('Error parsing XML:\n' + e);
            return;
        }
        
        var htmls = xml.getElementsByTagName('html');
        if (htmls.length != 0) {
            HTMLEditor.setValue(htmls[0].firstChild.nodeValue);
        }
        var count = Blockly.mainWorkspace.getAllBlocks().length;
        if (count) {
            var title = '編集のブロックがあります';
            var message = 'JavaScriptエディタに編集中のブロックがあります。編集中のブロックの扱いを選択してください。';
            var buttons = {
                '削除': function() {
                    Blockly.mainWorkspace.clear();
                    $('#dialog').dialog('close');
                    loadXML(xml);
                },
                '残す': function() {
                    $('#dialog').dialog('close');
                    loadXML(xml);
                },
                'キャンセル': function() {
                    $('#dialog').dialog('close');
                }
            };
            showDialog('confirm', title, message, buttons);
        } else {
            loadXML(xml);
        }
    });
}

/**************************************************
 * ファイル保存関連
 **************************************************/
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

/**************************************************
 * DOM変換関連
 **************************************************/
function parseHTMLToDOM(errorFunction, isPreviewWindowCall) {
    var html = getHTMLCode();
    
    //共通に使うエラーダイアログのボタン
    var buttons = {
        OK: function() {
            $('#dialog').dialog('close');
            $('#tabs').tabs('select', 0);
            HTMLEditor.focus();
        }
    };
    if (!isPreviewWindowCall) {
        buttons['無視'] = function() {
            ignore = true;
            $('#dialog').dialog('close');
            $('#tabs').tabs('select', 1);
        };
    }
    
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
        handleXMLParseError(e, errorFunction, isPreviewWindowCall);
    }
    
    //次にDOMに変換
    try {
        var parser = new DOMParser();
        var dom = parser.parseFromString(xml, 'text/xml');
        //エラーチェック
        var parseDOMError = dom.getElementsByTagName('parsererror');
        
        if (parseDOMError.length != 0) {
            var errorLines;
            var errorString;
            var sourcetext;
            if (parseDOMError[0].childNodes[0].nodeValue != null) {
                errorLines = parseDOMError[0].childNodes[0].nodeValue.split('\n');
                errorString = errorLines[0] + '\n' + errorLines[2];
            } else if (parseDOMError[0].childNodes[0].innerText != null) {
                //WebKit系はエラー時のDOM構造が違うので対応
                errorString = parseDOMError[0].childNodes[0].innerHTML;
                if (parseDOMError[0].childNodes[1] != null) {
                    sourcetext = parseDOMError[0].childNodes[1].innerHTML;
                    errorString = errorString + '\n' + sourcetext;
                }
            }
            
            //WebKit系はsourcetextはないのでここは実行されない
            if (dom.getElementsByTagName('sourcetext').length != 0) {
                sourcetext = dom.getElementsByTagName('sourcetext')[0].childNodes[0].nodeValue;
                if (getRealStringLength(sourcetext) > 42) {//一行が長すぎる場合は位置マーカーを付けない
                    sourcetext = sourcetext.split('\n')[0];
                }
                errorString = sourcetext.replace(/\\\"/g, '') + '\n' + errorString;
                console.error(errorString);//for debug
            }
            
            if (errorFunction != null) {
                errorFunction();//コールバック関数を実行
            }
            
            var title = 'HTML構文エラー';
            var message = 'HTMLの構文エラーです。HTMLを修正してください。';
            message += '<div class="dialog-error-string">';
            message += 'エラー箇所：<br><code>'
            message += escapeHTML(errorString).replace(/\n/g, '<br>') + '<code></div>';
            
            showDialog('error', title, message, buttons);
            return nullDOM;
        }
        
        //htmlタグのチェック
        if (dom.getElementsByTagName('html').length == 0) {
        
            if (errorFunction != null) {
                errorFunction();//コールバック関数を実行
            }
            
            var title = 'HTML構文エラー';
            var message = 'htmlタグが見つかりません。タグの対応関係等を見直し、HTMLを修正してください。';
            showDialog('error', title, message, buttons);
            return nullDOM;
        }
        
        //bodyタグのチェック
        if (dom.getElementsByTagName('body').length == 0) {
            if (errorFunction != null) {
                errorFunction();//コールバック関数を実行
            }
            
            var title = 'HTML構文エラー';
            var message = 'bodyタグが見つかりません。タグの対応関係等を見直し、HTMLを修正してください。';
            showDialog('error', title, message, buttons);
            return nullDOM;
        }
        return dom;
    } catch (e) {
        if (errorFunction != null) {
            errorFunction();
        }
        return nullDOM;//エラーの場合はダミーのDOMを返す
    }
}

function handleXMLParseError(e, errorFunction, isPreviewWindowCall) {
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
    var buttons = {
        OK: function() {
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
            if (errorFunction != null) {
                errorFunction();//コールバック関数を実行
            }
        }
    };
    if (!isPreviewWindowCall) {
        buttons['無視'] = function() {
            ignore = true;
            $('#dialog').dialog('close');
            $('#tabs').tabs('select', 1);
        };
    }
    showDialog('error', title, message, buttons);
}

function createNullDOM() {
    var nullDOM = document.createElement('html');
    nullDOM.appendChild(document.createElement('body'));
    return nullDOM;
}

/**************************************************
 * JavaScriptコード生成・表示関連
 **************************************************/
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
    code = code.replace(/<title\/>/g, '<title></title>');
    
    if (hasDoctype) {
        code = code.replace(/<doctype.*?>/, '').replace('</doctype>', '');
        code = code.trim();
        code = '<!DOCTYPE html>\n' + code;
    }
    return code;
}

function getJavaScriptCode() {
    if (Blockly != null) {
        var code = '\n' + Blockly.Generator.workspaceToCode('JavaScript');
        return code;
    } else {
        console.error('Bockly is undefined!');
        return '\n\n';
    }
}

function updateJavaScriptPreview() {
    var code = Blockly.Generator.workspaceToCode('JavaScript')
    JavaScriptPreview.setValue(code);
    if (previousCode != null) {
        diff(previousCode, code);
    }
    previousCode = code;
}

/**************************************************
 * ブロック操作関連
 **************************************************/
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
        updateJavaScriptPreview();
        Blockly.mainWorkspace.render();//Chromeだと再描画されないので入れてある
    }
}

function discardBlocks() {
    var count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count > 0) {
        var title = '削除の確認';
        var message = '計' + count + '個のブロックを全て削除してよろしいですか？';
        var buttons = {
            OK: function() {
                clearBlocklyWorkspace();
                $('#dialog').dialog('close');
            },
            'キャンセル': function() {
                $('#dialog').dialog('close');
            }
        };
        showDialog('confirm', title, message, buttons);
    }
}

function clearBlocklyWorkspace() {
    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.render();
    updateJavaScriptPreview();
    if ('localStorage' in window) {
        window.localStorage.removeItem('cauliflower_blocks');
    }
}

/**************************************************
 * HTMLエディタツールバー関連
 **************************************************/
function setHTMLEditorFontLarger() {
    changeHTMLEditorFontSize(1);
    HTMLEditor.refresh();
}

function setHTMLEditorFontSmaller() {
    changeHTMLEditorFontSize(-1);
    HTMLEditor.refresh();
}

function changeHTMLEditorFontSize(increment) {
    var current = parseInt($('.html-editor').css('font-size').replace('px', ''));
    $('.html-editor').css('font-size', (current + increment) + 'px');
}

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

function resetHTMLEditUndoState() {
    HTMLEditor.clearHistory();
    updateHTMLToolBar();
}

function redoHTMLEdit() {
    HTMLEditor.redo();
}

function undoHTMLEdit() {
    HTMLEditor.undo();
}

/**************************************************
 * HTML構文エラー表示関連
 **************************************************/
function highlightErrorString(e) {
    errorMemento.highlight = HTMLEditor.markText({
        line: e.lineNumber - 1,
        ch: e.pos
    }, {
        line: e.lineNumber - 1,
        ch: e.pos + e.lineLength
    }, 'CodeMirror-matchhighlight');
}

function clearErrorMarks() {
    if (errorMemento.markedLine != null) {
        HTMLEditor.clearMarker(errorMemento.markedLine);
    }
    
    if (errorMemento.highlight != null) {
        errorMemento.highlight.clear();
    }
}

/**************************************************
 * HTML操作・エディタ関連
 **************************************************/
function getHTMLCode() {
    return HTMLEditor.getValue();
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

function loadHTMLTemplateConfirm() {
    var title = '編集中のHTMLが削除されます';
    var message = '編集中のHTMLを削除し、HTMLテンプレートを読み込んでよろしいですか？';
    var buttons = {
        OK: function() {
            discardHTML();
            var o = $.get('html_template.txt', function() {
                HTMLEditor.setValue(o.responseText);
            }).complete(function() {
                $('#dialog').dialog('close');
            });
        },
        'キャンセル': function() {
            $('#dialog').dialog('close');
        }
    };
    showDialog('confirm', title, message, buttons);
}

function loadHTMLTemplate() {
    discardHTML();
    var o = $.get('html_template.txt', function() {
        HTMLEditor.setValue(o.responseText);
    });
}

function discardHTML() {
    if ('localStorage' in window) {
        window.localStorage.removeItem('cauliflower_html');
    }
}

/**************************************************
 * HTMLデザイン・プレビュー関連
 **************************************************/
function updateHTMLDesignPreview() {
    var previewFrame = $('#html-design-preview').get(0);
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(HTMLEditor.getValue());
    preview.close();
}

/**************************************************
 * ダイアログ関連
 **************************************************/
function showDialog(type, title, message, buttons) {
    switch (type) {
        case 'error':
            $('#dialog-icon').attr('src', 'img/dialog/error.png');
            break;
        case 'notice':
            $('#dialog-icon').attr('src', 'img/dialog/notice.png');
            break;
        case 'confirm':
            $('#dialog-icon').attr('src', 'img/dialog/warning.png');
            break;
        default:
            throw 'invalid dialog type';
    }
    $('#dialog').dialog({
        title: title,
        buttons: buttons
    });
    $('#dialog-message').html('<div class="dialog-string"><p>' + message + '</p></div>');
    $('#dialog').dialog('open');
}

/**************************************************
 * JavaScript差分表示（diff）関連
 **************************************************/
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
                    } else if (diffs[diff][1][i] == '\t') {
                        highLightJavaScriptPreview(start.line, start.ch, line, cIndex, 'CodeMirror-update');
                        if (cIndex > 0 && i > 0 && diffs[diff][1][i - 1] != '\t') {
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

/**************************************************
 * ユーティリティ
 **************************************************/
function removeAllWhiteSpaces(s) {
    return s.replace(/[ \s]/g, "");
}

function getRealStringLength(s) {
    var length = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        //  半角カタカナは不許可
        if (c < 256 || (c >= 0xff61 && c <= 0xff9f)) {
            length++;
        } else {
            length = length + 2;
        }
    }
    return length;
}

function trimStringForFileName(s) {
    return s.trim().replace(/[\\\/:\*\?\"\<\>\|]/gi, '');
}

function escapeHTML(s) {
    s = s.replace(/&/g, '&amp;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/ /g, '&nbsp;');
    return s;
}

/**************************************************
 * 要FIX
 **************************************************/
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
