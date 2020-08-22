import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopoProductManager } from './iTopoFrame/iTopoProductManager.js';

function iTopoTaskChildSharedCanteenMenu( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoTaskChildSharedCanteenMenu.prototype = Object.create( UIElement.prototype );
iTopoTaskChildSharedCanteenMenu.prototype.constructor = iTopoTaskChildSharedCanteenMenu;

iTopoTaskChildSharedCanteenMenu.prototype = {

	updateCanvasSize: function(){
		this.thumbnailManager.updateCanvasSize();
	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			scope.thumbnailManager = new iTopoThumbnailManager();
			scope.thumbnailManager.create(scope.container.dom);
			var title = editor.strings.getKey( 'sidebar/SharedCanteen/menu' );

			var material = new THREE.MeshStandardMaterial({
						color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
						roughness: 0.5,
						metalness: 0,
						flatShading: true
					});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

			scope.thumbnailManager.createThumbnailItem( title + '品种3D区' , mesh, scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( title + '品种2D区' , mesh.clone(), scope.onSiteProductClass2D);

			scope.thumbnailManager.updateCanvasSize();

			editor.signals.sceneRendered.add( function ( ) {
				scope.thumbnailManager.render();
			} );
		}

		this.taskObject = taskObject;
	},

	onSiteProductClass3D: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/SharedCanteen/menu' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var dom = document.createElement( 'div' );
		displayStand.container.dom.appendChild( dom );

		scope.outlookManager = new iTopoThumbnailManager();
		scope.outlookManager.create(dom);

		for(var i=0; i < 8; ++i)
		{
			var material = new THREE.MeshStandardMaterial({
						color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
						roughness: 0.5,
						metalness: 0,
						flatShading: true
					});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);
			scope.outlookManager.createThumbnailItem( title + (i+1), mesh, onSelect);
		}
		scope.outlookManager.updateCanvasSize();

		editor.signals.sceneRendered.add( function ( ) {
			scope.outlookManager.render();
		} );
	},

	onSiteProductClass2D: function() {
		var scope = this;
		var title = editor.strings.getKey( 'sidebar/SharedCanteen/menu' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );

		var dom = document.createElement( 'div' );
		displayStand.container.dom.appendChild( dom );

		var productPanel = new iTopoProductManager();
		productPanel.createDisplayStand(dom);

		for(var i=0; i < 8; ++i)
		{
			productPanel.addProductItem( title + (i+1), onSelect);
		}
	}
}

export { iTopoTaskChildSharedCanteenMenu };
