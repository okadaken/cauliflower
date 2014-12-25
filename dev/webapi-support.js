function getJSONProxy(url, callback, param) {
  var proxy = 'http://27.120.109.136/cauliflower-support/proxy.php';
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
  jQuery.getJSON(proxy, callback);
}

function geolocation_error(error) {
  var message = [error.message, "位置情報の利用が許可されていません。", "デバイスの位置が判定できません。", "タイムアウトしました。"];
  window.alert(message[error.code]);
}
