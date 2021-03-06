import * as THREE from '../../threejs/build/three.module.js';
import {iTopoEarthModel} from '../iTopoEarthModel.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';
import {iTopoEarthCache} from '../iTopoEarthCache.js';

export var iTopoEarthBuilder = iTopoEarthBuilder || {};

function createPosition(lng, lat, radius) {
	let spherical = new THREE.Spherical;
	spherical.radius = radius;
	spherical.theta = (lng + 90) * (Math.PI / 180);
	spherical.phi = (90 - lat) * (Math.PI / 180);
	let position = new THREE.Vector3();
	position.setFromSpherical(spherical);
	return position;
}

iTopoEarthBuilder.createLightConeMark1 = function(option) {

	var lightConeMark = {};

	var position;

	var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
	var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D" )
		position = createPosition(option.pos[0], option.pos[1], option.sphereRadius);
	else
		position = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight);

	let index = Math.floor(Math.random() * 100) % 2;
	let material = iTopoEarthCache.markLightMaterial[index];

	let circlePlane = new THREE.Mesh(iTopoEarthCache.hexagonPlane, iTopoEarthCache.markPlaneMaterial);
	let circleLine = new THREE.LineLoop(iTopoEarthCache.circleLineGeom, iTopoEarthCache.markBorderMaterial);

	let matrix1 = new THREE.Matrix4;
	matrix1.makeRotationX(Math.PI / 2);
	matrix1.setPosition(new THREE.Vector3(0, 0, - option.lightConeHeight / 2));

	let geometry = new THREE.PlaneGeometry(iTopoEarthSettings.circularRadius * 2, option.lightConeHeight);
	geometry.applyMatrix4(matrix1);

	let plane1 = new THREE.Mesh(geometry, material);
	let plane2 = plane1.clone();
	plane2.rotation.z = Math.PI / 2;

	var lightConeGrp = new THREE.Group();

	circlePlane.position.copy(position);
	circleLine.position.copy(position);
	plane1.position.copy(position);
	plane2.position.copy(position);

	circlePlane.name = option.textValue;
	circleLine.name = option.textValue;
	plane1.name = option.textValue;
	plane2.name = option.textValue;
	lightConeGrp.name = option.textValue;

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}
	circlePlane.userData = userData;
	circleLine.userData = userData;
	plane1.userData = userData;
	plane2.userData = userData;
	lightConeGrp.userData = userData;

	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
		circlePlane.lookAt(0, 0, 0);
		circleLine.lookAt(0, 0, 0);
		plane1.lookAt(0, 0, 0);
		plane2.lookAt(0, 0, 0);
	} else {
	//	circlePlane.lookAt(position.x, position.y, 0);
	//	circleLine.lookAt(position.x, position.y, 0);
		plane1.lookAt(position.x, position.y, 0);
		plane2.lookAt(position.x, position.y, 0);
	}

	lightConeGrp.add(circlePlane);
	lightConeGrp.add(circleLine);
	lightConeGrp.add(plane1);
	lightConeGrp.add(plane2);

	lightConeMark.lightConeGrp = lightConeGrp;

	if (!option.textMarked) {

		// 添加文字说明
		let textLength = option.textValue.length;
		let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createVerCanvasFont(option.fontSize,5, option.textValue, option.fontColor));

		let fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			fontMesh.scale.x = 1;
			fontMesh.scale.y = textLength + 1;
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1], iTopoEarthSettings.CITY_RADIUS + option.lightConeHeight + 0.5);
			fontMesh.position.copy(ptOnSphere); // 定义提示文字显示位置
			fontMesh.lookAt(0, 0, 0);
		} else {
			fontMesh.scale.x = iTopoEarthSettings.mapScaleSize;
			fontMesh.scale.y = iTopoEarthSettings.mapScaleSize*(textLength);
			var cityZfont = iTopoEarthSettings.zHeight + option.lightConeHeight + option.fontSize / option.average + 0.5;
			fontMesh.position.set(cityX, cityY, cityZfont); // 定义提示文字显示位置
		}

		lightConeMark.fontMesh = fontMesh;
	}

	return lightConeMark;
}

