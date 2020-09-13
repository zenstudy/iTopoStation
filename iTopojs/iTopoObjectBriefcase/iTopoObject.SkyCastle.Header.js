import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoTask3dExplore } from '../iTopoFrame/iTopoTask3dExplore.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoObjectSkyCastleHeader(editor) {
	var scope = this;
	var strings = editor.strings;

	var container = new UISpan();
	this.container = container;

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setPaddingTop('10px');
	container.add(containerParameter);

	{
		// baseUUID
		var geometryUUIDRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.geometryUUID.setValue(iTopoEarthModel.SkyCastle.castleUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/castleUUID')).setWidth('90px'));
		geometryUUIDRow.add(this.geometryUUID);

		containerParameter.add(geometryUUIDRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(iTopoEarthModel.SkyCastle.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		var containerBaseModel = new UIPanel();
		containerBaseModel.setBorderTop('0');
		containerBaseModel.setPaddingTop('90px');
		container.add(containerBaseModel);

		scope.thumbnailManager = new iTopoThumbnailManager();
		scope.thumbnailManager.create(containerBaseModel.dom);

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/Outlook' ),
		 	object , scope.onClickThumbnail);
		}) ;

		editor.resourceTracker.loadSmallCityModel(originPosition, 1, function(object){
			scope.thumbnailManager.createThumbnailItem( strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ),
			 	object , scope.onTaskCardsClassCSS3D);
		}) ;
	}

	return this;
}

iTopoObjectSkyCastleHeader.prototype = Object.create( UIElement.prototype );
iTopoObjectSkyCastleHeader.prototype.constructor = iTopoObjectSkyCastleHeader;

iTopoObjectSkyCastleHeader.prototype = {

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

	onClickThumbnail: function() {// this对应一个item
		var scope = this;
	    var title = editor.strings.getKey( 'sidebar/EcologicalFarm/Header/siteOutook' ) ;
		var displayStand = new iTopoDisplayStand(title);
		document.body.appendChild(displayStand.container.dom);
		displayStand.container.setDisplay( 'block' );
		displayStand.container.setPosition('absolate');

		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadSmallCityModel(originPosition, 30, function(baseModel){
			var explore = new iTopo3dExplore.Explore();
			explore.show3D(null , baseModel);
			explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
			explore.play();

			displayStand.container.dom.appendChild( explore.dom );
			displayStand.container.dom.addEventListener( 'resize', function () {
			 	explore.setSize( displayStand.container.dom.offsetWidth, displayStand.contexHeight() );
			} );
		}) ;
	},

	onTaskCardsClassCSS3D: function() {

		editor.stationDB.fetchiTopoTaskCards(iTopoEarthModel.SkyCastle.castleUUID,function(json){
			var title = editor.strings.getKey( 'sidebar/skyCastle/Header/iTopoTaskCards' ) ;
			var displayStand = new iTopoDisplayStand(title);
			document.body.appendChild(displayStand.container.dom);
			displayStand.container.setDisplay( 'block' );
			displayStand.container.setPosition('absolate');
			
			var explore = new iTopoTask3dExplore.Explore(displayStand);
			explore.initialize();
			
			for (var i = 0; i < json.length; i++) {
				explore.appendCardItem(json[i]);
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
		});
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

export { iTopoObjectSkyCastleHeader };
