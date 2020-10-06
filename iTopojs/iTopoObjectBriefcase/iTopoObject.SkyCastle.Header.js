import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';

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
		 	object , scope.onClickSkyCastaleModel);
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ),
			 	object , scope.onTaskCardsClassCSS3D);
		}) ;
	}

	{
		var containerAnnouncement = new UIPanel();
		containerAnnouncement.setTop('330px');
		containerAnnouncement.setWidth('280px');
		containerAnnouncement.setHeight('400px');
		container.add(containerAnnouncement);

		var title = editor.strings.getKey( 'sidebar/skyCastle/Header/announcement' ) ;

		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);

		editor.stationDB.fetchiTopoBaseObjectAnnouncement(iTopoEarthModel.SkyCastle.info.castleUUID,function(jsonAnnouncement){

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

		var originPosition = new THREE.Vector3();
		var title = editor.strings.getKey( 'sidebar/skyCastle/Header/Outlook' ) ;
		editor.resourceTracker.loadSmallCityModel(originPosition, 30, function(baseModel){

			var explore = new iTopoStandPlatform.Explore(title);
			explore.show3D(null , baseModel);
			explore.play();

		}) ;

	},

	onTaskCardsClassCSS3D: function() {

		editor.stationDB.fetchiTopoTaskCards(iTopoEarthModel.SkyCastle.info.castleUUID,"Todo",function(jsonTodo){
			editor.stationDB.fetchiTopoTaskCards(iTopoEarthModel.SkyCastle.info.castleUUID,"InProgress",function(jsonInProgress){
				editor.stationDB.fetchiTopoTaskCards(iTopoEarthModel.SkyCastle.info.castleUUID,"Done",function(jsonDone){

					var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
					var displayStand = new iTopoDisplayStand(title);
					document.body.appendChild(displayStand.container.dom);
					displayStand.container.setDisplay( 'block' );
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

					explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());

					explore.show3D();
					explore.play();

					displayStand.container.dom.addEventListener( 'resize', function () {
						explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());
					});
					displayStand.closeBtn.dom.addEventListener('click', function() {
						explore.stop();
						explore.dispose();
						explore = null;
					});

					var taskBriefcase = new iTopoTaskBriefcase( editor );
					displayStand.container.dom.appendChild( taskBriefcase.dom );

				})
			})
		});

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