iTopoEarthBuilder.createLightConeMark = function(option) {

	var lightConeMark = {};

	var position;

	var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
	var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D" )
		position = createPosition(option.pos[0], option.pos[1], option.sphereRadius);
	else
		position = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight);

	let index = Math.floor(Math.random() * 100) % 2;
	let material = iTopoEarthCache.markLightMaterial[index];

	let circlePlane = new THREE.Mesh(iTopoEarthCache.hexagonPlane, iTopoEarthCache.markPlaneMaterial);
	let circleLine = new THREE.LineLoop(iTopoEarthCache.circleLineGeom, iTopoEarthCache.markBorderMaterial);

	let matrix1 = new THREE.Matrix4;
	matrix1.makeRotationX(Math.PI / 2);
	matrix1.setPosition(new THREE.Vector3(0, 0, - option.lightConeHeight / 2));

	let geometry = new THREE.PlaneGeometry(iTopoEarthSettings.circularRadius * 2, option.lightConeHeight);
	geometry.applyMatrix4(matrix1);

	let plane1 = new THREE.Mesh(geometry, material);
	let plane2 = plane1.clone();
	plane2.rotation.z = Math.PI / 2;

	var lightConeGrp = new THREE.Group();

	circlePlane.position.copy(position);
	circleLine.position.copy(position);
	plane1.position.copy(position);
	plane2.position.copy(position);

	circlePlane.name = option.textValue;
	circleLine.name = option.textValue;
	plane1.name = option.textValue;
	plane2.name = option.textValue;
	lightConeGrp.name = option.textValue;

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}

	circlePlane.userData = userData;
	circleLine.userData = userData;
	plane1.userData = userData;
	plane2.userData = userData;
	lightConeGrp.userData = userData;

	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
		circlePlane.lookAt(0, 0, 0);
		circleLine.lookAt(0, 0, 0);
		plane1.lookAt(0, 0, 0);
		plane2.lookAt(0, 0, 0);
	} else {
	//	circlePlane.lookAt(position.x, position.y, 0);
	//	circleLine.lookAt(position.x, position.y, 0);
		plane1.lookAt(position.x, position.y, 0);
		plane2.lookAt(position.x, position.y, 0);
	}

	lightConeGrp.add(circlePlane);
	lightConeGrp.add(circleLine);
	lightConeGrp.add(plane1);
	lightConeGrp.add(plane2);

	lightConeMark.lightConeGrp = lightConeGrp;

	if (!option.textMarked) {

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D" ){
			let planeW = option.fontSize/iTopoEarthSettings.mapScaleSize;
			let planeH = option.fontSize*(option.textValue.length+1)/iTopoEarthSettings.mapScaleSize;
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(-Math.PI / 2);
			let matrix3 = new THREE.Matrix4;
			matrix3.makeRotationY(Math.PI );
			matrix2.multiply (matrix3);
			matrix2.setPosition(new THREE.Vector3(0, 0, -option.lightConeHeight-planeH/2 ));
			let textPanel = new THREE.PlaneGeometry(planeW, planeH);
			textPanel.applyMatrix4(matrix2);

			let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createVerCanvasFont(option.fontSize,5, option.textValue, option.fontColor));
			let material2 = new THREE.MeshBasicMaterial({
			    map: texture,
			    side: THREE.DoubleSide,
			    opacity: 1,
			    transparent: true,
			  });

			let fontMesh = new THREE.Mesh(textPanel, material2);

			position = createPosition(option.pos[0], option.pos[1], option.sphereRadius);
			fontMesh.position.copy(position);
			fontMesh.lookAt(0, 0, 0);
			lightConeMark.fontMesh = fontMesh;
		} else {
			let planeW = option.fontSize/iTopoEarthSettings.mapScaleSize;
			let planeH = option.fontSize*(option.textValue.length+1)/iTopoEarthSettings.mapScaleSize;
			let matrix2 = new THREE.Matrix4;
			matrix2.makeRotationX(Math.PI / 2);
			matrix2.setPosition(new THREE.Vector3(0, 0, planeH / 2));
			let textPanel = new THREE.PlaneGeometry(planeW,planeH);
			textPanel.applyMatrix4(matrix2);

			let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createVerCanvasFont(option.fontSize,5, option.textValue, option.fontColor));
			let material2 = new THREE.MeshBasicMaterial({
			    map: texture,
			    side: THREE.DoubleSide,
			    opacity: 1,
			    transparent: true,
			  });

			let fontMesh = new THREE.Mesh(textPanel, material2);

			position = new THREE.Vector3(cityX, cityY,option.lightConeHeight + iTopoEarthSettings.zHeight);
			fontMesh.position.copy(position);
			fontMesh.lookAt(position.x, position.y, option.lightConeHeight + iTopoEarthSettings.zHeight*2);
			lightConeMark.fontMesh = fontMesh;
		}
	}

	return lightConeMark;
}

