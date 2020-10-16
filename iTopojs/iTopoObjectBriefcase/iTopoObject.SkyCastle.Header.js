import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
//import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

function iTopoObjectSkyCastleHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var skyCastleinfo=iTopoEarthModel.SkyCastle.info;

	var container = new UISpan();
	this.container = container;

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	container.add(containerParameter);

	{
		// baseUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/castleUUID')).setWidth('270px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('270px').setFontSize('10px').setDisabled(true);
		this.geometryUUID.setBackground("#ffffff");
		this.geometryUUID.setValue(skyCastleinfo.castleUUID);

		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);

	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/Title')).setWidth('70px'));

		this.titleInput = new UIInput().setWidth('200px').setFontSize('12px').setDisabled(true);
		this.titleInput.setValue(skyCastleinfo.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setTop('140px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('280px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/Outlook' ),
		 	object , function() { scope.onClickSkyCastaleModel(); });
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ),
			 	object , function() { scope.onTaskCardsClassCSS3D(); });
		}) ;
	}

	{
		var containerAnnouncement = new UIPanel();
		containerAnnouncement.setTop('320px');
		containerAnnouncement.setWidth('280px');
		containerAnnouncement.setHeight('280px');
		containerAnnouncement.setOverflow('auto');
		container.add(containerAnnouncement);

		var title = editor.strings.getKey( 'sidebar/skyCastle/Header/announcement' ) ;

		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);

		editor.stationDB.fetchiTopoBaseAnnouncement(iTopoEarthModel.SkyCastle.info.castleUUID,function(jsonAnnouncement){

			jsonAnnouncement.forEach(function(announcement){
			 	notificationPanel.addNotificationItem(announcement.Title, announcement.Description,
			 	function(){
			 		scope.onAnnouncement(announcement);
			 	});
			 })
		})
	}

	return this;
}

iTopoObjectSkyCastleHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectSkyCastleHeader.prototype.constructor = iTopoObjectSkyCastleHeader;

iTopoObjectSkyCastleHeader.prototype = {

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

	onClickSkyCastaleModel: function() {// this对应一个item

		var scope = this;
		var skyCastleinfo=iTopoEarthModel.SkyCastle.info;
		var title = editor.strings.getKey( 'sidebar/skyCastle/Header/Outlook' ) ;
		var originPosition = new THREE.Vector3();
		originPosition.set(0.15*iTopoEarthSettings.standMaxBoxW,0,0.16*iTopoEarthSettings.standMaxBoxW);

		editor.resourceTracker.loadSmallCityModel(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/Star', function(background_outlook) {

				editor.stationDB.fetchiTopoBaseOutlook(skyCastleinfo.castleUUID,function(outlookData){

					var album2DImgs = [];
					var baseURL = "./iTopoObjects/" + skyCastleinfo.castleUUID + "/outlook/";
					//console.log(outlookData);
					if(outlookData.album2DImgs !== null && outlookData.album2DImgs !== undefined){
						outlookData.album2DImgs.forEach(function(imgItem){
							album2DImgs.push({ imgURL: baseURL + imgItem.imgFilenName , imgDesc: imgItem.imgDesc });
						});
					}

					var explore = new iTopoStandPlatform.Explore(title);
					console.log(album2DImgs);
					explore.show3D(background_outlook , baseModel, album2DImgs);
					explore.play();

				});

			});

		}) ;

	},

	onTaskCardsClassCSS3D: function() {// this对应一个item

		var scope = this;
		var skyCastleinfo=iTopoEarthModel.SkyCastle.info;
		var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
		var originPosition = new THREE.Vector3();
		//originPosition.set(0.15*iTopoEarthSettings.standMaxBoxW,0,0.16*iTopoEarthSettings.standMaxBoxW);

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/SkyCastle', function(background_outlook) {

				editor.stationDB.fetchiTopoTasks(skyCastleinfo.castleUUID,"Todo",function(jsonTodo){
					editor.stationDB.fetchiTopoTasks(skyCastleinfo.castleUUID,"InProgress",function(jsonInProgress){
						editor.stationDB.fetchiTopoTasks(skyCastleinfo.castleUUID,"Done",function(jsonDone){

								var films = [];
								var baseURL = "./iTopoObjects/" + skyCastleinfo.castleUUID + "/tasks/";

								var album2DImgs1 = [];
								for (var i = 0; i < jsonTodo.length; i++) {
									album2DImgs1.push({
									objectUUID: skyCastleinfo.castleUUID,
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
									objectUUID: skyCastleinfo.castleUUID,
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
									objectUUID: skyCastleinfo.castleUUID,
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


	onAnnouncement: function(announcement){

		var displayStand = new iTopoDisplayStand(announcement.Title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var h1 = document.createElement("h1");
		var content=document.createTextNode(announcement.Title);
		h1.appendChild(content);
		displayStand.container.dom.appendChild(h1);

		var pEle = document.createElement("p");//创建元素节点p
		var textEle = document.createTextNode(announcement.Description);
		pEle.appendChild(textEle);//将文本追加到p中
		displayStand.container.dom.appendChild(pEle);//将p追加到body中

		displayStand.container.dom.addEventListener( 'resize', function () {
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		});
		displayStand.closeBtn.dom.addEventListener('click', function() {

		});
	},

	onSelect: function () {

		var displayStand = new iTopoDisplayStand('test');
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );

		var iframe = document.createElement('iframe');

		iframe.src = "./iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/threejs-primitives.html";
		iframe.style.width = '100%';
		iframe.style.height = '100%';

		displayStand.container.dom.appendChild( iframe );
	},



	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.info.castleUUID);
			this.titleInput.setValue(taskObject.info.title);
		}

		this.taskObject = taskObject;
	}
}

export { iTopoObjectSkyCastleHeader };
