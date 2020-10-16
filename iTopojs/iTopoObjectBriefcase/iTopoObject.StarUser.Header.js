import { UIElement, UISpan , UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoStarUser } from '../iTopoElement/iTopoStarUser.js';

function iTopoObjectStarUserHeader(editor) {
	var scope = this;

	var strings = editor.strings;

	var starUser = new iTopoStarUser();
	var starUserInfo = starUser.info;

	var container = new UISpan();
	this.container = container;

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	container.add(containerParameter); {
		// starUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starUUID')).setWidth('260px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.starUUID = new UIInput().setWidth('260px').setFontSize('12px').setDisabled(true);
		this.starUUID.setValue(starUserInfo.starUUID);
		baseUUIDValueRow.add(this.starUUID);
		containerParameter.add(baseUUIDValueRow);

		// nickName
		var nickNameRow = new UIRow();
		nickNameRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/title')).setWidth('40px'));

		this.nickNameInput = new UIInput().setWidth('230px').setFontSize('12px');
		this.nickNameInput.setValue(starUserInfo.userNickname);
		this.nickNameInput.onChange(function() {
			lightTask.title = this.getValue();
		});
		nickNameRow.add(this.nickNameInput);

		containerParameter.add(nickNameRow);
	}

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setTop('140px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('150px');
		container.add(containerBaseModel);

		{
			scope.thumbnailManager = new iTopoThumbnailManager();
			scope.thumbnailManager.create(containerBaseModel.dom);

			var originPosition = new THREE.Vector3();
			originPosition.set(0, -1.0, 0);
			editor.resourceTracker.loadiTopoUser(starUserInfo.gender, originPosition, 2, function(object) {
				scope.thumbnailManager.createThumbnailItem(strings.getKey('sidebar/StarUser/Header/Outlook'),
					object,
					function() {
						scope.onClickOutlook()
					});
			});

			originPosition.set(0, 0, 0);
			editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object) {
				scope.thumbnailManager.createThumbnailItem(strings.getKey('sidebar/StarUser/Header/iTopoTaskCards'),
					object,
					function() {
						scope.onTaskCardsClassCSS3D()
					});
			});
		}
	}

	{
		var containerAnnouncement = new UIPanel();
		containerAnnouncement.setTop('320px');
		containerAnnouncement.setWidth('280px');
		containerAnnouncement.setHeight('280px');
		containerAnnouncement.setOverflow('auto');
		container.add(containerAnnouncement);

		var title = editor.strings.getKey('sidebar/SharedCanteen/life');
		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);
	}

	var containerParameter2 = new UIPanel();
	containerParameter2.setTop('630px');
	container.add(containerParameter2); {
		// gender
		var genderRow = new UIRow();
		genderRow.add(new UIText(strings.getKey('sidebar/starUser/Header/gender')).setWidth('50px'));

		this.genderInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.genderInput.setValue(starUserInfo.gender);
		this.genderInput.onChange(function() {
			starUserInfo.gender = this.getValue();
		});
		genderRow.add(this.genderInput);

		containerParameter2.add(genderRow);
	}

	{
		// cellPhone
		var cellPhoneRow = new UIRow();
		cellPhoneRow.add(new UIText(strings.getKey('sidebar/starUser/Header/cellPhone')).setWidth('50px'));

		this.cellPhoneInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cellPhoneInput.setValue(starUserInfo.cellPhone);
		this.cellPhoneInput.onChange(function() {
			starUserInfo.title = this.getValue();
		});
		cellPhoneRow.add(this.cellPhoneInput);

		containerParameter2.add(cellPhoneRow);
	}

	{
		var lnglatRow = new UIRow();

		lnglatRow.add(new UIText(strings.getKey('sidebar/starUser/Header/longitude')).setWidth('50px'));

		this.longitudeValueUI = new UINumber(starUserInfo.longitude).setWidth('60px').setRange(2, Infinity);
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		lnglatRow.add(this.longitudeValueUI);

		lnglatRow.add(new UIText(strings.getKey('sidebar/starUser/Header/latitude')).setWidth('50px'));

		this.latitudeValueUI = new UINumber(starUserInfo.latitude).setWidth('60px').setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		lnglatRow.add(this.latitudeValueUI);

		containerParameter2.add(lnglatRow);
	}

	{
		var starValueRow = new UIRow();

		starValueRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starValue')).setWidth('50px'));

		this.starValueUI = new UINumber(starUserInfo.starValue).setRange(2, Infinity);
		this.starValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		starValueRow.add(this.starValueUI);

		containerParameter2.add(starValueRow);
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starWish')).setWidth('90px'));
		containerParameter2.add(starWishTitleRow);

		var starWishTextAreaRow = new UIRow();
		this.starWishValueUI = new UITextArea().setWidth('270px').setFontSize('12px') /*.onChange( update )*/ ;
		this.starWishValueUI.dom.style.height = '120px';
		this.starWishValueUI.onKeyUp(function() {
			starUserInfo.starWish = this.getValue();

		});
		starWishTextAreaRow.add(this.starWishValueUI);

		containerParameter2.add(starWishTextAreaRow);
	}

	return this;
}

iTopoObjectStarUserHeader.prototype = Object.create(UIElement.prototype);
iTopoObjectStarUserHeader.prototype.constructor = iTopoObjectStarUserHeader;

