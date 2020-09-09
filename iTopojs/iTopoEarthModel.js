import * as THREE from '../../build/three.module.js';
import {TWEEN} from '../../examples/jsm/libs/tween.module.min.js';
import {BufferGeometryUtils} from '../../examples/jsm/utils/BufferGeometryUtils.js';
import {COUNTRIES} from './countries.js';
import {MeshLine,MeshLineMaterial} from './THREE.MeshLine.js';
import {Editor} from '../js/Editor.js';
import {AddiTopoObjCommand} from './commands/AddiTopoObjCommand.js';
import {AddiTopoObjArrayCommand} from './commands/AddiTopoObjArrayCommand.js';
import {iTopoEarthBuilder} from './iTopoEarthBuilder.js';
import {iTopoEarthCache} from './iTopoEarthCache.js';
import {iTopoEarthSettings} from './iTopoEarthSettings.js';
import {iTopoSkyCastle} from './iTopoElement/iTopoSkyCastle.js';
import {iTopoLunarMoon} from './iTopoElement/iTopoLunarMoon.js';
import {iTopoInnerEarth} from './iTopoElement/iTopoInnerEarth.js';

export var iTopoEarthModel = iTopoEarthModel || {};

let layerPlanet, layerMarks, layerCloud, layerStars;

iTopoEarthModel.SkyCastle = new iTopoSkyCastle();
iTopoEarthModel.InnerEarth = new iTopoInnerEarth();
iTopoEarthModel.LunarMoon = new iTopoLunarMoon();

iTopoEarthModel.GetModelTopic = function() {

	var topic = "未定义";
	if (iTopoEarthSettings.MAP_KIND === "共创基地") {
		topic = "共同创造基地";
	} else if (iTopoEarthSettings.MAP_KIND === "雨花斋") {
		topic = "雨花斋全国分布图";
	} else if(iTopoEarthSettings.MAP_KIND === "超级节点儿") {
		topic = "Horizen Super Nodes Distribution Map";
	} else if (iTopoEarthSettings.MAP_KIND === "普通节点儿") {
		topic = "Horizen Secure Nodes Distribution Map";
	} else if (iTopoEarthSettings.MAP_KIND === "国家分布") {
		topic = "全球国家分布图";
	}

	return topic;
}

iTopoEarthModel.ReCreate = function() {

	layerPlanet = new THREE.Object3D();
	layerCloud = new THREE.Object3D();
	layerMarks = new THREE.Object3D();
	layerStars = new THREE.Object3D();
	//iTopoEarthModel.createEarthAxis();

	let titlePos;
	if (iTopoEarthSettings.GLOBAL_KIND == "Global2D") {
		titlePos = new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight);
	} else if (iTopoEarthSettings.GLOBAL_KIND == "Global3D") {
		titlePos = new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, iTopoEarthSettings.CITY_RADIUS);
	}

	if (iTopoEarthSettings.MAP_KIND !== "共创基地") {
		layerMarks.add(iTopoEarthBuilder.createModelTitle(iTopoEarthModel.GetModelTopic(), titlePos, iTopoEarthSettings.topicFontSize));
	}


	iTopoEarthModel.CreateGlobalModel();
	iTopoEarthModel.CreateiTopoSkyCastle();
	iTopoEarthModel.CreateiTopoInnerEarth();
	iTopoEarthModel.CreateiTopoLunarMoon();
	iTopoEarthModel.MarkiTopoStars();

	if (iTopoEarthSettings.MAP_KIND == "共创基地") {
		iTopoEarthModel.MarkiTopoBase(iTopoEarthSettings.ITOPOBASE_FILE);
	} else if (iTopoEarthSettings.MAP_KIND == "雨花斋") {
		iTopoEarthModel.MarkCanteen(iTopoEarthSettings.CANTEEN_YUHUAZHAI_FILE);
	}else if (iTopoEarthSettings.MAP_KIND == "超级节点儿") {
		iTopoEarthModel.MarkZenNodes(iTopoEarthSettings.HORIZEN_SUPERNODES_FILE);
	} else if (iTopoEarthSettings.MAP_KIND == "普通节点儿") {
		iTopoEarthModel.MarkZenNodes(iTopoEarthSettings.HORIZEN_SECURENODES_FILE);
	} else if (iTopoEarthSettings.MAP_KIND == "国家分布") {
		iTopoEarthModel.MarkCountries();
	}

	layerPlanet.name = "layerPlanet";
	editor.execute(new AddiTopoObjCommand(editor, layerPlanet));

	layerCloud.name = "layerCloud";
	editor.execute(new AddiTopoObjCommand(editor, layerCloud));

	layerMarks.name = "layerMarks";
	editor.execute(new AddiTopoObjCommand(editor, layerMarks));

	layerStars.name = "layerStars";
	editor.execute(new AddiTopoObjCommand(editor, layerStars));
}

