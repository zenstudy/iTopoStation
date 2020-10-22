import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';

function iTopoObjectInnerEarthHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var innerEarthinfo = iTopoEarthModel.InnerEarth.info;

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
		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object) {
			scope.thumbnailManager.createThumbnailItem(strings.getKey('sidebar/InnerEarth/Header/Outlook'),
				object,
				function() {
					scope.onClickInnerEarthModel();
				});
		});

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object) {
			scope.thumbnailManager.createThumbnailItem(strings.getKey('sidebar/InnerEarth/Header/iTopoTaskCards'),
				object,
				function() {
					scope.onTaskCardsClassCSS3D();
				});
		});
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	//	containerParameter.setTop('550px');
	container.add(containerParameter);

	{
		// baseUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/InnerEarth/Header/innerEarthUUID')).setWidth('270px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('270px').setFontSize('10px').setDisabled(true);
		this.geometryUUID.setBackground("#ffffff");
		this.geometryUUID.setValue(innerEarthinfo.innerEarthUUID);

		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);

	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/InnerEarth/Header/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(innerEarthinfo.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	return this;
}

iTopoObjectInnerEarthHeader.prototype = Object.create(UIElement.prototype);
iTopoObjectInnerEarthHeader.prototype.constructor = iTopoObjectInnerEarthHeader;

iTopoObjectInnerEarthHeader.prototype = {

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

	onClickInnerEarthModel: function() { // this对应一个item

		var scope = this;
		var innerEarthInfo = iTopoEarthModel.InnerEarth.info;
		var title = editor.strings.getKey('sidebar/InnerEarth/Header/Outlook');
		var originPosition = new THREE.Vector3();
		originPosition.set(0.15 * iTopoEarthSettings.standMaxBoxW, 0, 0.16 * iTopoEarthSettings.standMaxBoxW);

		editor.resourceTracker.loadSmallCityModel(originPosition, iTopoEarthSettings.standMaxBoxW * 0.25, function(
			baseModel) {
			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/InnerEarth', function(background_outlook) {
				editor.stationDB.fetchiTopoBaseOutlook(innerEarthInfo.innerEarthUUID, function(outlookData) {

					var album2DImgs = [];
					var baseURL = "./iTopoObjects/" + innerEarthInfo.innerEarthUUID + "/outlook/";
					if (outlookData.album2DImgs !== null && outlookData.album2DImgs !== undefined) {
						outlookData.album2DImgs.forEach(function(imgItem) {
							album2DImgs.push({
								imgURL: baseURL + imgItem.imgFilenName,
								imgDesc: imgItem.imgDesc
							});
						});
					}

					var explore = new iTopoStandPlatform.Explore(title);
					var films = [];
					films.push({
						filmTopic: title,
						album2DImgs: album2DImgs
					});
					explore.show3D(background_outlook, baseModel, films, iTopoEarthSettings.standMaxRowItemCount);
					explore.play();

				});
			});
		});

	},

	onTaskCardsClassCSS3D: function() { // this对应一个item

		var scope = this;
		var innerEarthInfo = iTopoEarthModel.InnerEarth.info;
		var title = editor.strings.getKey('sidebar/InnerEarth/Header/iTopoTaskCards');
		var originPosition = new THREE.Vector3();

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, iTopoEarthSettings.standMaxBoxW * 0.25, function(
			baseModel) {

			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/InnerEarth', function(background_outlook) {

				editor.stationDB.fetchiTopoTasks(innerEarthInfo.innerEarthUUID, "Todo", function(jsonTodo) {
					editor.stationDB.fetchiTopoTasks(innerEarthInfo.innerEarthUUID, "InProgress", function(jsonInProgress) {
						editor.stationDB.fetchiTopoTasks(innerEarthInfo.innerEarthUUID, "Done", function(jsonDone) {

							var films = [];
							var baseURL = "./iTopoObjects/" + innerEarthInfo.innerEarthUUID + "/tasks/";

							var album2DImgs1 = [];
							for (var i = 0; i < jsonTodo.length; i++) {
								album2DImgs1.push({
									objectUUID: innerEarthInfo.innerEarthUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonTodo[i].taskUUID,
									standStatus: jsonTodo[i].taskStatus,
									imgTitle: jsonTodo[i].taskTitle,
									imgURL: baseURL + jsonTodo[i].taskImgFileName,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby
								});
							}
							films.push({
								filmTopic: "待办任务栏",
								album2DImgs: album2DImgs1
							});

							var album2DImgs2 = [];
							for (var i = 0; i < jsonInProgress.length; i++) {
								album2DImgs2.push({
									objectUUID: innerEarthInfo.innerEarthUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonInProgress[i].taskUUID,
									standStatus: jsonInProgress[i].taskStatus,
									imgTitle: jsonInProgress[i].taskTitle,
									imgURL: baseURL + jsonInProgress[i].taskImgFileName,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby
								});
							}
							films.push({
								filmTopic: "在办任务栏",
								album2DImgs: album2DImgs2
							});

							var album2DImgs3 = [];
							for (var i = 0; i < jsonDone.length; i++) {
								album2DImgs3.push({
									objectUUID: innerEarthInfo.innerEarthUUID,
									standType: 'iTopoType/standObject/task',
									standUUID: jsonDone[i].taskUUID,
									standStatus: jsonDone[i].taskStatus,
									imgTitle: jsonDone[i].taskTitle,
									imgURL: baseURL + jsonDone[i].taskImgFileName,
									imgDesc: '任务创建者:' + jsonDone[i].taskCreatedby
								});
							}
							films.push({
								filmTopic: "已办任务栏",
								album2DImgs: album2DImgs3
							});

							var explore = new iTopoStandPlatform.Explore(title);
							explore.show3D(background_outlook, baseModel, films, iTopoEarthSettings.standMaxRowItemCount);
							explore.play();

						})
					})
				});

			});
		});

	},

	getValue: function() {
		return this.taskObject;
	},

	setValue: function(taskObject) {

		if (editor.selected !== null) {
			//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.innerEarthUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}

}

export {
	iTopoObjectInnerEarthHeader
};
