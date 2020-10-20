var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const http = require('https');
const fs = require('fs');

let {
	iTopoAbsorber
} = require('./iTopoAbsorber.js');
let {
	iTopoStationAPI
} = require('./iTopoStationAPI.js');

//require的核心概念：在导出的文件中定义module.exports，导出的对象类型不予限定（可为任意类型）。
//在导入的文件中使用require()引入即可使用。本质上，是将要导出的对象，赋值给module这个对象的exports属性，
//在其他文件中通过require这个方法来访问exports这个属性。上面b.js中，require(./a.js) = exports 这个对象，
//然后使用es6取值方式从exports对象中取出test的值。

var app = express();
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/iTopoEarthSociety";

//这一句中可能要注意一下，express.static()是处理静态请求的，
//设置了public文件，public下所有文件都会以静态资料文件形式返回
//（如样式、脚本、图片素材等文件）
app.use(express.static(path.join(__dirname, 'iTopoStation')));

//设置跨域访问
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
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
app.post('/', function(req, res) {
	res.send('POST request to the homepage');
});

// 获取所有用户信息
app.get('/fetchiTopoStars', function(req, res) {
	MongoClient.connect(url, {
		useUnifiedTopology: true
	}, function(err, dbClient) {
		if (err) throw err;
		var dbo = dbClient.db("iTopoEarthSociety");
		dbo.collection("iTopoUser").find().toArray(function(err, result) { // 返回集合中所有数据
			if (err) throw err;
			res.send(result);
			dbClient.close();
			res.end();
		})
	});
});

//根据用户starUUID查询用户信息
app.post('/fetchUserWithStarUUID', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var starUUID = JSON.parse(postData);
		if (starUUID === null || starUUID === undefined || starUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");
			var whereStr = {
				"starUUID": starUUID
			}; // 查询条件
			dbo.collection("iTopoUser").find(whereStr, function(err, cursor) {
				cursor.each(function(err, result) {
					if (err) throw err;
					if (result !== null) {
						res.send(result);
						res.end();
					} else {
						res.end('null');
					}
					dbClient.close();
					return;
				});
			});
		});
	});

});

app.post('/iTopoEarthLogin', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var loginUser = JSON.parse(postData);
		if (loginUser === null || loginUser === undefined || loginUser === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");
			var whereStr = loginUser; // 查询条件
			dbo.collection("iTopoUser").find(whereStr, function(err, cursor) {
				cursor.each(function(err, result) {
					if (err) throw err;
					if (result !== null) {
						res.send(result);
						res.end();
					} else {
						res.end('null');
					}
					dbClient.close();
					return;
				});
			});
		});
	});

});

//注册用户，并在数据库中添加之
app.post('/iTopoEarthRegister', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var newUserStarInfo = JSON.parse(postData);

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");

			//插入数据
			dbo.collection("iTopoUser").insertOne(newUserStarInfo, function(err, result) {
				if (err) throw err;
				//				console.log(result);
				res.send(result);
				dbClient.close();
			});

		});
	});

});

app.post('/updateStarUser', function(req, res) {

	var postData = "";

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var newUserStarInfo = JSON.parse(postData);

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");

			//插入数据
			var whereStr = {
				"starUUID": starUUID
			}; // 查询条件
			dbo.collection("iTopoUser").updateOne(whereStr, newUserStarInfo, function(err, result) {
				if (err) throw err;
				//				console.log(result);
				res.send(result);
				dbClient.close();
			});

		});
	});
});

// 获取所有用户信息
app.get('/fetchiTopobase', function(req, res) {
	MongoClient.connect(url, {
		useUnifiedTopology: true
	}, function(err, dbClient) {
		if (err) throw err;
		var dbo = dbClient.db("iTopoEarthSociety");
		dbo.collection("iTopobase").find().toArray(function(err, result) { // 返回集合中所有数据
			if (err) throw err;
			res.send(result);
			dbClient.close();
			res.end();
		})
	});
});

