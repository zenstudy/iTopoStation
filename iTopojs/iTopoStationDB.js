import { ajaxPost } from './ajaxPostHelper.js'

var iTopoStationAPI = {
	WORLD_JSON_FILE: "./iTopoObjects/00_iTopoEarth/world.json",
	HORIZEN_SUPERNODES_FILE: "./iTopoObjects/00_iTopoEarth/ZenSuperNodes.json",
	HORIZEN_SECURENODES_FILE: "./iTopoObjects/00_iTopoEarth/ZenSecureNodes.json",

	CANTEEN_YUHUAZHAI_FILE: "./iTopoObjects/00_iTopoEarth/iTopoCanteen.json",
	//ITOPOBASE_FILE: "./iTopoObjects/00_iTopoEarth/iTopobase.json",
	//ITOPOUSER_FILE: "./iTopoObjects/00_iTopoEarth/iTopoUser.json",

	fetchiTopoStars: 'http://127.0.0.1:8081/fetchiTopoStars',
	iTopoEarthRegister : 'http://127.0.0.1:8081/iTopoEarthRegister',
	iTopoEarthLogin : 'http://127.0.0.1:8081/iTopoEarthLogin',
	fetchUserWithStarUUID:'http://127.0.0.1:8081/fetchUserWithStarUUID',
	updateStarUser:'http://127.0.0.1:8081/updateStarUser',

	fetchiTopobase: 'http://127.0.0.1:8081/fetchiTopobase',
	registerBaseObjectOnEarth:'http://127.0.0.1:8081/registerBaseObjectOnEarth',
	fetchBaseObjectWithObjectUUID: 'http://127.0.0.1:8081/fetchBaseObjectWithObjectUUID',
	fetchiTopoBaseAnnouncement:'http://127.0.0.1:8081/fetchiTopoBaseAnnouncement',
	fetchiTopoBaseOutlook: 'http://127.0.0.1:8081/fetchiTopoBaseOutlook',
	fetchiTopobaseWorkTeams: 'http://127.0.0.1:8081/fetchiTopobaseWorkTeams',
	fetchiTopobaseSponsors: 'http://127.0.0.1:8081/fetchiTopobaseSponsors',
	fetchiTopoBaseProductCategorys:'http://127.0.0.1:8081/fetchiTopoBaseProductCategorys',
	fetchiTopoBaseProducts:'http://127.0.0.1:8081/fetchiTopoBaseProducts',

	addTask:'http://127.0.0.1:8081/addTask',
	updateTask:'http://127.0.0.1:8081/updateTask',

	addMemberToiTopoSkyCastleTeams: 'http://127.0.0.1:8081/addMemberToiTopoSkyCastleTeams',
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

		var request = new Request(iTopoStationAPI.fetchiTopoStars, {
			method: 'Get',
			mode: 'cors', // 允许发送跨域请求
			//credentials: 'include'
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetch(json);
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })
	},

	fetchUserWithStarUUID: function(starUUID, fnAfterFetchedUser){

		var request = new Request(iTopoStationAPI.fetchUserWithStarUUID, {
			method: 'POST',
			body: JSON.stringify(starUUID),
		//	headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetchedUser(json);
			//console.log('iTopoStationAPI.fetchUserWithStarUUID user:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	registerUser: function(userStarInfo, fnUserRegistered){

		var request = new Request(iTopoStationAPI.iTopoEarthRegister, {
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

	fetchiTopobase: function(fnAfterFetch) {
		var request = new Request(iTopoStationAPI.fetchiTopobase, {
			method: 'Get',
			mode: 'cors', // 允许发送跨域请求
			//credentials: 'include'
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetch(json);
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

	fetchiTopoBaseOutlook: function(objectUUID, fnAfterFetch){

		var request = new Request(iTopoStationAPI.fetchiTopoBaseOutlook, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			if(json.length === 1){
				fnAfterFetch(json[0]);
			} else {
				fnAfterFetch(json);
			}

			//console.log('iTopoStationAPI.fnAfterFetch baseObject:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopoBaseAnnouncement: function(objectUUID, fnAfterFetchedBaseObject){

		var request = new Request(iTopoStationAPI.fetchiTopoBaseAnnouncement, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterFetchedBaseObject(json);
			//console.log('iTopoStationAPI.fetchiTopoBaseAnnouncement baseObject:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopobaseWorkTeams: function(objectUUID, fnAfterFetchedWorkTeams){

		var request = new Request(iTopoStationAPI.fetchiTopobaseWorkTeams, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {

			if(json.length === 1){
				fnAfterFetchedWorkTeams(json[0]);
			} else {
				fnAfterFetchedWorkTeams(json);
			}
			//console.log('iTopoStationAPI.fetchiTopobaseWorkTeams baseObject:' + JSON.stringify(json));

		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopobaseSponsors: function(objectUUID, fetchiTopobaseSponsors){

		var request = new Request(iTopoStationAPI.fetchiTopobaseSponsors, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {

			fetchiTopobaseSponsors(json);
			//console.log('iTopoStationAPI.fetchiTopobaseSponsors baseObject:' + JSON.stringify(json));

		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopoBaseProductCategorys: function(objectUUID,fnAfterFetchProductCategorys) {

		var request = new Request(iTopoStationAPI.fetchiTopoBaseProductCategorys, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {

			fnAfterFetchProductCategorys(json);
			//console.log('iTopoStationAPI.fnAfterFetchProductCategorys baseObject:' + JSON.stringify(json));

		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	},

	fetchiTopoBaseProducts: function(objectUUID,fnAfterFetch) {

		var request = new Request(iTopoStationAPI.fetchiTopoBaseProducts, {
			method: 'POST',
			body: JSON.stringify(objectUUID),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {

			fnAfterFetch(json);
			//console.log('iTopoStationAPI.fetchiTopoBaseProducts baseObject:' + JSON.stringify(json));

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

		var request = new Request(iTopoStationAPI.addTask, {
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

	updateTask: function(taskObject, latestTaskStatus, fnTaskAdded){

		var request = new Request(iTopoStationAPI.updateTask, {
			method: 'POST',
			body: JSON.stringify({taskObject:taskObject,latestTaskStatus:latestTaskStatus}),
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

	addMemberToiTopoSkyCastleTeams: function(skyCastleUUID, teamUUID, starUserUUID,fnAfterAdd) {

		var request = new Request(iTopoStationAPI.addMemberToiTopoSkyCastleTeams, {
			method: 'POST',
			body: JSON.stringify({objectUUID:skyCastleUUID, teamUUID: teamUUID, teamMemberUUID: starUserUUID }),
			headers: new Headers()
		});

		fetch(request)
		.then(response => response.json())
		.then(json => {
			fnAfterAdd();
			console.log('addMemberToiTopoSkyCastleTeams.post:' + JSON.stringify(json));
		 }).catch(function(e) {
		  	console.log('error: ' + e.toString());
		 })

	}
}

export { iTopoStationDB };
