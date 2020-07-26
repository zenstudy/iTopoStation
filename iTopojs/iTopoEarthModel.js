import * as THREE from '../../build/three.module.js';
import { TWEEN } from '../../examples/jsm/libs/tween.module.min.js';
import { BufferGeometryUtils } from '../../examples/jsm/utils/BufferGeometryUtils.js';
import * as DMCTRY from './countries.js';
import { MeshLine,	MeshLineMaterial } from './THREE.MeshLine.js';
import { Editor } from '../js/Editor.js';
import { AddiTopoObjCommand } from './AddiTopoObjCommand.js';

var PLANETSTATUS = {
	STOP: 0,
	ROTATE: 1,
	properties: {
		1: {
			name: "stop",
			value: 0,
			code: "S"
		},
		2: {
			name: "rotate",
			value: 1,
			code: "R"
		},
	}
};

var earthRotateStatus = PLANETSTATUS.ROTATE;
export var iTopoEarthModel = iTopoEarthModel || {};

let earthCache, layerPlanet, layerMarks, layerCloud, layerStars;

iTopoEarthModel.earthSettings = {
	GLOBAL_KIND: "Global3D",
	MAP_KIND: "", //{超级节点儿,普通节点儿}
	CITY_RADIUS: 180,
	CITY_MARGIN: 0.1,
	BLINT_SPEED: 0.1,
	HEXAGON_RADIUS: 1,
	EARTH_ROTATE_SPEED: 0.001,
	COLUD_RADIUS_RATIO: 1.382,

	EARTH_STYLE: "标准地图", //'粒子地壳'/线框地壳;

	EARTH_IMG_BLACKANDWIHTE: "./iTopojs/img/earth.jpg",
	EARTH_IMG_BLUE: "./iTopojs/img/earth_atmos_4096.jpg",
	coludImg: "./iTopojs/img/clouds.jpg",
	DOT_PNG_PATH: "./iTopojs/img/dot.png",
	LAND_MARK_LIGHTRAY_JPG: "./iTopojs/img/lightray.jpg",
	LAND_MARK_LIGHTRAYYELLOW_JPG: "./iTopojs/img/lightray_yellow.jpg",
	LAND_MARK_01: "./iTopojs/img/LAND_MARK_01.jpg",

	WORLD_JSON_FILE: "./iTopojs/json/world.json",
	HORIZEN_SUPERNODES_FILE: "./iTopojs/json/ZenSuperNodes.json",
	HORIZEN_SECURENODES_FILE: "./iTopojs/json/ZenSecureNodes.json",

	CANTEEN_YUHUAZHAI_FILE:"./iTopojs/json/iTopoCanteen.json",
	CANTEEN_ITOPOBASE_FILE:"./iTopojs/json/iTopobase.json",

	WORLD_LINE_WIDTH: 0.81,
	// 地图z轴厚度
	zHeight: 10,
	// 标记圆锥体高度
	circularHeight: 6,
	// 圆锥体和球体直径
	circularRadio: 2,
	// 地图缩放比例
	mapScaleSize: 2.2,

	mapTitleColor: "#0867ff",
	BACKGROUND_COLOR: '#86c9c9',

	earthFrameFillColor: '#0e2a42',
	// 地图大陆区块颜色,地图正面颜色
	earthLandFillColor: '#aaffff',
	// 地图线条颜色,拉伸时地图侧边颜色
	earthLandBorderColor: '#0e2a42',
	// 标记颜色
	markingTextColor: '#44efe4',
	markingSymbolColor: '#004cff'
}

