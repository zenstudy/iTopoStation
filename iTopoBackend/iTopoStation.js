var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const http = require('https');
const fs = require('fs');

let { iTopoAbsorber } = require('./iTopoAbsorber.js');
let { iTopoStationAPI } = require('./iTopoStationAPI.js');

//require的核心概念：在导出的文件中定义module.exports，导出的对象类型不予限定（可为任意类型）。在导入的文件中使用require()引入即可使用。本质上，是将要导出的对象，赋值给module这个对象的exports属性，在其他文件中通过require这个方法来访问exports这个属性。上面b.js中，require(./a.js) = exports 这个对象，然后使用es6取值方式从exports对象中取出test的值。

var app = express();
var router = express.Router();

//这一句中可能要注意一下，express.static()是处理静态请求的，
//设置了public文件，public下所有文件都会以静态资料文件形式返回
//（如样式、脚本、图片素材等文件）
app.use(express.static(path.join(__dirname, 'iTopoStation')));

//设置跨域访问
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
})

/*
//下面代码表示当用户使用/访问时，调用routes，即routes目录下的index.js文件，
//其中.js后缀省略，用/users访问时，调用routes目录下users.js文件
var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);
*/

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

app.get('/', function(req, res) {
	const indexPageFile = __dirname + '/iTopoCanteen.html';

	fs.readFile(indexPageFile, 'utf-8', function(err, data) {
		res.send(data);
		if (err) {
			throw err;
		}
	});
});

app.get('/ZenNodes', function(req, res) {
	// 目标url
	const pageUrl = "https://supernodes1.eu.zensystem.io/grid/all/nodes";

	let html = '';
	// 请求url，返回html
	http.get(pageUrl, function(res2) {
		res2.on('data', function(data) {
			html += data;
		});
		res2.on('end', function() {
			//数据获取完，执行回调函数
			//console.log(html);
			// dealHTML(html);
			res.send(html);

			const jsonFName = __dirname + '/ZenSuperNodes.absorber.json';
			fs.writeFile(jsonFName, html, function(err) {
				if (err) console.error(err);
				console.log('数据已经写入' + jsonFName);
			});

		});
	});
});

app.get('/SecureNodes', function(req, res) {
	// 目标url
	const pageUrl = "https://securenodes1.na.zensystem.io/grid/all/nodes";

	let html = '';
	// 请求url，返回html
	http.get(pageUrl, function(res2) {
		res2.on('data', function(data) {
			html += data;
		});
		res2.on('end', function() {
			//数据获取完，执行回调函数
			//console.log(html);
			// dealHTML(html);
			res.send(html);

			const jsonFName = __dirname + '/ZenSecureNodes.absorber.json';
			fs.writeFile(jsonFName, html, function(err) {
				if (err) console.error(err);
				console.log('数据已经写入' + jsonFName);
			});

		});
	});
});

// POST method route —— 根据请求路径来处理客户端发出的Post请求。
app.post('/', function (req, res) {
	res.send('POST request to the homepage');
});

app.get('/registerBaseObjectOnEarth', function(req, res) {
	res.send('the lightEarth page');
});

app.post('/registerBaseObjectOnEarth', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		res.write(postData);
		var newLightTask = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(newLightTask)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOBASE_FILE;//'../iTopoObjects/00_iTopoEarth/iTopobase.json';
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var lightTasks = JSON.parse(data);
				console.log(lightTasks);
				lightTasks.push(newLightTask);

				fs.writeFile(iTopoJsonFName, JSON.stringify(lightTasks), function(err) {
					if (err) console.error(err);
					console.log('数据已经写入' + iTopoJsonFName);
				});
			}
		});

		res.end();
	});
});

app.post('/iTopoEarthRegister', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		res.write(postData);
		var newUserStarInfo = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(newUserStarInfo)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOUSER_FILE;//'../iTopoObjects/00_iTopoEarth/iTopoUser.json';
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var userStarInfos = JSON.parse(data);
				console.log(userStarInfos);
				userStarInfos.push(newUserStarInfo);

				fs.writeFile(iTopoJsonFName, JSON.stringify(userStarInfos), function(err) {
					if (err) console.error(err);
					console.log('数据已经写入' + iTopoJsonFName);
				});
			}
		});

		res.end();
	});
});

app.post('/updateStarUser', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		res.write(postData);
		var newUserStarInfo = JSON.parse(postData);
		console.log("===Received POST data :" + JSON.stringify(newUserStarInfo)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOUSER_FILE; //'../iTopoObjects/00_iTopoEarth/iTopoUser.json';
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var userStarInfos = JSON.parse(data);
				//console.log(userStarInfos);

				for( var i=0; i < userStarInfos.length; ++i){
					if(userStarInfos[i].starUUID ===newUserStarInfo.starUUID ){
						userStarInfos[i] = newUserStarInfo;
						console.log('===update star user:' + JSON.stringify(userStarInfos[i]) );
					}
				}

				fs.writeFile(iTopoJsonFName, JSON.stringify(userStarInfos), function(err) {
					if (err) console.error(err);
					console.log('===数据已经写入' + iTopoJsonFName);
				});
			}
		});

		res.end();
	});
});