iTopoEarthModel.RotateToBeijing = function(camera) {

	if (iTopoEarthSettings.GLOBAL_KIND !== "Global3d")
		return;

	var lngx = 116.20;
	var latx = 39.55;

	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings
		.COLUD_RADIUS_RATIO);

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);
}

iTopoEarthModel.CreateGlobalModel = function() {
	if (iTopoEarthSettings.GLOBAL_KIND == "Global2D") {

		// 绘制地图
		if (iTopoEarthSettings.EARTH_STYLE == "标准地图") {
			CreateWorldPlaneMap();
		} else {
			alert("Havn't implement " + iTopoEarthSettings.EARTH_STYLE);
		}

	} else if (iTopoEarthSettings.GLOBAL_KIND == "Global3D") {

		// 绘制地图
		if (iTopoEarthSettings.EARTH_STYLE == '标准地图') {
			CreateWorldSphereMap();
		} else if (iTopoEarthSettings.EARTH_STYLE == '粒子地壳') {
			iTopoEarthBuilder.createEarthParticles(layerPlanet);
		} else if (iTopoEarthSettings.EARTH_STYLE == '彩色地壳') {
			layerPlanet.add(iTopoEarthBuilder.createEarthWithColorPicture());
		} else if (iTopoEarthSettings.EARTH_STYLE == '线框地壳') {
			layerPlanet.add(iTopoEarthBuilder.createEarthWithWireFrameStyle());
		} else {
			alert("Havn't implement " + iTopoEarthSettings.EARTH_STYLE);
		}

		layerCloud.add(iTopoEarthBuilder.createCloudGrid());
	}
}

iTopoEarthModel.CreateiTopoSkyCastle = function() {

	var option = {
		"objectUUID": iTopoEarthModel.SkyCastle.castleUUID,
		"objectType": "iTopoType/TaskObject/iTopoSkyCastle",
		"pos": [iTopoEarthModel.SkyCastle.lng, iTopoEarthModel.SkyCastle.lat],
		"starSize": iTopoEarthModel.SkyCastle.size,
		"dis2Cloud": iTopoEarthModel.SkyCastle.dis2Cloud,
		"textMarked": false,
		"textValue": editor.strings.getKey('iTopoType/TaskObject/iTopoSkyCastle'),
		"fontColor": iTopoEarthSettings.markingTextColor,
		"fontSize": iTopoEarthSettings.markingFontSize*60,
		"average": getAverage(),
	}

	var skyCastle = iTopoEarthBuilder.createSkyCastle(option);

	editor.execute(new AddiTopoObjCommand(editor, skyCastle.starMesh));
	editor.execute(new AddiTopoObjCommand(editor, skyCastle.fontMesh));

	// const seeFrom = createPosition(userStarInfo.lng, userStarInfo.lat, iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO
	// 	+ option.dis2Cloud+0.2*iTopoEarthSettings.CITY_RADIUS );
	// iTopoEarthModel.ParticlesMove(seeFrom, editor.camera);
	// editor.camera.position.copy(seeFrom);
	// editor.camera.lookAt(0, 0, 0);
}

iTopoEarthModel.CreateiTopoInnerEarth = function() {

	var option = {
		"objectUUID": iTopoEarthModel.InnerEarth.innerEarthUUID,
		"objectType": "iTopoType/TaskObject/iTopoInnerEarth",
		"pos": [iTopoEarthModel.InnerEarth.lng, iTopoEarthModel.InnerEarth.lat],
		"starSize": iTopoEarthModel.InnerEarth.size,
		"dis2Cloud": iTopoEarthModel.InnerEarth.dis2Cloud,
		"textMarked": false,
		"textValue": editor.strings.getKey('iTopoType/TaskObject/iTopoInnerEarth'),
		"fontColor": iTopoEarthSettings.markingTextColor,
		"fontSize": iTopoEarthSettings.markingFontSize*60,
		"average": getAverage(),
	}

	var innerEarth = iTopoEarthBuilder.createInnerEarth(option);

	editor.execute(new AddiTopoObjCommand(editor, innerEarth.starMesh));
	editor.execute(new AddiTopoObjCommand(editor, innerEarth.fontMesh));

	// const seeFrom = createPosition(userStarInfo.lng, userStarInfo.lat, iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO
	// 	+ option.dis2Cloud+0.2*iTopoEarthSettings.CITY_RADIUS );
	// iTopoEarthModel.ParticlesMove(seeFrom, editor.camera);
	// editor.camera.position.copy(seeFrom);
	// editor.camera.lookAt(0, 0, 0);
}

