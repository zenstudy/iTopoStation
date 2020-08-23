import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from './iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from './iTopoFrame/iTopoArticleManager.js';

function iTopoTaskChildSkyCastleParts( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoTaskChildSkyCastleParts.prototype = Object.create( UIElement.prototype );
iTopoTaskChildSkyCastleParts.prototype.constructor = iTopoTaskChildSkyCastleParts;

iTopoTaskChildSkyCastleParts.prototype = {

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

			var material = new THREE.MeshStandardMaterial({
						color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
						roughness: 0.5,
						metalness: 0,
						flatShading: true
					});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/iTopoSystemDevelopmentGroup' ) , mesh, scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/LifeFoodDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/HumanScienceDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/EcologicalRestorationDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/GreenNewEnergyDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/InterstellarCivilizationResearchGroup' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/RegisteredOrganizationsAndMembers' ) , mesh.clone(), scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/ReservedGroupX' ) , mesh.clone(), scope.onSiteProductClass3D);

			//scope.thumbnailManager.createThumbnailItem( title + '品种2D区' , mesh.clone(), scope.onSiteProductClass2D);

			scope.thumbnailManager.updateCanvasSize();

			editor.signals.sceneRendered.add( function ( ) {
				scope.thumbnailManager.render();
			} );
		}

		scope.taskObject = taskObject;
	},

	onSiteProductClass3D: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/skyCastle/Parts' ) ;
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

	// onSiteProductClass2D: function() {
	// 	var scope = this;
	// 	var title = editor.strings.getKey( 'sidebar/skyCastle/Parts' ) ;
	// 	var displayStand = new iTopoDisplayStand(title);
	// 	document.body.appendChild(displayStand.container.dom);
	// 	displayStand.container.setDisplay( 'block' );

	// 	var dom = document.createElement( 'div' );
	// 	displayStand.container.dom.appendChild( dom );

	// 	var productPanel = new iTopoProductManager();
	// 	productPanel.createDisplayStand(dom);

	// 	for(var i=0; i < 8; ++i)
	// 	{
	// 		productPanel.addProductItem( title + (i+1), onSelect);
	// 	}
	// }
}

export { iTopoTaskChildSkyCastleParts };
