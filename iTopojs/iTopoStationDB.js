import { ajaxPost } from './ajaxPostHelper.js'

var iTopoStationAPI = {
	WORLD_JSON_FILE: "./iTopoObjects/00_iTopoEarth/Json/world.json",
	HORIZEN_SUPERNODES_FILE: "./iTopoObjects/00_iTopoEarth/Json/ZenSuperNodes.json",
	HORIZEN_SECURENODES_FILE: "./iTopoObjects/00_iTopoEarth/Json/ZenSecureNodes.json",

	CANTEEN_YUHUAZHAI_FILE: "./iTopoObjects/00_iTopoEarth/Json/iTopoCanteen.json",
	ITOPOBASE_FILE: "./iTopoObjects/00_iTopoEarth/Json/iTopobase.json",
	ITOPOUSER_FILE: "./iTopoObjects/00_iTopoEarth/Json/iTopoUser.json",

	iTopoEarthRegister : 'http://127.0.0.1:8081/iTopoEarthRegister',
	iTopoEarthLogin : 'http://127.0.0.1:8081/iTopoEarthLogin',
	registerBaseObjectOnEarth:'http://127.0.0.1:8081/registerBaseObjectOnEarth',
	addTask:'http://127.0.0.1:8081/addTask',
	fetchUserWithStarUUID:'http://127.0.0.1:8081/fetchUserWithStarUUID',
	updateStarUser:'http://127.0.0.1:8081/updateStarUser',
	fetchBaseObjectWithObjectUUID: 'http://127.0.0.1:8081/fetchBaseObjectWithObjectUUID',
}

function iTopoStationDB() {

	return this;
}

//iTopoDefaultModelManager.prototype = Object.create( UIElement.prototype );
iTopoStationDB.prototype.constructor = iTopoStationDB;

iTopoStationDB.prototype = {

	dispose: function() {

		console.log('===disposed:iTopoStationDB=========== ');
	},

	fetchiWorldGeo: function(fnAfterFetch) {
		fetch(iTopoStationAPI.WORLD_JSON_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchiTopobase: function(fnAfterFetch) {
		fetch(iTopoStationAPI.ITOPOBASE_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchiTopoCanteen: function(fnAfterFetch) {
		fetch(iTopoStationAPI.CANTEEN_YUHUAZHAI_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchHorizenSuperNodes: function(fnAfterFetch) {
		fetch(iTopoStationAPI.HORIZEN_SUPERNODES_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchHorizenSecureNodes: function(fnAfterFetch) {
		fetch(iTopoStationAPI.HORIZEN_SECURENODES_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchiTopoStars: function(fnAfterFetch) {
		fetch(iTopoStationAPI.ITOPOUSER_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchiTopoTaskCards: function(objectUUID, taskStatus, fnAfterFetch) {

		var jsonFileName = "";

		if(taskStatus === "Todo")
			jsonFileName = 'tasksTodo.json';
		else if(taskStatus === "InProgress")
			jsonFileName = 'tasksInProgress.json';
		else if(taskStatus === "Done")
			jsonFileName = 'tasksDone.json';

		var taskFile = './iTopoObjects/' + objectUUID + '/' + jsonFileName;
		
		fetch(taskFile, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	addTask: function(taskObject, fnTaskAdded){

		var request = new Request(iTopoStationAPI.iTopoEarthLogin, {
			method: 'POST',
			body: JSON.stringify(taskObject),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnTaskAdded();
			console.log('fetch.post:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	registerUser: function(userStarInfo, fnUserRegistered){

		var request = new Request(iTopoStationAPI.iTopoEarthLogin, {
			method: 'POST',
			body: JSON.stringify(userStarInfo),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnUserRegistered();
			console.log('fetch.post:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	userLogin: function(userStarInfo, fnUserLogin){

		var request = new Request(iTopoStationAPI.iTopoEarthLogin, {
			method: 'POST',
			body: JSON.stringify(userStarInfo),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnUserLogin(json);
			console.log('iTopoStationAPI.iTopoEarthLogin user:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	registerBaseObjectOnEarth: function(lightTask, fnAfterLight){

		var request = new Request(iTopoStationAPI.registerBaseObjectOnEarth, {
			method: 'POST',
			body: JSON.stringify(lightTask),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterLight();
			console.log('fetch.post:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchBaseObjectWithObjectUUID: function(objectUUID, fnAfterFetchedBaseObject){

		var request = new Request(iTopoStationAPI.fetchBaseObjectWithObjectUUID, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetchedBaseObject(json);
			console.log('iTopoStationAPI.fetchBaseObjectWithObjectUUID baseObject:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchUserWithStarUUID: function(starUUID, fnAfterFetchedUser){

		var request = new Request(iTopoStationAPI.fetchUserWithStarUUID, {
			method: 'POST',
			body: JSON.stringify(starUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetchedUser(json);
			console.log('iTopoStationAPI.fetchUserWithStarUUID user:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	updateStarUser: function(starUser, fnAfterUpdate){

		var request = new Request(iTopoStationAPI.updateStarUser, {
			method: 'POST',
			body: JSON.stringify(starUser),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterUpdate();
			console.log('updateStarUser.post:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopoSkyCastleTeams: function(skyCastleUUID,fnAfterFetch) {

		var taskFile = './iTopoObjects/' + skyCastleUUID + '/workTeams.json';
		fetch(taskFile, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	fetchiTopoSkyCastleSponsors: function(skyCastleUUID,fnAfterFetch) {

		var taskFile = './iTopoObjects/' + skyCastleUUID + '/sponsorOrgs.json';
		fetch(taskFile, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				fnAfterFetch(json);

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},
}

export { iTopoStationDB };
