export var iTopoEarthSettings = iTopoEarthSettings || {};

iTopoEarthSettings = {
	GLOBAL_KIND: "Global3D",
	MAP_KIND: "共创基地", //{超级节点儿,普通节点儿,共创基地,雨花斋}
	CITY_RADIUS: 1800,
	BLINT_SPEED: 0.1,
	EARTH_ROTATE_SPEED: 0.0001,
	COLUD_RADIUS_RATIO: 1.382,

	EARTH_STYLE: "标准地图", //'粒子地壳'/线框地壳;

	EARTH_PNG_WORLDGEOMETRY:"./iTopojs/img/earth_worldGeometry.PNG",
	EARTH_PNG_COUNTRY_INDEX_TEXTURE:"./iTopojs/BASEmODELfILES/WORLD/country-index-texture.PNG",
	EARTH_PNG_COUNTRY_OUTLINES:"./iTopojs/BASEmODELfILES/WORLD/country-outlines-4k.PNG",
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

	CANTEEN_YUHUAZHAI_FILE: "./iTopojs/json/iTopoCanteen.json",
	ITOPOBASE_FILE: "./iTopojs/json/iTopobase.json",
	ITOPOUSER_FILE: "./iTopojs/json/iTopoUser.json",
	// 地图z轴厚度
	zHeight: 33,

	starSize: 10,

	WORLD_LINE_WIDTH: 3,
	CITY_MARGIN: 1,

	// 标记圆锥体高度
	circularHeight: 6,
	// 圆锥体和球体直径
	circularRadius: 6,
	// 地图缩放比例360/(1800*Math.PI )
	mapScaleSize: 1/Math.PI,

	mapTitleColor: "#0867ff",
	BACKGROUND_COLOR: '#86c9c9',

	earthFrameFillColor: '#0e2a42',
	// 地图大陆区块颜色,地图正面颜色
	earthLandFillColor: '#aaffff',
	// 地图线条颜色,拉伸时地图侧边颜色
	earthLandBorderColor: '#0e2a42',
	// 标记颜色
	markingKind:"lightCone",//"lightCone", "balloon"
	markingTextColor: '#44efe4',
	markingSymbolColor: '#004cff',
	markingPlaneColor: '#ffffff',
	topicFontSize:60,
	markingFontSize:5
}
