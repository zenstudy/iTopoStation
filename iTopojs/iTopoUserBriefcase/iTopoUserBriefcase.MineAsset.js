import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from '../../../examples/jsm/loaders/OBJLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';
import { iTopoDialogRegisterBase } from './iTopoDialog.RegisterBase.js';

function iTopoUserBriefcaseMineAsset(editor) {
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
	}

	return this;
}

iTopoUserBriefcaseMineAsset.prototype = Object.create( UIElement.prototype );
iTopoUserBriefcaseMineAsset.prototype.constructor = iTopoUserBriefcaseMineAsset;

iTopoUserBriefcaseMineAsset.prototype = {

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

	getValue: function () {

		return this.starUser;

	},

	setValue: function (starUser) {
		var scope = this;
		this.starUser = starUser;
		if (starUser === null) { return; }

		for(var i=0; i < starUser.info.userRegisteredBases.length; ++i){

			editor.stationDB.fetchBaseObjectWithObjectUUID(starUser.info.userRegisteredBases[i], function(baseObjectOnEarth){
				var originPosition = new THREE.Vector3();
				editor.resourceTracker.loadModel(baseObjectOnEarth.taskType, originPosition, 1, function(object){
					object.userData = {	objectUUID: baseObjectOnEarth.baseUUID, objectType: baseObjectOnEarth.taskType, };
					scope.thumbnailManager.createThumbnailItem( baseObjectOnEarth.title, object, function(){
						console.log('iTopoUserBriefcaseMineAsset.create' + baseObjectOnEarth.title);
					});
				}) ;
			})
		}
	},

	registerMineAsset: function(baseObjectOnEarth) {
		var scope = this;
		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadModel(baseObjectOnEarth.taskType, originPosition, 1, function(object){

			object.userData = {	objectUUID: baseObjectOnEarth.baseUUID, objectType: baseObjectOnEarth.taskType, };
			scope.thumbnailManager.createThumbnailItem( baseObjectOnEarth.title, object, function(){
				var baseObject = editor.objectByiTopoUUID(baseObjectOnEarth.baseUUID);
				editor.select(baseObject);
				editor.signals.objectFocused.dispatch( baseObject );
			});

		}) ;
	}
}

export { iTopoUserBriefcaseMineAsset };
