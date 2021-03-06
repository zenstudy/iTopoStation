// ajax 对象
function ajaxObject() {
	var xmlHttp;
	try {
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}
	return xmlHttp;
}

// ajax post请求：
export function ajaxPost(url, data, fnSucceed, fnFail, fnLoading) {
	var ajax = ajaxObject();
	ajax.open("post", url, true);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				fnSucceed(ajax.responseText);
			} else {
				fnFail("HTTP请求错误！错误码：" + ajax.status);
			}
		} else {
			fnLoading();
		}
	}
	ajax.send(data);
}

export function ajaxGet(url,fnSucceed, fnFail, fnLoading, username,password){
	var ajax = ajaxObject();
	ajax.open("GET",url,true,username,password);
	if(ajax.readyState==4){
	    if(ajax.status==200){
			fnSucceed(ajax.responseText);
		} else{
			fnFail("HTTP请求错误！错误码：" + ajax.status);
		}
	} else {
		fnLoading();
	}
	ajax.send();
}
// 函数使用方法
// userLogin: function(userStarInfo, fnUserRegistered){

// 	ajaxPost(jsonFileUrl.iTopoEarthLogin, JSON.stringify(userStarInfo),
// 	function fnSucceed(jsonData)
// 	{
// 		fnUserRegistered();
// 	},
// 	function fnFail()
// 	{
// 		console.log("post failed.");
// 	},
// 	function fnLoading()
// 	{

// 	});
// },

//usage:
// _fetch(fetch('//a.com/b/c'), 2000)
//     .then(function(res) {
//         console.log(res)
//     }, function(err) {
//         console.log(err);
//     });
export function _fetch(fetch_promise, timeout) {
      var abort_fn = null;

      //这是一个可以被reject的promise
      var abort_promise = new Promise(function(resolve, reject) {
             abort_fn = function() {
                reject('abort promise');
             };
      });

      //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
       var abortable_promise = Promise.race([
             fetch_promise,
             abort_promise
       ]);

       setTimeout(function() {
             abort_fn();
        }, timeout);

       return abortable_promise;
}

//连续执行N次
export function setTimeout_nTimes( sumTimes, indexTime, intervalTime, fn){
	if(indexTime === sumTimes)
		return;
	setTimeout( function() {
		fn() ;
		console.log('this time index=' + indexTime);
		setTimeout_nTimes( sumTimes, ++indexTime, intervalTime, fn );
		}, intervalTime) ;
}