app.post('/iTopoEarthLogin', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var loginUser = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(loginUser)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOUSER_FILE;//'../iTopoObjects/00_iTopoEarth/iTopoUser.json';
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var allUserInfos = JSON.parse(data);

				for (let i = 0; i < allUserInfos.length; i++) {
						if(loginUser.cellPhone === allUserInfos[i].cellPhone){
						res.write(JSON.stringify(allUserInfos[i]));
						res.end();
						break;
					}
				}
			}
		});

		//console.log(userDetailInfoToReturn);
	});
});

app.post('/fetchBaseObjectWithObjectUUID', function(req, res) {

	console.log("app.post.fetchBaseObjectWithObjectUUID");
	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var objectUUID = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(objectUUID)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOBASE_FILE; //'../iTopoObjects/00_iTopoEarth/iTopobase.json';
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var allBaseObjectInfos = JSON.parse(data);

				for (let i = 0; i < allBaseObjectInfos.length; i++) {
						console.log(allBaseObjectInfos[i].objectUUID);
						console.log(objectUUID);
						if(objectUUID === allBaseObjectInfos[i].baseUUID){
						res.write(JSON.stringify(allBaseObjectInfos[i]));
						console.log(JSON.stringify(allBaseObjectInfos[i]));
						res.end();
						break;
					}
				}
			}
		});
	});
});


app.post('/fetchUserWithStarUUID', function(req, res) {

	console.log("app.post.fetchUserWithStarUUID");
	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var starUUID = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(starUUID)) ;
		const iTopoJsonFName = iTopoStationAPI.ITOPOUSER_FILE;
		fs.readFile(iTopoJsonFName, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var allUserInfos = JSON.parse(data);
				for (let i = 0; i < allUserInfos.length; i++) {
						if(starUUID=== allUserInfos[i].starUUID){
						res.write(JSON.stringify(allUserInfos[i]));
						res.end();
						break;
					}
				}
				res.json(null);
				res.end();
			}
		});
	});
});

app.post('/addTask', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var taskObject = JSON.parse(postData);
		res.write(taskObject);
		taskObject = JSON.parse(taskObject);
		console.log("Received POST data :") ;
		console.log(taskObject.objectUUID);

		var taskJsonFileName;
		if(taskObject.taskStatus === "待办")
			taskJsonFileName = "tasksTodo.json";
		else if(taskObject.taskStatus === "在办")
			taskJsonFileName = "tasksInProgress.json";
		else if(taskObject.taskStatus === "已办")
			taskJsonFileName = "tasksDone.json";

		const jsonPath = '../iTopoObjects/' + taskObject.objectUUID;
		fs.exists(jsonPath,function(exists){
			if(exists)
				console.log('文件夹存在');
			else{
				console.log();
				fs.mkdir(jsonPath,function(err){
					if(err)
						console.error(err);
					console.log('文件夹不存在'+ jsonPath+'创建目录成功');
				});
			}
		});

		const jsonFile = jsonPath +'/' + taskJsonFileName;
		fs.exists(jsonFile,function(exists){
			if(exists){
				fs.readFile(jsonFile, 'utf-8', function(err, data) {
					if (err) {
						console.log(err);
					} else {
						var taskObjects = JSON.parse(data);
						console.log(taskObjects);
						taskObjects.unshift(taskObject);

						fs.writeFile(jsonFile, JSON.stringify(taskObjects), function(err) {
							if (err) console.error(err);
							console.log('数据已经写入' + jsonFile);
						});
					}
				});
			}
			else{
				console.log('文件夹不存在');
				var taskObjects = [];
				taskObjects.push(taskObject);
				fs.writeFile(jsonFile, JSON.stringify(taskObjects), function(err) {
				if (err) console.error(err);
				console.log('数据已经写入' + jsonFile);
			});
			}
		});

		res.end();
	});
});

