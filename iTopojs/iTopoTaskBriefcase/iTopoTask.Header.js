import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopo3dExplore } from '../iTopoFrame/iTopo3dExplore.js';
import { iTopoCSS3DBriefcase } from '../iTopoFrame/iTopoCSS3DBriefcase.js';
import { iTopoTaskBriefcase } from '../iTopoTaskBriefcase/iTopoTaskBriefcase.js';

function iTopoTaskHeader(editor) {
	var scope = this;
	var strings = editor.strings;

	var taskInfo = {
		taskUUID:THREE.MathUtils.generateUUID(),
		taskTitle:'任务标题',
		taskCreatedby:'任务创建者',
		taskDescription:'关于此任务的详细描述',
	};

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
		this.geometryUUID.setValue(taskInfo.taskUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('taskbar/Header/taskUUID')).setWidth('90px'));
		geometryUUIDRow.add(this.geometryUUID);

		containerParameter.add(geometryUUIDRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('taskbar/Header/taskTitle')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(taskInfo.taskTitle);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		containerParameter.add(titleRow);
	}

	{
		// task created by
		var taskCreatedbyRow = new UIRow();
		taskCreatedbyRow.add(new UIText(strings.getKey('taskbar/Header/taskCreatedby')).setWidth('90px'));

		this.taskCreatedbyInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.taskCreatedbyInput.setValue(taskInfo.taskCreatedby);
		this.taskCreatedbyInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		taskCreatedbyRow.add(this.taskCreatedbyInput);

		containerParameter.add(taskCreatedbyRow);
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add(new UIText(strings.getKey('taskbar/Header/taskDescription')).setWidth('90px'));
		containerParameter.add(starWishTitleRow);

		var starWishTextAreaRow = new UIRow();
		this.starWishValueUI = new UITextArea().setWidth('520px').setFontSize('12px') /*.onChange( update )*/ ;
		this.starWishValueUI.dom.style.height = '300px';
		this.starWishValueUI.setValue(taskInfo.taskDescription);
		this.starWishValueUI.onKeyUp(function() {
			//starUser.starWish = this.getValue();

		});
		starWishTextAreaRow.add(this.starWishValueUI);

		containerParameter.add(starWishTextAreaRow);
	}

	return this;
}

iTopoTaskHeader.prototype = Object.create( UIElement.prototype );
iTopoTaskHeader.prototype.constructor = iTopoTaskHeader;

iTopoTaskHeader.prototype = {

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

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.castleUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	}
}

export { iTopoTaskHeader };
