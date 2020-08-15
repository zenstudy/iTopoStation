/**
 * @author mrdoob / http://mrdoob.com/
 */

function iTopoStrings( config ) {

	var language = config.getKey( 'language' );

	var values = {


		zh: {
			'iTopoType/TaskObject/Star':'星体',
			'iTopoType/TaskObject/EcologicalFarm':'生态基地',
			'iTopoType/TaskObject/Canteen':'共享食堂',
			'iTopoType/TaskObject/iTopoSkyCastle':'共享地球服务中心',

			'menubar/iTopoEarthHub': '共享地球',
			'menubar/iTopoEarthHub/iTopoSupportLand' : '共享地球服务中心',
			'menubar/iTopoEarthHub/dynamicVallage' : '动力谷',

			'menubar/EcologicalFarm':'生态基地',
			'menubar/EcologicalFarm/itopoBase': '生态农场',

			'menubar/SharedCanteen': '共享食堂',
			'menubar/SharedCanteen/sharedCookbook': '共享食谱',
			'menubar/SharedCanteen/yuhuazhai': '雨花斋',

			'menubar/blockChain' : '共享网络',
			'menubar/blockChain/HorizenSecureNodesMap' :'Horizen安全节点儿全球分布图',
			'menubar/blockChain/horizenSuperNodesMap'  :'horizen超级节点儿全球分布图',

			'menubar/Login' : '登陆',
			'menubar/register': '注册',
			'menubar/StarUser/exit':'退出',

			'iTopoToolbarLight/lightStars': '点亮自己',
			'iTopoToolbarLight/lightEarth': '点亮地球',
			'iTopoToolbarLight/cancel' : '取消',

			'iTopoViewport/info/objects' : '对象数量',
			'iTopoViewport/info/vertices' : '顶点儿数',
			'iTopoViewport/info/triangles' : '三角面片数',
			'iTopoViewport/info/frametime' : '帧数',

			'sidebar/skyCastle' : '服务中心',
			'sidebar/SkyCastle/Title': '名称',
			'sidebar/SkyCastle/castleUUID': '服务中心UUID',

			'sidebar/iTopoTask' : '拓扑任务',
			'sidebar/iTopoTask/dynamic': '动态',
			'sidebar/iTopoTask/contribute':'贡献',
			'sidebar/iTopoTask/participants' : '参与者',

			'sidebar/contribute': '贡献',
			'sidebar/contribute/newTask' : '新任务',
			'sidebar/contribute/editTask' :'查看',
			'sidebar/contribute/removeTask': '删除',

			'sidebar/StarUser': '星民信息',
			'sidebar/starUser/starUUID':'starUUID',
			'sidebar/starUser/cellPhone':'手机',
			'sidebar/starUser/longitude':'经度',
			'sidebar/starUser/latitude':'纬度',
			'sidebar/starUser/starWish':'星语星愿',

			'iTopoDialog/login/login' : '登陆',
			'iTopoDialog/login/cellPhone':'手机',
			'iTopoDialog/login/longitude': '经度',
			'iTopoDialog/login/latitude': '纬度',
			'iTopoDialog/login/starWish': '星语星愿',
			'iTopoDialog/login/password':'密码',
			'iTopoDialog/login/cancel': '取消',

			'iTopoDialog/lightStars/longitude' : '经度',
			'iTopoDialog/lightStars/latitude' : '纬度',
			'iTopoDialog/lightStars/starWish' : '星语星愿',

			'iTopoDialog/lightEarth/newUUID':'换UUID',
			'iTopoDialog/lightEarth/baseUUID':'基地UUID',
			'iTopoDialog/lightEarth/taskType' : '任务类型',
			'iTopoDialog/lightEarth/longitude' : '经度',
			'iTopoDialog/lightEarth/latitude' : '纬度',
			'iTopoDialog/lightEarth/lightWish' : '基地心愿',
			'iTopoDialog/lightEarth/title' : '名称',
			'iTopoDialog/lightEarth/city' :'城市',
			'iTopoDialog/lightEarth/address' :'地址',
		},

		en: {

		},

		fr: {


		}

	};

	return {

		getKey: function ( key ) {
			return values[ language ][ key ] || '???';

		}

	};

}

export { iTopoStrings };
