import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';

function iTopoObjectLunarMoonHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var lunarMooninfo=iTopoEarthModel.LunarMoon.info;

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
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/Outlook' ),
		 	object , function() { scope.onClickLunarMoonModel(); });
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ),
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
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/LunarMoon/Header/lunarMoonUUID')).setWidth('270px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('270px').setFontSize('10px').setDisabled(true);
		this.geometryUUID.setBackground("#ffffff");
		this.geometryUUID.setValue(lunarMooninfo.lunarMoonUUID);

		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);

	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/LunarMoon/Header/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(lunarMooninfo.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	return this;
}

iTopoObjectLunarMoonHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectLunarMoonHeader.prototype.constructor = iTopoObjectLunarMoonHeader;

iTopoObjectLunarMoonHeader.prototype = {

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

	onClickLunarMoonModel: function() {// this对应一个item

		var scope = this;
		var lunarMoonInfo=iTopoEarthModel.LunarMoon.info;
		var title = editor.strings.getKey( 'sidebar/LunarMoon/Header/Outlook' ) ;
		var originPosition = new THREE.Vector3();
		originPosition.set(0.15*iTopoEarthSettings.standMaxBoxW,0,0.16*iTopoEarthSettings.standMaxBoxW);
		editor.resourceTracker.loadSmallCityModel(originPosition, iTopoEarthSettings.standMaxBoxW*0.25, function(baseModel){
			editor.resourceTracker.loadOutlook('iTopoType/TaskObject/LunarMoon', function(background_outlook) {
				editor.stationDB.fetchiTopoBaseOutlook(lunarMoonInfo.lunarMoonUUID,function(outlookData){

					var album2DImgs = [];
					var baseURL = "./iTopoObjects/" + lunarMoonInfo.lunarMoonUUID + "/outlook/";

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

	onTaskCardsClassCSS3D: function() {
		var scope = this;
		editor.stationDB.fetchiTopoTasks(scope.taskObject.lunarMoonUUID, "Todo", function(jsonTodo) {
			editor.stationDB.fetchiTopoTasks(scope.taskObject.lunarMoonUUID, "InProgress", function(jsonInProgress) {
				editor.stationDB.fetchiTopoTasks(scope.taskObject.lunarMoonUUID, "Done", function(jsonDone) {

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

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.lunarMoonUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}
}

export { iTopoObjectLunarMoonHeader };