app.post('/registerBaseObjectOnEarth', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var newBaseInfo = JSON.parse(postData);

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");

			//插入数据
			dbo.collection("iTopobase").insertOne(newBaseInfo, function(err, result) {
				if (err) throw err;
				//				console.log(result);
				res.send(result);
				dbClient.close();
			});

		});
	});

});

//根据baseUUID查询base信息
app.post('/fetchBaseObjectWithObjectUUID', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoEarthSociety");
			var whereStr = { "baseUUID": baseUUID }; // 查询条件
			dbo.collection("iTopobase").find(whereStr, function(err, cursor) {
				cursor.each(function(err, result) {
					if (err) throw err;
					if (result !== null) {
						res.send(result);
						res.end();
					} else {
						res.end('null');
					}
					dbClient.close();
					return;
				});
			});
		});
	});

});

//根据baseUUID查询baseAnnouncement信息
app.post('/fetchiTopoBaseAnnouncement', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoAnnouncement");
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

app.post('/fetchiTopoBaseOutlook', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoOutlook");
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

app.post('/fetchiTopobaseWorkTeams', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, { useUnifiedTopology: true }, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoWorkTeam");
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

//根据用户starUUID查询用户信息
app.post('/addMemberToiTopobaseTeams', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var postParameter = JSON.parse(postData);
//		console.log("Received POST data :" + JSON.stringify(postParameter));
//		res.write(JSON.stringify(postParameter));

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopoWorkTeam");
			var whereStr = { "teamUUID": postParameter.teamUUID }; // 查询条件
			dbo.collection(postParameter.objectUUID).find(whereStr, function(err, cursor) {
				cursor.each(function(err, result) {
					if (err) throw err;

					if (result !== null) {
						console.log(result);
						var updatedTeam  = result ;
						updatedTeam.teamMemberUUIDs.push(postParameter.teamMemberUUID);
						dbo.collection(postParameter.objectUUID).updateOne(whereStr, updatedTeam, function(err, result) {
							if (err) throw err;
							res.send(result);
							dbClient.close();
							res.end();
						});
					} else {
						dbClient.close();
						res.end('null');
					}
				});
			});
		});
	});

});

app.post('/fetchiTopobaseSponsors', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopobaseSponsors");
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

app.post('/fetchiTopoBaseProductCategorys', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopobaseProductCategorys");
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

app.post('/fetchiTopoBaseProducts', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var baseUUID = JSON.parse(postData);
		if (baseUUID === null || baseUUID === undefined || baseUUID === '') {
			res.end('null');
			return;
		}

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db("iTopobaseProducts");
			//console.log(baseUUID);
			var dboCollection = dbo.collection(baseUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

function getTaskStatusCollectionName(taskStatus){

	var taskDBName;
	if (taskStatus === "待办" || taskStatus === "Todo")
		taskDBName = "iTopoTaskTodo";
	else if (taskStatus === "在办" || taskStatus === "InProgress")
		taskDBName = "iTopoTaskInProgress";
	else if (taskStatus === "已办" || taskStatus === "Done")
		taskDBName = "iTopoTaskDone";

	return taskDBName;
}

app.post('/fetchiTopoTasks', function(req, res) {

	var postData = "";
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {

		var postParameter = JSON.parse(postData);
		console.log(postParameter);

		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, function(err, dbClient) {
			if (err) throw err;

			var taskDBName = getTaskStatusCollectionName(postParameter.taskStatus);
			var dbo = dbClient.db(taskDBName);
			var dboCollection = dbo.collection(postParameter.objectUUID);
			dboCollection.find().toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				console.log(result);
				res.send(result);
				dbClient.close();
				res.end();
			})

		});
	});

});

