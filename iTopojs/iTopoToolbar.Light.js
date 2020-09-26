
//import { UIBoolean } from '../js/libs/ui.three.js';
import { iTopoDialogLightStar } from './iTopoDialog.LightStar.js';
import { iTopoDialogRegisterBase } from './iTopoUserBriefcase/iTopoDialog.RegisterBase.js';

import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
import { iTopoThumbnailManager } from './iTopoFrame/iTopoThumbnailManager.js';

var iTopoToolbarLight = function ( editor ) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'LightToolbar' );
	container.setDisplay( 'block' );

	scope.thumbnailManager = new iTopoThumbnailManager();
	scope.thumbnailManager.setItemClassName("register-item");
	scope.thumbnailManager.create(container.dom);

	var originPosition = new THREE.Vector3();
	editor.resourceTracker.loadModel("iTopoType/TaskObject/EcologicalFarm", originPosition, 1, function(object){
		scope.thumbnailManager.createThumbnailItem( strings.getKey( 'iTopoToolbarLight/RegisterEcologicalFarm' ),
	 	object , scope.onRegisterEcologicalFarm);

		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
	}) ;

	editor.resourceTracker.loadModel("iTopoType/TaskObject/SharedCanteen", originPosition, 1, function(object){
		scope.thumbnailManager.createThumbnailItem( strings.getKey( 'iTopoToolbarLight/RegisterSharedCanteen' ),
		 	object , scope.onRegisterSharedCanteen);

			scope.thumbnailManager.updateCanvasSize();
			scope.thumbnailManager.active();
	}) ;

	return container;

};

iTopoToolbarLight.prototype = Object.create( UIElement.prototype );
iTopoToolbarLight.prototype.constructor = iTopoToolbarLight;

iTopoToolbarLight.prototype = {

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

	onRegisterSharedCanteen: function() {// this对应一个item
		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var lightEarthDlg = new iTopoDialogRegisterBase( editor, userBriefcase );
		dlg.add(lightEarthDlg);

		document.body.appendChild(dlgContainer.dom);
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

export { iTopoToolbarLight };