iTopoEarthModel.CreateiTopoLunarMoon = function() {

	var option = {
		"objectUUID": iTopoEarthModel.LunarMoon.lunarMoonUUID,
		"objectType": "iTopoType/TaskObject/iTopoLunarMoon",
		"pos": [iTopoEarthModel.LunarMoon.lng, iTopoEarthModel.LunarMoon.lat],
		"starSize": iTopoEarthModel.LunarMoon.size,
		"dis2Cloud": iTopoEarthModel.LunarMoon.dis2Cloud,
		"textMarked": false,
		"textValue": editor.strings.getKey('iTopoType/TaskObject/iTopoLunarMoon'),
		"fontColor": iTopoEarthSettings.markingTextColor,
		"fontSize": iTopoEarthSettings.markingFontSize*60,
		"average": getAverage(),
	}

	var lunarMoon = iTopoEarthBuilder.createLunarMoon(option);

	editor.execute(new AddiTopoObjCommand(editor, lunarMoon.starMesh));
	editor.execute(new AddiTopoObjCommand(editor, lunarMoon.fontMesh));

	// const seeFrom = createPosition(userStarInfo.lng, userStarInfo.lat, iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO
	// 	+ option.dis2Cloud+0.2*iTopoEarthSettings.CITY_RADIUS );
	// iTopoEarthModel.ParticlesMove(seeFrom, editor.camera);
	// editor.camera.position.copy(seeFrom);
	// editor.camera.lookAt(0, 0, 0);
}

iTopoEarthModel.lightStars = function(userStarInfo) {
	var option = {
		"objectUUID": userStarInfo.starUUID,
		"objectType": userStarInfo.starType,
		"pos": [userStarInfo.lng, userStarInfo.lat],
		"starSize": 3 + 3 * Math.random(),
		"dis2Cloud": Math.random() * iTopoEarthSettings.CITY_RADIUS,
		"textMarked": false,
		"textValue": "我的星星" + userStarInfo.objectUUID,
		"fontColor": iTopoEarthSettings.markingTextColor,
		"fontSize": iTopoEarthSettings.markingFontSize,
		"average": getAverage(),
	}

	var star = iTopoEarthBuilder.createStar(option);

	editor.execute(new AddiTopoObjCommand(editor, star));

	const seeFrom = createPosition(userStarInfo.lng, userStarInfo.lat, iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO
		+ option.dis2Cloud+0.2*iTopoEarthSettings.CITY_RADIUS );
	iTopoEarthModel.ParticlesMove(seeFrom, editor.camera);
	editor.camera.position.copy(seeFrom);
	editor.camera.lookAt(0, 0, 0);

	return star;
}

// iTopoEarthModel.lightEarth = function(objUUID, camera) {
// 	const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
// 	const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
// 	const lngx = plusOrMinus_lngx * (Math.random() * 180);
// 	const latx = plusOrMinus_latx * (Math.random() * 90);

// 	const lookat = createPosition(lngx, latx, iTopoEarthSettings.CITY_RADIUS*1.2 );

// 	let seeFrom = (plusOrMinus_latx === 1)?
// 		createPosition(lngx, latx - 28, iTopoEarthSettings.CITY_RADIUS*1.3)
// 		: createPosition(lngx, latx + 28, iTopoEarthSettings.CITY_RADIUS*1.3);

// //	iTopoEarthModel.ParticlesMove(seeFrom, editor.camera);
// 	editor.camera.position.copy(seeFrom);
// 	editor.camera.lookAt(lookat.x, lookat.y, lookat.z);
// //	camera.up.set(0,iTopoEarthSettings.CITY_RADIUS*3,0);

// 	var option = {
// 		"objectUUID": objUUID,
// 		"GlobalKind": iTopoEarthSettings.GLOBAL_KIND,
// 		"pos": [lngx, latx],
// 		"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
// 		"lightConeHeight": randomLightConeHeight(),
// 		"textMarked": false,
// 		"textValue": "共创基地" + lngx + "," + latx,
// 		"fontColor": iTopoEarthSettings.markingTextColor,
// 		"fontSize": iTopoEarthSettings.markingFontSize,
// 		"average": getAverage(),
// 	}

