import { UIElement, UISpan, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';

function iTopoObjectEcologicalFarmHeader(editor) {
	var scope = this;
	var strings = editor.strings;

	var lightTask = {
		baseUUID: THREE.MathUtils.generateUUID(),
		taskType: "iTopoType/TaskObject/EcologicalFarm",
		title: "湖北恩施宣恩县:松果祖传家园",
		city: "恩施",
		address: "湖北恩施宣恩县",
		longitude: 0,
		latitude: 0,
		lightWish: "light wish",
	};

	var container = new UISpan();
	this.container = container;

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	container.add(containerParameter);

	{
		// baseUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/baseUUID')).setWidth('260px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('260px').setFontSize('12px').setDisabled(true);
		this.geometryUUID.setValue(lightTask.baseUUID);
		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);

		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/title')).setWidth('40px'));

		this.titleInput = new UIInput().setWidth('230px').setFontSize('12px');
		this.titleInput.setValue(lightTask.title);
		this.titleInput.onChange(function() {
			lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setTop('140px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('150px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadModel("iTopoType/TaskObject/EcologicalFarm", originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ),
		 	object , function() { scope.onClickOutlook(); });
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/iTopoTaskCards' ),
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

		var title = editor.strings.getKey( 'sidebar/EcologicalFarm/life' ) ;
		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);
	}


	var containerParameter2 = new UIPanel();
	containerParameter2.setTop('630px');
	container.add(containerParameter2);

	{
		var options = {
			'iTopoType/TaskObject/SharedCanteen': strings.getKey( 'iTopoType/TaskObject/SharedCanteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};

		var taskTypeRow = new UIRow();
		taskTypeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/taskType')).setWidth('50px'));
		this.taskTypeSelect = new UISelect().setWidth('180px');
		this.taskTypeSelect.setOptions(options);
		this.taskTypeSelect.setValue(strings.getKey(lightTask.taskType));
		this.taskTypeSelect.onChange(function() {
			var value = this.getValue();
			console.log(value);
			lightTask.taskType = value;
		});

		taskTypeRow.add(this.taskTypeSelect);

		containerParameter2.add(taskTypeRow);
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/city')).setWidth('50px'));

		this.cityInput = new UIInput().setWidth('180px').setFontSize('12px');
		this.cityInput.setValue(lightTask.city);
		this.cityInput.onChange(function() {
			lightTask.city = this.getValue();
		});
		cityRow.add(this.cityInput);

		containerParameter2.add(cityRow);
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/address')).setWidth('50px'));

		this.addressInput = new UIInput().setWidth('180px').setFontSize('12px');
		this.addressInput.setValue(lightTask.address);
		this.addressInput.onChange(function() {
			lightTask.lng = this.getValue();
		});
		addressRow.add(this.addressInput);

		containerParameter2.add(addressRow);
	}


	{
		var lnglatRow = new UIRow();
		lnglatRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/longitude')).setWidth('50px'));

		this.longitudeValueUI = new UINumber(lightTask.longitude).setRange(2, Infinity).setWidth('60px');
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		lnglatRow.add(this.longitudeValueUI);

		lnglatRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/latitude')).setWidth('50px'));

		this.latitudeValueUI = new UINumber(lightTask.latitude).setRange(2, Infinity).setWidth('60px');
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		lnglatRow.add(this.latitudeValueUI);

		containerParameter2.add(lnglatRow);
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/lightWish')).setWidth('120px'));
		containerParameter2.add(lightWishTitleRow);

		var lightWishTextAreaRow = new UIRow();
		this.lightWishValueUI = new UITextArea().setWidth('270px').setFontSize('12px') /*.onChange( update )*/ ;
		this.lightWishValueUI.dom.style.height = '120px';
		this.lightWishValueUI.onKeyUp(function() {
			lightTask.lightWish = this.getValue();

		});
		lightWishTextAreaRow.add(this.lightWishValueUI);

		containerParameter2.add(lightWishTextAreaRow);
	}


	return this;
}

iTopoObjectEcologicalFarmHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectEcologicalFarmHeader.prototype.constructor = iTopoObjectEcologicalFarmHeader;

iTopoObjectEcologicalFarmHeader.prototype = {
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

	onClickOutlook: function() {// this对应一个item

		var scope = this;
		var originPosition = new THREE.Vector3();
		var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' );
		editor.stationDB.fetchiTopoBaseOutlook(scope.taskObject.baseUUID,function(outlookData){

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/EcologicalFarm', function(background_outlook){

				var originPosition = new THREE.Vector3();
				editor.resourceTracker.loadModel("iTopoType/TaskObject/EcologicalFarm",
					originPosition,iTopoEarthSettings.standMaxBoxW/3, function(baseModel){

					var album2DImgs = [];
					var baseURL = "./iTopoObjects/" + scope.taskObject.baseUUID + "/outlook/";
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

			}) ;

		}) ;

	},

	onTaskCardsClassCSS3D: function() {
		var scope = this;
		var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/iTopoTaskCards' ) ;
		var originPosition = new THREE.Vector3();

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/EcologicalFarm', function(background_outlook) {

				editor.stationDB.fetchiTopoTasks(scope.taskObject.baseUUID,"Todo",function(jsonTodo){
					editor.stationDB.fetchiTopoTasks(scope.taskObject.baseUUID,"InProgress",function(jsonInProgress){
						editor.stationDB.fetchiTopoTasks(scope.taskObject.baseUUID,"Done",function(jsonDone){

							var films = [];
							var baseURL = "./iTopoObjects/" + scope.taskObject.baseUUID + "/tasks/";

							var album2DImgs1 = [];
							for (var i = 0; i < jsonTodo.length; i++) {
								album2DImgs1.push({
								objectUUID: scope.taskObject.baseUUID,
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
								objectUUID: scope.taskObject.baseUUID,
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
								objectUUID: scope.taskObject.baseUUID,
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
				})
			})
		})
	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {
		//	containerParameter.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.baseUUID);
			this.taskTypeSelect.setValue(taskObject.taskType);
			this.titleInput.setValue(taskObject.title);
			this.cityInput.setValue(taskObject.city);
			this.addressInput.setValue(taskObject.address);
			this.longitudeValueUI.setValue(taskObject.lng);
			this.latitudeValueUI.setValue(taskObject.lat);
			this.lightWishValueUI.setValue(taskObject.lightWish);
			//如果没有对应的文件夹，则会出错，因为找不到相应的文件


			editor.stationDB.fetchiTopoBaseAnnouncement(taskObject.baseUUID,function(jsonAnnouncement){

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

		this.taskObject = taskObject;
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
}

export { iTopoObjectEcologicalFarmHeader };
