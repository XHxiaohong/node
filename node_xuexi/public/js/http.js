// @ts-nocheck

// 封装 jsonp
const jsonp = function (url, jsonpCallback, success) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javaScript';

  // 接收并处理请求返回的数据
  window[jsonpCallback] = function (data) {
    success && success(data)
  };

  document.appendChild(script)
}

const ajax = function (url, type, data = {}) {
  return new Promise((resolve, reject)=> {
    let ajax = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject();
    ajax.open(type, url, true);
    ajax.setRequestHeader( // 添加请求头
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    let sendData = '';
    if (type == 'POST') {
      if (typeof data === 'object' && !(data instanceof Array) && !(data instanceof Function)) {
        for(let key in data) {
          sendData += key + '=' + data[key] + '&'
        }
      } else {
        alert('TypeError：POST请求传参不是对象类型！')
        return
      }
    };

    ajax.send(sendData);
    ajax.onreadystatechange = () => {
      if (ajax.readyState == 4) {
        if (ajax.status == 200) {
          let obj = ajax.response
          if (typeof obj !== 'object') obj = JSON.parse(obj)
          resolve(obj)
        } else {
          reject(ajax.response)
        }
      }
    }
  });
}