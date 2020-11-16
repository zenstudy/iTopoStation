import * as THREE from '../threejs/build/three.module.js';
import { MeshLine,MeshLineMaterial } from './iTopo3dpart/THREE.MeshLine.js';
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

export var iTopoEarthCache = iTopoEarthCache || {};

function generateEarthCache() {

	iTopoEarthCache = {
		earthBufferSphere: new THREE.SphereBufferGeometry(iTopoEarthSettings.CITY_RADIUS, iTopoEarthSettings.CITY_RADIUS, iTopoEarthSettings.CITY_RADIUS),
		earthBufferCloud: new THREE.SphereBufferGeometry(iTopoEarthSettings.COLUD_RADIUS_RATIO * iTopoEarthSettings.CITY_RADIUS,
			66,
			44),

		mapExtrudeOptions: {
			depth: iTopoEarthSettings.zHeight, // 定义图形拉伸的深度，默认100
			steps: 0, // 拉伸面方向分为多少级，默认为1
			bevelEnabled: true, // 表示是否有斜角，默认为true
			bevelThickness: 0, // 斜角的深度，默认为6
			bevelSize: 0, // 表示斜角的高度，高度会叠加到正常高度
			bebelSegments: 0, // 斜角的分段数，分段数越高越平滑，默认为1
			curveSegments: 0 // 拉伸体沿深度方向分为多少段，默认为1
		},

		dotTexture: new THREE.TextureLoader().load(iTopoEarthSettings.DOT_PNG_PATH),

		// 定义线条材质
		worldMapMaterial: new MeshLineMaterial({
			color: iTopoEarthSettings.earthLandBorderColor,
			lineWidth: iTopoEarthSettings.WORLD_LINE_WIDTH
		}),

		markBorderMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthSettings.markingSymbolColor,
			side: THREE.DoubleSide
		}),

		markingSymbolMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthSettings.markingSymbolColor,
			side: THREE.DoubleSide
		}),

		markAreaMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthSettings.markingSymbolColor,
			side: THREE.DoubleSide,
			opacity: 0.5
		}),

		markPlaneMaterial: new THREE.MeshBasicMaterial({
			color: iTopoEarthSettings.markingPlaneColor,
			side: THREE.DoubleSide,
			opacity: 0.5,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthTest: false
		}),

		markLightMaterial: [new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(iTopoEarthSettings.LAND_MARK_LIGHTRAY_JPG),
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending
		}), new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(iTopoEarthSettings.LAND_MARK_LIGHTRAYYELLOW_JPG),
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending
		})],

		waveShaderMaterial: getWaveShaderMaterial(),
		gradientshaderMaterial: getGradientShaderMaterial(),
		aeroSphereShadermaterial: getAeroSphereShaderMaterial(),
		glowOuterSphereShadermaterial: getOuterGlowShaderSphereMaterial(),
		glowInnerSphereShadermaterial: getInnerGlowSphereShaderMaterial(),
		planeShaderMaterial:getPlaneShaderMaterial(),
		sphereShaderMaterial: getSphereShaderMaterial() ,

		circleLineGeom: new THREE.Geometry(),
		hexagonPlane: new THREE.CircleGeometry(iTopoEarthSettings.circularRadius - iTopoEarthSettings.CITY_MARGIN, 24),
	}

	let hexagonLine = new THREE.CircleGeometry(iTopoEarthSettings.circularRadius, 24);
	hexagonLine.vertices.shift(); // 第一个节点是中心点
	iTopoEarthCache.circleLineGeom.vertices = hexagonLine.vertices;
}

