import * as THREE from '../../../build/three.module.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';
import { UIPanel } from '../iTopoUI.js';

function iTopoThumbnailManager() {

	this.thumbnailItemScenes = [];

	this.geometries = [
		new THREE.BoxBufferGeometry(1, 1, 1),
		new THREE.SphereBufferGeometry(0.5, 12, 8),
		new THREE.DodecahedronBufferGeometry(0.5),
		new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 12)
	];

	return this;
}

//iTopoThumbnailManager.prototype = Object.create( UIElement.prototype );
iTopoThumbnailManager.prototype.constructor = iTopoThumbnailManager;

iTopoThumbnailManager.prototype = {

	create :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		var renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setClearColor( 0xcccccc, 1 );
		renderer.setPixelRatio( window.devicePixelRatio );
		this.panelDom.append(renderer.domElement);
		renderer.domElement.style.position = 'absolute';
//		renderer.domElement.className = 'thumbnail';
		this.renderer = renderer;
		console.log(renderer.domElement);

		this.itemsDom = document.createElement('div');
		this.itemsDom.style.position = 'absolute';
		this.panelDom.style.zIndex = 1;
		panelDom.appendChild(this.itemsDom);
	},

	updateCanvasSize: function() {
		//this.itemsDom.style.transform = `translateY(${window.scrollY}px)`;

		var width = this.itemsDom.clientWidth;
		var height = this.itemsDom.clientHeight;

		this.renderer.setSize( width, height, false );
	},

	render : function () {

	//var canvas = document.getElementById('c');
	//canvas.style.transform = `translateY(${window.scrollY}px)`;
	//panelDom.style.transform = `translateY(${window.scrollY}px)`;

	//	var dom = this.panelDom;

		if(this.renderer === undefined)
			return;

		if(this.thumbnailItemScenes.length ===0 )
			return;

	//	this.updateCanvasSize();
		var renderer = this.renderer;

		renderer.setClearColor( 0xffffff );
		renderer.setScissorTest( false );
		renderer.clear();

		renderer.setClearColor( 0xe0e0e0 );
		renderer.setScissorTest( true );

		this.thumbnailItemScenes.forEach(function(scene) {
			//var scene = this.thumbnailItemScenes[0];
			// so something moves
			scene.children[0].rotation.y = Date.now() * 0.001;

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

	createThumbnailItem : function (itemTitle, itemfn) {
		var scene = new THREE.Scene();

		// make a list item
		var elementListItem = document.createElement('div');
		elementListItem.className = 'list-item';

		var sceneElement = document.createElement('div');
		elementListItem.appendChild(sceneElement);
		sceneElement.addEventListener('click', itemfn );

		var descriptionElement = document.createElement('div');
		descriptionElement.innerText = itemTitle;
		elementListItem.appendChild(descriptionElement);
		descriptionElement.addEventListener('click', itemfn );

		// the element that represents the area we want to render the scene
		scene.userData.element = sceneElement;

		this.itemsDom.appendChild(elementListItem);

		console.log(elementListItem.style.zIndex);
		console.log('elementListItem: w = ' + elementListItem.offsetWidth + ',h=' + elementListItem.offsetHeight);

		var camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
		camera.position.z = 2;
		scene.userData.camera = camera;

		var controls = new OrbitControls(scene.userData.camera, scene.userData.element);
		controls.minDistance = 2;
		controls.maxDistance = 5;
		controls.enablePan = false;
		controls.enableZoom = false;
		scene.userData.controls = controls;

		var material = new THREE.MeshStandardMaterial({

			color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
			roughness: 0.5,
			metalness: 0,
			flatShading: true

		});

		var geometry = this.geometries[this.geometries.length * Math.random() | 0];

		scene.add(new THREE.Mesh(geometry, material));

		scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

		var light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(1, 1, 1);
		scene.add(light);

		this.thumbnailItemScenes.push(scene);
	}

}

export { iTopoThumbnailManager };