// 	var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
// 	editor.execute(new AddiTopoObjCommand(editor, lightConeMark.lightConeGrp));
// 	editor.execute(new AddiTopoObjCommand(editor, lightConeMark.fontMesh));
// }

iTopoEarthModel.lightEarth = function(lightTask) {

	const seeFrom = createPosition(lightTask.lng, lightTask.lat, iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO);

	iTopoEarthModel.ParticlesMove(seeFrom);
	editor.camera.position.copy(seeFrom);
	editor.camera.lookAt(0, 0, 0);

	var option = {
		"objectUUID": lightTask.baseUUID,
		"objectType": lightTask.taskType,
		"pos": [lightTask.lng, lightTask.lat],
		"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
		"lightConeHeight": randomLightConeHeight(),
		"textMarked": false,
		"textValue": lightTask.title,
		"fontColor": iTopoEarthSettings.markingTextColor,
		"fontSize": iTopoEarthSettings.markingFontSize,
		"average": getAverage(),
	}

	var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
	editor.execute(new AddiTopoObjCommand(editor, lightConeMark.fontMesh));
	editor.execute(new AddiTopoObjCommand(editor, lightConeMark.lightConeGrp));
}

iTopoEarthModel.ParticlesMove = function(camera2Pos) {
	let endP = {
		x: editor.camera.position.x,
		y: editor.camera.position.y,
		z: editor.camera.position.z,
	}
	var tween = new TWEEN.Tween(endP);
	tween.to({
		x: camera2Pos.x,
		y: camera2Pos.y,
		z: camera2Pos.z,
	}, 1200);

	function onUpdate(object) {
		let aniCamera = new THREE.Vector3(object.x, object.y, object.z);
		editor.camera.position.copy(aniCamera);
		editor.camera.lookAt(0, 0, 0);
	}

	function onComplete(object) {
		editor.camera.position.copy(camera2Pos);
	}

	tween.onUpdate(onUpdate);
	tween.onComplete(onComplete);
	tween.easing(TWEEN.Easing.Circular.InOut);

	tween.start();
}