iTopoEarthBuilder.createBalloonMark = function(option) {
	var balloonMark = {};
	const originHelper = new THREE.Object3D();
	var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
	var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;

	{
		// 球体
		let ball = new THREE.SphereBufferGeometry(iTopoEarthSettings.COLUD_RADIUS_RATIO);

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1], iTopoEarthSettings.CITY_RADIUS + iTopoEarthSettings.circularHeight);
			originHelper.position.copy(ptOnSphere);
			originHelper.lookAt(0, 0, 0);
			originHelper.updateWorldMatrix(true, false);
			ball.applyMatrix4(originHelper.matrixWorld);
		} else 	{
			var cityZball=iTopoEarthSettings.circularHeight + iTopoEarthSettings.zHeight;
			originHelper.position.set(cityX, cityY, cityZball);
			originHelper.updateWorldMatrix(true, false);
			ball.applyMatrix4(originHelper.matrixWorld);
		}

		// make an array to store colors for each vertex
		const numVerts = ball.getAttribute('position').count;
		const itemSize = 3; // r, g, b
		const colors = new Uint8Array(itemSize * numVerts);

		// copy the color into the colors array for each vertex
		colors.forEach((v, ndx) => {
			colors[ndx] = iTopoEarthSettings.markingSymbolColor;
		});

		const colorAttrib = new THREE.BufferAttribute(colors, itemSize, true);
		ball.setAttribute('color', colorAttrib);
		balloonMark.ball = ball;
	}

	{
		// 圆锥体
		let cylinder = new THREE.CylinderBufferGeometry(iTopoEarthSettings.COLUD_RADIUS_RATIO, 0, iTopoEarthSettings.circularHeight);
		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1],iTopoEarthSettings.CITY_RADIUS + iTopoEarthSettings.circularHeight/2);
			originHelper.position.copy(ptOnSphere);
			originHelper.lookAt(0, 0, 0);
			originHelper.updateWorldMatrix(true, false);

			cylinder.rotateX( -Math.PI / 2) ;
			cylinder.applyMatrix4(originHelper.matrixWorld);
		} else 	{
			var cityZcylinder = iTopoEarthSettings.circularHeight / 2 + iTopoEarthSettings.zHeight;
			originHelper.position.set(cityX, cityY, cityZcylinder);
			originHelper.rotation.x = Math.PI / 2;
			originHelper.updateWorldMatrix(true, false);

			cylinder.applyMatrix4(originHelper.matrixWorld);
		}

		// make an array to store colors for each vertex
		const numVerts2 = cylinder.getAttribute('position').count;
		const itemSize2 = 3; // r, g, b
		const colors2 = new Uint8Array(itemSize2 * numVerts2);

		// copy the color into the colors array for each vertex
		colors2.forEach((v, ndx) => {
			colors2[ndx] = iTopoEarthSettings.markingSymbolColor;
		});

		const colorAttrib2 = new THREE.BufferAttribute(colors2, itemSize2, true);
		cylinder.setAttribute('color', colorAttrib2);

		balloonMark.cylinder = cylinder;
	}

	if (!option.textMarked) {

		// 添加文字说明
		let textLength = option.textValue.length;
		let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLength * option.fontSize * option.average,
			option.fontSize * option.average, option.textValue, option.fontColor));
		let fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({
			map: texture
		}));

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1],
				iTopoEarthSettings.CITY_RADIUS + iTopoEarthSettings.circularHeight+iTopoEarthSettings.COLUD_RADIUS_RATIO+0.5);
			fontMesh.position.copy(ptOnSphere); // 定义提示文字显示位置
			fontMesh.lookAt(0, 0, 0);
		} else {
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;
			var cityZfont = iTopoEarthSettings.zHeight + iTopoEarthSettings.circularHeight
				+ iTopoEarthSettings.COLUD_RADIUS_RATIO + option.fontSize / option.average + 0.5;
			fontMesh.position.set(cityX, cityY, cityZfont); // 定义提示文字显示位置
		}

		balloonMark.fontMesh = fontMesh;
	}

	return balloonMark;
}

//https://blog.csdn.net/weixin_39452320/article/details/87207684
//https://blog.csdn.net/lin5165352/article/details/83055028
//https://blog.csdn.net/lin5165352/article/details/83055606
iTopoEarthBuilder.createStar = function(option) {

	let starPoint;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D")
	{
		starPoint = createPosition(option.pos[0], option.pos[1],
			iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud );
	}  else {
		//console.log(option);
		var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
		var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
		starPoint = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight + option.starSize/2
			+ iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud);
	}

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}

	var starGeo = new THREE.SphereBufferGeometry(option.starSize, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, iTopoEarthCache.waveShaderMaterial);//
	starMesh.position.copy(starPoint);
	starMesh.name = option.textValue;
	starMesh.userData = userData;

	return starMesh;
}

