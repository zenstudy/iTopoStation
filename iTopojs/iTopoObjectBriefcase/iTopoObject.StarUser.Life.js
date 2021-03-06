import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';

function iTopoObjectStarUserLife( editor ) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	container.setPadding( '0px' );
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoObjectStarUserLife.prototype = Object.create( UIElement.prototype );
iTopoObjectStarUserLife.prototype.constructor = iTopoObjectStarUserLife;

iTopoObjectStarUserLife.prototype = {

	activeTabPanel: function(){
		//this.thumbnailManager.updateCanvasSize();
	},
	
	dispose: function() {
	//	this.thumbnailManager.dispose();
	},
	
	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			var title = editor.strings.getKey( 'sidebar/StarUser/life' ) ;
			var productPanel = new iTopoArticleManager();
			productPanel.createDisplayStand(scope.container.dom);

			for(var i=0; i < 8; ++i)
			{
				var qrcodeURL = "./iTopojs/QRcode/" + "iTopoBaseQrcode" + ".png";
				productPanel.addArticleItem(qrcodeURL , '共享食堂' + title + (i+1), 'Lorem ipsum dolor sit amet...', this.onSiteProduct);
			}

		}

		scope.taskObject = taskObject;
	},

	onSiteProduct: function() {
		var scope = this;
		var title = editor.strings.getKey( 'sidebar/StarUser/life' ) ;
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

export { iTopoObjectStarUserLife };
