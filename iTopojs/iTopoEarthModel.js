import * as THREE from '../../build/three.module.js';
import { TWEEN } from '../../examples/jsm/libs/tween.module.min.js';
import { BufferGeometryUtils } from '../../examples/jsm/utils/BufferGeometryUtils.js';
import * as DMCTRY from './countries.js';
import { MeshLine,MeshLineMaterial } from './THREE.MeshLine.js';
import { Editor } from '../js/Editor.js';
import { AddiTopoObjCommand } from './AddiTopoObjCommand.js';
import { iTopoEarthBuilder } from './iTopoEarthBuilder.js';
import { iTopoEarthCache } from './iTopoEarthCache.js';
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

export var iTopoEarthModel = iTopoEarthModel || {};

let layerPlanet, layerMarks, layerCloud, layerStars;

iTopoEarthModel.ReCreate = function() {

//	iTopoEarthCache.generateEarthCache();

	layerPlanet = new THREE.Object3D();
	layerCloud = new THREE.Object3D();
	layerMarks = new THREE.Object3D();
	layerStars = new THREE.Object3D();

	if (iTopoEarthSettings.GLOBAL_KIND == "Global2D") {
		//iTopoEarthModel.createEarthAxis();

		// 绘制地图
		if (iTopoEarthSettings.EARTH_STYLE == "标准地图") {
			CreateWorldPlaneMap();
		} else {
			alert("Havn't implement " + iTopoEarthSettings.EARTH_STYLE);
		}

		if (iTopoEarthSettings.MAP_KIND == "超级节点儿") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("Horizen Super Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),60));
			iTopoEarthModel.MarkZenNodesOnPlane(iTopoEarthSettings.HORIZEN_SUPERNODES_FILE);
			//iTopoEarthModel.MarkZenNodeParticleOnPlane(iTopoEarthSettings.HORIZEN_SUPERNODES_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "普通节点儿") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("Horizen Secure Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),60));
			iTopoEarthModel.MarkZenNodesOnPlane(iTopoEarthSettings.HORIZEN_SECURENODES_FILE);
			//iTopoEarthModel.MarkZenNodeParticleOnPlane(iTopoEarthModel.earthSetting.HORIZEN_SECURENODES_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "雨花斋") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("雨花斋全国分布图",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),60));
			iTopoEarthModel.MarkCanteenOnPlane(iTopoEarthSettings.CANTEEN_YUHUAZHAI_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "共创基地") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("共创基地",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),60));
			iTopoEarthModel.MarkiTopoBaseOnPlane(iTopoEarthSettings.CANTEEN_ITOPOBASE_FILE);
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

		if (iTopoEarthSettings.MAP_KIND == "超级节点儿") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("Horizen Super Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, iTopoEarthSettings.CITY_RADIUS),	60));
			iTopoEarthModel.MarkZenNodesOnSphere(iTopoEarthSettings.HORIZEN_SUPERNODES_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "普通节点儿") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("Horizen Secure Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, iTopoEarthSettings.CITY_RADIUS),	60));
			iTopoEarthModel.MarkZenNodesOnSphere(iTopoEarthSettings.HORIZEN_SECURENODES_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "雨花斋") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("雨花斋全国分布图",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),	60));
			iTopoEarthModel.MarkCanteenOnSphere(iTopoEarthSettings.CANTEEN_YUHUAZHAI_FILE);
		} else if (iTopoEarthSettings.MAP_KIND == "共创基地") {
			layerMarks.add(iTopoEarthBuilder.createModelTitle("共创基地",
				new THREE.Vector3(0, iTopoEarthSettings.CITY_RADIUS + 50, 3 * iTopoEarthSettings.zHeight),	60));
			iTopoEarthModel.MarkiTopoBaseOnSphere(iTopoEarthSettings.CANTEEN_ITOPOBASE_FILE);
		}

		layerCloud.add(iTopoEarthBuilder.createCloudGrid());

		iTopoEarthModel.createStars();

		//iTopoEarthModel.AddCountryMark();
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

iTopoEarthModel.AddCountryMark = function() {
	// 地标及光锥
	for (let i = 0, length = DMCTRY.countries.length; i < length; i++) {
		const position = createPosition(DMCTRY.countries[i].position[0], DMCTRY.countries[i].position[1], iTopoEarthSettings
			.CITY_RADIUS);
		layerMarks.add(iTopoEarthBuilder.createLightConeMark(position, randomLightConeHeight(), DMCTRY.countries[i].name)); // 地标
	}
}

