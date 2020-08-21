/**
 * @author mrdoob / http://mrdoob.com/
 */

function iTopoStrings( config ) {

	var language = config.getKey( 'language' );

	var values = {


		zh: {
			'iTopoType/TaskObject/Star':'星体',
			'iTopoType/TaskObject/EcologicalFarm':'生态基地',
			'iTopoType/TaskObject/SharedCanteen':'共享食堂',
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

			'iTopoToolbar/translate':'平移',
			'iTopoToolbar/rotate':'旋转',
			'iTopoToolbar/scale':'缩放',
			'iTopoToolbar/local':'本地',

			'iTopoToolbarLight/lightStars': '点亮自己',
			'iTopoToolbarLight/lightEarth': '点亮地球',
			'iTopoToolbarLight/cancel' : '取消',

			'iTopoViewport/info/objects' : '对象数量',
			'iTopoViewport/info/vertices' : '顶点儿数',
			'iTopoViewport/info/triangles' : '三角面片数',
			'iTopoViewport/info/frametime' : '帧数',

			'sidebar/skyCastle/Header' : '服务中心',
			'sidebar/SkyCastle/Header/Title': '名称',
			'sidebar/SkyCastle/Header/castleUUID': '服务中心UUID',
			'sidebar/skyCastle/iTopoItems' : '详情',
			'sidebar/skyCastle/iTopoItems/workplace' : '工作空间',

			'sidebar/StarUser/Header': '星民信息',
			'sidebar/starUser/Header/starUUID':'starUUID',
			'sidebar/starUser/Header/cellPhone':'手机',
			'sidebar/starUser/Header/longitude':'经度',
			'sidebar/starUser/Header/latitude':'纬度',
			'sidebar/starUser/Header/starWish':'星语星愿',
			'sidebar/StarUser/iTopoItems': '详情',

			'sidebar/EcologicalFarm/Header' : '生态基地',
			'sidebar/EcologicalFarm/Header/siteOutook': '农场概貌',
			'sidebar/EcologicalFarm/Header/newUUID':'换UUID',
			'sidebar/EcologicalFarm/Header/baseUUID':'基地UUID',
			'sidebar/EcologicalFarm/Header/taskType' : '任务类型',
			'sidebar/EcologicalFarm/Header/longitude' : '经度',
			'sidebar/EcologicalFarm/Header/latitude' : '纬度',
			'sidebar/EcologicalFarm/Header/lightWish' : '基地心愿',
			'sidebar/EcologicalFarm/Header/title' : '名称',
			'sidebar/EcologicalFarm/Header/city' :'城市',
			'sidebar/EcologicalFarm/Header/address' :'地址',

			'sidebar/EcologicalFarm/product': '特产',

			'sidebar/EcologicalFarm/life': '生活',

			'sidebar/SharedCanteen/Header':'共享食堂',
			'sidebar/SharedCanteen/Header/newUUID':'换UUID',
			'sidebar/SharedCanteen/Header/baseUUID':'基地UUID',
			'sidebar/SharedCanteen/Header/taskType' : '任务类型',
			'sidebar/SharedCanteen/Header/longitude' : '经度',
			'sidebar/SharedCanteen/Header/latitude' : '纬度',
			'sidebar/SharedCanteen/Header/lightWish' : '基地心愿',
			'sidebar/SharedCanteen/Header/title' : '名称',
			'sidebar/SharedCanteen/Header/city' :'城市',
			'sidebar/SharedCanteen/Header/address' :'地址',
			'sidebar/SharedCanteen/iTopoItems': '详情',


			'sidebar/iTopoTask/dynamic': '动态',
			'sidebar/iTopoTask/contribute':'贡献',
			'sidebar/iTopoTask/participants' : '参与者',

			'sidebar/contribute': '贡献',
			'sidebar/contribute/newTask' : '新任务',
			'sidebar/contribute/editTask' :'查看',
			'sidebar/contribute/removeTask': '删除',

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