iTopoEarthBuilder.createSkyCastle = function(option) {

	var skyCastleBuid = {};

	let starPoint;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D")
	{
		starPoint = createPosition(option.pos[0], option.pos[1],
			iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud );
	}  else {
		//console.log(option);
		var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
		var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
		starPoint = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight + option.starSize/2
			+ iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud);
	}

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}

	var starGeo = new THREE.SphereBufferGeometry(option.starSize, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, iTopoEarthCache.sphereShaderMaterial);//starsTwinkleMaterial
	starMesh.position.copy(starPoint);
	starMesh.name = option.textValue;
	starMesh.userData = userData;
	skyCastleBuid.starMesh = starMesh;

	if (!option.textMarked) {

		// 添加文字说明
		let textLength = option.textValue.length;
		let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLength * option.fontSize * option.average,
			option.fontSize * option.average, option.textValue, option.fontColor));
		let fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;

			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud - option.starSize/2 - option.fontSize/2;
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1],dis2zero);
//			console.log(ptOnSphere);
			fontMesh.position.copy(ptOnSphere); // 定义提示文字显示位置
			fontMesh.lookAt(0, 0, 0);

		} else {
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;
			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud - option.starSize/2 - option.fontSize/2;
			fontMesh.position.set(cityX, cityY, dis2zero); // 定义提示文字显示位置
		}

		skyCastleBuid.fontMesh = fontMesh;

	}

	return skyCastleBuid;
}

iTopoEarthBuilder.createInnerEarth = function(option) {

	var innerEarthBuid = {};

	let starPoint;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D")
	{
		starPoint = createPosition(option.pos[0], option.pos[1],
			iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud );
	}  else {
		//console.log(option);
		var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
		var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
		starPoint = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight + option.starSize/2
			+ iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud);
	}

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}

	var starGeo = new THREE.SphereBufferGeometry(option.starSize, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, iTopoEarthCache.sphereShaderMaterial);//starsTwinkleMaterial
	starMesh.position.copy(starPoint);
	starMesh.name = option.textValue;
	starMesh.userData = userData;
	innerEarthBuid.starMesh = starMesh;

	if (!option.textMarked) {

		// 添加文字说明
		let textLength = option.textValue.length;
		let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLength * option.fontSize * option.average,
			option.fontSize * option.average, option.textValue, option.fontColor));
		let fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;

			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud - option.starSize/2 - option.fontSize/2;
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1],dis2zero);
//			console.log(ptOnSphere);
			fontMesh.position.copy(ptOnSphere); // 定义提示文字显示位置
			fontMesh.lookAt(0, 0, 0);

		} else {
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;
			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud - option.starSize/2 - option.fontSize/2;
			fontMesh.position.set(cityX, cityY, dis2zero); // 定义提示文字显示位置
		}

		innerEarthBuid.fontMesh = fontMesh;

	}

	return innerEarthBuid;
}

iTopoEarthBuilder.createEquatorObject = function(option) {

	var equatorObjectBuid = {};

	let starPoint;
	if(iTopoEarthSettings.GLOBAL_KIND === "Global3D")
	{
		starPoint = createPosition(option.pos[0], option.pos[1],
			iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud );
	}  else {
		//console.log(option);
		var cityX = option.pos[0] * option.average / iTopoEarthSettings.mapScaleSize;
		var cityY = option.pos[1] * option.average / iTopoEarthSettings.mapScaleSize;
		starPoint = new THREE.Vector3(cityX, cityY,iTopoEarthSettings.zHeight + option.starSize/2
			+ iTopoEarthSettings.CITY_RADIUS * iTopoEarthSettings.COLUD_RADIUS_RATIO + option.dis2Cloud);
	}

	var userData = {
		objectUUID: option.objectUUID,
		objectType: option.objectType,
	}

	var starGeo = new THREE.SphereBufferGeometry(option.starSize, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, iTopoEarthCache.sphereShaderMaterial);//starsTwinkleMaterial
	starMesh.position.copy(starPoint);
	starMesh.name = option.textValue;
	starMesh.userData = userData;
	equatorObjectBuid.starMesh = starMesh;

	if (!option.textMarked) {

		// 添加文字说明
		let textLength = option.textValue.length;
		let texture = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLength * option.fontSize * option.average,
			option.fontSize * option.average, option.textValue, option.fontColor));
		let fontMesh = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));

		if(iTopoEarthSettings.GLOBAL_KIND === "Global3D"){
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;

			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud + option.starSize/2 + option.fontSize/2;
			var	ptOnSphere = createPosition(option.pos[0], option.pos[1],dis2zero);
//			console.log(ptOnSphere);
			fontMesh.position.copy(ptOnSphere); // 定义提示文字显示位置
			fontMesh.lookAt(0, 0, 0);

		} else {
			fontMesh.scale.x = option.fontSize / option.average * textLength;
			fontMesh.scale.y = option.fontSize / option.average;
			var dis2zero = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO+option.dis2Cloud + option.starSize/2 + option.fontSize/2;
			fontMesh.position.set(cityX, cityY, dis2zero); // 定义提示文字显示位置
		}

		equatorObjectBuid.fontMesh = fontMesh;

	}

	return equatorObjectBuid;
}

