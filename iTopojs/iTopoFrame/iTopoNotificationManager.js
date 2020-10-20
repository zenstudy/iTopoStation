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

	addNotificationItem : function (task2ReadNotification, itemfn) {

		if(!task2ReadNotification.taskUUID)
		return;

		// make a list item
		var liElement = document.createElement('li');
		liElement.name = task2ReadNotification.taskUUID;

//		console.log(task2ReadNotification);
//		alert(liElement.name);

		var h3Element = document.createElement('h3');
		h3Element.innerText = task2ReadNotification.taskTitle;
		liElement.appendChild(h3Element);

		var pElement  = document.createElement('p');
		pElement.innerText = task2ReadNotification.taskDescription;
		liElement.appendChild(pElement);

		liElement.addEventListener('click',itemfn );
		this.itemsUL.appendChild(liElement);
	},

	removeNotificationItem : function (task2ReadNotification) {
		var scope = this;
		var Lis = this.itemsUL.getElementsByTagName('li');

		for(var i = 0; i < Lis.length; i++){
			var liElement = Lis[i];

			if(liElement.name === task2ReadNotification.taskUUID){
				this.itemsUL.removeChild(Lis[i]);
//				alert('remove success');
				return;
			}
		}
	}
}

export { iTopoNotificationManager };
