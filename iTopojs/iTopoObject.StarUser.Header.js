/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UISpan , UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';

import { OBJLoader2 } from '../../examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from '../../examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from '../../examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from './iTopoFrame/iTopo3dExplore.js';
import { iTopoTask3dExplore } from './iTopoFrame/iTopoTask3dExplore.js';
import { iTopoTaskBriefcase } from './iTopoTaskBriefcase/iTopoTaskBriefcase.js';

var __tmp_scope;
function iTopoObjectStarUserHeader(editor) {
	var scope = this;
	__tmp_scope = this;
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

		// const glftloader = new GLTFLoader();
		// glftloader.load('./iTopojs/baseModelFiles/simple_house_scene/scene.gltf', (gltf) => {

		// 	var baseModel = gltf.scene;
		// 	baseModel.traverse((child) => {
		// 		if (child.isMesh) {
		// 			child.castShadow = true;
		// 			child.receiveShadow = true;
		// 		}
		// 	});

		// 	var box = new THREE.Box3().setFromObject(baseModel);
		// 	var scale =0.81 / Math.max(box.max.x,box.max.y, box.max.z );

		// 	baseModel.scale.set(scale,scale,scale);

		// 	var thumbnailManager = new iTopoThumbnailManager();
		// 	thumbnailManager.create(containerBaseModel.dom);
		// 	thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/Outlook' ), baseModel , this.onClickBaseModel);
		// 	thumbnailManager.updateCanvasSize();

		// 	editor.signals.sceneRendering.add( function ( ) {
		// 		thumbnailManager.updateCanvasSize();
		// 		thumbnailManager.render();
		// 	} );
		// });

		{
			scope.thumbnailManager = new iTopoThumbnailManager();
			scope.thumbnailManager.create(containerBaseModel.dom);

			const mtlLoader = new MTLLoader();
			mtlLoader.load('./iTopojs/baseModelFiles/female02/female02.mtl', (mtlParseResult) => {
				console.log(mtlParseResult);
				const objLoader = new OBJLoader2();
				const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
				//materials.Material.side = THREE.DoubleSide;
				objLoader.addMaterials(materials);
				objLoader.load('./iTopojs/baseModelFiles/female02/female02.obj', (baseModel) => {

					var box = new THREE.Box3().setFromObject(baseModel);
					var scale =2.0 / Math.max(box.max.x,box.max.y, box.max.z );
					baseModel.scale.set(scale,scale,scale);
					baseModel.position.set(0,-1.0,0);

					scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/Outlook' ), baseModel , this.onClickThumbnail);
					scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/StarUser/Header/iTopoTaskCards' ), baseModel.clone() , this.onTaskCardsClassCSS3D);
					scope.thumbnailManager.updateCanvasSize();
				});
			});
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
		this.thumbnailManager.dispose();
		this.thumbnailManager = null;
	},

	onClickThumbnail1: function() {// this对应一个item
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
		explore.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight  );
		explore.play();

		displayStand.container.dom.appendChild( explore.dom );
		displayStand.container.dom.addEventListener( 'resize', function () {
		 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight );
		} );

	},

	onClickThumbnail2: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		const glftloader = new GLTFLoader();
		glftloader.load('./iTopojs/baseModelFiles/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {

			var baseModel = gltf.scene;
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			console.log(baseModel);


			var explore = new iTopo3dExplore.Explore();
			explore.show3D(null , baseModel);
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight  );
			explore.play();

			displayStand.container.dom.appendChild( explore.dom );
			displayStand.container.dom.addEventListener( 'resize', function () {
			 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.container.dom.offsetHeight );
			} );

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale =30 / Math.max(box.max.x,box.max.y, box.max.z );

			baseModel.scale.set(scale,scale,scale);

			// var thumbnailManager = new iTopoThumbnailManager();
			// thumbnailManager.create(containerBaseModel.dom);
			// thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ), baseModel , this.onClickThumbnail);
			// thumbnailManager.updateCanvasSize();

			// editor.signals.sceneRendering.add( function ( ) {
			// 	thumbnailManager.updateCanvasSize();
			// 	thumbnailManager.render();
			// } );
		});
	},

	onClickThumbnail: function() {// this对应一个item

	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var female = {
			mtl:'./iTopojs/baseModelFiles/female02/female02.mtl',
			obj:'./iTopojs/baseModelFiles/female02/female02.obj'
		};
		var male = {
			mtl:'./iTopojs/baseModelFiles/male02/male02.mtl',
			obj:'./iTopojs/baseModelFiles/male02/male02.obj'
		};

		var being = (__tmp_scope.genderInput.getValue() === "female") ? female : male;

		const mtlLoader = new MTLLoader();
		mtlLoader.load(being.mtl, (mtlParseResult) => {
			console.log(mtlParseResult);
			const objLoader = new OBJLoader2();
			const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			//materials.Material.side = THREE.DoubleSide;
			objLoader.addMaterials(materials);
			objLoader.load(being.obj, (baseModel) => {

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale =100.0 / Math.max(box.max.x,box.max.y, box.max.z );
			baseModel.scale.set(scale,scale,scale);
			baseModel.position.set(0,-50.0,0);

			var explore = new iTopo3dExplore.Explore();
			explore.show3D( null , baseModel);
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight()  );
			explore.play();

			displayStand.container.dom.appendChild( explore.dom );
			displayStand.container.dom.addEventListener( 'resize', function () {
				explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());
			} );

			});
		});
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
		var female = {
			mtl:'./iTopojs/baseModelFiles/female02/female02.mtl',
			obj:'./iTopojs/baseModelFiles/female02/female02.obj'
		};
		var male = {
			mtl:'./iTopojs/baseModelFiles/male02/male02.mtl',
			obj:'./iTopojs/baseModelFiles/male02/male02.obj'
		};

		var being = (gender === "female") ? female : male;

		const mtlLoader = new MTLLoader();
		mtlLoader.load(being.mtl, (mtlParseResult) => {

			const objLoader = new OBJLoader2();
			const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			//materials.Material.side = THREE.DoubleSide;
			objLoader.addMaterials(materials);
			objLoader.load(being.obj, (baseModel) => {

				var box = new THREE.Box3().setFromObject(baseModel);
				var scale =2.0 / Math.max(box.max.x,box.max.y, box.max.z );
				baseModel.scale.set(scale,scale,scale);
				baseModel.position.set(0,-1.0,0);

				var title = editor.strings.getKey( 'sidebar/StarUser/Header/Outlook' );
				scope.thumbnailManager.replaceThumbnailItemObject3d(title,baseModel);
			});
		});
	},

	onTaskCardsClassCSS3D: function() {
			var scope = this;
		    var title = editor.strings.getKey( 'sidebar/StarUser/Header/iTopoTaskCards' ) ;
			var displayStand = new iTopoDisplayStand(title);
			document.body.appendChild(displayStand.container.dom);
			displayStand.container.setDisplay( 'block' );
			displayStand.container.setPosition('absolate');

			var explore = new iTopoTask3dExplore.Explore(displayStand);
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
		}
}

export { iTopoObjectStarUserHeader };
