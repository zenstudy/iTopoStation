import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';
import { iTopoDialogNotificationDetail } from '../iTopoDialog/iTopoDialog.NotificationDetail.js';

function iTopoUserBriefcaseMineNotification( editor ) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	container.setPadding( '0px' );
	scope.container = container;

	return scope;
}

function onSelect() {
		console.log(this);
	}

iTopoUserBriefcaseMineNotification.prototype = Object.create( UIElement.prototype );
iTopoUserBriefcaseMineNotification.prototype.constructor = iTopoUserBriefcaseMineNotification;

iTopoUserBriefcaseMineNotification.prototype = {

	activeTabPanel: function(){
		//this.thumbnailManager.updateCanvasSize();
	},

	dispose: function() {
	//	this.thumbnailManager.dispose();
	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {
		var scope = this;
		if (taskObject !== null) {

			var title = editor.strings.getKey( 'userBriefcase/MineNotification/Notification' ) ;
			var notificationPanel = new iTopoNotificationManager();
			scope.notificationPanel = notificationPanel;
			notificationPanel.createDisplayStand(scope.container.dom);

			editor.stationDB.fetchiTopoTaskCards(editor.starUser.info.starUUID,"Todo",function(jsonTodo){

				jsonTodo.forEach(function(taskTodo){
				 	notificationPanel.addNotificationItem(taskTodo.taskTitle, taskTodo.taskDescription,
				 	function(){
				 		scope.onNotification(taskTodo);
				 	});
				 })
			})

		}

		scope.taskObject = taskObject;
	},

	onNotification: function(notificationToRead) {
		var scope = this;
		var title = editor.strings.getKey('userBriefcase/MineNotification/Notification');
		function fnOK(){
			scope.notificationPanel.removeNotificationItem( notificationToRead.taskTitle );
		}
		var notificationDlg = new iTopoDialogNotificationDetail(editor, title, notificationToRead, fnOK);
		document.body.appendChild(notificationDlg.container.dom);
		notificationDlg.container.setDisplay('block');
		notificationDlg.container.setPosition('absolate');

		notificationDlg.container.dom.addEventListener('resize', function() {

		});

		notificationDlg.closeBtn.dom.addEventListener('click', function() {

		});
	}
}

export { iTopoUserBriefcaseMineNotification };
