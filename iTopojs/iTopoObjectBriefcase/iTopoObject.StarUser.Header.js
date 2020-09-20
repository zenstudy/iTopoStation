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
import { iTopoTask3dExplore } from '../iTopoFrame/iTopoTask3dExplore.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoObjectStarUserHeader(editor) {
	var scope = this;

	var strings = editor.strings;

	var starUser = {
	"starUUID": "88F48BD-823C-42F1-857A-124E495B351B",
	"gender" : "female", //"male", "female"
	"cellPhone": 13688888888,
	"password": "starstar",
	"lng": 100,
	"lat": 100,
	"starWish": "star wish",
	"wxQRcode": ""
	};

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		containerBaseModel.setPaddingTop('10px');
		container.add(containerBaseModel);

		{
			scope.thumbnailManager = new iTopoThumbnailManager();
			scope.thumbnailManager.create(containerBaseModel.dom);

			var originPosition = new THREE.Vector3();
			originPosition.set(0,-1.0,0);
			editor.resourceTracker.loadiTopoUser(starUser.gender, originPosition, 2, function(object){
				scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/Outlook' ),
			 	object , function() {scope.onClickThumbnail()});
			}) ;

			editor.resourceTracker.loadiTopoUser(starUser.gender, originPosition, 2, function(object){
				scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/iTopoTaskCards' ),
				 	object , function(){scope.onTaskCardsClassCSS3D()});
			}) ;
		}
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setPaddingTop('610px');
	container.add(containerParameter);
	{
		// starUUID
		var starUUIDRow = new UIRow();
		this.starUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.starUUID.setValue(starUser.starUUID);
		starUUIDRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starUUID')).setWidth('90px'));
		starUUIDRow.add(this.starUUID);

		containerParameter.add(starUUIDRow);
	}

	{
		// cellPhone
		var genderRow = new UIRow();
		genderRow.add(new UIText(strings.getKey('sidebar/starUser/Header/gender')).setWidth('90px'));

		this.genderInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.genderInput.setValue(starUser.gender);
		this.genderInput.onChange(function() {
			starUser.gender = this.getValue();
		});
		genderRow.add(this.genderInput);

		containerParameter.add(genderRow);
	}

	{
		// cellPhone
		var cellPhoneRow = new UIRow();
		cellPhoneRow.add(new UIText(strings.getKey('sidebar/starUser/Header/cellPhone')).setWidth('90px'));

		this.cellPhoneInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cellPhoneInput.setValue(starUser.cellPhone);
		this.cellPhoneInput.onChange(function() {
			starUser.title = this.getValue();
		});
		cellPhoneRow.add(this.cellPhoneInput);

		containerParameter.add(cellPhoneRow);
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('sidebar/starUser/Header/longitude')).setWidth('90px'));

		this.longitudeValueUI = new UINumber(starUser.longitude).setRange(2, Infinity);
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

		this.latitudeValueUI = new UINumber(starUser.latitude).setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(this.latitudeValueUI);

		containerParameter.add(latitudeRow);
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add(new UIText(strings.getKey('sidebar/starUser/Header/starWish')).setWidth('90px'));
		containerParameter.add(starWishTitleRow);

		var starWishTextAreaRow = new UIRow();
		this.starWishValueUI = new UITextArea().setWidth('250px').setFontSize('12px') /*.onChange( update )*/ ;
		this.starWishValueUI.dom.style.height = '662px';
		this.starWishValueUI.onKeyUp(function() {
			starUser.starWish = this.getValue();

		});
		starWishTextAreaRow.add(this.starWishValueUI);

		containerParameter.add(starWishTextAreaRow);
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

		if (editor.selected !== null) {
		//	containerParameter.setDisplay( 'block' );
			this.starUUID.setValue(taskObject.starUUID);
			this.genderInput.setValue(taskObject.gender);
			this.updateOutlook(taskObject.gender);
			this.cellPhoneInput.setValue(taskObject.cellPhone);
			this.longitudeValueUI.setValue(taskObject.lng);
			this.latitudeValueUI.setValue(taskObject.lat);
			this.starWishValueUI.setValue(taskObject.starWish);
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

				var explore = new iTopoTask3dExplore.Explore(displayStand);
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
			
		}
}

export { iTopoObjectStarUserHeader };
