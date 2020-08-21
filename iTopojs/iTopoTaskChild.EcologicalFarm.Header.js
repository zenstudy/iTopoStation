/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UISpan, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
//import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from './iTopoFrame/iTopo3dExplore.js';

function iTopoTaskChildEcologicalFarmHeader(editor) {

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

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		containerBaseModel.setPaddingTop('10px');
		container.add(containerBaseModel);

		var thumbnailManager = new iTopoThumbnailManager();
		thumbnailManager.create(containerBaseModel.dom);
		thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) , this.onClickBaseModel);
		thumbnailManager.updateCanvasSize();

		editor.signals.sceneRendered.add( function ( ) {
			thumbnailManager.updateCanvasSize();
			thumbnailManager.render();
		} );
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setPaddingTop('310px');
	container.add(containerParameter);

	{
		// baseUUID
		var geometryUUIDRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.geometryUUID.setValue(lightTask.baseUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/baseUUID')).setWidth('90px'));
		geometryUUIDRow.add(this.geometryUUID);

		containerParameter.add(geometryUUIDRow);
	}

	{
		var options = {
			'iTopoType/TaskObject/SharedCanteen': strings.getKey( 'iTopoType/TaskObject/SharedCanteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};

		var taskTypeRow = new UIRow();
		taskTypeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/taskType')).setWidth('90px'));
		this.taskTypeSelect = new UISelect().setWidth('150px');
		this.taskTypeSelect.setOptions(options);
		this.taskTypeSelect.setValue(strings.getKey(lightTask.taskType));
		this.taskTypeSelect.onChange(function() {
			var value = this.getValue();
			console.log(value);
			lightTask.taskType = value;
		});

		taskTypeRow.add(this.taskTypeSelect);

		containerParameter.add(taskTypeRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(lightTask.title);
		this.titleInput.onChange(function() {
			lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/city')).setWidth('90px'));

		this.cityInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cityInput.setValue(lightTask.city);
		this.cityInput.onChange(function() {
			lightTask.city = this.getValue();
		});
		cityRow.add(this.cityInput);

		containerParameter.add(cityRow);
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/address')).setWidth('90px'));

		this.addressInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.addressInput.setValue(lightTask.address);
		this.addressInput.onChange(function() {
			lightTask.lng = this.getValue();
		});
		addressRow.add(this.addressInput);

		containerParameter.add(addressRow);
	}


	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/longitude')).setWidth('90px'));

		this.longitudeValueUI = new UINumber(lightTask.longitude).setRange(2, Infinity);
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		longitudeRow.add(this.longitudeValueUI);

		containerParameter.add(longitudeRow);
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/latitude')).setWidth('90px'));

		this.latitudeValueUI = new UINumber(lightTask.latitude).setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(this.latitudeValueUI);

		containerParameter.add(latitudeRow);
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/lightWish')).setWidth('120px'));
		containerParameter.add(lightWishTitleRow);

		var lightWishTextAreaRow = new UIRow();
		this.lightWishValueUI = new UITextArea().setWidth('250px').setFontSize('12px') /*.onChange( update )*/ ;
		this.lightWishValueUI.dom.style.height = '662px';
		this.lightWishValueUI.onKeyUp(function() {
			lightTask.lightWish = this.getValue();

		});
		lightWishTextAreaRow.add(this.lightWishValueUI);

		containerParameter.add(lightWishTextAreaRow);
	}



	return this;
}

iTopoTaskChildEcologicalFarmHeader.prototype = Object.create( UIElement.prototype );
iTopoTaskChildEcologicalFarmHeader.prototype.constructor = iTopoTaskChildEcologicalFarmHeader;

iTopoTaskChildEcologicalFarmHeader.prototype = {

	onClickBaseModel: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

	//	var dom = document.createElement( 'div' );
	//	displayStand.container.dom.appendChild( dom );

		// var items = [
		// 	{ title: 'menubar/examples/Arkanoid', file: 'arkanoid.app.json' },
		// 	{ title: 'menubar/examples/Camera', file: 'camera.app.json' },
		// 	{ title: 'menubar/examples/Particles', file: 'particles.app.json' },
		// 	{ title: 'menubar/examples/Pong', file: 'pong.app.json' },
		// 	{ title: 'menubar/examples/Shaders', file: 'shaders.app.json' }
		// ];

		var loader = new THREE.FileLoader();// 以Index.html为根路径
		loader.load( 'examples/camera.app.json', function ( text ) {

			var player = new iTopo3dExplore.Player();
			player.load( JSON.parse( text ) );
			player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight  );
			player.play();

			displayStand.container.dom.appendChild( player.dom );

			 displayStand.container.dom.addEventListener( 'resize', function () {

			 	player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight );

			 } );

		} );

	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

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
		}

		this.taskObject = taskObject;
	},

}

export { iTopoTaskChildEcologicalFarmHeader };