app.post('/updateTask', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var postParameter = JSON.parse(postData);
		console.log(postParameter);
		res.write(JSON.stringify(postParameter));
		var taskObject = postParameter.taskObject;
		console.log("Received POST data :" + taskObject.taskUUID) ;

		var taskJsonFileName1;
		if(taskObject.taskStatus === "待办")
			taskJsonFileName1 = "tasksTodo.json";
		else if(taskObject.taskStatus === "在办")
			taskJsonFileName1 = "tasksInProgress.json";
		else if(taskObject.taskStatus === "已办")
			taskJsonFileName1 = "tasksDone.json";

		const jsonFile = '../iTopoObjects/' + taskObject.objectUUID +'/' + taskJsonFileName1;
		fs.readFile(jsonFile, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var taskObjects = JSON.parse(data);

				for(var index = 0; index < taskObjects.length; ++index)
				{
					if(taskObject.taskUUID === taskObjects[index].taskUUID){
						taskObjects.splice(index, 1);
						break;
					}
				}

				fs.writeFile(jsonFile, JSON.stringify(taskObjects), function(err) {
					if (err) console.error(err);
					console.log('数据已经写入taskJsonFileName1:' + jsonFile);

					var taskJsonFileName2;
					if(postParameter.latestTaskStatus === "待办")
						taskJsonFileName2 = "tasksTodo.json";
					else if(postParameter.latestTaskStatus === "在办")
						taskJsonFileName2 = "tasksInProgress.json";
					else if(postParameter.latestTaskStatus === "已办")
						taskJsonFileName2 = "tasksDone.json";

					const jsonPath2 = '../iTopoObjects/' + taskObject.objectUUID;
					fs.exists(jsonPath2,function(exists){
						if(exists)
							console.log('文件夹存在');
						else{
							console.log();
							fs.mkdir(jsonPath2,function(err){
								if(err)
									console.error(err);
								console.log('文件夹不存在'+ jsonPath2+'创建目录成功');
							});
						}
					});

					const jsonFile2 =  jsonPath2 +'/' + taskJsonFileName2;
					fs.exists(jsonFile2,function(exists){
						if(exists){
							fs.readFile(jsonFile2, 'utf-8', function(err, data) {
								if (err) {
									console.log(err);
								} else {
									var taskObjects = JSON.parse(data);
									taskObject.taskStatus = postParameter.latestTaskStatus;
									taskObjects.unshift(taskObject);
									console.log(taskObjects);

									fs.writeFile(jsonFile2, JSON.stringify(taskObjects), function(err) {
										if (err) console.error(err);
										console.log('数据已经写入taskJsonFileName2' + jsonFile2);
									});
								}
							});
						}
						else{
							console.log('文件夹不存在');
							var taskObjects = [];
							taskObjects.push(taskObject);
							fs.writeFile(jsonFile2, JSON.stringify(taskObjects), function(err) {
							if (err) console.error(err);
							console.log('数据已经写入' + jsonFile2);
						});
						}
					});

				});
			}
		});

		res.end();
	});
});

app.post('/addMemberToiTopoSkyCastleTeams', function(req, res) {

	var postData = "";

	req.setEncoding("utf8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var postParameter = JSON.parse(postData);
		console.log("Received POST data :" + JSON.stringify(postParameter)) ;
		res.write(JSON.stringify(postParameter));

		const jsonFile = '../iTopoObjects/' + postParameter.objectUUID +'/' + "workTeams.json";
		fs.readFile(jsonFile, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {

				var teamObjects = JSON.parse(data);
				for(var index = 0; index < teamObjects.length; ++index)
				{
					console.log(postParameter.teamUUID + ',' + teamObjects[index].teamUUID);
					if(postParameter.teamUUID === teamObjects[index].teamUUID){
						teamObjects[index].teamMemberUUIDs.push(postParameter.teamMemberUUID);
						break;
					}
				}

				fs.writeFile(jsonFile, JSON.stringify(teamObjects), function(err) {
					if (err) console.error(err);
					console.log('数据已经写入' + jsonFile);
				});
			}
		});

		res.end();
	});
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

// 获取信息列表
app.get('/shujutongji', function (req, res) {

	req.setEncoding("utf8");
	res.setHeader("Cache-Control", "no-cache");
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    var data = [];
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        // var whereStr = {"name":'菜鸟教程'};  // 查询条件
        dbo.collection("CarList").find().toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.send(result);
            db.close();
        })
    });
});


var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("express app listening at port:%s", port);
});

//npm install node-schedule --save
//var schedule = require('node-schedule');
//var j = schedule.scheduleJob('2 0 * * *', function(){  //每天00：02执行
//需要定时执行的内容
const ZENSUPERNODESURL = "https://supernodes1.eu.zensystem.io/grid/all/nodes";
const ZENSUPERJSONFILENAME = "ZenSuperNodes.json";
const ZENSECURENODESURL = "https://securenodes1.na.zensystem.io/grid/all/nodes";
const ZENSECUREFILENAME = "ZenSecureNodes.json";
//	iTopoAbsorber.FetchHorizenNodesInfo(ZENSUPERNODESURL,ZENSUPERJSONFILENAME);
//	iTopoAbsorber.FetchHorizenNodesInfo(ZENSECURENODESURL,ZENSECUREFILENAME);
//});
