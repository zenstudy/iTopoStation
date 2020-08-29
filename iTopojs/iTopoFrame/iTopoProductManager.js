import * as THREE from '../../../build/three.module.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';
import { UIPanel } from '../iTopoUI.js';

function iTopoProductManager() {
	return this;
}

//iTopoProductManager.prototype = Object.create( UIElement.prototype );
iTopoProductManager.prototype.constructor = iTopoProductManager;

iTopoProductManager.prototype = {

	createDisplayStand :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		// var itemsPanel = new UIPanel();
		// itemsPanel.setPosition( 'absolute' );
		this.itemsDom = document.createElement('div');
		//this.itemsDom.id = 'ProductPanel';
		panelDom.appendChild(this.itemsDom);
	},

	addProductItem : function (itemTitle, imgURL, itemfn) {

		// make a list item
		var elementListItem = document.createElement('div');
		elementListItem.className = 'product-item';
		elementListItem.addEventListener('click', itemfn );

		var sceneElement=document.createElement("img");
		sceneElement.src = imgURL;
		elementListItem.appendChild(sceneElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.innerText = itemTitle;
		elementListItem.appendChild(descriptionElement);

		this.itemsDom.appendChild(elementListItem);
	}

}

export { iTopoProductManager };
