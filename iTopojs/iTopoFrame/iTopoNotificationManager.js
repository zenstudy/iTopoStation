import { UIPanel } from '../iTopoUI.js';

function iTopoNotificationManager() {

	return this;
}

//iTopoArticleManager.prototype = Object.create( UIElement.prototype );
iTopoNotificationManager.prototype.constructor = iTopoNotificationManager;

iTopoNotificationManager.prototype = {

	createDisplayStand :function (panelDom){
		var scope = this;
		this.panelDom = panelDom;

		this.itemsPanel =document.createElement('div');
		this.itemsPanel.id = 'NotificationItem';
		panelDom.appendChild(this.itemsPanel);

		this.itemsUL = document.createElement('ul');
		this.itemsPanel.append(this.itemsUL);
	},

	addNotificationItem : function (itemTitle, itemSummary, itemfn) {
		// make a list item
		var liElement = document.createElement('li');

		var h3Element = document.createElement('h3');
		h3Element.innerText = itemTitle;
		liElement.appendChild(h3Element);

		var pElement  = document.createElement('p');
		pElement.innerText = itemSummary;
		liElement.appendChild(pElement);

		liElement.addEventListener('click',itemfn );
		this.itemsUL.appendChild(liElement);
	},

	removeNotificationItem : function (itemTitle) {
		var scope = this;
		var Lis = this.itemsUL.getElementsByTagName('li');
		console.log(Lis);
		for(var i = 0; i < Lis.length; i++){
			var h3Element = Lis[i].getElementsByTagName("h3")[0];
			console.log(h3Element);
			console.log(itemTitle);
			if(h3Element.innerText === itemTitle){
				this.itemsUL.removeChild(Lis[i]);
				return;
			}
		}
	}
}

export { iTopoNotificationManager };
