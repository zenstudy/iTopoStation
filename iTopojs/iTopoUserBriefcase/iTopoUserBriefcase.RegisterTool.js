import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDialogRegisterBase } from '../iTopoUserBriefcase/iTopoDialog.RegisterBase.js';

function iTopoUserBriefcaseRegisterTool(editor, userBriefcase) {
	var scope = this;
	var strings = editor.strings;

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		containerBaseModel.setPaddingTop('10px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadModel("iTopoType/TaskObject/EcologicalFarm", originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'userBriefcase/RegisterTool/RegisterSharedCanteen' ),
		 	object , scope.onRegisterEcologicalFarm);
		}) ;

		editor.resourceTracker.loadModel("iTopoType/TaskObject/SharedCanteen", originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'userBriefcase/RegisterTool/RegisterEcologicalFarm' ),
			 	object , scope.onRegisterSharedCanteen);
		}) ;
	}

	return this;
}

iTopoUserBriefcaseRegisterTool.prototype = Object.create( UIElement.prototype );
iTopoUserBriefcaseRegisterTool.prototype.constructor = iTopoUserBriefcaseRegisterTool;

iTopoUserBriefcaseRegisterTool.prototype = {

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

export { iTopoUserBriefcaseRegisterTool };
