/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';

function iTopoObjectLunarMoonLife( editor ) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	container.setPadding( '0px' );
	scope.container = container;

	return scope;
}

iTopoObjectLunarMoonLife.prototype = Object.create( UIElement.prototype );
iTopoObjectLunarMoonLife.prototype.constructor = iTopoObjectLunarMoonLife;

iTopoObjectLunarMoonLife.prototype = {

	activeTabPanel: function(){
		//this.thumbnailManager.updateCanvasSize();
	},

	dispose: function() {

	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			var title = editor.strings.getKey( 'sidebar/skyCastle/Life' ) ;
			var productPanel = new iTopoArticleManager();
			productPanel.createDisplayStand(scope.container.dom);

			for(var i=0; i < 8; ++i)
			{
				var qrcodeURL = "./iTopojs/QRcode/" + "iTopoBaseQrcode" + ".png";
				productPanel.addArticleItem(qrcodeURL , title + (i+1), 'Lorem ipsum dolor sit amet...', this.onSelect);
			}

		}

		scope.taskObject = taskObject;
	},

	onSelect: function () {

			var displayStand = new iTopoDisplayStand('test');
			document.body.appendChild(displayStand.container.dom);
			displayStand.container.setDisplay( 'block' );

			var iframe = document.createElement('iframe');

			iframe.src = "./iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/threejs-primitives.html";
			iframe.style.width = '100%';
			iframe.style.height = '100%';

			displayStand.container.dom.appendChild( iframe );
	}
}

export { iTopoObjectLunarMoonLife };
