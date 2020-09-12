import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';

function iTopoObjectStarUserDiyCreations( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoObjectStarUserDiyCreations.prototype = Object.create( UIElement.prototype );
iTopoObjectStarUserDiyCreations.prototype.constructor = iTopoObjectStarUserDiyCreations;

iTopoObjectStarUserDiyCreations.prototype = {

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

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			scope.thumbnailManager = new iTopoThumbnailManager();

			scope.thumbnailManager.create(scope.container.dom);

			var title = scope.strings.getKey( 'sidebar/StarUser/DiyCreations' );

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

		}

		scope.taskObject = taskObject;
	},

	onSiteProductClass3D: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/StarUser/DiyCreations' ) ;
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

		scope.outlookManager.active();

		displayStand.closeBtn.dom.addEventListener('click', function(){
			scope.outlookManager.deactive();
			scope.outlookManager.dispose();
			scope.outlookManager = null;
		});
	},

	onSiteProductClass2D: function() {
		var scope = this;
		var title = editor.strings.getKey( 'sidebar/StarUser/DiyCreations' ) ;
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

export { iTopoObjectStarUserDiyCreations };
