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
  jQuery.getJSON(proxy, callback);
}

function geolocation_error(error) {
  var message = "";
  switch (error.code) {
  case PositionError.PERMISSION_DENIED:
    message = "位置情報の利用が許可されていません。";
    break;
  case PositionError.POSITION_UNAVAILABLE:
    message = "デバイスの位置が判定できません。";
    break;
  case PositionError.TIMEOUT:
    message = "タイムアウトしました。";
    break;
  }
  windw.alert(message);
}
