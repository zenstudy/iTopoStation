/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';

import { iTopoThumbnailManager } from './iTopoThumbnailManager.js';

function iTopoTaskChildStarUserItems( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

iTopoTaskChildStarUserItems.prototype = Object.create( UIElement.prototype );
iTopoTaskChildStarUserItems.prototype.constructor = iTopoTaskChildStarUserItems;

iTopoTaskChildStarUserItems.prototype = {

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

export { iTopoTaskChildStarUserItems };
