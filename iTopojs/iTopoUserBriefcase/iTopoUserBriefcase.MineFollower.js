import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from '../../../examples/jsm/loaders/OBJLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoTask3dExplore } from '../iTopoFrame/iTopoTask3dExplore.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoUserBriefcaseMineFollower(editor) {
	var scope = this;
	var strings = editor.strings;

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
		glftloader.load('./iTopoObjects/00_Default_Resource/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {

			var baseModel = gltf.scene;
			baseModel.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			var box = new THREE.Box3().setFromObject(baseModel);
			var scale =0.5 / Math.max(box.max.x,box.max.y, box.max.z );
			baseModel.scale.set(scale,scale,scale);

			scope.thumbnailManager.createThumbnailItem( 'follower01', baseModel , scope.onClickThumbnail);
//			scope.thumbnailManager.updateCanvasSize();
		});

		// model

		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		var loader = new OBJLoader( manager );
		loader.load( './iTopoObjects/00_Default_Resource/tree/tree.obj', function ( object ) {

			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					var phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x111111, shininess: 5 } );
					child.material = phongMaterial;
					child.receiveShadow = true;
					child.castShadow = true;
				}
			} );
			var box = new THREE.Box3().setFromObject(object);
			var scale =1.2 / Math.max(box.max.x,box.max.y, box.max.z );

			object.scale.set(scale,scale,scale);
			object.position.y = -0.381;

			scope.thumbnailManager.createThumbnailItem( 'follower02', object , scope.onTaskCardsClassCSS3D);
		} );

	}

	return this;
}

iTopoUserBriefcaseMineFollower.prototype = Object.create( UIElement.prototype );
iTopoUserBriefcaseMineFollower.prototype.constructor = iTopoUserBriefcaseMineFollower;

iTopoUserBriefcaseMineFollower.prototype = {

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
		var scope = this;
		scope.thumbnailManager.dispose();
		scope.thumbnailManager = null;
	},

	onClickThumbnail1: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'userBriefcase/Header' ) ;
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

		var taskFile = './iTopoObjects/' + iTopoEarthModel.SkyCastle.castleUUID + '/tasks.json';
		fetch( taskFile, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {

				var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
				var displayStand = new iTopoDisplayStand(title);
				document.body.appendChild(displayStand.container.dom);
				displayStand.container.setDisplay( 'block' );
				displayStand.container.setPosition('absolate');

				var explore = new iTopoTask3dExplore.Explore(displayStand);
				explore.initialize();

				for (var i = 0; i < json.length; i++) {
					explore.appendCardItem(json[i]);
				}

				// for( var i=0; i < 100; i ++)
				// {
				// 	var taskObject = {
				// 		taskUUID:THREE.MathUtils.generateUUID(),
				// 		taskTitle:'任务标题',
				// 		taskCreatedby:'任务创建者',
				// 		taskStatus:'待办',
				// 		taskDescription:"共享地球任务书" + (i+1),
				// 	};
				// 	explore.appendCardItem(taskObject);
				// }

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

			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );

		}

		this.taskObject = taskObject;
	}
}

export { iTopoUserBriefcaseMineFollower };
