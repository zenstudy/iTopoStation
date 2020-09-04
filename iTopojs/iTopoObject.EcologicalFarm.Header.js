/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UISpan, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
//import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from './iTopoFrame/iTopo3dExplore.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoCSS3DBriefcase } from './iTopoFrame/iTopoCSS3DBriefcase.js';
import { iTopoTaskBriefcase } from './iTopoTaskBriefcase/iTopoTaskBriefcase.js';

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

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		containerBaseModel.setPaddingTop('10px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);
		const glftloader = new GLTFLoader();
		glftloader.load('./iTopojs/baseModelFiles/mountain_landscape/scene.gltf', (gltf) => {

			var baseModel = gltf.scene;
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			console.log(baseModel);

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale =0.618/ Math.max(box.max.x,box.max.y, box.max.z );

			baseModel.scale.set(scale,scale,scale);

			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ), baseModel , this.onClickThumbnail);
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/iTopoTaskCards' ), baseModel.clone() , this.onTaskCardsClassCSS3D);
			scope.thumbnailManager.updateCanvasSize();
		});
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setPaddingTop('610px');
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
		this.thumbnailManager.dispose();
		this.thumbnailManager = null;
	},

	onClickThumbnail: function() {// this对应一个item
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

		// var loader = new THREE.FileLoader();// 以Index.html为根路径
		// loader.load( 'examples/camera.app.json', function ( text ) {
		// 	var player = new iTopo3dExplore.Player();
		// 	player.load( JSON.parse( text ) );
		// 	player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight  );
		// 	player.play();
		// 	displayStand.container.dom.appendChild( player.dom );
		// 	displayStand.container.dom.addEventListener( 'resize', function () {
		// 	 	player.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight );
		// 	} );
		// } );

		{
		var sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
		var sphereMateial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
		var sphere = new THREE.Mesh(sphereGeometry, sphereMateial);
		}

		function random(min, max) {
		  return Math.floor(Math.random() * (max - min)) + min;
		}

		const loader = new THREE.CubeTextureLoader(); //载入顺序为[right,left,up,down,front,back]

		var texturePaths = ['images/computer-history-museum/','images/FishPond/','images/Footballfield/','images/Park/'];
		var index = random(0,3);
		const texture = loader.load([
		  texturePaths[index] + 'posx.jpg',
		  texturePaths[index] + 'negx.jpg',
		  texturePaths[index] + 'posy.jpg',
		  texturePaths[index] + 'negy.jpg',
		  texturePaths[index] + 'posz.jpg',
		  texturePaths[index] + 'negz.jpg',
		]);

		var explore = new iTopo3dExplore.Explore();
		explore.show3D(texture , sphere);
		explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight()  );
		explore.play();

		displayStand.container.dom.appendChild( explore.dom );
		displayStand.container.dom.addEventListener( 'resize', function () {
		 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
		} );

	},

	onTaskCardsClassCSS3D: function() {
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var explore = new iTopoCSS3DBriefcase.Explore(displayStand);
		explore.initialize();

		for( var i=0; i < 100; i ++)
		{
			var taskObject = {
				taskStatus:"待办",
				taskDetail:"共享地球任务书" + (i+1),
				taskCreateBy:"任务创建者:事务中心"
			};
			explore.createTaskCardItem(taskObject);
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
	}
}

export { iTopoObjectEcologicalFarmHeader };
