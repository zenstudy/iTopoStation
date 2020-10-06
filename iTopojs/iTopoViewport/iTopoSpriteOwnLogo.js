
import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDialogBluePrint } from '../iTopoDialog/iTopoDialog.BluePrint.js';

var iTopoSpriteOwnLogo = function ( editor ) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'OwnLogoSprite' );
	container.setDisplay( 'block' );

	scope.thumbnailManager = new iTopoThumbnailManager();
	scope.thumbnailManager.setItemClassName("register-item");
	scope.thumbnailManager.create(container.dom);

	var originPosition = new THREE.Vector3();
	editor.resourceTracker.loadiTopoEarthLogo(originPosition, 1, function(object){
		scope.thumbnailManager.createThumbnailItem( strings.getKey( 'iTopoSpriteOwnLogo/logoCaption' ),
	 	object , scope.onRegisterEcologicalFarm);

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	}) ;

	return container;

};

iTopoSpriteOwnLogo.prototype = Object.create( UIElement.prototype );
iTopoSpriteOwnLogo.prototype.constructor = iTopoSpriteOwnLogo;

iTopoSpriteOwnLogo.prototype = {

	activeTabPanel: function() {
		var scope = this;
		if(scope.thumbnailManager === null) return;
		if(scope.thumbnailManager === undefined) return;

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	},

	deactiveTabPanel: function(){
		var scope = this;
		if(scope.thumbnailManager === null) return;
		scope.thumbnailManager.deactive();
	},

	dispose: function() {
		var scope = this;
		scope.thumbnailManager.dispose();
		scope.thumbnailManager = null;
	},

	onRegisterEcologicalFarm: function() {// this对应一个item

		var scope = this;
		var title = editor.strings.getKey('menubar/AboutiTopoEarth/iTopoBluePrint');
		var bluePrintWindow = new iTopoDialogBluePrint(title);
		document.body.appendChild(bluePrintWindow.container.dom);
		bluePrintWindow.container.setDisplay('block');
		bluePrintWindow.container.setPosition('absolate');


		bluePrintWindow.container.dom.addEventListener('resize', function() {

		});

		bluePrintWindow.closeBtn.dom.addEventListener('click', function() {

		});

	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );

		}

		this.taskObject = taskObject;
	}
}

export { iTopoSpriteOwnLogo };