function getWaveShaderMaterial() {
	var uniforms1 = {
		time: {
			type: "f",
			value: -0.1
		},
		coeficient: {
			type: "f",
			value: -0.1
		},
		glowColor: {
			type: "c",
			value: new THREE.Color(0xffffff)
		}
	};

	var vertexShader1 = [
		'uniform float time;',
		'varying vec3 a_position;',
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',
		'varying vec4	vFragColor;',
		'void main(){',
		'   a_position = position;',
		'	vVertexNormal	= normalize(normalMatrix * normal);',
		'	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',
		'   float vpy = a_position.y;',
		'   float vpx = a_position.x*(0.75+abs(sin(time)/2.0));',
		'   float vpz = a_position.z*(0.75+abs(sin(time)/2.0));',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(vpx,vpy,vpz, 1.0);',
		'}'
	].join('\n');

	var fragmentShader1 = [
		'uniform float time;',
		'varying vec3 a_position;',
		'uniform vec3 glowColor;',
		'uniform float	coeficient;',
		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',
		'void main(){',
		'vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',
		'vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;',
		'viewCameraToVertex	= normalize(viewCameraToVertex);',
		'float ints = abs(sin(time));',
		'float py = sin(a_position.y/ints);',
		'float pz = cos(a_position.z/2.0+0.5);',
		'float intensity	= coeficient*ints + dot(vVertexNormal, viewCameraToVertex);',
		'if(intensity > 0.6){ intensity = 1.0;}',
		'gl_FragColor = vec4(glowColor.r*ints,py,0.6, intensity);',
		'}'
	].join('\n');

	var starShaderMaterial1 = new THREE.ShaderMaterial({
		uniforms: uniforms1,
		//attributes: { },
		blending: THREE.NormalBlending,
		vertexShader: vertexShader1,
		fragmentShader: fragmentShader1,
		transparent: true
	});

	return starShaderMaterial1;
}

function getGradientShaderMaterial() {
	var uniforms2 = {
		time: {
			type: 'f',
			value: 0.2
		},
	};

	var vertexShader2 = [
		'uniform float time;',
		'varying vec3 a_position;',
		'varying vec2 vUv;',
		'void main(){',
		'vUv = uv;',
		'a_position = position;',
		'vec3 posChange = position;',
		'posChange.x = posChange.x;',
		'posChange.y = (3.0+posChange.y)*(2.0*abs(tan(time*1.0)));',
		'posChange.z = posChange.z;',
		'gl_Position =  projectionMatrix * modelViewMatrix * vec4(posChange,1.0);',
		'}'
	].join('\n');
	var fragmentShader2 = [
		'varying vec2 vUv;',
		'uniform float time;',
		'varying vec3 a_position;',
		'void main(){',
		// 'gl_FragColor = vec4((cos(time*12.0))*(a_position+3.0)/12.0+0.3,1.0);', //用顶点坐标赋值颜色
		'gl_FragColor = vec4(vUv.x*cos(time*10.0),vUv.y,0.6,1.0);', //用定点UV赋值颜色
		'}'
	].join('\n');

	var starShaderMaterial2 = new THREE.ShaderMaterial({
		uniforms: uniforms2,
		//attributes: { },
		vertexShader: vertexShader2,
		fragmentShader: fragmentShader2,
		//transparent:true
	});

	return starShaderMaterial2;
}

//大气层效果
function getAeroSphereShaderMaterial() {
	let uniformsAeroSphere = {
		coeficient: {
			type: "f",
			value: 1.0
		},
		power: {
			type: "f",
			value: 2
		},
		glowColor: {
			type: "c",
			value: new THREE.Color(0xffff00)
		}
	}

	var vertexShaderAeroSphere = [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',
		'varying vec4	vFragColor;',
		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中
		'	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}'

	].join('\n');

	var fragmentShaderAeroSphere = [
		'uniform vec3	glowColor;',
		'uniform float	coeficient;',
		'uniform float	power;',

		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',

		'varying vec4	vFragColor;',

		'void main(){',
		'	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;', //世界坐标系中从相机位置到顶点位置的距离
		'	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
		'	viewCameraToVertex	= normalize(viewCameraToVertex);', //规一化
		'	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
		'	gl_FragColor		= vec4(glowColor, intensity);',
		'}' //vVertexNormal视图坐标系中点的法向量
		//viewCameraToVertex视图坐标系中点到摄像机的距离向量
		//dot点乘得到它们的夹角的cos值
		//从中心向外面角度越来越小（从钝角到锐角）从cos函数也可以知道这个值由负变正，不透明度最终从低到高
	].join('\n');

	var materialAeroSphere = new THREE.ShaderMaterial({
		uniforms: uniformsAeroSphere,
		vertexShader: vertexShaderAeroSphere,
		fragmentShader: fragmentShaderAeroSphere,
		blending: THREE.NormalBlending,
		transparent: true,
		depthWrite: false
	});

	return materialAeroSphere;
}