iTopoEarthModel.generateEarthCache = function() {

	let hexagonLine = new THREE.CircleGeometry(iTopoEarthModel.earthSettings.HEXAGON_RADIUS, 6);
	hexagonLine.vertices.shift(); // 第一个节点是中心点

	earthCache = {
		earthBufferSphere: new THREE.SphereBufferGeometry(iTopoEarthModel.earthSettings.CITY_RADIUS, 50, 50),
		earthBufferCloud: new THREE.SphereBufferGeometry(iTopoEarthModel.earthSettings.COLUD_RADIUS_RATIO * iTopoEarthModel
			.earthSettings.CITY_RADIUS, 66,
			44),

		mapExtrudeOptions: {
			depth: iTopoEarthModel.earthSettings.zHeight, // 定义图形拉伸的深度，默认100
			steps: 0, // 拉伸面方向分为多少级，默认为1
			bevelEnabled: true, // 表示是否有斜角，默认为true
			bevelThickness: 0, // 斜角的深度，默认为6
			bevelSize: 0, // 表示斜角的高度，高度会叠加到正常高度
			bebelSegments: 0, // 斜角的分段数，分段数越高越平滑，默认为1
			curveSegments: 0 // 拉伸体沿深度方向分为多少段，默认为1
		},

		dotTexture: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.DOT_PNG_PATH),

		// 定义线条材质
		worldMapMaterial: new MeshLineMaterial({
			color: iTopoEarthModel.earthSettings.earthLandBorderColor,
			lineWidth: iTopoEarthModel.earthSettings.WORLD_LINE_WIDTH
		}),

		markBorderMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthModel.earthSettings.markingSymbolColor,
			side: THREE.DoubleSide
		}),

		markingSymbolMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthModel.earthSettings.markingSymbolColor,
			side: THREE.DoubleSide
		}),

		markAreaMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthModel.earthSettings.markingSymbolColor,
			side: THREE.DoubleSide,
			opacity: 0.5
		}),

		markLightMaterial: [new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.LAND_MARK_LIGHTRAY_JPG),
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending
		}), new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.LAND_MARK_LIGHTRAYYELLOW_JPG),
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending
		})],

		circleLineGeom: new THREE.Geometry(),
		hexagonPlane: new THREE.CircleGeometry(iTopoEarthModel.earthSettings.HEXAGON_RADIUS - iTopoEarthModel.earthSettings
			.CITY_MARGIN, 6),

		starPositions: []
	}

	earthCache.circleLineGeom.vertices = hexagonLine.vertices;
}

