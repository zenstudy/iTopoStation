import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoObjectInnerEarthHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var innerEarthinfo=iTopoEarthModel.InnerEarth.info;

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
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/InnerEarth/Header/Outlook' ),
		 	object , scope.onClickThumbnail);
		}) ;

		editor.resourceTracker.loadTreeModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/InnerEarth/Header/iTopoTaskCards' ),
			 	object , scope.onTaskCardsClassCSS3D);
		}) ;
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

iTopoObjectInnerEarthHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectInnerEarthHeader.prototype.constructor = iTopoObjectInnerEarthHeader;

iTopoObjectInnerEarthHeader.prototype = {

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

			//webaudio_orientation.html
			// var reflectionCube = new THREE.CubeTextureLoader()
			// 	.setPath( 'textures/cube/SwedishRoyalCastle/' )
			// 	.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );

		const loader = new THREE.CubeTextureLoader(); //载入顺序为[right,left,up,down,front,back]

		var texturePaths = ['iTopoObjects/00_Default_Resource/computer-history-museum/',
		'iTopoObjects/00_Default_Resource/FishPond/',
		'iTopoObjects/00_Default_Resource/Footballfield/',
		'iTopoObjects/00_Default_Resource/Park/'];
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

	onClickThumbnail: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		const glftloader = new GLTFLoader();
		glftloader.load('./iTopoObjects/00_Default_Resource/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {

			var baseModel = gltf.scene;
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale =30 / Math.max(box.max.x,box.max.y, box.max.z );
			baseModel.scale.set(scale,scale,scale);

			var explore = new iTopo3dExplore.Explore();
			explore.show3D(null , baseModel);
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
			explore.play();

			displayStand.container.dom.appendChild( explore.dom );
			displayStand.container.dom.addEventListener( 'resize', function () {
			 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
			} );
		});
	},

	onTaskCardsClassCSS3D: function() {
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var explore = new iTopoTaskDashboard3D.Explore(displayStand);
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
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.castleUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}

}

export { iTopoObjectInnerEarthHeader };
