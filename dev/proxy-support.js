function getJSONProxy(url, callback, param) {
  var proxy = 'http://msatellite.info/cauliflower-support/proxy.php';
  if (param != null && typeof param == "object") {
    var properties = '';
    var keys = Object.keys(param);
    for (var i = 0; i < keys.length; i++) {
      properties += keys[i] + "=" + param[keys[i]];
      if (i != keys.length - 1) {
        properties += "%26";
      }
    }
    proxy += '?url=' + url + '?' + properties + '&callback=?';
  } else {
    proxy += '?url=' + url + '&callback=?';
  }
  window.alert(proxy);
  jQuery.getJSON(proxy, callback);
}