iTopoEarthModel.ReCreate = function() {
	// let localiTopoEarthModel.earthSettings = JSON.parse(localStorage.getItem("iTopoEarthModel.earthSettings"));
	// if (localiTopoEarthModel.earthSettings != null)
	// 	iTopoEarthModel.earthSettings = localiTopoEarthModel.earthSettings;

	iTopoEarthModel.generateEarthCache();
	layerPlanet = new THREE.Object3D();
	layerCloud = new THREE.Object3D();
	layerMarks = new THREE.Object3D();
	layerStars = new THREE.Object3D();

	if (iTopoEarthModel.earthSettings.GLOBAL_KIND == "Global2D") {
		//iTopoEarthModel.createEarthAxis();

		// 绘制地图
		if (iTopoEarthModel.earthSettings.EARTH_STYLE == "标准地图") {
			CreateWorldPlaneMap();
		} else {
			alert("Havn't implement " + iTopoEarthModel.earthSettings.EARTH_STYLE);
		}

		if (iTopoEarthModel.earthSettings.MAP_KIND == "超级节点儿") {
			layerMarks.add(createModelTitle("Horizen Super Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkZenNodesOnPlane(iTopoEarthModel.earthSettings.HORIZEN_SUPERNODES_FILE);
			//iTopoEarthModel.MarkZenNodeParticleOnPlane(iTopoEarthModel.earthSettings.HORIZEN_SUPERNODES_FILE);
		} else if (iTopoEarthModel.earthSettings.MAP_KIND == "普通节点儿") {
			layerMarks.add(createModelTitle("Horizen Secure Nodes Distribution Map",
			 	new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkZenNodesOnPlane(iTopoEarthModel.earthSettings.HORIZEN_SECURENODES_FILE);
			//iTopoEarthModel.MarkZenNodeParticleOnPlane(iTopoEarthModel.earthSetting.HORIZEN_SECURENODES_FILE);
		} else if (iTopoEarthModel.earthSettings.MAP_KIND == "雨花斋") {
			layerMarks.add(createModelTitle("雨花斋全国分布图",
			 	new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkCanteenOnPlane(iTopoEarthModel.earthSettings.CANTEEN_YUHUAZHAI_FILE);
		}else if (iTopoEarthModel.earthSettings.MAP_KIND == "共创基地") {
			layerMarks.add(createModelTitle("松果家园位置",
			 	new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkiTopoBaseOnPlane(iTopoEarthModel.earthSettings.CANTEEN_ITOPOBASE_FILE);
		}

	} else if (iTopoEarthModel.earthSettings.GLOBAL_KIND == "Global3D") {
		// 绘制地图
		if (iTopoEarthModel.earthSettings.EARTH_STYLE == '标准地图') {
			CreateWorldSphereMap();
		} else if (iTopoEarthModel.earthSettings.EARTH_STYLE == '粒子地壳') {
			iTopoEarthModel.createEarthParticles();
		} else if (iTopoEarthModel.earthSettings.EARTH_STYLE == '彩色地壳') {
			iTopoEarthModel.createEarthWithColorPicture();
		} else if (iTopoEarthModel.earthSettings.EARTH_STYLE == '线框地壳') {
			iTopoEarthModel.createEarthWithWireFrameStyle();
		} else {
			alert("Havn't implement " + iTopoEarthModel.earthSettings.EARTH_STYLE);
		}

		if (iTopoEarthModel.earthSettings.MAP_KIND == "超级节点儿") {
			layerMarks.add(createModelTitle("Horizen Super Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, iTopoEarthModel.earthSettings.CITY_RADIUS), 60));
			iTopoEarthModel.MarkZenNodesOnSphere(iTopoEarthModel.earthSettings.HORIZEN_SUPERNODES_FILE);
		} else if (iTopoEarthModel.earthSettings.MAP_KIND == "普通节点儿") {
			layerMarks.add(createModelTitle("Horizen Secure Nodes Distribution Map",
				new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, iTopoEarthModel.earthSettings.CITY_RADIUS), 60));
			iTopoEarthModel.MarkZenNodesOnSphere(iTopoEarthModel.earthSettings.HORIZEN_SECURENODES_FILE);
		}else if (iTopoEarthModel.earthSettings.MAP_KIND == "雨花斋") {
			layerMarks.add(createModelTitle("雨花斋全国分布图",
			 	new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkCanteenOnSphere(iTopoEarthModel.earthSettings.CANTEEN_YUHUAZHAI_FILE);
		}else if (iTopoEarthModel.earthSettings.MAP_KIND == "共创基地") {
			layerMarks.add(createModelTitle("松果家园位置",
			 	new THREE.Vector3(0, iTopoEarthModel.earthSettings.CITY_RADIUS + 50, 3*iTopoEarthModel.earthSettings.zHeight), 60));
			iTopoEarthModel.MarkiTopoBaseOnSphere(iTopoEarthModel.earthSettings.CANTEEN_ITOPOBASE_FILE);
		}

		iTopoEarthModel.createCloudGrid();

		iTopoEarthModel.createStars();

//		iTopoEarthModel.AddCountryMark();
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

iTopoEarthModel.lightStars = function(camera) {
	var plusOrMinus = Math.round(Math.random()) * 2 - 1;
	var lngx = plusOrMinus * Math.random() * 180;
	var latx = plusOrMinus * Math.random() * 90;
	const starPoint = createPosition(lngx, latx, iTopoEarthModel.earthSettings.CITY_RADIUS * (iTopoEarthModel.earthSettings.COLUD_RADIUS_RATIO +
		Math.random()));
	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthModel.earthSettings.CITY_RADIUS * iTopoEarthModel.earthSettings
		.COLUD_RADIUS_RATIO);

	var star = iTopoEarthModel.createStar(starPoint);

	editor.execute(new AddiTopoObjCommand(editor, star));

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);

	earthCache.starPositions.push(starPoint);
}

iTopoEarthModel.lightEarth = function(camera) {
	var plusOrMinus = Math.round(Math.random()) * 2 - 1;
	var lngx = plusOrMinus * Math.random() * 180;
	var latx = plusOrMinus * Math.random() * 90;
	var lnglatx = [plusOrMinus * Math.random() * 180, plusOrMinus * Math.random() * 90];
	const seeFrom = createPosition(lngx, latx, 2 * iTopoEarthModel.earthSettings.CITY_RADIUS * iTopoEarthModel.earthSettings
		.COLUD_RADIUS_RATIO);

	const position = createPosition(lngx, latx, iTopoEarthModel.earthSettings.CITY_RADIUS);
	var  lightCone = createLightConeMark(position, "myiTopoLight"); // 地标
	editor.execute(new AddiTopoObjCommand(editor, lightCone));

	iTopoEarthModel.ParticlesMove(seeFrom, camera);
	camera.position.copy(seeFrom);
	camera.lookAt(0, 0, 0);
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
//https://blog.csdn.net/weixin_39452320/article/details/87207684
iTopoEarthModel.createStar = function(starPoint) {
	let uniforms = {
		texture: {
			value: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.DOT_PNG_PATH)
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

	var starGeo = new THREE.SphereBufferGeometry(6, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, earthCache.starShaderMaterial);
	starMesh.position.copy(starPoint);
	return starMesh;
}
iTopoEarthModel.createStars = function() {
	let uniforms = {
		texture: {
			value: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.DOT_PNG_PATH)
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

	var radius = iTopoEarthModel.earthSettings.CITY_RADIUS * 2;
	var geometry = new THREE.BufferGeometry();

	var positions = [];
	var colors = [];
	var sizes = [];

	var color = new THREE.Color();
	for (var i = 0; i < earthCache.starPositions.length; i++) {
		positions.push(earthCache.starPositions[i].x);
		positions.push(earthCache.starPositions[i].y);
		positions.push(earthCache.starPositions[i].z);

		// 随机设置粒子的颜色
		color.setHSL(i / earthCache.starPositions.length, 1.0, 0.5);
		colors.push(color.r, color.g, color.b);

		sizes.push(18);
	}

	geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setDynamic(true));

	console.log(positions);

	var layerStarParticles = new THREE.Points(geometry, earthCache.starShaderMaterial);

	return layerStarParticles;
}

// canvas实现文字函数
var getCanvasFont = function(w, h, textValue, fontColor) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	//ctx.fillStyle = iTopoEarthModel.earthSettings.markingBackground;
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
	shapeObj.moveTo(pos[0][0] * average / iTopoEarthModel.earthSettings.mapScaleSize, pos[0][1] * average /
		iTopoEarthModel.earthSettings.mapScaleSize);

	pos.forEach(function(item) {
		shapeObj.lineTo(item[0] * average / iTopoEarthModel.earthSettings.mapScaleSize, item[1] * average /
			iTopoEarthModel.earthSettings.mapScaleSize);
	})

	var geometry = new THREE.ExtrudeGeometry(shapeObj, earthCache.mapExtrudeOptions);
	var material1 = new THREE.MeshBasicMaterial({
		color: iTopoEarthModel.earthSettings.earthLandFillColor
	});
	var material2 = new THREE.MeshBasicMaterial({
		color: iTopoEarthModel.earthSettings.earthLandBorderColor
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
		var v = new THREE.Vector3(item[0] * average / iTopoEarthModel.earthSettings.mapScaleSize,
			item[1] * average / iTopoEarthModel.earthSettings.mapScaleSize, iTopoEarthModel.earthSettings.zHeight);
		geometry.vertices.push(v);
	})
	// 定义线条
	let line = new MeshLine();
	line.setGeometry(geometry);

	// 绘制地图
	layerPlanet.add(new THREE.Mesh(line.geometry, earthCache.worldMapMaterial));
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
	fetch(iTopoEarthModel.earthSettings.WORLD_JSON_FILE, {
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
	fetch(iTopoEarthModel.earthSettings.WORLD_JSON_FILE, {
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

			var sphereMesh = new THREE.Mesh(earthCache.earthBufferSphere,
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
		var pointPosition = createPosition(item[0], item[1], iTopoEarthModel.earthSettings.CITY_RADIUS);
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
		color: iTopoEarthModel.earthSettings.earthLandBorderColor,
		lineWidth: iTopoEarthModel.earthSettings.WORLD_LINE_WIDTH
	})
	// 将地图加入场景
	layerPlanet.add(new THREE.Mesh(line.geometry, material));
}

//随机生成颜色
function randomColor() {
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
					"textValue": json[i].city,
					"fontColor": iTopoEarthModel.earthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lng, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthModel.earthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthModel.earthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthModel.earthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight + iTopoEarthModel.earthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthModel.earthSettings.circularRadio,
						0, iTopoEarthModel.earthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight / 2 + iTopoEarthModel.earthSettings
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
						colors2[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
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
					fontMesh.position.set(cityX, cityY, iTopoEarthModel.earthSettings.zHeight + iTopoEarthModel.earthSettings.circularHeight +
						iTopoEarthModel.earthSettings
						.circularRadio + option.fontSize / average + 0.5); // 定义提示文字显示位置

					layerMarks.add(fontMesh);
				}

			}

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
				geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, earthCache.markingSymbolMaterial);
			layerMarks.add(mesh);
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
					"textValue": json[i].city,
					"fontColor": iTopoEarthModel.earthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lon, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthModel.earthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthModel.earthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthModel.earthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight + iTopoEarthModel.earthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthModel.earthSettings.circularRadio,
						0, iTopoEarthModel.earthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight / 2 + iTopoEarthModel.earthSettings
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
						colors2[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
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
					fontMesh.position.set(cityX, cityY, iTopoEarthModel.earthSettings.zHeight + iTopoEarthModel.earthSettings.circularHeight +
						iTopoEarthModel.earthSettings
						.circularRadio + option.fontSize / average + 0.5); // 定义提示文字显示位置

					layerMarks.add(fontMesh);
				}

			}

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
				geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, earthCache.markingSymbolMaterial);
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
					"fontColor": iTopoEarthModel.earthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lon, json[i].lat]
				}

				{
					// 球体
					let ball = new THREE.SphereBufferGeometry(iTopoEarthModel.earthSettings.circularRadio);

					var cityX = option.pos[0] * average / iTopoEarthModel.earthSettings.mapScaleSize;
					var cityY = option.pos[1] * average / iTopoEarthModel.earthSettings.mapScaleSize;

					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight + iTopoEarthModel.earthSettings
						.zHeight);
					originHelper.updateWorldMatrix(true, false);
					ball.applyMatrix4(originHelper.matrixWorld);

					// make an array to store colors for each vertex
					const numVerts = ball.getAttribute('position').count;
					const itemSize = 3; // r, g, b
					const colors = new Uint8Array(itemSize * numVerts);

					// copy the color into the colors array for each vertex
					colors.forEach((v, ndx) => {
						colors[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
					});

					const normalized = true;
					const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
					ball.setAttribute('color', colorAttrib);

					geometries.push(ball);
				}

				{
					// 圆锥体
					let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthModel.earthSettings.circularRadio,
						0, iTopoEarthModel.earthSettings.circularHeight);
					originHelper.position.set(cityX, cityY, iTopoEarthModel.earthSettings.circularHeight / 2 + iTopoEarthModel.earthSettings
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
						colors2[ndx] = iTopoEarthModel.earthSettings.markingSymbolColor;
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
					fontMesh.position.set(cityX, cityY, iTopoEarthModel.earthSettings.zHeight + iTopoEarthModel.earthSettings.circularHeight +
						iTopoEarthModel.earthSettings
						.circularRadio + option.fontSize / average + 0.5); // 定义提示文字显示位置

					layerMarks.add(fontMesh);
				}

			}

			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
				geometries, false);
			const mesh = new THREE.Mesh(mergedGeometry, earthCache.markingSymbolMaterial);
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
				const position = createPosition(json[i].lng, json[i].lat, iTopoEarthModel.earthSettings.CITY_RADIUS);

				layerMarks.add(createLightConeMark(position, json[i].city + ", " + json[i].country)); // 地标
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
				const position = createPosition(json[i].lng, json[i].lat, iTopoEarthModel.earthSettings.CITY_RADIUS);

				layerMarks.add(createLightConeMark(position, json[i].city + ", " + json[i].country)); // 地标
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
				const position = createPosition(json[i].lon, json[i].lat, iTopoEarthModel.earthSettings.CITY_RADIUS);

				layerMarks.add(createLightConeMark(position, json[i].city + ", " + json[i].country)); // 地标
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
				map: new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.LAND_MARK_01),
				side: THREE.FrontSide,
				depthWrite: false,
				speed_: iTopoEarthModel.earthSettings.BLINT_SPEED
			});

			let average = getAverage();
			var markedNames = [];
			for (var i = 0; i < json.length; i++) {

				var option = {
					"textValue": json[i].city,
					"fontColor": iTopoEarthModel.earthSettings.markingTextColor,
					"fontSize": 14,
					"pos": [json[i].lon, json[i].lat]
				}

				let cityX = option.pos[0] * average / iTopoEarthModel.earthSettings.mapScaleSize;
				let cityY = option.pos[1] * average / iTopoEarthModel.earthSettings.mapScaleSize;

				var particle = new THREE.Vector3(cityX, cityY, iTopoEarthModel.earthSettings.zHeight + 1);
				geom.vertices.push(particle);
				var color = new THREE.Color(+randomColor());
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
					fontMesh.position.set(cityX, cityY, iTopoEarthModel.earthSettings.zHeight + iTopoEarthModel.earthSettings.circularHeight +
						iTopoEarthModel.earthSettings
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
	context.fillStyle = iTopoEarthModel.earthSettings.earthFrameFillColor;
	context.fillRect(0, 0, w, h);

	// canvas中绘制地图方法
	function canvasLineFun(childrenPosition) {
		context.fillStyle = iTopoEarthModel.earthSettings.earthLandFillColor;
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

//lineH=单行文字行高
function createModelTitle(modelTitle, position, titleH) {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	//ctx.fillStyle = "#ffff00";
	ctx.font = "Bold " + titleH + "px Arial";
	ctx.lineWidth = 4;
	ctx.textBaseline = "top";
	/* 获取文字的大小数据，高度取决于文字的大小 */
	let metrics = ctx.measureText(modelTitle);

	//重置画布
	canvas.setAttribute("height", titleH);
	canvas.setAttribute("width", metrics.width + 10);

	ctx = canvas.getContext("2d");
	ctx.fillStyle = iTopoEarthModel.earthSettings.mapTitleColor;
	ctx.font = "Bold " + titleH + "px Arial";
	ctx.lineWidth = 4;
	ctx.textBaseline = "top";

	let lineW = canvas.width;

	let x = 0,
		y = 0,
		splitIndex = 1,
		lineIndex = 0;
	while (modelTitle != '') {
		while ((splitIndex <= modelTitle.length) && (ctx.measureText(modelTitle.substr(0, splitIndex)).width < lineW)) {
			splitIndex++;
		}
		//最后一行 不用换行
		if (splitIndex - 1 == modelTitle.length) {
			ctx.fillText(modelTitle, x, y + lineIndex * titleH);
			modelTitle = ''
		} else {
			//非最后一行
			ctx.fillText(modelTitle.substr(0, splitIndex - 1), x, y + lineIndex * titleH);
			modelTitle = modelTitle.slice(splitIndex - 1)
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

iTopoEarthModel.createEarthWithWireFrameStyle = function() {
	// 球面
	let sphereMat = new THREE.MeshBasicMaterial({
		color: iTopoEarthModel.earthSettings.earthFrameFillColor,
		side: THREE.FrontSide,
		wireframe: true
	});

	let sphere = new THREE.Mesh(earthCache.earthBufferSphere, sphereMat);
	layerPlanet.add(sphere);
}

iTopoEarthModel.createEarthWithColorPicture = function() {
	var earthPic = new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.EARTH_IMG_BLUE);
	var sphereMesh = new THREE.Mesh(earthCache.earthBufferSphere, new THREE.MeshBasicMaterial({
		// map: new THREE.CanvasTexture(createCanvas(2048, 1024, worldGeometry)),
		map: earthPic,
		side: THREE.DoubleSide, //THREE.FrontSide
		//transparent: true, 导致消失
		//depthTest: true,导致抖动
		//blending: THREE.AdditiveBlending, 导致消失
	}));

	layerPlanet.add(sphereMesh);
}

iTopoEarthModel.createEarthAxis = function() {
	let axes = new THREE.AxesHelper(iTopoEarthModel.earthSettings.CITY_RADIUS + 10);
}

iTopoEarthModel.AddCountryMark = function() {
	// 地标及光锥
	for (let i = 0, length = DMCTRY.countries.length; i < length; i++) {
		const position = createPosition(DMCTRY.countries[i].position[0],DMCTRY.countries[i].position[1], iTopoEarthModel.earthSettings.CITY_RADIUS);
		layerMarks.add(createLightConeMark(position, DMCTRY.countries[i].name)); // 地标
	}
}

function createLightConeMark(position, contryName) {
	let lightConeMarkGrp = new THREE.Group();
	lightConeMarkGrp.name = contryName;

	let circleLine = new THREE.LineLoop(earthCache.circleLineGeom, earthCache.markBorderMaterial);
	let circlePlane = new THREE.Mesh(earthCache.hexagonPlane, earthCache.markAreaMaterial);

	let height = Math.random() * (iTopoEarthModel.earthSettings.COLUD_RADIUS_RATIO - 1) * iTopoEarthModel.earthSettings.CITY_RADIUS;
	let matrix1 = new THREE.Matrix4;
	matrix1.makeRotationX(Math.PI / 2);
	matrix1.setPosition(new THREE.Vector3(0, 0, height / -2));

	let geometry = new THREE.PlaneGeometry(iTopoEarthModel.earthSettings.HEXAGON_RADIUS * 2, height);
	geometry.applyMatrix4(matrix1);

	let plane1 = new THREE.Mesh(geometry, earthCache.markLightMaterial[Math.floor(Math.random() % 2)]);
	let plane2 = plane1.clone();
	plane2.rotation.z = Math.PI / 2;

	lightConeMarkGrp.add(circleLine);
	lightConeMarkGrp.add(circlePlane);
	lightConeMarkGrp.add(plane1);
	lightConeMarkGrp.add(plane2);

	lightConeMarkGrp.position.copy(position);
	lightConeMarkGrp.lookAt(0, 0, 0);

	return lightConeMarkGrp;
}

iTopoEarthModel.createEarthParticles = function() {

	let earthImg = document.createElement('img');
	earthImg.src = iTopoEarthModel.earthSettings.EARTH_IMG_BLACKANDWIHTE;
	earthImg.onload = () => {

		let earthCanvas = document.createElement('canvas');
		earthCanvas.width = earthImg.width;
		earthCanvas.height = earthImg.height;

		let earthCtx = earthCanvas.getContext('2d');
		earthCtx.drawImage(earthImg, 0, 0, earthImg.width, earthImg.height);
		let earthImgData = earthCtx.getImageData(0, 0, earthImg.width, earthImg.height);

		function isLandByUV(c, f) {
			if (!earthImgData) { // 底图数据
				console.error('data error!');
			}
			let n = parseInt(earthImg.width * c), // 根据横纵百分比计算图象坐标系中的坐标
				o = parseInt(earthImg.height * f); // 根据横纵百分比计算图象坐标系中的坐标
			return 0 === earthImgData.data[4 * (o * earthImgData.width + n)]; // 查找底图中对应像素点的rgba值并判断
		}

		let positions = [];
		let materials = [];
		for (var i = 0; i < 2; i++) {
			positions[i] = {
				positions: []
			}
			let mat = new THREE.PointsMaterial();
			mat.size = 5;
			mat.color = new THREE.Color(0x03d98e);
			mat.map = earthCache.dotTexture;
			mat.depthWrite = false;
			mat.transparent = true;
			mat.opacity = 0.5;
			mat.side = THREE.FrontSide;
			mat.blending = THREE.AdditiveBlending;
			let n = i / 2;
			mat.t_ = n * Math.PI * 2;
			mat.speed_ = iTopoEarthModel.earthSettings.BLINT_SPEED;
			mat.min_ = .2 * Math.random() + .5;
			mat.delta_ = .1 * Math.random() + .1;
			mat.opacity_coef_ = 1;
			materials.push(mat);
		}

		var spherical = new THREE.Spherical;
		spherical.radius = iTopoEarthModel.earthSettings.CITY_RADIUS;

		const step = 250;
		for (let i = 0; i < step; i++) {
			let vec = new THREE.Vector3;
			let radians = step * (1 - Math.sin(i / step * Math.PI)) / step + .5; // 每个纬线圈内的角度均分
			for (let j = 0; j < step; j += radians) {
				let c = j / step, // 底图上的横向百分比
					f = i / step, // 底图上的纵向百分比
					index = Math.floor(2 * Math.random()),
					pos = positions[index]
				if (isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
					spherical.theta = c * Math.PI * 2 - Math.PI / 2; // 横纵百分比转换为theta和phi夹角
					spherical.phi = f * Math.PI; // 横纵百分比转换为theta和phi夹角
					vec.setFromSpherical(spherical); // 夹角转换为世界坐标
					pos.positions.push(vec.x);
					pos.positions.push(vec.y);
					pos.positions.push(vec.z);
				}
			}
		}

		for (let i = 0; i < positions.length; i++) {
			let pos = positions[i],
				bufferGeom = new THREE.BufferGeometry,
				typedArr1 = new Float32Array(pos.positions.length);
			for (let j = 0; j < pos.positions.length; j++) {
				typedArr1[j] = pos.positions[j]
			}

			bufferGeom.setAttribute("position", new THREE.BufferAttribute(typedArr1, 3))
			bufferGeom.computeBoundingSphere()
			let particle = new THREE.Points(bufferGeom, materials[i])
			layerPlanet.add(particle)
		}
	}
}

iTopoEarthModel.createCloudGrid = function() {
	var XRayMaterial = function(options) {
		let uniforms = {
			uTex: {
				type: "t",
				value: options.map || new THREE.Texture
			},
			offsetRepeat: {
				value: new THREE.Vector4(0, 0, 1, 1)
			},
			alphaProportion: {
				type: "1f",
				value: options.alphaProportion || .5
			},
			diffuse: {
				value: options.color || new THREE.Color(16777215)
			},
			opacity: {
				value: options.opacity || 1
			},
			gridOffset: {
				value: 0
			}
		}
		return new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: ` varying float _alpha;
				varying vec2 vUv;
				uniform vec4 offsetRepeat;
				uniform float alphaProportion;
				void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
				vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );
				vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);
				_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );
				_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );
				}`,
			fragmentShader: `uniform sampler2D uTex;
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float gridOffset;
				varying float _alpha;
				varying vec2 vUv;
				void main() {
				vec4 texColor = texture2D( uTex, vUv );
				float _a = _alpha * opacity;
				if( _a <= 0.0 ) discard;
				_a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );
				gl_FragColor = vec4( texColor.rgb * diffuse, _a );
				}`,
			transparent: !0,
			blending: THREE.AdditiveBlending,
			depthTest: !1
		})
	}

	let map = new THREE.TextureLoader().load(iTopoEarthModel.earthSettings.coludImg);
	map.wrapT = THREE.ClampToEdgeWrapping;
	map.wrapS = THREE.ClampToEdgeWrapping;

	let material = new XRayMaterial({
		map: map,
		alphaProportion: .25,
		color: new THREE.Color(263385797),
		opacity: 0,
		gridOffsetSpeed: .6
	});

	let cloudMesh = new THREE.Mesh(earthCache.earthBufferCloud, material);
	cloudMesh.matrixAutoUpdate = !1;

	layerCloud.add(cloudMesh);
}