iTopoEarthModel.RotateToBeijing = function(camera) {
	var lngx = 116.20;
	var latx = 39.55;
	// const starPoint = createPosition(lngx, latx, iTopoEarthSettings.CITY_RADIUS * (iTopoEarthSettings
	// 	.COLUD_RADIUS_RATIO +
	// 	Math.random()));
	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings
		.COLUD_RADIUS_RATIO);

	// var star = iTopoEarthModel.createStar(starPoint);

	// editor.execute(new AddiTopoObjCommand(editor, star));

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);
}

iTopoEarthModel.lightStars = function(objUUID,camera) {
	var plusOrMinus = Math.round(Math.random()) * 2 - 1;
	var lngx = plusOrMinus * Math.random() * 180;
	var latx = plusOrMinus * Math.random() * 90;
	const starPoint = createPosition(lngx, latx, iTopoEarthSettings.CITY_RADIUS * (iTopoEarthSettings.COLUD_RADIUS_RATIO + Math.random()));
	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO);

	var star = iTopoEarthBuilder.createStar(starPoint,objUUID);

	editor.execute(new AddiTopoObjCommand(editor, star));

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);

	iTopoEarthCache.starPositions.push(starPoint);
}

iTopoEarthModel.lightEarth = function(objUUID,camera) {
	var plusOrMinus = Math.round(Math.random()) * 2 - 1;
	var lngx = plusOrMinus * Math.random() * 180;
	var latx = plusOrMinus * Math.random() * 90;
	var lnglatx = [plusOrMinus * Math.random() * 180, plusOrMinus * Math.random() * 90];
	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO);

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);

	var lightConeHeight = randomLightConeHeight();
	const position = createPosition(lngx, latx, iTopoEarthSettings.CITY_RADIUS);
	//iTopoEarthCache.generateEarthCache();
	var lightCone = iTopoEarthBuilder.createLightConeMark(position, lightConeHeight, objUUID); // 地标
	editor.execute(new AddiTopoObjCommand(editor, lightCone));
}

function tweenComplete(factorOrbit, ball, matrix) {
	var stepCount = factorOrbit.vertices.length-1;
	var tween = new TWEEN.Tween({step:0})
		.to({step:stepCount}, 10000)
		.easing(TWEEN.Easing.Linear.None)
//		.delay(1000)
		.onUpdate(function(index) {
//			console.log(index);
			var pos = factorOrbit.vertices[Math.round(index.step)].clone();
			pos = pos.applyMatrix4(matrix);
			ball.position.copy(pos);
		})
		.onComplete(function() {
			tweenComplete(factorOrbit, ball, matrix);
		})
		.start();
}

iTopoEarthModel.ParticlesMove = function(camera2Pos, camera) {
	let endP = {
		x: camera.position.x,
		y: camera.position.y,
		z: camera.position.z,
	}
	var tween = new TWEEN.Tween(endP);
	tween.to({
		x: camera2Pos.x,
		y: camera2Pos.y,
		z: camera2Pos.z,
	}, 1200);

	function onUpdate(object) {
		let aniCamera = new THREE.Vector3(object.x, object.y, object.z);
		camera.position.copy(aniCamera);
		camera.lookAt(0, 0, 0);
	}

	function onComplete(object) {
		camera.position.copy(camera2Pos);
	}

	tween.onUpdate(onUpdate);
	tween.onComplete(onComplete);
	tween.easing(TWEEN.Easing.Circular.InOut);

	tween.start();
}