iTopoEarthBuilder.createHorCanvasFont = function(w, h, textValue, fontColor, bgColor) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	if(bgColor !== undefined && bgColor !== null){
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, w, h);
	}

	ctx.font = h + "px '微软雅黑'";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = fontColor;
	ctx.fillText(textValue, w / 2, h / 2);
	return canvas;
}

iTopoEarthBuilder.createVerCanvasFont = function(fontSize, dpi, textValue, fontColor) {
	var canvas = document.createElement('canvas');
	canvas.width = fontSize*dpi;
	canvas.height = fontSize*dpi*(textValue.length+1);
	var ctx = canvas.getContext('2d');
	//ctx.fillStyle = iTopoEarthSettings.BACKGROUND_COLOR;
	//ctx.fillRect(0, 0, w, h);
	ctx.font = fontSize*dpi + "px '微软雅黑'";
	//ctx.font = "Bold " + h + "px Arial";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillStyle = fontColor;
    for (let i = 0; i < textValue.length; i++) {
         ctx.fillText(textValue[i], 0, i * (canvas.height / (textValue.length)));
     }
	return canvas;
}

//lineH=单行文字行高
iTopoEarthBuilder.createModelTitle = function(modelTitle, position, titleH) {
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
	ctx.fillStyle = iTopoEarthSettings.mapTitleColor;
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
iTopoEarthBuilder.createMultiText = function(multiText, position, lineH, lineW) {
	let canvas = document.createElement("canvas");
	canvas.setAttribute("width", lineW);
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ffff00";
	ctx.font = "Bold " + lineH + "px Arial";
	console.log(ctx.font);
	ctx.lineWidth = 4;
	ctx.textBaseline = "top";

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

iTopoEarthBuilder.createCloudGrid = function() {

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

	let map = new THREE.TextureLoader().load(iTopoEarthSettings.coludImg);
	map.wrapT = THREE.ClampToEdgeWrapping;
	map.wrapS = THREE.ClampToEdgeWrapping;

	let material = new XRayMaterial({
		map: map,
		alphaProportion: .25,
		color: new THREE.Color(263385797),
		opacity: 0,
		gridOffsetSpeed: .6
	});

	let cloudMesh = new THREE.Mesh(iTopoEarthCache.earthBufferCloud, material);
	cloudMesh.matrixAutoUpdate = !1;

	return cloudMesh;
}

iTopoEarthBuilder.createEarthParticles = function(layerPlanet) {

	let earthImg = document.createElement('img');
	earthImg.src = iTopoEarthSettings.EARTH_IMG_BLACKANDWIHTE;
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
			mat.map = iTopoEarthCache.dotTexture;
			mat.depthWrite = false;
			mat.transparent = true;
			mat.opacity = 0.5;
			mat.side = THREE.FrontSide;
			mat.blending = THREE.AdditiveBlending;
			let n = i / 2;
			mat.t_ = n * Math.PI * 2;
			mat.speed_ = iTopoEarthSettings.BLINT_SPEED;
			mat.min_ = .2 * Math.random() + .5;
			mat.delta_ = .1 * Math.random() + .1;
			mat.opacity_coef_ = 1;
			materials.push(mat);
		}

		var spherical = new THREE.Spherical;
		spherical.radius = iTopoEarthSettings.CITY_RADIUS;

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

iTopoEarthBuilder.createEarthWithWireFrameStyle = function() {
	// 球面
	let sphereMat = new THREE.MeshBasicMaterial({
		color: iTopoEarthSettings.earthFrameFillColor,
		side: THREE.FrontSide,
		wireframe: true
	});

	let sphereMesh = new THREE.Mesh(iTopoEarthCache.earthBufferSphere, sphereMat);
	return sphereMesh;
}

iTopoEarthBuilder.createEarthWithColorPicture = function() {
	var earthPic = new THREE.TextureLoader().load(iTopoEarthSettings.EARTH_IMG_BLUE);
	var material = new THREE.MeshBasicMaterial({
		// map: new THREE.CanvasTexture(createCanvas(2048, 1024, worldGeometry)),
		map: earthPic,
		side: THREE.DoubleSide, //THREE.FrontSide
		//transparent: true, 导致消失
		//depthTest: true,导致抖动
		//blending: THREE.AdditiveBlending, 导致消失
	});
	var sphereMesh = new THREE.Mesh(iTopoEarthCache.earthBufferSphere, material);

	return sphereMesh;
}

/* 创建字体精灵 */
 iTopoEarthBuilder.makeTextSprite = function(message, parameters) {

	if (parameters === undefined) parameters = {};

	/* 字体 */
	let fontface = parameters.hasOwnProperty("fontface") ?
		parameters["fontface"] : "Arial";

	/* 字体大小 */
	let fontsize = parameters.hasOwnProperty("fontsize") ?
		parameters["fontsize"] : iTopoEarthSettings.markingFontSize;

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
	iTopoEarthBuilder.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 +
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
iTopoEarthBuilder.roundRect = function(ctx, x, y, w, h, r) {

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

iTopoEarthBuilder.getCirclePointArrayOnXZPlane = function(radius , ptCount ) {
	var ptArray = []
	if(ptCount === 1){
		ptArray.push({ x:0, z:0}) ;
	} else {
		for(var col = 0; col < ptCount; ++ col) {
			var x = radius * Math.sin(2 * Math.PI * col / ptCount);
			var z = radius * Math.cos(2 * Math.PI * col / ptCount);
			ptArray.push({ x:x, z:z}) ;
		}
	}
	return ptArray;
}

iTopoEarthBuilder.createRollFilmCollection = function( films, ptModelOrg, filmColCount) {

	var albumMeshObjects = [];
	var ptCollectionCenter = ptModelOrg;

	for( var iTopic = 0; iTopic < films.length; ++iTopic){

		var album2DImgs = films[iTopic].album2DImgs;
		var colCount = filmColCount ;
		var boxWRemainK = (colCount - 1) / colCount;
		var radius = iTopoEarthSettings.standMaxBoxW / 2 / 0.72;
		var boxHeight = 0.618 * radius * 2 * Math.PI / colCount;
		let fontSize = iTopoEarthSettings.markingFontSize*10;
		let average = 1;

		var standCellSetting = {
			radius: radius,
			colCount: colCount,
			rowCount: Math.ceil(album2DImgs.length / colCount),
			segmentsCount: iTopoEarthSettings.standMaxBoxW / colCount,
			cellImgW:  boxWRemainK * radius * 2 * Math.PI / colCount,
			cellImgH: boxHeight,
			topicAreaH : 0.25*boxHeight,
			cellHeaderH : 0.12*boxHeight,
			cellTailH : 0.12*boxHeight,
			cellDepth: iTopoEarthSettings.standMaxBoxW / 100,
			cellGapV: 0.08*boxHeight,
			topicBGColor:'#16b2e1',
			cellHeaderBGColor:'#0ba4b5',
			cellTailBGColor:'#07a0e1',
		};
		var rowSpaceHeight = standCellSetting.cellHeaderH+standCellSetting.cellImgH+standCellSetting.cellTailH + standCellSetting.cellGapV;
		console.log(films[iTopic].filmTopic);
		let textLengthTopic = films[iTopic].filmTopic.length*2;
		let textureTextTopic = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLengthTopic * fontSize * average,
			fontSize * average, films[iTopic].filmTopic, iTopoEarthSettings.mapTitleColor, standCellSetting.topicBGColor));
		// 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
		textureTextTopic.wrapS = THREE.RepeatWrapping;
		textureTextTopic.wrapT = THREE.RepeatWrapping;
		textureTextTopic.repeat.set(colCount, 1);

		var topicHeaderMaterial = new THREE.MeshPhongMaterial({
			color: standCellSetting.topicBGColor,
			map: textureTextTopic,
			side: THREE.FrontSide, //THREE.DoubleSide, //
		});

		var topicHeaderGeometry = new THREE.CylinderGeometry( radius, radius, standCellSetting.topicAreaH, radius, 1, true );
		var topicHeaderCylinderMesh = new THREE.Mesh( topicHeaderGeometry, topicHeaderMaterial );
		topicHeaderCylinderMesh.position.set(ptCollectionCenter.x,
			ptCollectionCenter.y + standCellSetting.cellImgH/2 + standCellSetting.cellHeaderH
			+ standCellSetting.topicAreaH/2-standCellSetting.cellGapV/2,ptCollectionCenter.z);
		albumMeshObjects.push(topicHeaderCylinderMesh);

		var geometryTextHeader = new THREE.BoxGeometry(standCellSetting.cellImgW,
			standCellSetting.cellHeaderH, standCellSetting.cellDepth, standCellSetting.segmentsCount, 1);
		//  需要长：280，高300 平分6分，60度，中间有间隙取50度，通过公式，为L=n× π× r/180，L=α× r。其中n是圆心角度数，r是半径，L是圆心角弧长得 r=320,n=50,弧度=280，
		geometryTextHeader.vertices.forEach(function(item) {
			item.z += Math.sqrt(standCellSetting.radius * standCellSetting.radius - item.x * item.x) -
				standCellSetting.radius;
		});

		var geometry = new THREE.BoxGeometry(standCellSetting.cellImgW, standCellSetting.cellImgH, standCellSetting.cellDepth,
			standCellSetting.segmentsCount, 1);
		//  需要长：280，高300 平分6分，60度，中间有间隙取50度，通过公式，为L=n× π× r/180，L=α× r。其中n是圆心角度数，r是半径，L是圆心角弧长得 r=320,n=50,弧度=280，
		geometry.vertices.forEach(function(item) {
			item.z += Math.sqrt(standCellSetting.radius * standCellSetting.radius - item.x * item.x) -
				standCellSetting.radius;
		});

		var geometryTextTail = new THREE.BoxGeometry(standCellSetting.cellImgW,
			standCellSetting.cellTailH, standCellSetting.cellDepth, standCellSetting.segmentsCount, 1);
		//  需要长：280，高300 平分6分，60度，中间有间隙取50度，通过公式，为L=n× π× r/180，L=α× r。其中n是圆心角度数，r是半径，L是圆心角弧长得 r=320,n=50,弧度=280，
		geometryTextTail.vertices.forEach(function(item) {
			item.z += Math.sqrt(standCellSetting.radius * standCellSetting.radius - item.x * item.x) -
				standCellSetting.radius;
		});

		var loader = new THREE.TextureLoader();

		for (var row = 0; row < standCellSetting.rowCount; ++row) {
			for (var col = 0; col < standCellSetting.colCount; ++col) {
				var index = row*standCellSetting.colCount + col;
				if(index >= album2DImgs.length)
					break;

				var x =ptCollectionCenter.x + standCellSetting.radius * Math.sin(2 * Math.PI * col / standCellSetting.colCount);
				var z =ptCollectionCenter.z + standCellSetting.radius * Math.cos(2 * Math.PI * col / standCellSetting.colCount);
				var y =ptCollectionCenter.y + standCellSetting.cellImgH/2 - row * rowSpaceHeight; //竖向坐标

				// 添加头部文字说明
				let textLengthHeader = (album2DImgs[index].imgTitle === undefined || album2DImgs[index].imgTitle === null)?
					0 : album2DImgs[index].imgTitle.length;
				let textureTextHeader = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLengthHeader * fontSize * average,
					fontSize * average, album2DImgs[index].imgTitle, iTopoEarthSettings.mapTitleColor, standCellSetting.cellHeaderBGColor));
				var materialTextHeader = new THREE.MeshPhongMaterial({
					color: standCellSetting.cellHeaderBGColor,
					map: textureTextHeader,
					side: THREE.FrontSide, //THREE.DoubleSide, //
				});
				var fontMeshHeader = new THREE.Mesh(geometryTextHeader, materialTextHeader);
				fontMeshHeader.position.set(x, y, z);
				fontMeshHeader.userData = album2DImgs[index];
				// fontMesh.rotation.set( 0, 0, 0 );
				// fontMesh.scale.set( 1, 1, 1 );
				fontMeshHeader.rotateY(Math.PI * 2 * col / standCellSetting.colCount);
				albumMeshObjects.push(fontMeshHeader);

				var textureImg, material;
				var pos=album2DImgs[index].imgURL.search(/.mp4/);

				if( pos >= 0 ){
					// 创建video对象
					let video = document.createElement('video');
					video.id = 'video' + index;
					video.src = album2DImgs[index].imgURL; // 设置视频地址
					video.setAttribute("width", "0");
					video.setAttribute("height", "0");
					//video.setAttribute("overflow", "hidden");
					video.style.position = 'absolute';
					video.autoplay = "true"; //要设置播放
					video.loop = "true"; //要设置播放
					video.muted = "true"; //要设置播放
					document.body.appendChild(video);

					textureImg = new THREE.VideoTexture(video);
					textureImg.minFilter = THREE.LinearFilter;
					textureImg.magFilter = THREE.LinearFilter;
					textureImg.format = THREE.RGBFormat;

					material = new THREE.MeshPhongMaterial({
					  map: textureImg, // 设置纹理贴图
					}); //材质对象Material

				} else {
					textureImg = loader.load(album2DImgs[index].imgURL);
					material = new THREE.MeshBasicMaterial({
						map: textureImg,
						side: THREE.FrontSide, //THREE.DoubleSide, //
					});
				}

				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, y - standCellSetting.cellHeaderH/2 - standCellSetting.cellImgH/2, z);
				mesh.userData = album2DImgs[index];
				// mesh.rotation.set( 0, 0, 0 );
				// mesh.scale.set( 1, 1, 1 );
				mesh.rotateY(Math.PI * 2 * col / standCellSetting.colCount);

				albumMeshObjects.push(mesh);

				// 添加底部文字说明
				let textLengthTail = album2DImgs[index].imgDesc.length;
				let textureTextTail = new THREE.CanvasTexture(iTopoEarthBuilder.createHorCanvasFont(textLengthTail * fontSize * average,
					fontSize * average, album2DImgs[index].imgDesc, iTopoEarthSettings.mapTitleColor, standCellSetting.cellTailBGColor));
				var materialTextTail = new THREE.MeshPhongMaterial({
					color:standCellSetting.cellTailBGColor,
					map: textureTextTail,
					side: THREE.FrontSide, //THREE.DoubleSide, //
				});
				var fontMeshTail = new THREE.Mesh(geometryTextTail, materialTextTail);
				fontMeshTail.position.set(x, y - standCellSetting.cellImgH - standCellSetting.cellHeaderH/2 - standCellSetting.cellTailH/2, z);
				fontMeshTail.userData = album2DImgs[index];
				// fontMeshTail.rotation.set( 0, 0, 0 );
				// fontMeshTail.scale.set( 1, 1, 1 );
				fontMeshTail.rotateY(Math.PI * 2 * col / standCellSetting.colCount);

				albumMeshObjects.push(fontMeshTail);
			}
		}

		ptCollectionCenter.y -= (standCellSetting.rowCount * rowSpaceHeight + standCellSetting.topicAreaH);
	}

	return albumMeshObjects;
};