iTopoEarthModel.MarkiTopoStars = function() {

	fetch(iTopoEarthSettings.ITOPOUSER_FILE, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();
			var objArray = [];
			for (var i = 0; i < json.length; i++) {
				// var plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
				// var plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
				// var lngx = plusOrMinus_lngx * (Math.random() * 180);
				// var latx = plusOrMinus_latx * (Math.random() * 90);

				var option = {
					"objectUUID": json[i].starUUID,
					"objectType": "iTopoType/TaskObject/Star",
					"pos": [json[i].lng, json[i].lat],
					"starSize": iTopoEarthSettings.starSize * (1 + Math.random())*3,
					"dis2Cloud": Math.random() * iTopoEarthSettings.CITY_RADIUS * 2,
					"textMarked": false,
					"textValue": json[i].cellPhone,
					"fontColor": iTopoEarthSettings.markingTextColor,
					"fontSize": iTopoEarthSettings.markingFontSize,
					"average": average,
				}

				var star = iTopoEarthBuilder.createStar(option);
				objArray.push(star);
			}
			editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.createStarParticles = function() {

	var radius = iTopoEarthSettings.CITY_RADIUS * 2;
	var geometry = new THREE.BufferGeometry();

	var positions = [];
	var colors = [];
	var sizes = [];

	var color = new THREE.Color();
	for (var i = 0; i < 5200; i++) {
		var plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
		var plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
		var lngx = plusOrMinus_lngx * (Math.random() * 180);
		var latx = plusOrMinus_latx * (Math.random() * 90);
		let starPoint = createPosition(lngx, latx,
			iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + Math.random() * iTopoEarthSettings.CITY_RADIUS
		);
		positions.push(starPoint.x);
		positions.push(starPoint.y);
		positions.push(starPoint.z);

		// 随机设置粒子的颜色
		color.setHSL(i / iTopoEarthCache.starPositions.length, 1.0, 0.5);
		colors.push(color.r, color.g, color.b);

		sizes.push(18);
	}

	geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setDynamic(true));

	console.log(positions);

	var layerStarParticles = new THREE.Points(geometry, iTopoEarthCache.starShaderMaterial);

	return layerStarParticles;
}

iTopoEarthModel.MarkiTopoBase = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();
			if (iTopoEarthSettings.markingKind === "lightCone") {
				var objArray = [];
				for (var i = 0; i < json.length; i++) {
					var option = {
						"objectUUID": json[i].baseUUID,
						"objectType": json[i].taskType,
						"pos": [json[i].lng, json[i].lat],
						"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
						"lightConeHeight": randomLightConeHeight(),
						"textMarked": false,
						"textValue": json[i].title,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}

					// 地标
					var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
					objArray.push(lightConeMark.lightConeGrp);
					layerMarks.add(lightConeMark.fontMesh);
				}
				editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
			} else if (iTopoEarthSettings.markingKind === "balloon") {
				const geometries = [];
				var markedNames = [];
				var objArray = [];
				for (var i = 0; i < json.length; i++) {
					var option = {
						"objectUUID": json[i].baseUUID,
						"objectType": json[i].taskType,
						"pos": [json[i].lng, json[i].lat],
						"textMarked": false,
						"textValue": json[i].title,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}

					markedNames.forEach((mn) => {
						if (mn === json[i].title)
							option.textMarked = true;
					});

					if (!option.textMarked)
						markedNames.push(json[i].title);

					var balloonMark = iTopoEarthBuilder.createBalloonMark(option);

					geometries.push(balloonMark.ball);
					geometries.push(balloonMark.cylinder);
					if (!option.textMarked)
						layerMarks.add(balloonMark.fontMesh);
				}

				const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
				const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
				objArray.push(mesh);
			}
			editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkCanteen = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();
			if (iTopoEarthSettings.markingKind === "lightCone") {
				var objArray = [];
				for (var i = 0; i < json.length; i++) {
					var option = {
						"objectUUID": THREE.MathUtils.generateUUID(),
						"objectType": 'iTopoType/TaskObject/SharedCanteen',
						"pos": [json[i].lng, json[i].lat],
						"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
						"lightConeHeight": randomLightConeHeight(),
						"textMarked": false,
						"textValue": json[i].city + ", " + json[i].country,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}
					var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
					objArray.push(lightConeMark.lightConeGrp);
					layerMarks.add(lightConeMark.fontMesh);
				}
				editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
			} else if (iTopoEarthSettings.markingKind === "balloon") {
				const geometries = [];
				var markedNames = [];
				var objArray = [];
				for (var i = 0; i < json.length; i++) {
					var option = {
						"objectUUID": THREE.MathUtils.generateUUID(),
						"objectType": 'iTopoType/TaskObject/SharedCanteen',
						"pos": [json[i].lng, json[i].lat],
						"textMarked": false,
						"textValue": json[i].title,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}

					markedNames.forEach((mn) => {
						if (mn === json[i].title)
							option.textMarked = true;
					});

					if (!option.textMarked)
						markedNames.push(json[i].title);

					var balloonMark = iTopoEarthBuilder.createBalloonMark(option);

					geometries.push(balloonMark.ball);
					geometries.push(balloonMark.cylinder);
					if (!option.textMarked)
						layerMarks.add(balloonMark.fontMesh);
				}

				const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
				const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
				objArray.push(mesh);
				editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
			}

		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkZenNodes = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();
			if (iTopoEarthSettings.markingKind === "lightCone") {

				var objArray = [];
				for (var i = 0; i < json.length; i++) {

					var option = {
						"objectUUID": THREE.MathUtils.generateUUID(),
						"objectType": 'ZNode',
						"pos": [json[i].lon, json[i].lat],
						"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
						"lightConeHeight": randomLightConeHeight(),
						"textMarked": false,
						"textValue": json[i].city + ", " + json[i].country,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}

					var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
					objArray.push(lightConeMark.lightConeGrp);
					layerMarks.add(lightConeMark.fontMesh);
				}
				editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
			} else if (iTopoEarthSettings.markingKind === "balloon") {

				const geometries = [];
				var markedNames = [];
				var objArray = [];
				for (var i = 0; i < json.length; i++) {

					var option = {
						"objectUUID": THREE.MathUtils.generateUUID(),
						"objectType": 'ZNode',
						"pos": [json[i].lon, json[i].lat],
						"textMarked": false,
						"textValue": json[i].city,
						"fontColor": iTopoEarthSettings.markingTextColor,
						"fontSize": iTopoEarthSettings.markingFontSize,
						"average": average,
					}

					markedNames.forEach((mn) => {
						if (mn === json[i].city)
							option.textMarked = true;
					});

					if (!option.textMarked)
						markedNames.push(json[i].city);

					var balloonMark = iTopoEarthBuilder.createBalloonMark(option);

					geometries.push(balloonMark.ball);
					geometries.push(balloonMark.cylinder);
					if (!option.textMarked)
						layerMarks.add(balloonMark.fontMesh);
				}

				const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
				const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
				objArray.push(mesh);
				editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
			}
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	})
}