app.post('/addTask', function(req, res) {

	var postData = "";

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var postTaskToAdd = JSON.parse(postData);
		var taskDBName = getTaskStatusCollectionName(postTaskToAdd.taskStatus);

		MongoClient.connect(url, { useUnifiedTopology: true	}, function(err, dbClient) {
			if (err) throw err;
			var dbo = dbClient.db(taskDBName);
			//插入数据
			dbo.collection(postTaskToAdd.objectUUID).insertOne(postTaskToAdd, function(err, result) {
				if (err) throw err;
				console.log(result);
				res.send(postTaskToAdd);
				res.end();
				dbClient.close();
			});

		});
	});
});

app.post('/updateTaskStatus', function(req, res) {

	var postData = "";

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var postTaskToUpdate = JSON.parse(postData);
		//console.log(postTaskToUpdate);

		var taskDBName1 = getTaskStatusCollectionName(postTaskToUpdate.taskObject.taskStatus);
		MongoClient.connect(url, { useUnifiedTopology: true	}, function(err, dbClient) {
			if (err) throw err;

			var dbo = dbClient.db(taskDBName1);
			var whereStr = { "taskUUID": postTaskToUpdate.taskObject.taskUUID }; // 查询条件
			dbo.collection(postTaskToUpdate.taskObject.objectUUID).deleteOne(whereStr, function(err, result) {

				if (err) throw err;

				var postTaskToUpdate2 = postTaskToUpdate.taskObject;
				postTaskToUpdate2.taskStatus = postTaskToUpdate.latestTaskStatus;
				var taskDBName2 = getTaskStatusCollectionName(postTaskToUpdate.latestTaskStatus);
				var dbo2 = dbClient.db(taskDBName2);
				dbo2.collection(postTaskToUpdate2.objectUUID).update(whereStr, postTaskToUpdate2,true,function(err, result) {
					//console.log(err);
					if (err) throw err;

					dbClient.close();
					res.send(result);
					res.end();
				});
			})
		})
	})
})


app.post('/updateTask2', function(req, res) {

	var postData = "";

	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
	});

	req.addListener("end", function() {
		var postParameter = JSON.parse(postData);
		console.log(postParameter);
		res.write(JSON.stringify(postParameter));
		var taskObject = postParameter.taskObject;
		console.log("Received POST data :" + taskObject.taskUUID);

		var taskJsonFileName1;
		if (taskObject.taskStatus === "待办")
			taskJsonFileName1 = "tasksTodo.json";
		else if (taskObject.taskStatus === "在办")
			taskJsonFileName1 = "tasksInProgress.json";
		else if (taskObject.taskStatus === "已办")
			taskJsonFileName1 = "tasksDone.json";

		const jsonFile = '../iTopoObjects/' + taskObject.objectUUID + '/' + taskJsonFileName1;
		fs.readFile(jsonFile, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var taskObjects = JSON.parse(data);

				for (var index = 0; index < taskObjects.length; ++index) {
					if (taskObject.taskUUID === taskObjects[index].taskUUID) {
						taskObjects.splice(index, 1);
						break;
					}
				}

				fs.writeFile(jsonFile, JSON.stringify(taskObjects), function(err) {
					if (err) console.error(err);
					console.log('数据已经写入taskJsonFileName1:' + jsonFile);

					var taskJsonFileName2;
					if (postParameter.latestTaskStatus === "待办")
						taskJsonFileName2 = "tasksTodo.json";
					else if (postParameter.latestTaskStatus === "在办")
						taskJsonFileName2 = "tasksInProgress.json";
					else if (postParameter.latestTaskStatus === "已办")
						taskJsonFileName2 = "tasksDone.json";

					const jsonPath2 = '../iTopoObjects/' + taskObject.objectUUID;
					fs.exists(jsonPath2, function(exists) {
						if (exists)
							console.log('文件夹存在');
						else {
							console.log();
							fs.mkdir(jsonPath2, function(err) {
								if (err)
									console.error(err);
								console.log('文件夹不存在' + jsonPath2 + '创建目录成功');
							});
						}
					});

					const jsonFile2 = jsonPath2 + '/' + taskJsonFileName2;
					fs.exists(jsonFile2, function(exists) {
						if (exists) {
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
						} else {
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
