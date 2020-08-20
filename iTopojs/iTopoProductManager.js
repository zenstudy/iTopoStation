import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';
import { UIPanel } from './iTopoUI.js';

function iTopoProductManager() {

//	this.productItems = [];

	return this;
}

//iTopoProductManager.prototype = Object.create( UIElement.prototype );
iTopoProductManager.prototype.constructor = iTopoProductManager;

iTopoProductManager.prototype = {

	createDisplayStand :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		var itemsPanel = new UIPanel();
		itemsPanel.setPosition( 'absolute' );
		this.itemsDom = itemsPanel.dom;
		panelDom.appendChild(this.itemsDom);
	},

	addProductItem : function (itemTitle, itemfn) {

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

		this.itemsDom.appendChild(elementListItem);

		console.log(elementListItem.style.zIndex);
		console.log('elementListItem: w = ' + elementListItem.offsetWidth + ',h=' + elementListItem.offsetHeight);

//		this.productItems.push(elementListItem);
	}

}

export { iTopoProductManager };
