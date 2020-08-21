import * as THREE from '../../../build/three.module.js';
import { OrbitControls } from '../../../examples/jsm/controls/OrbitControls.js';
import { UIPanel } from '../iTopoUI.js';

function iTopoArticleManager() {

//	this.productItems = [];

	return this;
}

//iTopoArticleManager.prototype = Object.create( UIElement.prototype );
iTopoArticleManager.prototype.constructor = iTopoArticleManager;

iTopoArticleManager.prototype = {

	createDisplayStand :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		this.itemsPanel =document.createElement('div');
		this.itemsPanel.id = 'ArticleItem';
		panelDom.appendChild(this.itemsPanel);

		this.itemsUL = document.createElement('ul');
		this.itemsPanel.append(this.itemsUL);
	},

	addArticleItem : function (img, itemTitle, itemSummary, itemfn) {
		// make a list item
		var liElement = document.createElement('li');

		var imgElement = document.createElement('img');
		imgElement.src = img;
		liElement.appendChild(imgElement);

		var h3Element = document.createElement('h3');
		h3Element.innerText = itemTitle;
		liElement.appendChild(h3Element);

		var pElement  = document.createElement('p');
		pElement.innerText = itemSummary;
		liElement.appendChild(pElement);

		liElement.addEventListener('click',itemfn );
		this.itemsUL.appendChild(liElement);
	}
}

export { iTopoArticleManager };
