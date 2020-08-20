/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';

import { iTopoThumbnailManager } from './iTopoThumbnailManager.js';

function iTopoTaskChildSkyCastleItems( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

iTopoTaskChildSkyCastleItems.prototype = Object.create( UIElement.prototype );
iTopoTaskChildSkyCastleItems.prototype.constructor = iTopoTaskChildSkyCastleItems;

iTopoTaskChildSkyCastleItems.prototype = {

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			editor.thumbnailManager.create(scope.container.dom);

			editor.thumbnailManager.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/iTopoItems/workplace' ) );

			editor.thumbnailManager.updateCanvasSize();
		}

		this.taskObject = taskObject;
	},

}

export { iTopoTaskChildSkyCastleItems };
