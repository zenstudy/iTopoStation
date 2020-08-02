import * as THREE from '../../build/three.module.js';
import { MeshLine,MeshLineMaterial } from './THREE.MeshLine.js';
import { iTopoEarthModel } from './iTopoEarthModel.js';
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

export var iTopoEarthCache = iTopoEarthCache || {};

function generateEarthCache() {

	iTopoEarthCache = {
		earthBufferSphere: new THREE.SphereBufferGeometry(iTopoEarthSettings.CITY_RADIUS, 50, 50),
		earthBufferCloud: new THREE.SphereBufferGeometry(iTopoEarthSettings.COLUD_RADIUS_RATIO * iTopoEarthSettings.CITY_RADIUS, 66,
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

		circleLineGeom: new THREE.Geometry(),
		hexagonPlane: new THREE.CircleGeometry(iTopoEarthSettings.HEXAGON_RADIUS - iTopoEarthSettings
			.CITY_MARGIN, 24),

		starPositions: []
	}

	let hexagonLine = new THREE.CircleGeometry(iTopoEarthSettings.HEXAGON_RADIUS, 24);
	hexagonLine.vertices.shift(); // 第一个节点是中心点
	iTopoEarthCache.circleLineGeom.vertices = hexagonLine.vertices;
}

generateEarthCache();
