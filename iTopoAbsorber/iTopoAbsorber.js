//var path = require('path');
var bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/*  var per = {
        name:'zhangsan',
        age:25,
        job:'html',
        sayName:function(){
            alert(this.name);
        }
    }*/

var json;
let zNodeArray = new Array();

var iTopoAbsorber = {

	FetchHorizenNodesInfo: function(pageUrl, jsonFName) {
		let html = '';
		// 请求url，返回html
		https.get(pageUrl, function(res2) {
			console.log("Ready to receive Horizen data from " + pageUrl);
			res2.on('data', function(data) {
				console.log("On receiving Horizen data from " + pageUrl);
				html += data;
			});

			res2.on('end', function() {
				//数据获取完，执行回调函数
				json = JSON.parse(html);
				
				console.log("Get IPs to resolve...");
				let IPs = new Array();
				for (var i = 0; i < json.rows.length; i++) {
					IPs.push(json.rows[i].ip);
				}

				ResolveIPInfo(IPs, 0, jsonFName);
			});
		}).on('error', function(err) {
			console.log('获取验证异常,异常原因' + err);
		})
	}
}

function ResolveIPInfo(IPs, startIndex, jsonFName) {

	if (startIndex >= IPs.length)
		return;

	let endIndex = 0;

	if (startIndex + 100 <= IPs.length)
		endIndex = startIndex + 100;
	else
		endIndex = IPs.length;

	var oneHundredIPs = IPs.slice(startIndex, endIndex);

	// ip-api endpoint URL
	// see http://ip-api.com/docs/api:batch for documentation
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://ip-api.com/batch', false);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {

			if (xhr.status == 200) {
				// Result array
				let fetchIPInfoArr = JSON.parse(xhr.responseText);
				fetchIPInfoArr.forEach(function(item) {
					let ii = findZenNode(IPs, item.query, startIndex, endIndex);
					if (ii >= 0) {
						console.log("No." + ii + ", verify success: " + item.query + " is in " + item.city + ", " + item.country);
						zNodeArray.push({
							id: json.rows[ii].id,
							fqdn: json.rows[ii].fqdn,
							ip: json.rows[ii].ip,
							home: json.rows[ii].home,
							curserver: json.rows[ii].curserver,
							zenver: json.rows[ii].zenver,
							trkver: json.rows[ii].trkver,
							status: json.rows[ii].staus,
							result: json.rows[ii].result,
							seconds: json.rows[ii].seconds,
							received: json.rows[ii].received,
							eid: json.rows[ii].eid,
							etype: json.rows[ii].etype,
							dtid: json.rows[ii].dtid,
							dtype: json.rows[ii].dtype,

							status2: item.status,
							country: item.country,
							countryCode: item.countryCode,
							region: item.region,
							regionName: item.regionName,
							city: item.city,
							zip: item.zip,
							lat: item.lat,
							lon: item.lon,
							timezone: item.timezone,
							isp: item.isp,
							org: item.org,
							as: item.as,
							query: item.query
						});
					} else {
						alert("No." + ii + ", verify fail: " + item.query + " is in " + item.city + ", " + item.country);
					}
				});

				if (endIndex == IPs.length) {
					const jsonFPath = __dirname + '\\iTopoStation\\dataMap\\' + jsonFName;
					fs.writeFile(jsonFPath, JSON.stringify(zNodeArray), function(err) {
						if (err) console.error(err);
						console.log('数据已经写入' + jsonFPath);
						return;
					});
				} else {
					let mod = startIndex % 1500;
					let timeOut = (mod == 0) ? 500 : 100;
					console.log("startIndex =" + startIndex + ",timeOut=" + timeOut);
					setTimeout(function() {
						ResolveIPInfo(IPs, startIndex + 100, jsonFName);
					}, timeOut);
				}
			} 
			else if(xhr.status == 429){
				let timeOut = 15000;
				console.log('太多请求, wait for ' + timeOut + ' to try again...');
				setTimeout(function() {
					ResolveIPInfo(IPs, startIndex, jsonFName);
				}, timeOut);
			}
			else {
				console.log("xhr.status:" + xhr.status);
			}
		}
	}
	xhr.onerror = function() {
		console.log("error");
	}
	xhr.ontimeout = function() {
		console.log("time out.");
	}
	xhr.onabort = function() {
		console.log("on abort.");
	}
	xhr.onprogress = function() {
		console.log("onprogress.");
	}
	xhr.onloadstart = function() {
		console.log("onloadstart.");
	}
	xhr.onloadend = function() {
		console.log("onloadend.");
	}
	xhr.onload = function() {
		console.log("onload.");
	}

	xhr.send(JSON.stringify(oneHundredIPs));
	console.log("sending:", JSON.stringify(oneHundredIPs));
}

function findZenNode(IPs, ipToSearch, startIndex, endIndex) {
	if(startIndex >= IPs.length)
		return -1;
	if(endIndex > IPs.length)
		return -1;
	
	for (let ii = startIndex; ii < endIndex; ii++) {
		if (IPs[ii] == ipToSearch) {
			return ii;
		}
	}
	return -1;
}

module.exports = {
	iTopoAbsorber
};
