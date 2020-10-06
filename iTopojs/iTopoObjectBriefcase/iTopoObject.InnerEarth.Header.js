import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoObjectInnerEarthHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var innerEarthinfo=iTopoEarthModel.InnerEarth.info;

	var container = new UISpan();
	this.container = container;

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setTop('140px');
		containerBaseModel.setWidth('280px');
		containerBaseModel.setHeight('150px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/InnerEarth/Header/Outlook' ),
		 	object , scope.onClickOutlook);
		}) ;

		editor.resourceTracker.loadiTopoTasksLogo(originPosition, 0.8, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/InnerEarth/Header/iTopoTaskCards' ),
			 	object , scope.onTaskCardsClassCSS3D);
		}) ;
	}

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
//	containerParameter.setTop('550px');
	container.add(containerParameter);

	{
		// baseUUID
		var baseUUIDRow = new UIRow();
		baseUUIDRow.add(new UIText(strings.getKey('sidebar/InnerEarth/Header/innerEarthUUID')).setWidth('270px'));
		containerParameter.add(baseUUIDRow);

		var baseUUIDValueRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('270px').setFontSize('10px').setDisabled(true);
		this.geometryUUID.setBackground("#ffffff");
		this.geometryUUID.setValue(innerEarthinfo.innerEarthUUID);

		baseUUIDValueRow.add(this.geometryUUID);
		containerParameter.add(baseUUIDValueRow);

	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/InnerEarth/Header/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(innerEarthinfo.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	return this;
}

iTopoObjectInnerEarthHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectInnerEarthHeader.prototype.constructor = iTopoObjectInnerEarthHeader;

iTopoObjectInnerEarthHeader.prototype = {

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
		if(this.thumbnailManager !== undefined && this.thumbnailManager !== null){
			this.thumbnailManager.dispose();
			this.thumbnailManager = null;
		}
	},

	onClickOutlook: function() {// this对应一个item
		
	},

	onTaskCardsClassCSS3D: function() {
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var explore = new iTopoTaskDashboard3D.Explore(displayStand);
		explore.initialize();

		for( var i=0; i < 100; i ++)
		{
			var taskObject = {
				taskStatus:"待办",
				taskDetail:"共享地球任务书" + (i+1),
				taskCreateBy:"任务创建者:事务中心"
			};
			explore.createTaskCardItem(taskObject);
		}

		explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());

		explore.show3D();
		explore.play();

		displayStand.container.dom.appendChild( explore.dom );
		displayStand.container.dom.addEventListener( 'resize', function () {
		 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight());
		});

		displayStand.closeBtn.dom.addEventListener('click', function() {
			explore.stop();
			explore.dispose();
			explore = null;
		});

		var taskBriefcase = new iTopoTaskBriefcase( editor );
		displayStand.container.dom.appendChild( taskBriefcase.dom );
	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.castleUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}

}

export { iTopoObjectInnerEarthHeader };