//球外辉光效果Grow
function getOuterGlowShaderSphereMaterial() {

	let GlowSphereuniforms = {
		coeficient: {
			type: "f",
			value: 0.0
		},
		power: {
			type: "f",
			value: 2
		},
		glowColor: {
			type: "c",
			value: new THREE.Color(0xff22ff)
		}
	}

	var vertexShaderAeroSphere = [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',
		'varying vec4	vFragColor;',
		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中
		'	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}'

	].join('\n');

	var fragmentShaderGlowSphere = [
		'uniform vec3	glowColor;',
		'uniform float	coeficient;',
		'uniform float	power;',

		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',

		'varying vec4	vFragColor;',

		'void main(){',
		'	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;', //世界坐标系中顶点位置到相机位置到的距离
		'	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
		'	viewCameraToVertex	= normalize(viewCameraToVertex);', //规一化
		'	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
		'	if(intensity > 0.65){ intensity = 0.0;}',
		'	gl_FragColor		= vec4(glowColor, intensity);',
		'}' //vVertexNormal视图坐标系中点的法向量
		//viewCameraToVertex视图坐标系中点到摄像机的距离向量
		//dot点乘得到它们的夹角的cos值
		//从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
	].join('\n');

	var materialGlowSphere = new THREE.ShaderMaterial({
		uniforms: GlowSphereuniforms,
		vertexShader: vertexShaderAeroSphere,
		fragmentShader: fragmentShaderGlowSphere,
		blending: THREE.NormalBlending,
		transparent: true
	});

	return materialGlowSphere;
}

//球内辉光效果Grow
function getInnerGlowSphereShaderMaterial() {
	let uniformsGlowSphere = {
		coeficient: {
			type: "f",
			value: 0.0
		},
		power: {
			type: "f",
			value: 2
		},
		glowColor: {
			type: "c",
			value: new THREE.Color(0xff22ff)
		}
	}

	var vertexShaderAeroSphere = [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',
		'varying vec4	vFragColor;',
		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中
		'	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}'

	].join('\n');

	var fragmentShaderGlowSphere = [
		'uniform vec3	glowColor;',
		'uniform float	coeficient;',
		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',
		'void main(){',
		'	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',
		'	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;',
		'	viewCameraToVertex	= normalize(viewCameraToVertex);',
		'	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
		'	if(intensity > 0.65 && intensity < 0.8){ intensity = 0.8;}',
		'	if(intensity > 0.8){ intensity = 1.0;}',
		'	gl_FragColor = vec4(glowColor, intensity);',
		'}'
		//vVertexNormal视图坐标系中点的法向量
		//viewCameraToVertex视图坐标系中点到摄像机的距离向量
		//dot点乘得到它们的夹角的cos值
		//从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
	].join('\n');

	var materialGlowSphere = new THREE.ShaderMaterial({
		uniforms: uniformsGlowSphere,
		vertexShader: vertexShaderAeroSphere,
		fragmentShader: fragmentShaderGlowSphere,
		blending: THREE.NormalBlending,
		transparent: true
	});

	return materialGlowSphere;
}

