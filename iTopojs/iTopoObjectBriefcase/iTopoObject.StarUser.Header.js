/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UISpan , UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';

import { OBJLoader2 } from '../../../examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from '../../../examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from '../../../examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';


function iTopoObjectStarUserHeader(editor) {
	var scope = this;

	var strings = editor.strings;

	var starUserInfo = editor.starUser.info

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setPaddingTop('10px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('150px');
		container.add(containerBaseModel);

		{
			scope.thumbnailManager = new iTopoThumbnailManager();
			scope.thumbnailManager.create(containerBaseModel.dom);

			var originPosition = new THREE.Vector3();
			originPosition.set(0,-1.0,0);
			editor.resourceTracker.loadiTopoUser(starUserInfo.gender, originPosition, 2, function(object){
				scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/Outlook' ),
			 	object , function() {scope.onClickThumbnail()});
			}) ;

			editor.resourceTracker.loadiTopoUser(starUserInfo.gender, originPosition, 2, function(object){
				scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/iTopoTaskCards' ),
				 	object , function(){scope.onTaskCardsClassCSS3D()});
			}) ;
		}
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setTop('220px');
	container.add(containerParameter);
	{
		// starUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starUUID')).setWidth('260px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.starUUID = new UIInput().setWidth('260px').setFontSize('12px').setDisabled(true);
		this.starUUID.setValue(starUserInfo.starUUID);
		baseUUIDValueRow.add(this.starUUID);
		containerParameter.add(baseUUIDValueRow);
	}

	{
		// gender
		var genderRow = new UIRow();
		genderRow.add(new UIText(strings.getKey('sidebar/starUser/Header/gender')).setWidth('90px'));

		this.genderInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.genderInput.setValue(starUserInfo.gender);
		this.genderInput.onChange(function() {
			starUserInfo.gender = this.getValue();
		});
		genderRow.add(this.genderInput);

		containerParameter.add(genderRow);
	}

	{
		// cellPhone
		var cellPhoneRow = new UIRow();
		cellPhoneRow.add(new UIText(strings.getKey('sidebar/starUser/Header/cellPhone')).setWidth('90px'));

		this.cellPhoneInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cellPhoneInput.setValue(starUserInfo.cellPhone);
		this.cellPhoneInput.onChange(function() {
			starUserInfo.title = this.getValue();
		});
		cellPhoneRow.add(this.cellPhoneInput);

		containerParameter.add(cellPhoneRow);
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('sidebar/starUser/Header/longitude')).setWidth('90px'));

		this.longitudeValueUI = new UINumber(starUserInfo.longitude).setRange(2, Infinity);
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		longitudeRow.add(this.longitudeValueUI);

		containerParameter.add(longitudeRow);
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add(new UIText(strings.getKey('sidebar/starUser/Header/latitude')).setWidth('90px'));

		this.latitudeValueUI = new UINumber(starUserInfo.latitude).setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(this.latitudeValueUI);

		containerParameter.add(latitudeRow);
	}

	{
		var starValueRow = new UIRow();

		starValueRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starValue')).setWidth('90px'));

		this.starValueUI = new UINumber(starUserInfo.starValue).setRange(2, Infinity);
		this.starValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		starValueRow.add(this.starValueUI);

		containerParameter.add(starValueRow);
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starWish')).setWidth('90px'));
		containerParameter.add(starWishTitleRow);

		var starWishTextAreaRow = new UIRow();
		this.starWishValueUI = new UITextArea().setWidth('280px').setFontSize('12px') /*.onChange( update )*/ ;
		this.starWishValueUI.dom.style.height = '120px';
		this.starWishValueUI.onKeyUp(function() {
			starUserInfo.starWish = this.getValue();

		});
		starWishTextAreaRow.add(this.starWishValueUI);

		containerParameter.add(starWishTextAreaRow);
	}

	{
		var containerAnnouncement = new UIPanel();
		containerAnnouncement.setTop('600px');
		containerAnnouncement.setWidth('275px');
		containerAnnouncement.setHeight('200px');
		container.add(containerAnnouncement);

		var title = editor.strings.getKey( 'sidebar/SharedCanteen/life' ) ;
		var notificationPanel = new iTopoNotificationManager();
		scope.notificationPanel = notificationPanel;
		notificationPanel.createDisplayStand(containerAnnouncement.dom);
	}

	return this;
}

iTopoObjectStarUserHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectStarUserHeader.prototype.constructor = iTopoObjectStarUserHeader;

iTopoObjectStarUserHeader.prototype = {

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

	onClickThumbnail: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/StarUser/Header/Outlook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadiTopoUser(scope.genderInput.getValue(), originPosition, 100, function(object){

			var explore = new iTopo3dExplore.Explore();
			explore.show3D( null , object);
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight()  );
			explore.play();

			displayStand.container.dom.appendChild( explore.dom );
			displayStand.container.dom.addEventListener( 'resize', function () {
				explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());
			} );

		}) ;
	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {
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
			editor.stationDB.fetchiTopoBaseObjectAnnouncement(taskObject.starUUID,function(jsonAnnouncement){

				jsonAnnouncement.forEach(function(announcement){
					scope.notificationPanel.addNotificationItem(announcement.Title, announcement.Description,
				  	function(){
				  		scope.onAnnouncement(announcement);
				  	});
				})
			})
		}

		this.taskObject = taskObject;
	},

	updateOutlook: function( gender) {
		var scope = this;

		var originPosition = new THREE.Vector3();
		originPosition.set(0,-1.0,0);
		var title = editor.strings.getKey( 'sidebar/StarUser/Header/Outlook' );
		editor.resourceTracker.loadiTopoUser(gender, originPosition, 2, function(object){
			scope.thumbnailManager.replaceThumbnailItemObject3d(title,object);
		}) ;
	},

	onTaskCardsClassCSS3D: function() {

			editor.stationDB.fetchiTopoTaskCards(iTopoEarthModel.SkyCastle.castleUUID,function(json){
				var title = editor.strings.getKey( 'sidebar/StarUser/Header/iTopoTaskCards' ) ;
				var displayStand = new iTopoDisplayStand(title);
				document.body.appendChild(displayStand.container.dom);
				displayStand.container.setDisplay( 'block' );
				displayStand.container.setPosition('absolate');

				var explore = new iTopoTaskDashboard3D.Explore(displayStand);
				explore.initialize();

				for (var i = 0; i < json.length; i++) {
					explore.appendCardItem(json[i]);
				}

				explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());

				explore.show3D();
				explore.play();

				displayStand.container.dom.appendChild( explore.dom );
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
}

export { iTopoObjectStarUserHeader };