iTopoEarthBuilder.createVideoBox = function () {


  var planeGeometry = new THREE.BoxGeometry(380, 380, 380);
  let material = new THREE.MeshPhongMaterial();
  //material.side = THREE.DoubleSide;

  let mesh = new THREE.Mesh(planeGeometry, material);

  // 创建video对象
  let video = document.createElement("video");
  //video.id = 'video';
  video.src = './iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/outlook/castle(13).mp4'; // 设置视频地址
  video.setAttribute("width", "0");
  video.setAttribute("height", "0");
  //video.setAttribute("overflow", "hidden");
  video.style.position = 'absolute';
  video.autoplay = "true"; //要设置播放
  video.loop = "true"; //要设置播放
  video.muted = "true"; //要设置播放
  document.body.appendChild(video);

  // var video = document.createElement("VIDEO");
  // video.setAttribute("width", "320");
  // video.setAttribute("height", "240");
  // //video.setAttribute("controls", "controls");
  // video.setAttribute("src", "./farm1.mp4");
  // 		video.setAttribute("autoplay", "autoplay");
  // 				video.setAttribute("loop", "loop");
  // 						video.setAttribute("muted", "muted");
  // document.body.appendChild(video);

  //let video = document.getElementById('video');
  console.log(video);
  let texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  material.map = texture;

	return mesh;
}

