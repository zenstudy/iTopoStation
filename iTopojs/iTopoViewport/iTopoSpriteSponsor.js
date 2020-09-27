import { iTopoDialogLightStar } from '../iTopoDialog.LightStar.js';
import { iTopoDialogRegisterBase } from '../iTopoUserBriefcase/iTopoDialog.RegisterBase.js';
import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';

var iTopoSpriteSponsor = function ( editor ) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'SponsorSprite' );
	container.setDisplay( 'block' );

	// baseUUID
	var toolHeaderRow = new UIRow();
	toolHeaderRow.add(new UIText(strings.getKey('iTopoSpriteSponsor/iTopoEarthSponsor')).setWidth('100px'));
	container.add(toolHeaderRow);

	scope.thumbnailManager = new iTopoThumbnailManager();
	scope.thumbnailManager.setItemClassName("register-item");
	scope.thumbnailManager.create(container.dom);

	var originPosition = new THREE.Vector3();
	editor.resourceTracker.loadModel("iTopoType/TaskObject/EcologicalFarm", originPosition, 1, function(object){
		scope.thumbnailManager.createThumbnailItem( strings.getKey( 'iTopoSpriteSponsor/becomeSponsor' ),
	 	object , scope.onRegisterEcologicalFarm);

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	}) ;

	return container;

};

iTopoSpriteSponsor.prototype = Object.create( UIElement.prototype );
iTopoSpriteSponsor.prototype.constructor = iTopoSpriteSponsor;

iTopoSpriteSponsor.prototype = {

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

	onRegisterEcologicalFarm: function() {
		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightEarthDlg = new iTopoDialogRegisterBase( editor, userBriefcase );
		dlg.add(lightEarthDlg);

		document.body.appendChild(dlgContainer.dom);
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

export { iTopoSpriteSponsor };
