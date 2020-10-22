import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';

function iTopoTaskHeader(editor) {
	var scope = this;
	var strings = editor.strings;

	var taskInfo = {
		taskUUID:THREE.MathUtils.generateUUID(),
		taskTitle:'任务标题',
		taskStatus:'待办',
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
		var taskUUIDRow = new UIRow();
		this.taskUUIDInput = new UIInput().setWidth('320px').setFontSize('12px').setDisabled(true);
		this.taskUUIDInput.setValue(taskInfo.taskUUID);
		taskUUIDRow.add(new UIText(strings.getKey('taskbar/Header/taskUUID')).setWidth('90px'));
		taskUUIDRow.add(this.taskUUIDInput);

		containerParameter.add(taskUUIDRow);
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
		// status
		var statusRow = new UIRow();
		statusRow.add(new UIText(strings.getKey('taskbar/Header/taskStatus')).setWidth('90px'));

		this.statusInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.statusInput.setValue(taskInfo.taskStatus);
		this.statusInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		statusRow.add(this.statusInput);

		containerParameter.add(statusRow);
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
		var taskDescTitleRow = new UIRow();
		taskDescTitleRow.add(new UIText(strings.getKey('taskbar/Header/taskDescription')).setWidth('90px'));
		containerParameter.add(taskDescTitleRow);

		var taskDescTextAreaRow = new UIRow();
		this.taskDescTextArea = new UITextArea().setWidth('520px').setFontSize('12px') /*.onChange( update )*/ ;
		this.taskDescTextArea.dom.style.height = '300px';
		this.taskDescTextArea.setValue(taskInfo.taskDescription);
		this.taskDescTextArea.onKeyUp(function() {
			//starUser.starWish = this.getValue();

		});
		taskDescTitleRow.add(this.taskDescTextArea);

		containerParameter.add(taskDescTitleRow);
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

		if (taskObject !== null) {
		//	container.setDisplay( 'block' );
			this.taskUUIDInput.setValue(taskObject.taskUUID);
			this.titleInput.setValue(taskObject.taskTitle);
			this.statusInput.setValue(taskObject.taskStatus);
			this.taskCreatedbyInput.setValue(taskObject.taskCreatedby);
			this.taskDescTextArea.setValue(taskObject.taskDescription);
		}

		this.taskObject = taskObject;
	}
}

export { iTopoTaskHeader };