iTopoEarthModel.createStars = function() {
	let uniforms = {
		texture: {
			value: new THREE.TextureLoader().load(iTopoEarthSettings.DOT_PNG_PATH)
		}
	};

	var starShaderMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: `attribute float size;
        varying vec3 vColor;
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = size * ( 300.0 / -mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;

        }`,
		fragmentShader: `uniform sampler2D texture;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4( vColor, 1.0 );
            gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

        }`,

		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true

	});

	var radius = iTopoEarthSettings.CITY_RADIUS * 2;
	var geometry = new THREE.BufferGeometry();

	var positions = [];
	var colors = [];
	var sizes = [];

	var color = new THREE.Color();
	for (var i = 0; i < iTopoEarthCache.starPositions.length; i++) {
		positions.push(iTopoEarthCache.starPositions[i].x);
		positions.push(iTopoEarthCache.starPositions[i].y);
		positions.push(iTopoEarthCache.starPositions[i].z);

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

// canvas实现文字函数
var getCanvasFont = function(w, h, textValue, fontColor) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	//ctx.fillStyle = iTopoEarthSettings.markingBackground;
	//ctx.fillRect(0, 0, w, h);
	ctx.font = h + "px '微软雅黑'";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = fontColor;
	ctx.fillText(textValue, w / 2, h / 2);
	document.body.append(canvas)
	return canvas;
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

			var sphereMesh = new THREE.Mesh(iTopoEarthCache.earthBufferSphere,
				new THREE.MeshBasicMaterial({
					map: new THREE.CanvasTexture(createCanvas(2048, 1024, worldGeometry)),
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
 iTopoEarthModel.RandomColor = function(){
	var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
		strHex = "0x",
		index;
	for (var i = 0; i < 6; i++) {
		index = Math.round(Math.random() * 15);
		strHex += arrHex[index];
	}
	return strHex;
}

iTopoEarthModel.MarkiTopoBaseOnPlane = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();

			const geometries = [];
			var markedNames = [];
			const originHelper = new THREE.Object3D();
			for (var i = 0; i < json.length; i++) {
				var option = {
					"textValue": json[i].title,
					"fontColor": iTopoEarthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lng, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight + iTopoEarthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthSettings.circularRadio,
						0, iTopoEarthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight / 2 + iTopoEarthSettings
						.zHeight);
					originHelper.rotation.x = 1.5;
					originHelper.updateWorldMatrix(true, false);
					cylinder.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts2 = cylinder.getAttribute('position').count;
					const itemSize2 = 3; // r, g, b
					const colors2 = new Uint8Array(itemSize2 * numVerts2);

					// copy the color into the colors array for each vertex
					colors2.forEach((v, ndx) => {
						colors2[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized2 = true;
					const colorAttrib2 = new THREE.BufferAttribute(colors2, itemSize2, normalized2);
					cylinder.setAttribute('color', colorAttrib2);

					geometries.push(cylinder);
				}

				let textMarked = false;

				markedNames.forEach((mn) => {
					if (mn === json[i].city)
						textMarked = true;
				})

				if (!textMarked) {

					markedNames.push(json[i].title);

					// 添加文字说明
					let textLength = option.textValue.length;
					let texture = new THREE.CanvasTexture(getCanvasFont(textLength * option.fontSize * average,
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

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
			//layerMarks.add(mesh);
			editor.execute(new AddiTopoObjCommand(editor, mesh));
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkCanteenOnPlane = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();

			const geometries = [];
			var markedNames = [];
			const originHelper = new THREE.Object3D();
			for (var i = 0; i < json.length; i++) {
				var option = {
					"textValue": json[i].title,
					"fontColor": iTopoEarthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lng, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight + iTopoEarthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthSettings.circularRadio,
						0, iTopoEarthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight / 2 + iTopoEarthSettings
						.zHeight);
					originHelper.rotation.x = 1.5;
					originHelper.updateWorldMatrix(true, false);
					cylinder.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts2 = cylinder.getAttribute('position').count;
					const itemSize2 = 3; // r, g, b
					const colors2 = new Uint8Array(itemSize2 * numVerts2);

					// copy the color into the colors array for each vertex
					colors2.forEach((v, ndx) => {
						colors2[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized2 = true;
					const colorAttrib2 = new THREE.BufferAttribute(colors2, itemSize2, normalized2);
					cylinder.setAttribute('color', colorAttrib2);

					geometries.push(cylinder);
				}

				let textMarked = false;

				markedNames.forEach((mn) => {
					if (mn === json[i].title)
						textMarked = true;
				})

				if (!textMarked) {

					markedNames.push(json[i].title);

					// 添加文字说明
					let textLength = option.textValue.length;
					let texture = new THREE.CanvasTexture(getCanvasFont(textLength * option.fontSize * average,
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

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
				geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
			layerMarks.add(mesh);
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkZenNodesOnPlane = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			var average = getAverage();

			const geometries = [];
			var markedNames = [];
			const originHelper = new THREE.Object3D();
			for (var i = 0; i < json.length; i++) {
				var option = {
					"textValue": json[i].city,
					"fontColor": iTopoEarthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lon, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight + iTopoEarthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthSettings.circularRadio,
						0, iTopoEarthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthSettings.circularHeight / 2 + iTopoEarthSettings
						.zHeight);
					originHelper.rotation.x = 1.5;
					originHelper.updateWorldMatrix(true, false);
					cylinder.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts2 = cylinder.getAttribute('position').count;
					const itemSize2 = 3; // r, g, b
					const colors2 = new Uint8Array(itemSize2 * numVerts2);

					// copy the color into the colors array for each vertex
					colors2.forEach((v, ndx) => {
						colors2[ndx] = iTopoEarthSettings.markingSymbolColor;
					});

					const normalized2 = true;
					const colorAttrib2 = new THREE.BufferAttribute(colors2, itemSize2, normalized2);
					cylinder.setAttribute('color', colorAttrib2);

					geometries.push(cylinder);
				}

				let textMarked = false;

				markedNames.forEach((mn) => {
					if (mn === json[i].city)
						textMarked = true;
				})

				if (!textMarked) {

					markedNames.push(json[i].city);

					// 添加文字说明
					let textLength = option.textValue.length;
					let texture = new THREE.CanvasTexture(getCanvasFont(textLength * option.fontSize * average,
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

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
				geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, iTopoEarthCache.markingSymbolMaterial);
			layerMarks.add(mesh);
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkiTopoBaseOnSphere = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			for (var i = 0; i < json.length; i++) {
				const position = createPosition(json[i].lng, json[i].lat, iTopoEarthSettings.CITY_RADIUS);
				// 地标
				var lightCone = iTopoEarthBuilder.createLightConeMark(position, randomLightConeHeight(), json[i].uuid);
				editor.execute(new AddiTopoObjCommand(editor,lightCone ));
				//layerMarks.add();
			}
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkCanteenOnSphere = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			for (var i = 0; i < json.length; i++) {
				const position = createPosition(json[i].lng, json[i].lat, iTopoEarthSettings.CITY_RADIUS);

				layerMarks.add(iTopoEarthBuilder.createLightConeMark(position, randomLightConeHeight(), json[i].city + ", " + json[i].country)); // 地标
			}
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
	})
}

iTopoEarthModel.MarkZenNodesOnSphere = function(url) {
	fetch(url, {
		method: 'GET',
		mode: 'cors', // 允许发送跨域请求
		credentials: 'include'
	}).then(function(response) {
		//打印返回的json数据
		response.json().then(function(json) {
			for (var i = 0; i < json.length; i++) {
				const position = createPosition(json[i].lon, json[i].lat, iTopoEarthSettings.CITY_RADIUS);
				layerMarks.add(iTopoEarthBuilder.createLightConeMark(position, randomLightConeHeight(), json[i].city + ", " + json[i].country)); // 地标
			}
		})
	}).catch(function(e) {
		console.log('error: ' + e.toString());
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
					"fontSize": 14,
					"pos": [json[i].lon, json[i].lat]
				}

				let cityX = option.pos[0] * average / iTopoEarthSettings.mapScaleSize;
				let cityY = option.pos[1] * average / iTopoEarthSettings.mapScaleSize;

				var particle = new THREE.Vector3(cityX, cityY, iTopoEarthSettings.zHeight + 1);
				geom.vertices.push(particle);
				var color = new THREE.Color(+ iTopoEarthModel.RandomColor());
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
					let texture = new THREE.CanvasTexture(getCanvasFont(textLength * option.fontSize * average,
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


// 绘制多行文本
function createMultiText(multiText, position, lineH, lineW) {
	let canvas = document.createElement("canvas");
	canvas.setAttribute("width", lineW);
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ffff00";
	ctx.font = "Bold " + lineH + "px Arial";
	console.log(ctx.font);
	ctx.lineWidth = 4;
	ctx.textBaseline = "top";

	console.log(lineW);

	let x = 0,
		y = 0,
		splitIndex = 1,
		lineIndex = 0;
	while (multiText != '') {
		while ((splitIndex <= multiText.length) && (ctx.measureText(multiText.substr(0, splitIndex)).width < lineW)) {
			splitIndex++;
		}
		//最后一行 不用换行
		if (splitIndex - 1 == multiText.length) {
			ctx.fillText(multiText, x, y + lineIndex * lineH);
			multiText = ''
		} else {
			//非最后一行
			ctx.fillText(multiText.substr(0, splitIndex - 1), x, y + lineIndex * lineH);
			multiText = multiText.slice(splitIndex - 1)
		}
		lineIndex++;
		splitIndex = 1;
	}

	let texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	//使用Sprite显示文字
	let material = new THREE.SpriteMaterial({
		map: texture
	});
	let textObj = new THREE.Sprite(material);
	textObj.scale.set(200, 200 * canvas.height / canvas.width, 1);
	textObj.position.copy(position);
	return textObj;
}

/* 创建字体精灵 */
function makeTextSprite(message, parameters) {

	if (parameters === undefined) parameters = {};

	/* 字体 */
	let fontface = parameters.hasOwnProperty("fontface") ?
		parameters["fontface"] : "Arial";

	/* 字体大小 */
	let fontsize = parameters.hasOwnProperty("fontsize") ?
		parameters["fontsize"] : 10;

	/* 边框厚度 */
	let borderThickness = parameters.hasOwnProperty("borderThickness") ?
		parameters["borderThickness"] : 4;

	/* 边框颜色 */
	let borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0
		};

	/* 背景颜色 */
	let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : {
			r: 255,
			g: 255,
			b: 255,
			a: 1.0
		};

	/* 创建画布 */
	let canvas = document.createElement('canvas');
	let context = canvas.getContext('2d');

	/* 字体加粗 */
	context.font = "Bold " + fontsize + "px " + fontface;

	/* 获取文字的大小数据，高度取决于文字的大小 */
	let metrics = context.measureText(message);
	let textWidth = metrics.width;
	console.log('文字metrics::', metrics);

	/* 背景颜色 */
	context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," +
		backgroundColor.b + "," + backgroundColor.a + ")";

	/* 边框的颜色 */
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," +
		borderColor.b + "," + borderColor.a + ")";
	context.lineWidth = borderThickness;

	/* 绘制圆角矩形 */
	roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 +
		borderThickness, 30);

	/* 字体颜色 */
	context.fillStyle = "rgba(0, 0, 0, 1.0)";
	context.fillText(message, borderThickness, fontsize + borderThickness, textWidth);

	/* 画布内容用于纹理贴图 */
	let texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	let spriteMaterial = new THREE.SpriteMaterial({
		map: texture
	});
	let sprite = new THREE.Sprite(spriteMaterial);

	console.log(spriteMaterial);
	console.log(canvas.width);

	/* 缩放比例 */
	sprite.scale.set(10, 5, 1);

	return sprite;
}

/**
 * @method 绘制圆角矩形
 * @param {*} ctx canvas画布
 * @param {*} x x位置
 * @param {*} y y位置
 * @param {*} w 宽
 * @param {*} h 高
 * @param {*} r 圆角的半径
 */
function roundRect(ctx, x, y, w, h, r) {

	ctx.beginPath();
	// 起始点（左上圆角处的直线位置）
	ctx.moveTo(x + r, y);
	// 矩形上宽线条（突出来一点）
	ctx.lineTo(x + w * 1.5 - r, y);
	// 绘制左上圆角（二次贝塞尔曲线）
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	// 右高线条
	ctx.lineTo(x + w, y + h - r);
	// 右下圆角
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	// 左下线条
	ctx.lineTo(x + r, y + h);
	// 左下圆角
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	// 左高线条
	ctx.lineTo(x, y + r);
	// 左上圆角
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

iTopoEarthModel.createEarthAxis = function() {
	let axes = new THREE.AxesHelper(iTopoEarthSettings.CITY_RADIUS + 10);
}

function randomLightConeHeight() {
	let height = (Math.random() * (iTopoEarthSettings.COLUD_RADIUS_RATIO - 1.1) + 0.1) * iTopoEarthSettings
		.CITY_RADIUS;
	return height;
}