iTopoEarthModel.MarkZenNodeParticleOnPlane = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			//存放粒子数据的网格
			var geom = new THREE.Geometry();
			//样式化粒子的THREE.PointCloudMaterial材质
			var material = new THREE.PointsMaterial({
				size: 10,
				sizeAttenuation: true,
				vertexColors: THREE.VertexColors,
				transparent: true,
				opacity: 0.99,
				map: new THREE.TextureLoader().load(iTopoEarthSettings.LAND_MARK_01),
				side: THREE.FrontSide,
				depthWrite: false,
				speed_: iTopoEarthSettings.BLINT_SPEED
			});

			let average = getAverage();
			var markedNames = [];
			for (var i = 0; i < json.length; i++) {

				var option = {
					"textValue": json[i].city,
					"fontColor": iTopoEarthSettings.markingTextColor,
					"fontSize": iTopoEarthSettings.markingFontSize,
					"pos": [json[i].lon, json[i].lat]
				}

				let cityX = option.pos[0] * average / iTopoEarthSettings.mapScaleSize;
				let cityY = option.pos[1] * average / iTopoEarthSettings.mapScaleSize;

				var particle = new THREE.Vector3(cityX, cityY, iTopoEarthSettings.zHeight + 1);
				geom.vertices.push(particle);
				var color = new THREE.Color(+iTopoEarthModel.RandomColor());
				geom.colors.push(color);

				let textMarked = false;

				markedNames.forEach((mn) => {
					if (mn === json[i].city)
						textMarked = true;
				})

				if (!textMarked) {
					markedNames.push(json[i].city);

					// 添加文字说明
					let textLength = option.textValue.length;
					let texture = new THREE.CanvasTexture(iTopoEarthBuilder.getCanvasFont(textLength * option.fontSize *
						average,
						option.fontSize * average, option.textValue, option.fontColor));
					let fontMesh = new THREE.Sprite(
						new THREE.SpriteMaterial({
							map: texture
						})
					)
					fontMesh.scale.x = option.fontSize / average * textLength;
					fontMesh.scale.y = option.fontSize / average;
					fontMesh.position.set(cityX, cityY, iTopoEarthSettings.zHeight + iTopoEarthSettings.circularHeight +
						iTopoEarthSettings
						.circularRadio + option.fontSize / average + 0.5); // 定义提示文字显示位置

					layerMarks.add(fontMesh);
				}
			}

			//生成模型，添加到场景当中
			var cloud1 = new THREE.Points(geom, material);
			layerMarks.add(cloud1);

		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	})
}

iTopoEarthModel.MarkCountries = function() {
	// 地标及光锥
	var objArray = [];
	for (let i = 0, length = COUNTRIES.length; i < length; i++) {

		var option = {
			"objectUUID": THREE.MathUtils.generateUUID(),
			"objectType": 'Country',
			"pos": [COUNTRIES[i].position[0], COUNTRIES[i].position[1]],
			"sphereRadius": iTopoEarthSettings.CITY_RADIUS,
			"lightConeHeight": randomLightConeHeight(),
			"textMarked": false,
			"textValue": COUNTRIES[i].name,
			"fontColor": iTopoEarthSettings.markingTextColor,
			"fontSize": iTopoEarthSettings.markingFontSize,
			"average": getAverage(),
		}

		var lightConeMark = iTopoEarthBuilder.createLightConeMark(option);
		objArray.push(lightConeMark.lightConeGrp);
		layerMarks.add(lightConeMark.fontMesh);
	}

	editor.execute(new AddiTopoObjArrayCommand(editor, objArray));
}

