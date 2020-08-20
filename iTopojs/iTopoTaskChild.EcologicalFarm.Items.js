/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { iTopoThumbnailManager } from './iTopoThumbnailManager.js';
import { iTopoDisplayStand } from './iTopoDisplayStand.js';
import { iTopoProductManager } from './iTopoProductManager.js';

function iTopoTaskChildEcologicalFarmItems( editor ) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

iTopoTaskChildEcologicalFarmItems.prototype = Object.create( UIElement.prototype );
iTopoTaskChildEcologicalFarmItems.prototype.constructor = iTopoTaskChildEcologicalFarmItems;

iTopoTaskChildEcologicalFarmItems.prototype = {

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			editor.thumbnailManager.create(scope.container.dom);

			editor.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/EcologicalFarm/iTopoItems/siteOutook' ) , scope.onSiteOutlook);
			editor.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/EcologicalFarm/iTopoItems/siteLife' ) , scope.onSiteLife);
			editor.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/EcologicalFarm/iTopoItems/siteProduct' ) , scope.onSiteProduct);

			editor.thumbnailManager.updateCanvasSize();
		}

		this.taskObject = taskObject;
	},

	onSiteOutlook: function() {

		var displayStand = new iTopoDisplayStand();
		document.body.appendChild(displayStand.dom);
		displayStand.setDisplay( 'block' );
	},

	onSiteLife: function() {

		var displayStand = new iTopoDisplayStand();
		document.body.appendChild(displayStand.dom);
		displayStand.setDisplay( 'block' );
	},

	onSiteProduct: function() {
		var scope = this;

		var displayStand = new iTopoDisplayStand();
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );

		var dom = document.createElement( 'div' );
		displayStand.container.dom.appendChild( dom );

		var productPanel = new iTopoProductManager();
		productPanel.createDisplayStand(dom);

		for(var i=0; i < 8; ++i)
		{
			productPanel.addProductItem( 'scene', scope.onSelect);
		}

		// var productPanel = new iTopoThumbnailManager();
		// productPanel.create(dom);

		// for(var i=0; i < 8; ++i)
		// {
		// 	productPanel.createThumbnailItem( 'scene', scope.onSelect);
		// }
		// productPanel.updateCanvasSize();
	},

	onSelect:function() {
		alert('on select');
	}
}

export { iTopoTaskChildEcologicalFarmItems };
