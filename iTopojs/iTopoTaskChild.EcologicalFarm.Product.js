import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from './iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from './iTopoFrame/iTopoArticleManager.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

function iTopoTaskChildEcologicalFarmProduct(editor) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

iTopoTaskChildEcologicalFarmProduct.prototype = Object.create(UIElement.prototype);
iTopoTaskChildEcologicalFarmProduct.prototype.constructor = iTopoTaskChildEcologicalFarmProduct;


iTopoTaskChildEcologicalFarmProduct.prototype = {

	updateCanvasSize: function() {
		this.thumbnailManager.updateCanvasSize();
	},

	getValue: function() {
		return this.taskObject;
	},

	setValue: function(taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			scope.thumbnailManager = new iTopoThumbnailManager();

			scope.thumbnailManager.create(scope.container.dom);

			var title = scope.strings.getKey('sidebar/EcologicalFarm/product');

			var material = new THREE.MeshStandardMaterial({
				color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
				roughness: 0.5,
				metalness: 0,
				flatShading: true
			});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

			scope.thumbnailManager.createThumbnailItem(title + '品种2D区', mesh.clone(), function() {
				scope.onSiteProductClass2D(taskObject.baseUUID)
			});

			scope.thumbnailManager.createThumbnailItem(title + '品种3D区', mesh, function() {
				scope.onSiteProductClass3D(taskObject.baseUUID)
			});

			scope.thumbnailManager.updateCanvasSize();

			editor.signals.sceneRendering.add(function() {
				scope.thumbnailManager.render();
			});
		}

		scope.taskObject = taskObject;
	},

	onSiteProductClass2D: function(baseUUID) {

		var title = editor.strings.getKey('sidebar/EcologicalFarm/product');
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay('block');

		var dom = document.createElement('div');
		displayStand.container.dom.appendChild(dom);

		var productPanel = new iTopoProductManager();
		productPanel.createDisplayStand(dom);

		var products = [{
				productUUID: 'c0984864-6ee2-42fe-b9c2-dcf5dbbcc63c',
				productName: '甘露酵素1'
			},
			{
				productUUID: '2be79eeb-d6ed-4a2f-822c-2c4f2171d510',
				productName: '甘露酵素2'
			},
			{
				productUUID: '5ee18f21-3779-4322-b46e-ae283f8b98b3',
				productName: '甘露酵素3'
			},
			{
				productUUID: '9bc9d83e-6975-49b7-a191-3adb2a0f4961',
				productName: '甘露酵素4'
			},
			{
				productUUID: '0f9bb19e-e37f-4425-aa7e-25b42f222db2',
				productName: '甘露酵素5'
			},
			{
				productUUID: '43671efb-3f5c-4bde-b223-1598ff94cbea',
				productName: '甘露酵素6'
			},
			{
				productUUID: '13dc56ff-f6a7-4db4-8cb9-7fb91a36346a',
				productName: '甘露酵素7'
			},
			{
				productUUID: 'b510e507-708a-4258-8fb1-0ed71109567a',
				productName: '甘露酵素8'
			},
			{
				productUUID: 'a508bc59-577a-497b-bd50-0b0903bccc73',
				productName: '紫苏泡无筋姜1'
			},
			{
				productUUID: '65363296-f221-47ea-a96e-9756638f73bc',
				productName: '紫苏泡无筋姜2'
			}
		];

		for (var i = 0; i < products.length; ++i) {
			var imgURL = "./iTopoObjects/" + baseUUID + "/Product2d/" + products[i].productUUID + "/" + products[i].productUUID +
				".jpg";
			var detailURL = "./iTopoObjects/" + baseUUID + "/Product2d/" + products[i].productUUID + "/" + products[i].productUUID +
				".html";
			productPanel.addProductItem(products[i].productName, imgURL, function onOpen2DDetailPage() {
				displayStand.container.dom.removeChild(dom);

				var iframe = document.createElement('iframe');

				//iframe.src = "./iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/threejs-primitives.html";
				iframe.src = detailURL;
				iframe.style.width = '100%';
				iframe.style.height = '100%';

				displayStand.container.dom.appendChild(iframe);
			});
		}
	},

	onSiteProductClass3D: function(baseUUID) { // this对应一个item
		var scope = this;
		var title = editor.strings.getKey('sidebar/EcologicalFarm/product');
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay('block');
		displayStand.container.setPosition('absolate');

		var dom = document.createElement('div');
		displayStand.container.dom.appendChild(dom);

		var products = [{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox1'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox2'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox3'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox4'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox5'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox6'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox7'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox8'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox9'
			},
			{
				productUUID: 'e02db457-e5a0-475b-96a9-a3b5035b6114',
				productName: 'boomBox10'
			}
		];

		scope.outlookManager = new iTopoThumbnailManager();
		scope.outlookManager.create(dom);
		for (var i = 0; i < products.length; ++i) {
			var modelURL = "./iTopoObjects/" + baseUUID + "/Product3d/" + products[i].productUUID +"/" + "glTF-Binary/BoomBox.glb";
			var productName = products[i].productName;
			var gltfLoader = new GLTFLoader();
			gltfLoader.load( modelURL, function ( gltf ) {
				var boomBox = gltf.scene;
				// boomBox.position.set( 0, 0.2, 0 );
				// boomBox.scale.set( 20, 20, 20 );
				boomBox.traverse( function ( object ) {
					if ( object.isMesh ) {
						//object.material.envMap = reflectionCube;
						//object.material = material;
						object.geometry.rotateY( - Math.PI );
						object.castShadow = true;
					}
				} );

				var box = new THREE.Box3().setFromObject(boomBox);
				var scale =0.81 / Math.max(box.max.x, box.max.y, box.max.z );
				boomBox.scale.set(scale,scale,scale);
				//boomBox.add( positionalAudio );//可以添加背景音乐

				scope.outlookManager.createThumbnailItem(productName, boomBox, function onOpen3DDetailPage() {
					displayStand.container.dom.removeChild(dom);

					var iframe = document.createElement('iframe');

					iframe.src = "./iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/threejs-primitives.html";
					//iframe.src = detailURL;
					iframe.style.width = '100%';
					iframe.style.height = '100%';

					displayStand.container.dom.appendChild(iframe);
				});

			});
		}

		scope.outlookManager.updateCanvasSize();

		editor.signals.sceneRendering.add(function() {
			scope.outlookManager.updateCanvasSize();
			scope.outlookManager.render();
		});
	}
}

export {
	iTopoTaskChildEcologicalFarmProduct
};