// 计算绘制地图参数函数
var CreateWorldPlaneMap = function() {
	fetch(iTopoEarthSettings.WORLD_JSON_FILE, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(worldGeometry) {
			drawShapeOptionFun(worldGeometry);
			drawWorldLineFun2D(worldGeometry);
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

var CreateWorldSphereMap = function() {
	fetch(iTopoEarthSettings.WORLD_JSON_FILE, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		response.json().then(function(json) {

			var worldGeometry = [];
			// 绘制世界地图
			json.features.forEach(function(worldItem) {
				var length = worldItem.geometry.coordinates.length;
				var multipleBool = length > 1 ? true : false;
				worldItem.geometry.coordinates.forEach(function(worldChildItem) {
					if (multipleBool) {
						// 值界可以使用的经纬度信息
						if (worldChildItem.length && worldChildItem[0].length == 2) {
							worldGeometry.push(worldChildItem);
						}
						// 需要转换才可以使用的经纬度信息
						if (worldChildItem.length && worldChildItem[0].length > 2) {
							worldChildItem.forEach(function(countryItem, countryItenIndex) {
								worldGeometry.push(countryItem);
							})
						}
					} else {
						var countryPos = null;
						if (worldChildItem.length > 1) {
							countryPos = worldChildItem;
						} else {
							countryPos = worldChildItem[0];
						}
						if (countryPos) {
							worldGeometry.push(countryPos);
						}
					}
				})
			})

			// 创建地球
			//var earthPic = new THREE.TextureLoader().load(iTopoEarthSettings.EARTH_PNG_WORLDGEOMETRY);
			var earthPic = new THREE.CanvasTexture(createCanvas(2048, 1024, worldGeometry));
			var sphereMesh = new THREE.Mesh(iTopoEarthCache.earthBufferSphere,
				new THREE.MeshBasicMaterial({
					map: earthPic,
					side: THREE.FrontSide
				}));

			layerPlanet.add(sphereMesh);

			// 绘制世界地图
			worldGeometry.forEach(function(item, index) {
				CreateSphereLine(item, index);
			})
		})
	}).catch(function(e) {
		console.log("Oops, error");
	});
}

// 获取average函数
var getAverage = function() {
	let container = document.getElementById('viewport');
	var average = 0;
	if (container.clientWidth > container.clientHeight) {
		average = container.clientHeight / 180;
	} else {
		average = container.clientWidth / 360;
	}
	return average;
}

// 将shape转换为ExtrudeGeometry
var drawExtrudeShape = function(pos) {
	// 计算平均每格占比
	var average = getAverage();

	var shapeObj = new THREE.Shape();
	shapeObj.moveTo(pos[0][0] * average / iTopoEarthSettings.mapScaleSize, pos[0][1] * average /
		iTopoEarthSettings.mapScaleSize);

	pos.forEach(function(item) {
		shapeObj.lineTo(item[0] * average / iTopoEarthSettings.mapScaleSize, item[1] * average /
			iTopoEarthSettings.mapScaleSize);
	})

	var geometry = new THREE.ExtrudeGeometry(shapeObj, iTopoEarthCache.mapExtrudeOptions);
	var material1 = new THREE.MeshBasicMaterial({
		color: iTopoEarthSettings.earthLandFillColor
	});
	var material2 = new THREE.MeshBasicMaterial({
		color: iTopoEarthSettings.earthLandBorderColor
	});
	// 绘制地图
	let shapeGeometry = new THREE.Mesh(geometry, [material1, material2]);
	// 将地图加入场景
	layerPlanet.add(shapeGeometry);
}

// 计算绘制地图参数函数
var drawShapeOptionFun = function(worldGeometry) {
	worldGeometry.features.forEach(function(worldItem, worldItemIndex) {
		var length = worldItem.geometry.coordinates.length;
		var multipleBool = length > 1 ? true : false;
		worldItem.geometry.coordinates.forEach(function(worldChildItem, worldChildItemIndex) {
			if (multipleBool) {
				// 值界可以使用的经纬度信息
				if (worldChildItem.length && worldChildItem[0].length == 2) {
					drawExtrudeShape(worldChildItem);
				}
				// 需要转换才可以使用的经纬度信息
				if (worldChildItem.length && worldChildItem[0].length > 2) {
					worldChildItem.forEach(function(countryItem, countryItenIndex) {
						drawExtrudeShape(countryItem);
					})
				}
			} else {
				var countryPos = null;
				if (worldChildItem.length > 1) {
					countryPos = worldChildItem;
				} else {
					countryPos = worldChildItem[0];
				}
				if (countryPos) {
					drawExtrudeShape(countryPos);
				}
			}
		})
	})
}

// 绘制世界地图线条函数
var drawWorldLine2D = function(pos, identify) {
	// 计算平均每格占比
	var average = getAverage();
	var geometry = new THREE.Geometry();
	pos.forEach(function(item) {
		var v = new THREE.Vector3(item[0] * average / iTopoEarthSettings.mapScaleSize,
			item[1] * average / iTopoEarthSettings.mapScaleSize, iTopoEarthSettings.zHeight);
		geometry.vertices.push(v);
	})
	// 定义线条
	let line = new MeshLine();
	line.setGeometry(geometry);

	// 绘制地图
	layerPlanet.add(new THREE.Mesh(line.geometry, iTopoEarthCache.worldMapMaterial));
}

// 计算绘制地图参数函数
var drawWorldLineFun2D = function(worldGeometry) {
	// 绘制世界地图
	worldGeometry.features.forEach(function(worldItem, worldItemIndex) {
		var length = worldItem.geometry.coordinates.length;
		var multipleBool = length > 1 ? true : false;
		worldItem.geometry.coordinates.forEach(function(worldChildItem, worldChildItemIndex) {
			if (multipleBool) {
				// 值界可以使用的经纬度信息
				if (worldChildItem.length && worldChildItem[0].length == 2) {
					drawWorldLine2D(worldChildItem, '' + worldItemIndex + worldChildItemIndex);
				}
				// 需要转换才可以使用的经纬度信息
				if (worldChildItem.length && worldChildItem[0].length > 2) {
					worldChildItem.forEach(function(countryItem, countryItenIndex) {
						drawWorldLine2D(countryItem, '' + worldItemIndex + worldChildItemIndex + countryItenIndex);
					})
				}
			} else {
				var countryPos = null;
				if (worldChildItem.length > 1) {
					countryPos = worldChildItem;
				} else {
					countryPos = worldChildItem[0];
				}
				if (countryPos) {
					drawWorldLine2D(countryPos, '' + worldItemIndex + worldChildItemIndex);
				}
			}
		})
	})
}
// 绘制世界地图线条函数
var CreateSphereLine = function(pos, identify) {
	var posArray = [];
	pos.forEach(function(item) {
		var pointPosition = createPosition(item[0], item[1], iTopoEarthSettings.CITY_RADIUS);
		posArray.push(pointPosition);
	})
	// 绘制的线条需要关闭，第二个参数默认为false，表示不关闭
	var curve = new THREE.CatmullRomCurve3(posArray, true);
	var points = curve.getPoints(500);
	var geometry = new THREE.Geometry().setFromPoints(points);
	// 定义线条
	var line = new MeshLine();
	line.setGeometry(geometry);
	// 定义线条材质
	var material = new MeshLineMaterial({
		color: iTopoEarthSettings.earthLandBorderColor,
		lineWidth: iTopoEarthSettings.WORLD_LINE_WIDTH
	})
	// 将地图加入场景
	layerPlanet.add(new THREE.Mesh(line.geometry, material));
}

//随机生成颜色
iTopoEarthModel.RandomColor = function() {
	var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
		strHex = "0x",
		index;
	for (var i = 0; i < 6; i++) {
		index = Math.round(Math.random() * 15);
		strHex += arrHex[index];
	}
	return strHex;
}

function createPosition(lng, lat, radius) {
	let spherical = new THREE.Spherical;
	spherical.radius = radius;
	spherical.theta = (lng + 90) * (Math.PI / 180);
	spherical.phi = (90 - lat) * (Math.PI / 180);
	let position = new THREE.Vector3();
	position.setFromSpherical(spherical);
	return position;
}

// canvas画地图函数，因为性能问题，线条不再canvas中实现
var createCanvas = function(w, h, worldPos) {
	var canvas = document.createElement('canvas');
	canvas.id = "iTopoCanvas";
	canvas.width = w;
	canvas.height = h;

	var context = canvas.getContext('2d');
	var centerX = w / 2;
	var centerY = h / 2;
	var average = w / 360;
	// 绘制背景颜色
	context.fillStyle = iTopoEarthSettings.earthFrameFillColor;
	context.fillRect(0, 0, w, h);

	// canvas中绘制地图方法
	function canvasLineFun(childrenPosition) {
		context.fillStyle = iTopoEarthSettings.earthLandFillColor;
		context.moveTo(centerX + childrenPosition[0][0] * average, centerY - childrenPosition[0][1] * average);
		childrenPosition.forEach(function(posItem) {
			context.lineTo(centerX + posItem[0] * average, centerY - posItem[1] * average);
		})
		context.closePath();
		context.fill();
	}

	worldPos.forEach(function(item) {
		canvasLineFun(item);
	})

	return canvas;
}

iTopoEarthModel.createEarthAxis = function() {
	let axes = new THREE.AxesHelper(iTopoEarthSettings.CITY_RADIUS + 10);
}

function randomLightConeHeight() {
	let height = (Math.random() * (iTopoEarthSettings.COLUD_RADIUS_RATIO - 1.1) + 0.1) * iTopoEarthSettings
		.CITY_RADIUS;
	return height;
}

function downloadEarthCanvas(){
	var earthCanvas = createCanvas(2048, 1024, worldGeometry);
	//localStorage.setItem( "savedImageData", earthCanvas.toDataURL("image/png") );
	var image = earthCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href=image; // it will save locally
}
