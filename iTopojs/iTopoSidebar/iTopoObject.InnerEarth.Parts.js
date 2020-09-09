import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';
import { iTopoTask3dExplore } from '../iTopoFrame/iTopoTask3dExplore.js';

function iTopoObjectInnerEarthParts( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoObjectInnerEarthParts.prototype = Object.create( UIElement.prototype );
iTopoObjectInnerEarthParts.prototype.constructor = iTopoObjectInnerEarthParts;

iTopoObjectInnerEarthParts.prototype = {

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

			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/iTopoSystemDevelopmentGroup' ) , mesh, scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/LifeFoodDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/HumanScienceDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/EcologicalRestorationDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/GreenNewEnergyDevelopmentGroup' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/InterstellarCivilizationResearchGroup' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/RegisteredOrganizationsAndMembers' ) , mesh.clone(), scope.onSiteProductClassCSS3D);
			scope.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Parts/ReservedGroupX' ) , mesh.clone(), scope.onSiteProductClassCSS3D);

			//scope.thumbnailManager.createThumbnailItem( title + '品种2D区' , mesh.clone(), scope.onSiteProductClass2D);

			scope.thumbnailManager.updateCanvasSize();
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
		scope.outlookManager.active();
		
		displayStand.closeBtn.dom.addEventListener('click', function(){
			scope.outlookManager.deactive();
			scope.outlookManager.dispose();
			scope.outlookManager = null;
		});
	},

	onSiteProductClassCSS3D: function() {
	var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var explore = new iTopoTask3DView.Explore();
		explore.show3D();
		explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight()  );
		explore.play();

		displayStand.container.dom.appendChild( explore.dom );
		displayStand.container.dom.addEventListener( 'resize', function () {
		 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
		} );
	}
}

export { iTopoObjectInnerEarthParts };
