// Based on
// <http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247>
var DOM_ELEMENT_NODE = 1;
var DOM_ATTRIBUTE_NODE = 2;
var DOM_TEXT_NODE = 3;
var DOM_CDATA_SECTION_NODE = 4;
var DOM_DOCUMENT_NODE = 9;
var DOM_DOCUMENT_FRAGMENT_NODE = 11;

// Returns the text value if a node; for nodes without children this
// is the nodeValue, for nodes with children this is the concatenation
// of the value of all children.
function xmlValue(node) {
  if (!node) {
    return '';
  }

  var ret = '';
  if (node.nodeType == DOM_TEXT_NODE ||
      node.nodeType == DOM_CDATA_SECTION_NODE ||
      node.nodeType == DOM_ATTRIBUTE_NODE) {
    ret += node.nodeValue;

  } else if (node.nodeType == DOM_ELEMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      ret += arguments.callee(node.childNodes[i]);
    }
  }
  return ret;
}


// Returns the representation of a node as XML text.
function xmlText(node) {
  var ret = '';
  if (node.nodeType == DOM_TEXT_NODE) {
    ret += xmlEscapeText(node.nodeValue);
    
  } else if (node.nodeType == DOM_ELEMENT_NODE) {
// midified by S.Takezaki(to LowerCase)
    ret += '<' + node.nodeName.toLowerCase();
    for (var i = 0; i < node.attributes.length; ++i) {
      var a = node.attributes[i];
      // midified by S.Takezaki
      if (a && a.nodeName && a.nodeValue && a.nodeName!='contentEditable' ) {    
        ret += ' ' + a.nodeName.toLowerCase();
        ret += '="' + xmlEscapeAttr(a.nodeValue) + '"';
      }
    }

    if (node.childNodes.length == 0) {
      ret += '/>';

    } else {
      ret += '>';
      for (var i = 0; i < node.childNodes.length; ++i) {
        ret += arguments.callee(node.childNodes[i]);
      }
// midified by S.Takezaki(to LowerCase)
      ret += '</' + node.nodeName.toLowerCase() + '>';
    }
    
  } else if (node.nodeType == DOM_DOCUMENT_NODE ||
             node.nodeType == DOM_DOCUMENT_FRAGMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      ret += arguments.callee(node.childNodes[i]);
    }
  }
  
  return ret;
}

// Escape XML special markup chracters: tag delimiter < > and entity
// reference start delimiter &. The escaped string can be used in XML
// text portions (i.e. between tags).
function xmlEscapeText(s) {
  return s.replace(/&/g, '&').replace(/</g, '<;').replace(/>/g, '>');
}

// Escape XML special markup characters: tag delimiter < > entity
// reference start delimiter & and quotes ". The escaped string can be
// used in double quoted XML attribute value portions (i.e. in
// attributes within start tags).
function xmlEscapeAttr(s) {
  return xmlEscapeText(s).replace(/\"/g, '"');
}

// Escape markup in XML text, but don't touch entity references. The
// escaped string can be used as XML text (i.e. between tags).
function xmlEscapeTags(s) {
  return s.replace(/</g, '<;').replace(/>/g, '>');
}