iTopoEarthBuilder.createHorAxiatonalLine = function ( ) {

	var radius = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO;
	let curve = new THREE.EllipseCurve(
	    0,  0,                  // ax, aY
	    radius, radius,         // xRadius, yRadius
	    0, 2*Math.PI, // aStartAngle, aEndAngle
	    true,                  // aClockwise
	    0                       // aRotation
	);

	var pointsNumber = 100;
	var points = curve.getPoints( pointsNumber );
	//points=points.shift();
	var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var lineMaterial = new THREE.LineDashedMaterial({
        color: iTopoEarthSettings.AxiatonalColor,//线段的颜色
        dashSize: 1,//短划线的大小
        gapSize: 5//短划线之间的距离
    });

	var flyLine = new THREE.LineLoop( geometry, lineMaterial );
	flyLine.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
	let euler = new THREE.Euler(Math.PI/2, 0, 0);
	flyLine.setRotationFromEuler(euler);

	return flyLine;
}

iTopoEarthBuilder.createVerAxiatonalLines = function ( eulerAngle ) {

	var radius = iTopoEarthSettings.CITY_RADIUS*iTopoEarthSettings.COLUD_RADIUS_RATIO;

	let curve = new THREE.EllipseCurve(
	    0,  0,                  // ax, aY
	    radius, radius,         // xRadius, yRadius
	    Math.PI/2, 3*Math.PI/2, // aStartAngle, aEndAngle
	    true,                  // aClockwise
	    0                       // aRotation
	);

	var pointsNumber = 100;
	var points = curve.getPoints( pointsNumber );
	//points=points.shift();
	var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var lineMaterial = new THREE.LineDashedMaterial({
        color: iTopoEarthSettings.AxiatonalColor,//线段的颜色
        dashSize: 1,//短划线的大小
        gapSize: 5//短划线之间的距离
    });

	var flyLine = new THREE.Line( geometry, lineMaterial );
	flyLine.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
	let euler = new THREE.Euler(0, eulerAngle,0);
	flyLine.setRotationFromEuler(euler);

	return flyLine;
}
