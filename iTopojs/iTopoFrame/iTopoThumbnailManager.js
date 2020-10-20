import * as THREE from '../../../build/three.module.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';


function iTopoThumbnailManager() {

	this.thumbnailItemScenes = [];
	this.itemClassName = 'list-item';
	return this;
}

//iTopoThumbnailManager.prototype = Object.create( UIElement.prototype );
iTopoThumbnailManager.prototype.constructor = iTopoThumbnailManager;

iTopoThumbnailManager.prototype = {

	active: function(){
		var scope = this;
		scope.renderer.setAnimationLoop(function() {scope.render();});
	},

	deactive: function(){
		var scope = this;
		scope.renderer.setAnimationLoop(null);
	},
	setItemClassName: function(newItemClassName){
		this.itemClassName = newItemClassName;
	},
	create :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		var renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setClearColor( 0x86c9c9, 1 );
		renderer.setPixelRatio( window.devicePixelRatio );
		this.panelDom.append(renderer.domElement);
		renderer.domElement.style.position = 'absolute';
		this.renderer = renderer;
//		console.log(renderer.domElement);

		this.itemsDom = document.createElement('div');
		this.itemsDom.style.position = 'absolute';
//		this.panelDom.style.zIndex = 1;
		panelDom.appendChild(this.itemsDom);
	},

	updateCanvasSize: function() {
		//this.itemsDom.style.transform = `translateY(${window.scrollY}px)`;

		var width = this.itemsDom.clientWidth;
		var height = this.itemsDom.clientHeight;

		this.renderer.setSize( width, height, false );
	},

	render : function () {
	//console.log('rendering length:' + this.thumbnailItemScenes.length);

	//var canvas = document.getElementById('c');
	//canvas.style.transform = `translateY(${window.scrollY}px)`;
	//panelDom.style.transform = `translateY(${window.scrollY}px)`;

	//	var dom = this.panelDom;

		if(this.renderer === undefined)
			return;

		if(this.thumbnailItemScenes.length ===0 )
			return;

		this.updateCanvasSize();

		var renderer = this.renderer;

		renderer.setClearColor( 0xffffff );
		renderer.setScissorTest( false );
		renderer.clear();

		renderer.setClearColor( 0x86c9c9 );
		renderer.setScissorTest( true );

		this.thumbnailItemScenes.forEach(function(scene) {
			//var scene = this.thumbnailItemScenes[0];
			// so something moves
			scene.children[0].rotation.y -= 0.001;

			// get the element that is a place holder for where we want to
			// draw the scene
			var element = scene.userData.element;

			// get its position relative to the page's viewport
			//var rect = element.getBoundingClientRect();

			var rect = {};
			rect.left = element.offsetLeft;
			rect.top  = element.offsetTop;
			rect.right = element.offsetLeft + element.offsetWidth;
			rect.bottom  = element.offsetTop + element.offsetHeight;
//			console.log(rect);


			// check if it's offscreen. If so skip it
			if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
				rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
					console.log('out off screen');
					console.log('renderer.domElement offset screen: ch='+ renderer.domElement.clientHeight	+', cw=' +renderer.domElement.clientWidth);

				return; // it's off screen
			}

			// set the viewport
			var width = rect.right - rect.left;
			var height = rect.bottom - rect.top;
			var left = rect.left;
			var bottom = renderer.domElement.clientHeight - rect.bottom;

			renderer.setViewport(left, bottom, width, height);
			renderer.setScissor(left, bottom, width, height);

			var camera = scene.userData.camera;

			//camera.aspect = width / height; // not changing in this example
			//camera.updateProjectionMatrix();

			scene.userData.controls.update();

			renderer.render(scene, camera);

		});
	},

	createThumbnailItem : function (itemTitle, objectThreejs , itemfn) {
		var scene = new THREE.Scene();

		// make a list item
		var elementListItem = document.createElement('div');
		elementListItem.className = this.itemClassName;
		elementListItem.addEventListener('click', itemfn );

		var sceneElement = document.createElement('div');
		elementListItem.appendChild(sceneElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.innerText = itemTitle;
		elementListItem.appendChild(descriptionElement);

		// the element that represents the area we want to render the scene
		scene.userData.element = sceneElement;
		scene.name = itemTitle;

		this.itemsDom.appendChild(elementListItem);

		var camera = new THREE.PerspectiveCamera(61.8, 1.0, 1, 10);
		camera.position.z = 2.2;
		scene.userData.camera = camera;

		var controls = new OrbitControls(scene.userData.camera, scene.userData.element);
		controls.minDistance = 1;
		controls.maxDistance = 10;
		controls.enablePan = true;
		controls.enableZoom = true;
		scene.userData.controls = controls;

		scene.add(objectThreejs);

		this.addLights(scene);

		this.thumbnailItemScenes.push(scene);
	},

	addLights: function(scene) {
		scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

		var light = new THREE.DirectionalLight(0xffffff, 0.8);
		light.position.set(0.5, 0.5, 1);
		scene.add(light);
	},

	replaceThumbnailItemObject3d: function(itemTitle, objectThreejs)
	{
		var scope = this;
		this.thumbnailItemScenes.forEach( function (scene){
			if(scene.name === itemTitle){
				scene.children.length = 0;
				scene.add(objectThreejs);
				scope.addLights(scene);
			}
		});
	},

	clearAllThumbnailItems: function(){

		var scope = this;
		scope.thumbnailItemScenes.forEach( function (scene){
			scope.clearScene(scene);
			scene.children.length = 0;
		});
		scope.thumbnailItemScenes = [];

		var childs = scope.itemsDom.childNodes;
		for(var i = childs .length - 1; i >= 0; i--) {
		  scope.itemsDom.removeChild(childs[i]);
		}

	},

	clearScene: function ( scene ) {
		var scope = this;
		if (!scene) return;
		// 删除掉所有的模型组内的mesh
		scene.traverse(function(item) {
			if (item instanceof THREE.Mesh) {
				item.geometry.dispose(); // 删除几何体
				if (Array.isArray(item.material))
					item.material.length = 0;
				else
					item.material.dispose(); // 删除材质
			}
		});
	},

	dispose: function() {
		var scope = this;
		scope.deactive();
		scope.thumbnailItemScenes.forEach( function (scene){
			scope.clearScene(scene);
			scene.children.length = 0;
		});
		scope.thumbnailItemScenes = [];
		scope.renderer.dispose();
		scope.renderer.forceContextLoss();
		scope.renderer = null;

//		console.log('===disposed:iTopoThumbnailManager=========== ');
//		console.log(scope);
	}
}

export { iTopoThumbnailManager };
