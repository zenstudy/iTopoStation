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
			'iTopoType/TaskObject/iTopoSkyCastle':'共享地球协作中心',
			'iTopoType/TaskObject/iTopoInnerEarth':'地心门户',
			'iTopoType/TaskObject/iTopoLunarMoon': '月球门户',
			'iTopoType/TaskObject/iTopoBlockChain':'区块链门户',
			'iTopoType/TaskObject/iTopoBeltAndRoad':'一带一路模型',
			'iTopoType/TaskObject/iTopoYuhuaZhai':'雨花斋门户',

			'menubar/iTopoEarthHub': '共享地球首页',
			'menubar/iTopoEarthHub/iTopoSkyCastle' : '共享地球协作中心',
			'menubar/iTopoEarthHub/iTopoInnerEarth' : '地心门户',
			'menubar/iTopoEarthHub/iTopoLunarMoon' : '月球门户',

			'menubar/EcologicalFarm':'生态基地',
			'menubar/EcologicalFarm/itopoBase': '生态农场',

			'menubar/SharedCanteen': '共享食堂',
			'menubar/SharedCanteen/sharedCookbook': '共享食谱',
			'menubar/SharedCanteen/yuhuazhai': '雨花斋',

			'menubar/blockChain' : '共享网络',
			'menubar/blockChain/HorizenSecureNodesMap' :'Horizen安全节点儿全球分布图',
			'menubar/blockChain/horizenSuperNodesMap'  :'horizen超级节点儿全球分布图',

			'menubar/AboutiTopoEarth':'关于共享地球',
			'menubar/AboutiTopoEarth/iTopoBluePrint' : '共享地球蓝图',

			'menubar/Login' : '登陆',
			'menubar/register': '注册',
			'menubar/StarUser/exit':'退出',
			'menubar/StarUser/mineStar':'我的信息',

			'iTopoSpriteOwnLogo/logoCaption': ' ≡ 共享地球 ≡ ',
			'iTopoSpriteSponsor/iTopoEarthSponsor' : '赞助单位',
			'iTopoSpriteSponsor/becomeSponsor' : '赞助共享地球',

			'iTopoToolbar/translate':'平移',
			'iTopoToolbar/rotate':'旋转',
			'iTopoToolbar/scale':'缩放',
			'iTopoToolbar/local':'本地',

			'iTopoToolbarLight/enteriTopoEarth': '入驻共享地球',
			'iTopoToolbarLight/RegisterEcologicalFarm': '注册生态基地',
			'iTopoToolbarLight/RegisterSharedCanteen': '注册共享食堂',

			'iTopoViewport/info/objects' : '对象数量',
			'iTopoViewport/info/vertices' : '顶点儿数',
			'iTopoViewport/info/triangles' : '三角面片数',
			'iTopoViewport/info/frametime' : '帧数',

			'sidebar/skyCastle/Header' : '共享地球协作中心',
			'sidebar/skyCastle/Header/Outlook' : '协作中心概貌',
			'sidebar/skyCastle/Header/iTopoTaskCards' : '任务协作墙',
			'sidebar/SkyCastle/Header/Title': '名称',
			'sidebar/SkyCastle/Header/castleUUID': '协作中心UUID',
			'sidebar/skyCastle/Header/announcement' : '公告',

			'sidebar/skyCastle/iTopoItems' : '详情',
			'sidebar/skyCastle/iTopoItems/workplace' : '工作空间',

			'sidebar/skyCastle/Teams' : '志愿小组',
			'sidebar/skyCastle/Teams/applyToJoining' : '申请加入...',

			'sidebar/skyCastle/Sponsors': '赞助者',
			'sidebar/skyCastle/Sponsors/clickToSponsor': '点击赞助...',

			'sidebar/LunarMoon/Header':'月球门户',
			'sidebar/LunarMoon/Header/Outlook':'月球概貌',
			'sidebar/LunarMoon/Header/iTopoTaskCards':'任务协作墙',
			'sidebar/LunarMoon/Header/lunarMoonUUID': '月球UUID',
			'sidebar/LunarMoon/Header/Title': '名称',
			'sidebar/LunarMoon/Parts': '组成',
			'sidebar/LunarMoon/Life':'生活',

			'sidebar/InnerEarth/Header':'地心门户',
			'sidebar/InnerEarth/Header/Outlook':'地心概貌',
			'sidebar/InnerEarth/Header/iTopoTaskCards':'任务协作墙',
			'sidebar/InnerEarth/Header/innerEarthUUID':'地心UUID',
			'sidebar/InnerEarth/Header/Title':'名称',

			'sidebar/InnerEarth/Parts':'组成',
			'sidebar/InnerEarth/Life':'生活',

			'sidebar/StarUser/Header': '星民信息',
			'sidebar/StarUser/Header/Outlook': '自我展示空间',
			'sidebar/StarUser/Header/iTopoTaskCards': '任务协作墙',
			'sidebar/starUser/Header/starUUID':'starUUID',
			'sidebar/starUser/Header/gender':'性别',
			'sidebar/starUser/Header/cellPhone':'手机',
			'sidebar/starUser/Header/longitude':'经度',
			'sidebar/starUser/Header/latitude':'纬度',
			'sidebar/starUser/Header/starValue':'星值',
			'sidebar/starUser/Header/starWish':'星语星愿',

			'sidebar/StarUser/DiyCreations':'发明创造',
			'sidebar/StarUser/life':'生活',

			'sidebar/EcologicalFarm/Header' : '生态基地',
			'sidebar/EcologicalFarm/Header/siteOutook': '农场概貌',
			'sidebar/EcologicalFarm/Header/iTopoTaskCards': '任务协作协作墙',
			'sidebar/EcologicalFarm/Header/newUUID':'换UUID',
			'sidebar/EcologicalFarm/Header/baseUUID':'基地UUID',
			'sidebar/EcologicalFarm/Header/taskType' : '类型',
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
			'sidebar/SharedCanteen/Header/iTopoTaskCards': '任务协作墙',
			'sidebar/SharedCanteen/Header/newUUID':'换UUID',
			'sidebar/SharedCanteen/Header/baseUUID':'基地UUID',
			'sidebar/SharedCanteen/Header/taskType' : '类型',
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

			'sidebar/BlockChain/Gate': '区块链中心',
			'sidebar/BlockChain/Gate/Outlook': '区块链门户',
			'sidebar/BlockChain/Gate/iTopoTaskCards':'任务协作墙',
			'sidebar/BlockChain/Gate/chainUUID':'chainUUID',
			'sidebar/BlockChain/Gate/Title':'名称',
			'sidebar/BlockChain/Gate/announcement':'公告',

			'sidebar/YuhuaZhai/Gate': '雨花斋',
			'sidebar/YuhuaZhai/Gate/Outlook': '雨花斋概貌',
			'sidebar/YuhuaZhai/Gate/iTopoTaskCards': '任务协作墙',
			'sidebar/YuhuaZhai/Gate/canteenUUID': 'canteenUUID',
			'sidebar/YuhuaZhai/Gate/Title': '名称',
			'sidebar/YuhuaZhai/Gate/announcement': '公告',
			'sidebar/YuhuaZhai/Gate/GateLink': '雨花斋公益网址',
			'sidebar/YuhuaZhai/Gate/lightWish': '雨花斋心愿',

			'sidebar/BeltAndRoad/Gate': '一带一路模型',
			'sidebar/BeltAndRoad/Gate/Outlook': '概貌',
			'sidebar/BeltAndRoad/Gate/iTopoTaskCards' : '任务协作墙',
			'sidebar/BeltAndRoad/Gate/modelUUID':'modelUUID',
			'sidebar/BeltAndRoad/Gate/Title':'名称',

			'iTopoDialog/ok':'确定',
			'iTopoDialog/cancel':'取消',

			'iTopoDialog/login/login' : '登陆',
			'iTopoDialog/login/userName':'用户名',
			'iTopoDialog/login/password':'密  码',
			'iTopoDialog/login/cancel': '取消',

			'iTopoDialog/register/register': '注册',
			'iTopoDialog/register/userName': '用户名',
			'iTopoDialog/register/password': '密  码',
			'iTopoDialog/register/cancel': '取消',

			'iTopoDialog/lightStars/longitude' : '经度',
			'iTopoDialog/lightStars/latitude' : '纬度',
			'iTopoDialog/lightStars/starWish' : '星语星愿',

			'iTopoDialog/lightEarth/newUUID':'换UUID',
			'iTopoDialog/lightEarth/baseUUID':'基地UUID',
			'iTopoDialog/lightEarth/taskType' : '类型',
			'iTopoDialog/lightEarth/longitude' : '经度',
			'iTopoDialog/lightEarth/latitude' : '纬度',
			'iTopoDialog/lightEarth/lightWish' : '基地心愿',
			'iTopoDialog/lightEarth/title' : '名称',
			'iTopoDialog/lightEarth/city' :'城市',
			'iTopoDialog/lightEarth/address' :'地址',

			'iTopoDialog/ApplyToJoining/joiningReason': '描述一下申请加入的原因',

			'iTopoDialog/Sponsor/SponsorEarthSystem': '赞助共享地球',
			'iTopoDialog/Sponsor/WechatReward': '微信打赏',
			'iTopoDialog/Sponsor/AddWXFriend': '添加微信好友',
			'iTopoDialog/Sponsor/LeaveAMessage' :'给网站管理员留言',

			'iTopoDialog/NotificationDetail/MarkAsRead': '标记成已读',

			'iTopoDialog/NotificationDetail/VoteInFavor': '赞成',
			'iTopoDialog/NotificationDetail/VoteAgainst': '反对',

			'iTopoTaskDashboard3D/TaskViewTopMenu/AddTask' :'添加任务',
			'iTopoTaskDashboard3D/TaskViewTopMenu/DeleteTask' :'删除任务',

			'iTopoTaskDashboard3D/TaskViewBottomMenu/Table' :'表格样式',
			'iTopoTaskDashboard3D/TaskViewBottomMenu/Sphere' :'球形样式',
			'iTopoTaskDashboard3D/TaskViewBottomMenu/Helix' :'螺旋样式',
			'iTopoTaskDashboard3D/TaskViewBottomMenu/Grid' :'阵列样式',
			'iTopoTaskDashboard3D/TaskViewBottomMenu/random' :'随机样式',

			'iTopoStandPlatform/TaskViewTopMenu/2DAlbum': '2D产品图集',
			'iTopoStandPlatform/TaskViewTopMenu/3DModel': '3D产品模型',
			'iTopoStandPlatform/TaskViewTopMenu/AllStand': '全集展示',
			'iTopoStandPlatform/TaskViewTopMenu/TDB': '待定',

			'iTopoStand/taskbar/Header': '任务描述',
			'iTopoStand/taskbar/Header/taskUUID': '任务UUID',
			'iTopoStand/taskbar/Header/taskTitle': '任务标题',
			'iTopoStand/taskbar/Header/taskStatus': '任务状态',
			'iTopoStand/taskbar/Header/taskCreatedby': '任务创建者',
			'iTopoStand/taskbar/Header/taskDescription': '任务描述',

			'iTopoStand/taskbar/History': '任务历史',
			'iTopoStand/taskbar/link': '相关链接',

			'iTopoStand/article/Header':'图片详情',
			'iTopoStand/article/Title': '名称',
			'iTopoStand/article/Description': '描述',

			'iTopoStand/video/Header':'视频详情',
			'iTopoStand/video/Title': '名称',
			'iTopoStand/video/Description': '描述',

			'userBriefcase/MineNotification': '消息中心',
			'userBriefcase/MineNotification/Notification': '我的消息',

			'userBriefcase/MineAsset': '我的资产',
			'userBriefcase/MineFollower': '我的粉丝',

			'userBriefcase/BluePrintPage': '什么是共享地球',

			'iTopoMessage/RegisterBase/WidthOutLogining': '您尚未注册或登陆共享地球，请注册或登陆后再注册基地',
			'iTopoMessage/RegisterSharedCanteen/WidthOutLogining': '您尚未注册或登陆共享地球，请注册或登陆后再注册食堂',
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