iTopoObjectStarUserHeader.prototype = {

	activeTabPanel: function() {
		var scope = this;
		if (scope.thumbnailManager === null) return;
		if (scope.thumbnailManager === undefined) return;

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	},

	deactiveTabPanel: function() {
		var scope = this;
		if (scope.thumbnailManager === null) return;
		scope.thumbnailManager.deactive();
	},

	dispose: function() {
		if (this.thumbnailManager !== undefined && this.thumbnailManager !== null) {
			this.thumbnailManager.dispose();
			this.thumbnailManager = null;
		}
	},
	onClickOutlook: function() { // this对应一个item

		var scope = this;
		var originPosition = new THREE.Vector3();
		var title = editor.strings.getKey('sidebar/StarUser/Header/Outlook');
		editor.stationDB.fetchiTopoBaseOutlook(scope.taskObject.starUUID, function(outlookData) {

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/Star', function(background_outlook) {

				var originPosition = new THREE.Vector3(0, -iTopoEarthSettings.standMaxBoxH / 2, 0);
				editor.resourceTracker.loadiTopoUser(scope.genderInput.getValue(), originPosition, iTopoEarthSettings.standMaxBoxH,
					function(baseModel) {

						var album2DImgs = [];
						var baseURL = "./iTopoObjects/" + scope.taskObject.starUUID + "/outlook/";
						if (outlookData.album2DImgs !== null && outlookData.album2DImgs !== undefined) {
							outlookData.album2DImgs.forEach(function(imgItem) {
								album2DImgs.push({
									imgURL: baseURL + imgItem.imgFilenName,
									imgDesc: imgItem.imgDesc
								});
							});
						}

						var explore = new iTopoStandPlatform.Explore(title);
						console.log(album2DImgs);
						explore.show3D(background_outlook, baseModel, album2DImgs);
						explore.play();

					});

			});

		});

	},

	getValue: function() {

		return this.taskObject;

	},

	setValue: function(taskObject) {
		var scope = this;
		if (editor.selected !== null) {
			//	containerParameter.setDisplay( 'block' );
			this.starUUID.setValue(taskObject.starUUID);
			this.genderInput.setValue(taskObject.gender);
			this.updateOutlook(taskObject.gender);
			this.cellPhoneInput.setValue(taskObject.cellPhone);
			this.longitudeValueUI.setValue(taskObject.lng);
			this.latitudeValueUI.setValue(taskObject.lat);
			this.starValueUI.setValue(taskObject.starValue);
			this.starWishValueUI.setValue(taskObject.starWish);

			//如果没有对应的文件夹，则会出错，因为找不到相应的文件
			editor.stationDB.fetchiTopoBaseAnnouncement(taskObject.starUUID, function(jsonAnnouncement) {

				jsonAnnouncement.forEach(function(announcement) {
					scope.notificationPanel.addNotificationItem(announcement.Title, announcement.Description,
						function() {
							scope.onAnnouncement(announcement);
						});
				})
			})
		}

		this.taskObject = taskObject;
	},

	updateOutlook: function(gender) {
		var scope = this;

		var originPosition = new THREE.Vector3();
		originPosition.set(0, -1.0, 0);
		var title = editor.strings.getKey('sidebar/StarUser/Header/Outlook');
		editor.resourceTracker.loadiTopoUser(gender, originPosition, 2, function(object) {
			scope.thumbnailManager.replaceThumbnailItemObject3d(title, object);
		});
	},

	onTaskCardsClassCSS3D: function() {
		var scope = this;
		editor.stationDB.fetchiTopoTasks(scope.taskObject.starUUID, "Todo", function(jsonTodo) {
			editor.stationDB.fetchiTopoTasks(scope.taskObject.starUUID, "InProgress", function(jsonInProgress) {
				editor.stationDB.fetchiTopoTasks(scope.taskObject.starUUID, "Done", function(jsonDone) {

					var title = editor.strings.getKey('sidebar/skyCastle/Header/iTopoTaskCards');
					var displayStand = new iTopoDisplayStand(title);
					document.body.appendChild(displayStand.container.dom);
					displayStand.container.setDisplay('block');
					displayStand.container.setPosition('absolate');

					var explore = new iTopoTaskDashboard3D.Explore(displayStand);
					explore.initialize();

					for (var i = 0; i < jsonTodo.length; i++) {
						explore.appendCardItem(jsonTodo[i]);
					}

					for (var i = 0; i < jsonInProgress.length; i++) {
						explore.appendCardItem(jsonInProgress[i]);
					}

					for (var i = 0; i < jsonDone.length; i++) {
						explore.appendCardItem(jsonDone[i]);
					}

					explore.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());

					explore.show3D();
					explore.play();

					displayStand.container.dom.addEventListener('resize', function() {
						explore.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
					});
					displayStand.closeBtn.dom.addEventListener('click', function() {
						explore.stop();
						explore.dispose();
						explore = null;
					});

					var taskBriefcase = new iTopoTaskBriefcase(editor);
					displayStand.container.dom.appendChild(taskBriefcase.dom);

				})
			})
		});

	},
	onAnnouncement: function(announcement) {

		var displayStand = new iTopoDisplayStand(announcement.Title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay('block');
		displayStand.container.setPosition('absolate');

		var h1 = document.createElement("h1");
		var content = document.createTextNode(announcement.Title);
		h1.appendChild(content);
		displayStand.container.dom.appendChild(h1);

		var pEle = document.createElement("p"); //创建元素节点p
		var textEle = document.createTextNode(announcement.Description);
		pEle.appendChild(textEle); //将文本追加到p中
		displayStand.container.dom.appendChild(pEle); //将p追加到body中

		displayStand.container.dom.addEventListener('resize', function() {
			explore.setSize(displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		});
		displayStand.closeBtn.dom.addEventListener('click', function() {

		});
	},
}

export {
	iTopoObjectStarUserHeader
};
