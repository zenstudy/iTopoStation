import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';

function iTopoObjectYuhuaZhaiGate(editor) {
	var scope = this;
	var strings = editor.strings;
	var yuhuaZhaiInfo = iTopoEarthModel.yuhuaZhai.info;

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setTop('140px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('150px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/YuhuaZhai/Gate/Outlook' ),
		 	object , function() { scope.onClickYuhuaZhaiModel(); });
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/YuhuaZhai/Gate/iTopoTaskCards' ),
			 	object , function() { scope.onTaskCardsClassCSS3D(); });
		}) ;
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
//	containerParameter.setTop('550px');
	container.add(containerParameter);

	{
		// baseUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/YuhuaZhai/Gate/canteenUUID')).setWidth('270px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('270px').setFontSize('10px').setDisabled(true);
		this.geometryUUID.setBackground("#ffffff");
		this.geometryUUID.setValue(yuhuaZhaiInfo.canteenUUID);

		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/YuhuaZhai/Gate/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(yuhuaZhaiInfo.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		var containerAnnouncement = new UIPanel();
		containerAnnouncement.setTop('320px');
		containerAnnouncement.setWidth('280px');
		containerAnnouncement.setHeight('280px');
		containerAnnouncement.setOverflow('auto');
		container.add(containerAnnouncement);

		var title = editor.strings.getKey( 'sidebar/YuhuaZhai/Gate/announcement' ) ;

		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);

		editor.stationDB.fetchiTopoBaseAnnouncement(iTopoEarthModel.SkyCastle.info.castleUUID,function(jsonAnnouncement){

			jsonAnnouncement.forEach(function(announcement){

				var task2ReadNotification= {
					taskUUID: THREE.MathUtils.generateUUID(),
					taskTitle:announcement.Title,
					taskDescription:announcement.Description,
				}

			 	scope.notificationPanel.addNotificationItem( task2ReadNotification ,
			 	function(){
			 		scope.onAnnouncement(announcement);
			 	});
			 })

		})
	}

	var containerParameter2 = new UIPanel();
	containerParameter2.setTop('630px');
	container.add(containerParameter2);
	{

		var linkLabelRow = new UIRow();
		linkLabelRow.add(new UIText(strings.getKey('sidebar/YuhuaZhai/Gate/GateLink')).setWidth('150px'));
		containerParameter2.add(linkLabelRow);

		var linkRow = new UIRow();
		this.gateLinkInput = new UIText().setWidth('220px').setFontSize('12px').setDisabled(true);
		//this.gateLinkInput.setValue(yuhuaZhaiInfo.gateLink);
		this.gateLinkInput.dom.innerHTML = '<a href=>' + yuhuaZhaiInfo.gateLink + '</a>';
		this.gateLinkInput.onClick(function() {
			//lightTask.city = this.getValue();
			 window.open(yuhuaZhaiInfo.gateLink,"_blank"); 
		});
		linkRow.add(this.gateLinkInput);

		containerParameter2.add(linkRow);
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add(new UIText(strings.getKey('sidebar/YuhuaZhai/Gate/lightWish')).setWidth('90px'));
		containerParameter2.add(lightWishTitleRow);

		var lightWishTextAreaRow = new UIRow();
		this.lightWishValueUI = new UITextArea().setWidth('270px').setFontSize('12px') /*.onChange( update )*/ ;
		this.lightWishValueUI.dom.style.height = '120px';
		this.lightWishValueUI.setValue(yuhuaZhaiInfo.lightWish);
		this.lightWishValueUI.onKeyUp(function() {
			//lightTask.lightWish = this.getValue();
		});
		lightWishTextAreaRow.add(this.lightWishValueUI);

		containerParameter2.add(lightWishTextAreaRow);
	}

	return this;

	return this;
}

iTopoObjectYuhuaZhaiGate.prototype = Object.create( UIElement.prototype );
iTopoObjectYuhuaZhaiGate.prototype.constructor = iTopoObjectYuhuaZhaiGate;