function getPlaneShaderMaterial() {
	var Shadertest = {
	    uniforms: {
	        uStartAngle: {value: 0.0},
	        textureSampler: {value: new THREE.TextureLoader().load(iTopoEarthSettings.LAND_MARK_LIGHTRAY_JPG)},
	        texturebg12: {value: new THREE.TextureLoader().load(iTopoEarthSettings.LAND_MARK_LIGHTRAYYELLOW_JPG)},
	        texturea: {value: new THREE.TextureLoader().load(iTopoEarthSettings.DOT_PNG_PATH)},
	    },
	    vShaderPlane: [
	        // 'uniform mat4 mvp_matrix;', // 总变换矩阵 用这个 projectionMatrix * modelViewMatrix
	        'uniform float uStartAngle;', // 起始角度
	        'varying vec2 vTextureCoord;',
	        'varying vec2 vUv;', //传递给片元的纹理坐标
	        'varying vec4 q_Position;',
	        'uniform sampler2D texturebg12;', // 纹理
	        'void main(){',
	        '   vUv = uv;',
	        '   vec4 t = texture2D( texturebg12, vUv);',
	        '   float uWidthSpan = 40.0;',
	        '   float angleSpanh = 20.0*3.14159265;',
	        '   float startX = -uWidthSpan/2.0;',
	        '   float currAngleZ = uStartAngle*1.0 +((position.x-startX)/uWidthSpan)*angleSpanh;',
	        '   float currAngleY = uStartAngle*1.0+2.0 +((position.y-startX)/uWidthSpan)*angleSpanh;',
	        '   float tz = sin(currAngleZ)*0.2;',
	        '   float ty = sin(currAngleY)*0.1;',
	        '   gl_Position	= projectionMatrix * modelViewMatrix * vec4(position.x,position.y, tz+ty+t.r/0.8, 1.0);',
	        '   q_Position = modelMatrix * vec4(position.x,position.y, tz+ty+t.r/0.4, 1.0);',
	        '}'
	    ].join('\n'),
	    fShaderPlane: [
	        'uniform float uStartAngle;', // 起始角度
	        'uniform sampler2D textureSampler;', // 纹理
	        'uniform sampler2D texturea;', // 纹理
	        'varying vec2 vUv;', //传递给片元的纹理坐标
	        'varying vec4 q_Position;',
	        'void main(){',
	        'vec4 tc = texture2D( textureSampler, vUv) ;',
	        'if(q_Position.y >= 0.8){gl_FragColor = vec4(tc.r*sin(uStartAngle),tc.g,tc.b, 1.0);}',
	        'if(q_Position.y < 0.8) {gl_FragColor = texture2D( texturea, vUv);}',
	        '}'
	    ].join('\n')
	};

	var planeMat = new THREE.ShaderMaterial({
	    uniforms: Shadertest.uniforms,
	    vertexShader: Shadertest.vShaderPlane,
	    fragmentShader: Shadertest.fShaderPlane,
	    side: THREE.DoubleSide,
	});

	return planeMat;
}

function getSphereShaderMaterial() {
	var Shadertest = {
	    uniforms: {
	        coeficient: {value: 1.0},
	        power: {value: 1.0},
	    },
	    vertexShader: [
	        'varying vec3	vVertexWorldPosition;',
	        'varying vec3	vVertexNormal;',
	        'varying vec4	vFragColor;',
	        'uniform vec3 ec_light_dir;',
	        'varying float v_diffuse; ',
	        'void main(){',
	        '	vVertexNormal	= normalize(normalMatrix * normal);',
	        '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',
	        '       v_diffuse = max(dot(ec_light_dir,vVertexNormal),0.0);',
	        '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
	        '}'
	    ].join('\n'),
	    fragmentShader: [
	        'uniform float	coeficient;',
	        'uniform float	power;',
	        'varying vec3	vVertexNormal;',
	        'varying vec3	vVertexWorldPosition;',
	        'varying vec4	vFragColor;',
	        'varying float v_diffuse; ',
	        'void main(){',
	        '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
	        '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
	        '	viewCameraToVertex	= normalize(viewCameraToVertex);',
	        '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
	        '	gl_FragColor		= vec4(vVertexNormal, 1.0);',
	        '}'
	    ].join('\n'),
	};


	var material = new THREE.ShaderMaterial({
	    uniforms: Shadertest.uniforms,
	    vertexShader: Shadertest.vertexShader,
	    fragmentShader: Shadertest.fragmentShader,
	});
	return material;
}

generateEarthCache();
