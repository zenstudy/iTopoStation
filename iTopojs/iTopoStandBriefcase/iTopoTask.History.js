import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';

function iTopoTaskHistory( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	scope.container = container;

	return scope;
}

iTopoTaskHistory.prototype = Object.create( UIElement.prototype );
iTopoTaskHistory.prototype.constructor = iTopoTaskHistory;

iTopoTaskHistory.prototype = {

	activeTabPanel: function() {
		var scope = this;
	},

	deactiveTabPanel: function(){
		var scope = this;

	},

	dispose: function() {
		var scope = this;
	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		scope.taskObject = taskObject;
	}
}

export { iTopoTaskHistory };
