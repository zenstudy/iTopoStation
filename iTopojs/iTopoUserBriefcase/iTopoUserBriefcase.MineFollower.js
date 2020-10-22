import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from '../../../examples/jsm/loaders/OBJLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';

function iTopoUserBriefcaseMineFollower(editor) {
	var scope = this;
	var strings = editor.strings;

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		//containerBaseModel.setPaddingTop('10px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('960px');
		containerBaseModel.setOverflow('auto');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.setItemClassName("register-item");
		scope.thumbnailManager.create(containerBaseModel.dom);
	}

	return this;
}

iTopoUserBriefcaseMineFollower.prototype = Object.create( UIElement.prototype );
iTopoUserBriefcaseMineFollower.prototype.constructor = iTopoUserBriefcaseMineFollower;

iTopoUserBriefcaseMineFollower.prototype = {

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

		return this.taskObject;

	},

	setValue: function (taskObject) {
		var scope = this;
		if (taskObject === null) {
		//	container.setDisplay( 'block' );
		return;
		}

		this.taskObject = taskObject;

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadTreeModel(originPosition, 1, function(object){

			editor.stationDB.fetchiTopoStars(function(allUsers){
				if(taskObject.info.fellowerUUIDs){
					taskObject.info.fellowerUUIDs.forEach(function( followerUUID ){

					allUsers.forEach(function(starUserInfo) {
							if( followerUUID === starUserInfo.starUUID ){
								scope.thumbnailManager.createThumbnailItem( starUserInfo.userNickname ,
								object.clone(), function() {
									scope.locationStarUser(starUserInfo);
								});
							}
						})
					})
				}
				

				scope.thumbnailManager.updateCanvasSize();
				scope.thumbnailManager.active();

			});

		}) ;
	},

	locationStarUser: function(starUserJson) {
		iTopoEarthModel.focusStar(starUserJson);
	}
}

export { iTopoUserBriefcaseMineFollower };