iTopoObjectYuhuaZhaiGate.prototype = {

	activeTabPanel: function() {
		var scope = this;
		if(scope.thumbnailManager === null) return;
		if(scope.thumbnailManager === undefined) return;

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	},

	deactiveTabPanel: function(){
		var scope = this;
		if(scope.thumbnailManager === null) return;
		scope.thumbnailManager.deactive();
	},

	dispose: function() {
		if(this.thumbnailManager !== undefined && this.thumbnailManager !== null){
			this.thumbnailManager.dispose();
			this.thumbnailManager = null;
		}
	},

	onClickYuhuaZhaiModel: function() {// this对应一个item

		var scope = this;
		var lunarMoonInfo=iTopoEarthModel.yuhuaZhai.info;
		var title = editor.strings.getKey( 'sidebar/YuhuaZhai/Gate/Outlook' ) ;
		var originPosition = new THREE.Vector3();
		originPosition.set(0.15*iTopoEarthSettings.standMaxBoxW,0,0.16*iTopoEarthSettings.standMaxBoxW);
		editor.resourceTracker.loadSmallCityModel(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){
			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/YuhuaZhai', function(background_outlook) {
				editor.stationDB.fetchiTopoBaseOutlook(lunarMoonInfo.canteenUUID,function(outlookData){

					var album2DImgs = [];
					var baseURL = "./iTopoObjects/" + lunarMoonInfo.canteenUUID + "/outlook/";

					if(outlookData.album2DImgs !== null && outlookData.album2DImgs !== undefined){

						outlookData.album2DImgs.forEach(function(imgItem){

							var extPos=imgItem.imgFilenName.search(/.mp4/);
							var sType = ( extPos > 0 ) ? 'iTopoType/standObject/video' : 'iTopoType/standObject/article';

							album2DImgs.push({
								standType: sType,
								imgURL: baseURL + imgItem.imgFilenName ,
								imgDesc: imgItem.imgDesc });

						});

					}

					var explore = new iTopoStandPlatform.Explore(title);
					var films = [];
					films.push({filmTopic:title,album2DImgs:album2DImgs});
					explore.show3D(background_outlook , baseModel, films, iTopoEarthSettings.standMaxRowItemCount);
					explore.play();

				});
			});
		}) ;

	},

onTaskCardsClassCSS3D: function() {// this对应一个item

		var scope = this;
		var yuhuaZhaiInfo=iTopoEarthModel.yuhuaZhai.info;
		var title = editor.strings.getKey( 'sidebar/YuhuaZhai/Gate/iTopoTaskCards' ) ;
		var originPosition = new THREE.Vector3();

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/YuhuaZhai', function(background_outlook) {

				editor.stationDB.fetchiTopoTasks(yuhuaZhaiInfo.canteenUUID,"Todo",function(jsonTodo){
					editor.stationDB.fetchiTopoTasks(yuhuaZhaiInfo.canteenUUID,"InProgress",function(jsonInProgress){
						editor.stationDB.fetchiTopoTasks(yuhuaZhaiInfo.canteenUUID,"Done",function(jsonDone){

								var films = [];
								var baseURL = "./iTopoObjects/" + yuhuaZhaiInfo.canteenUUID + "/tasks/";

								var album2DImgs1 = [];
								for (var i = 0; i < jsonTodo.length; i++) {
									album2DImgs1.push({
									objectUUID: yuhuaZhaiInfo.canteenUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonTodo[i].taskUUID,
									standStatus:jsonTodo[i].taskStatus,
									imgTitle: jsonTodo[i].taskTitle,
									imgURL: baseURL + jsonTodo[i].taskImgFileName ,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby });
								}
								films.push({filmTopic:"待办任务栏",album2DImgs:album2DImgs1});

								var album2DImgs2 = [];
								for (var i = 0; i < jsonInProgress.length; i++) {
									album2DImgs2.push({
									objectUUID: yuhuaZhaiInfo.canteenUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonInProgress[i].taskUUID,
									standStatus:jsonInProgress[i].taskStatus,
									imgTitle: jsonInProgress[i].taskTitle,
									imgURL: baseURL + jsonInProgress[i].taskImgFileName ,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby });
								}
								films.push({filmTopic:"在办任务栏",album2DImgs:album2DImgs2});

								var album2DImgs3 = [];
								for (var i = 0; i < jsonDone.length; i++) {
									album2DImgs3.push({
									objectUUID: yuhuaZhaiInfo.canteenUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonDone[i].taskUUID,
									standStatus:jsonDone[i].taskStatus,
									imgTitle: jsonDone[i].taskTitle,
									imgURL: baseURL + jsonDone[i].taskImgFileName ,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby});
								}
								films.push({filmTopic:"已办任务栏",album2DImgs:album2DImgs3});

								var explore = new iTopoStandPlatform.Explore(title);
								explore.show3D(background_outlook , baseModel, films, iTopoEarthSettings.standMaxRowItemCount);
								explore.play();

							})
						})
					});

			});
		}) ;

	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.canteenUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}
}

export { iTopoObjectYuhuaZhaiGate };
