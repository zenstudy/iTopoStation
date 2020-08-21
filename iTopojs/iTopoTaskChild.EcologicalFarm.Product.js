/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { iTopoDisplayStand } from './iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from './iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from './iTopoFrame/iTopoArticleManager.js';

function iTopoTaskChildEcologicalFarmProduct( editor ) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoTaskChildEcologicalFarmProduct.prototype = Object.create( UIElement.prototype );
iTopoTaskChildEcologicalFarmProduct.prototype.constructor = iTopoTaskChildEcologicalFarmProduct;

iTopoTaskChildEcologicalFarmProduct.prototype = {

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

			var title = scope.strings.getKey( 'sidebar/EcologicalFarm/product' );

			scope.thumbnailManager.createThumbnailItem( title + '品种3D区' , scope.onSiteProductClass3D);
			scope.thumbnailManager.createThumbnailItem( title + '品种2D区' , scope.onSiteProductClass2D);

			scope.thumbnailManager.updateCanvasSize();

			editor.signals.sceneRendered.add( function ( ) {
				scope.thumbnailManager.render();
			} );
		}

		scope.taskObject = taskObject;
	},

	onSiteProductClass3D: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/product' ) ;
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
			scope.outlookManager.createThumbnailItem( title + (i+1), onSelect);
		}
		scope.outlookManager.updateCanvasSize();

		editor.signals.sceneRendered.add( function ( ) {
			scope.outlookManager.render();
		} );
	},

	onSiteProductClass2D: function() {
		var scope = this;
		var title = editor.strings.getKey( 'sidebar/EcologicalFarm/product' ) ;
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

export { iTopoTaskChildEcologicalFarmProduct };
