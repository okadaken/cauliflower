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
 * body内のみを抽出してプレビュー
 * 保存形式の検討
 * シングルクオート
 * HTMLフォーマットボタン
 */
var HTMLEditor;

$(document).ready(function() {
    initializeTabs();
    initializeButtons();
    initializeHTMLEditor();
    initializeDialogs();
    
    restoreHTML();
    HTMLEditor.refresh();
    setTimeout(updatePreview, 300);
});

function initializeTabs() {
    $("#tabs").tabs({
        cookie: {
            expires: 3 //選択タブをcookieで3日間保存
        },
        show: function(event, ui) {
            if (HTMLEditor != null) {
                switch (ui.panel.id) {
                    case "tab-html":
                        restoreHTML();
                        break;
                    case "tab-javascript":
                        backupHTML();
                        //Blockly.mainWorkspace.render();
                        break;
                }
            }
        },
    });
}

function initializeButtons() {
    $("#new_button").button().click(function() {
        alert("新規作成");
    });
    $("#open_button").button().click(function() {
        alert("読み込み");
    });
    $("#save_button").button().click(function() {
        alert("保存する");
    });
    $("#exec_button").button().css({
        "background": "#ffcc00"
    }).click(function() {//TODO:とりあえず色を変えただけ 要グラデーション
        alert("実行する");
    });
    $("#html_new_botton").button().click(function() {
        loadHTMLTemplate();
    });
}

function initializeHTMLEditor() {
    var delay;
    HTMLEditor = CodeMirror.fromTextArea(document.getElementById("html_textarea"), {
        mode: "text/html",
        theme: "default",
        tabMode: "indent",
        lineNumbers: "true",
        fixedGutter: "true",
        electricChars: "true",
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
    $("#HTML_syntaxerror_dialog").dialog({
        dialogClass: "alert",
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        show: "clip",//"explode",
        hide: "clip",//"explode",
        title: "HTML構文エラー",
        buttons: {
            OK: function() {
                $(this).dialog("close");
            }
        }
    });
}

function getHTMLCode() {
    return HTMLEditor.getValue();
}

//Blocklyのエディタができるまでの仮実装
function getJavaScriptCode() {
    var code = "\nalert(\"Hello World!\");\n";
    return code;
}

function getAllCode() {
    //前処理としてHTMLをXMLに変換
    try {
        var xml = HTMLtoXML(getHTMLCode());
    } catch (e) {//変換できなければエラー表示して終了
        var errorLine = e.split("\n")[0];
        mark(errorLine);
        var message = "<p>HTMLの構文エラーです。</p>エラーの原因となった文字列:<br><span style=\"background: #ffaaaa;\">" + htmlEscape(errorLine) + "</span><p>HTMLエディタでハイライトされている箇所を修正してください。</p>";
        $("#HTML_syntaxerror_dialog_message").html(message);
        $("#HTML_syntaxerror_dialog").dialog("open");
        return;
    }
    
    //DOMにパース
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, "text/xml");
    
    //JavaScriptタグとコードのノードを生成
    var js = doc.createElement("script");
    js.setAttribute("type", "text/javascript");
    js.appendChild(doc.createTextNode(getJavaScriptCode()));
    
    //生成したノードを追加
    var body = doc.getElementsByTagName("body")[0];
    if (body != null) {
        body.insertBefore(js, body.firstChild);
        body.insertBefore(doc.createTextNode("\n"), body.firstChild);//JavaScriptタブの前に改行を追加
        var serializer = new XMLSerializer();
        var code = serializer.serializeToString(doc);
        console.log(code); //TODO:最後に行頭のDOCTYPEを追加すること
        //console.log( serializer.serializeToString(body)); 
    } else {
        alert("bodyタグが見つかりません");//TODO:dialogにすること
    }
}

function updatePreview() {
    var previewFrame = document.getElementById("html_preview");
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(HTMLEditor.getValue());
    preview.close();
}

function mark(s) {
    HTMLEditor.matchHighlight("CodeMirror-matchhighlight", s);
}

function clearMarks() {
    HTMLEditor.clearMarks();
}

function autoFormat() {
    CodeMirror.commands["selectAll"](HTMLEditor);
    var range = {
        from: HTMLEditor.getCursor(true),
        to: HTMLEditor.getCursor(false)
    };
    HTMLEditor.autoFormatRange(range.from, range.to);
}

function restoreHTML() {
    if ("localStorage" in window && window.localStorage.cauliflower_html) {
        HTMLEditor.setValue(window.localStorage.cauliflower_html);
    } else {
        loadHTMLTemplate();
    }
}

function backupHTML() {
    if ("localStorage" in window) {
        window.localStorage.setItem("cauliflower_html", getHTMLCode());
    }
}

function loadHTMLTemplate() {
    discardHTML();
    var httpObj = $.get("html_template.txt", function() {
        HTMLEditor.setValue(httpObj.responseText);
    });
    backupHTML();
}

function discardHTML() {
    if ("localStorage" in window) {
        window.localStorage.removeItem("cauliflower_html");
    }
}

function htmlEscape(s) {
    s = s.replace(/&/g, '&amp;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/</g, '&lt;');
    return s;
}
