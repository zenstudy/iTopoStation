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
			'iTopoType/TaskObject/iTopoSkyCastle':'共享地球事务大厅',
			'iTopoType/TaskObject/iTopoInnerEarth':'地心门户',
			'iTopoType/TaskObject/iTopoLunarMoon': '月球',

			'menubar/iTopoEarthHub': '共享地球',
			'menubar/iTopoEarthHub/iTopoBluePrint' : '共享地球蓝图',
			'menubar/iTopoEarthHub/iTopoSkyCastle' : '共享地球事务大厅',
			'menubar/iTopoEarthHub/iTopoInnerEarth' : '地心门户',
			'menubar/iTopoEarthHub/iTopoLunarMoon' : '月球',

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

			'sidebar/skyCastle/Header' : '事务大厅',
			'sidebar/skyCastle/Header/Outlook' : '事务大厅模型空间',
			'sidebar/skyCastle/Header/iTopoTaskCards' : '任务空间',
			'sidebar/SkyCastle/Header/Title': '名称',
			'sidebar/SkyCastle/Header/castleUUID': '事务大厅UUID',
			'sidebar/skyCastle/iTopoItems' : '详情',
			'sidebar/skyCastle/iTopoItems/workplace' : '工作空间',

			'sidebar/skyCastle/Parts' : '服务小组',
			'sidebar/skyCastle/Parts/iTopoSystemDevelopmentGroup' : 'iTopo系统研究小组',
			'sidebar/skyCastle/Parts/LifeFoodDevelopmentGroup' : '生活饮食文化研究小组',
			'sidebar/skyCastle/Parts/HumanScienceDevelopmentGroup' : '人类科学研究小组',
			'sidebar/skyCastle/Parts/EcologicalRestorationDevelopmentGroup' : '生态恢复研究小组',
			'sidebar/skyCastle/Parts/GreenNewEnergyDevelopmentGroup' : '绿色新能源研究小组',
			'sidebar/skyCastle/Parts/InterstellarCivilizationResearchGroup' : '星际文明研究小组',
			'sidebar/skyCastle/Parts/RegisteredOrganizationsAndMembers' : '挂号组织和成员',
			'sidebar/skyCastle/Parts/ReservedGroupX' : '预留小组x',

			'sidebar/skyCastle/Life' : '公告',

			'sidebar/LunarMoon/Header':'月球',
			'sidebar/LunarMoon/Header/lunarMoonUUID': '月球UUID',
			'sidebar/LunarMoon/Header/Title': '名称',
			'sidebar/LunarMoon/Parts': '组成',
			'sidebar/LunarMoon/Life':'生活',


			'sidebar/InnerEarth/Header':'地心门户',
			'sidebar/InnerEarth/Header/Outlook':'地心概貌',
			'sidebar/InnerEarth/Header/iTopoTaskCards':'任务空间',
			'sidebar/InnerEarth/Header/innerEarthUUID':'地心UUID',
			'sidebar/InnerEarth/Header/Title':'名称',

			'sidebar/InnerEarth/Parts':'组成',
			'sidebar/InnerEarth/Life':'生活',

			'sidebar/StarUser/Header': '星民信息',
			'sidebar/StarUser/Header/Outlook': '头像',
			'sidebar/StarUser/Header/iTopoTaskCards': '任务空间',
			'sidebar/starUser/Header/starUUID':'starUUID',
			'sidebar/starUser/Header/gender':'性别',
			'sidebar/starUser/Header/cellPhone':'手机',
			'sidebar/starUser/Header/longitude':'经度',
			'sidebar/starUser/Header/latitude':'纬度',
			'sidebar/starUser/Header/starWish':'星语星愿',

			'sidebar/StarUser/DiyCreations':'发明创造',
			'sidebar/StarUser/life':'生活',

			'sidebar/EcologicalFarm/Header' : '生态基地',
			'sidebar/EcologicalFarm/Header/siteOutook': '农场概貌',
			'sidebar/EcologicalFarm/Header/iTopoTaskCards': '任务空间',
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
			'sidebar/SharedCanteen/Header/outook': '食堂外观',
			'sidebar/SharedCanteen/Header/iTopoTaskCards': '任务空间',
			'sidebar/SharedCanteen/Header/newUUID':'换UUID',
			'sidebar/SharedCanteen/Header/baseUUID':'基地UUID',
			'sidebar/SharedCanteen/Header/taskType' : '任务类型',
			'sidebar/SharedCanteen/Header/longitude' : '经度',
			'sidebar/SharedCanteen/Header/latitude' : '纬度',
			'sidebar/SharedCanteen/Header/lightWish' : '基地心愿',
			'sidebar/SharedCanteen/Header/title' : '名称',
			'sidebar/SharedCanteen/Header/city' :'城市',
			'sidebar/SharedCanteen/Header/address' :'地址',

			'sidebar/SharedCanteen/menu': '菜谱',

			'sidebar/SharedCanteen/life': '生活',

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

			'iTopoTask3dExplore/TaskViewTopMenu/AddTask' :'添加任务',
			'iTopoTask3dExplore/TaskViewTopMenu/DeleteTask' :'删除任务',

			'iTopoTask3dExplore/TaskViewBottomMenu/Table' :'表格样式',
			'iTopoTask3dExplore/TaskViewBottomMenu/Sphere' :'球形样式',
			'iTopoTask3dExplore/TaskViewBottomMenu/Helix' :'螺旋样式',
			'iTopoTask3dExplore/TaskViewBottomMenu/Grid' :'阵列样式',
			'iTopoTask3dExplore/TaskViewBottomMenu/random' :'随机样式',

			'taskbar/Header': '任务描述',
			'taskbar/Header/taskUUID': '任务UUID',
			'taskbar/Header/taskTitle': '任务标题',
			'taskbar/Header/taskCreatedby': '任务创建者',
			'taskbar/Header/taskDescription': '任务描述',

			'taskbar/History': '任务历史',
			'taskbar/link': '相关链接',
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
