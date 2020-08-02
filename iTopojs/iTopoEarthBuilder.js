import * as THREE from '../../build/three.module.js';
import { iTopoEarthModel } from './iTopoEarthModel.js';
import { iTopoEarthSettings } from './iTopoEarthSettings.js';
import { iTopoEarthCache } from './iTopoEarthCache.js';

export var iTopoEarthBuilder = iTopoEarthBuilder || {};

iTopoEarthBuilder.createLightConeMark = function(position, height, objName) {
	let index = Math.floor(Math.random() * 100) % 2;
	console.log(index);
	console.log(iTopoEarthCache);
	let material = iTopoEarthCache.markLightMaterial[index];

	let circleLine = new THREE.LineLoop(iTopoEarthCache.circleLineGeom, iTopoEarthCache.markBorderMaterial);
	let circlePlane = new THREE.Mesh(iTopoEarthCache.hexagonPlane, iTopoEarthCache.markPlaneMaterial);

	let matrix1 = new THREE.Matrix4;
	matrix1.makeRotationX(Math.PI / 2);
	matrix1.setPosition(new THREE.Vector3(0, 0, height / -2));

	let geometry = new THREE.PlaneGeometry(iTopoEarthSettings.HEXAGON_RADIUS * 2, height);
	geometry.applyMatrix4(matrix1);

	let plane1 = new THREE.Mesh(geometry, material);
	let plane2 = plane1.clone();
	plane2.rotation.z = Math.PI / 2;

	var lightConeGrp = new THREE.Group();

	circlePlane.position.copy(position);
	circlePlane.lookAt(0, 0, 0);
	circlePlane.name = objName;

	circleLine.position.copy(position);
	circleLine.lookAt(0, 0, 0);
	circleLine.name = objName;

	plane1.position.copy(position);
	plane1.lookAt(0, 0, 0);
	plane1.name = objName;

	plane2.position.copy(position);
	plane2.lookAt(0, 0, 0);
	plane2.name = objName;

	lightConeGrp.add(circlePlane);
	lightConeGrp.add(circleLine);
	lightConeGrp.add(plane1);
	lightConeGrp.add(plane2);

	return lightConeGrp;
}

//https://blog.csdn.net/weixin_39452320/article/details/87207684
iTopoEarthBuilder.createStar = function(starPoint, objName) {
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

	var starGeo = new THREE.SphereBufferGeometry(6, 50, 50);
	var starMesh = new THREE.Mesh(starGeo, iTopoEarthCache.starShaderMaterial);
	starMesh.position.copy(starPoint);
	starMesh.name = objName;

	return starMesh;
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
