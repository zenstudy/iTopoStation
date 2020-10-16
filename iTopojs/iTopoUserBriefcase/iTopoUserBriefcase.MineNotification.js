import { UIElement,UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoNotificationManager } from '../iTopoFrame/iTopoNotificationManager.js';
import { iTopoDialogNotificationDetail } from '../iTopoDialog/iTopoDialog.NotificationDetail.js';
import { iTopoDialogVoteForJoining } from '../iTopoDialog/iTopoDialog.VoteForJoining.js';
import { iTopoDefinitionSet } from '../iTopoElement/iTopoDefinitionSet.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';

function iTopoUserBriefcaseMineNotification(editor) {
	this.editor = editor;
	var scope = this;
	scope.strings = editor.strings;

	var container = new UIPanel();
	container.setMargin('5px');
	container.setBorder('2px');
	container.setPadding('2px');
	container.setWidth('282px');
	container.setHeight('960px');
	container.setBackgroundColor('#ffffff');


	scope.container = container;

	return scope;
}

function onSelect() {
	console.log(this);
}

iTopoUserBriefcaseMineNotification.prototype = Object.create(UIElement.prototype);
iTopoUserBriefcaseMineNotification.prototype.constructor = iTopoUserBriefcaseMineNotification;

iTopoUserBriefcaseMineNotification.prototype = {

	activeTabPanel: function() {
		//this.thumbnailManager.updateCanvasSize();
	},

	dispose: function() {
		//	this.thumbnailManager.dispose();
	},

	getValue: function() {
		return this.taskObject;
	},

	setValue: function(taskObject) {
		var scope = this;
		if (taskObject !== null) {

			var title = editor.strings.getKey('userBriefcase/MineNotification/Notification');
			var notificationPanel = new iTopoNotificationManager();
			scope.notificationPanel = notificationPanel;
			notificationPanel.createDisplayStand(scope.container.dom);

			editor.stationDB.fetchiTopoTasks(editor.starUser.info.starUUID, "Todo", function(jsonTodo) {

				jsonTodo.forEach(function(taskTodo) {
					notificationPanel.addNotificationItem(taskTodo.taskTitle, taskTodo.taskDescription,
						function() {
							scope.onNotification(taskTodo);
						});
				})
			})

		}

		scope.taskObject = taskObject;
	},

	onNotification: function(taskForNotification) {
		var scope = this;
		var title = editor.strings.getKey('userBriefcase/MineNotification/Notification');

		if (taskForNotification.taskType === "MessageToRead") {

			var notificationDlg = new iTopoDialogNotificationDetail(editor, title, taskForNotification, function fnOK() {

				scope.notificationPanel.removeNotificationItem(taskForNotification.taskTitle);
				editor.stationDB.updateTaskStatus(taskForNotification, "已办",
					function() {
						//editor.stationDB.addNotification();//发送通过的信息，申请者的uuid
					});

			});

			document.body.appendChild(notificationDlg.container.dom);
			notificationDlg.container.setDisplay('block');
			notificationDlg.container.setPosition('absolate');

			notificationDlg.container.dom.addEventListener('resize', function() {

			});

			notificationDlg.closeBtn.dom.addEventListener('click', function() {

			});

		} else if (taskForNotification.taskType === "JoiningApplyToVote") {

			var notificationDlg = new iTopoDialogVoteForJoining(editor, title, taskForNotification.taskTitle,

				function fnVoteForAgree() {
					scope.notificationPanel.removeNotificationItem(taskForNotification.taskTitle);
					scope.fnAfterVote("agree", taskForNotification);
					editor.stationDB.updateTaskStatus(taskForNotification, "已办", function() {});
					//发送通过的信息，申请者的uuid
				},

				function fnVoteForAgainst() {
					scope.notificationPanel.removeNotificationItem(taskForNotification.taskTitle);
					scope.fnAfterVote("against", taskForNotification);
					editor.stationDB.updateTaskStatus(taskForNotification, "已办", function() {});
					//发送通过的信息，申请者的uuid
				});

			document.body.appendChild(notificationDlg.container.dom);
			notificationDlg.container.setDisplay('block');
			notificationDlg.container.setPosition('absolate');

			notificationDlg.container.dom.addEventListener('resize', function() {

			});

			notificationDlg.closeBtn.dom.addEventListener('click', function() {

			});
		}
	},

	fnAfterVote: function(voteResult, taskForNotification) { // voteResult= "agree" or "against"
		var scope = this;
		editor.stationDB.fetchiTopoTasks(iTopoEarthModel.SkyCastle.info.castleUUID, "Todo", function(allTasks) {

			var taskInCastle;

			for (var i = 0; i < allTasks.length; ++i) {
				taskInCastle = allTasks[i];
				if (taskInCastle.taskUUID !== taskForNotification.generatedFromTaskUUID)
					continue;

				var numberOfVotesAgreed = 0,
					numberOfVotesAgainst = 0,
					totalNumberOfVotes = 0;

				if (taskInCastle.voteDetail === undefined) {
					taskInCastle.voteDetail = [];
				}

				var voteInfo = {
					voter: editor.starUser.info.userNickname,
					result: voteResult,
				};
				taskInCastle.voteDetail.push(voteInfo);

				for (var i = 0; i < taskInCastle.voteDetail.length; ++i) {
					if (taskInCastle.voteDetail[i].result === "agree") {
						numberOfVotesAgreed++;
					} else if (taskInCastle.voteDetail[i].result === "against") {
						numberOfVotesAgainst++;
					}
					totalNumberOfVotes++;
				}

				if (totalNumberOfVotes < 3) {
					taskInCastle.voteResult = 'inprogress';
					editor.stationDB.updateTaskStatus(taskInCastle, "待办",
						function() {
							//editor.stationDB.addNotification();//仅更新状态
						});
				} else if (numberOfVotesAgreed >= 3 && numberOfVotesAgreed > numberOfVotesAgainst) {

					scope.applyPassed(taskInCastle, taskForNotification);

				} else if (numberOfVotesAgainst >= 3 && numberOfVotesAgainst > numberOfVotesAgreed) {

					scope.applyUnpassed(taskInCastle, taskForNotification);

				}

				break;
			}
		});

	},

	applyPassed: function(taskInCastle, taskForNotification) {
		taskInCastle.voteResult = 'passed';
		editor.stationDB.updateTaskStatus(taskInCastle, "已办", function() {

			//在team中加入新成员，
			editor.stationDB.addMemberToiTopobaseTeams(iTopoEarthModel.SkyCastle.info.castleUUID,
				taskInCastle.applyDetail.teamToJoinUUID, taskInCastle.applyDetail.applicantUUID,
				function() {
					//	editor.stationDB.addNotification();
				});

			//通知相关人员
			editor.stationDB.fetchiTopobaseWorkTeams(taskInCastle.objectUUID, function(teamObjects) {
				for (var i = 0; i < teamObjects.length; ++i) {
					if (teamObjects[i].teamUUID === taskInCastle.applyDetail.teamToJoinUUID) {

						//通知新成员
						var taskObject = {
							objectUUID: taskInCastle.applyDetail.applicantUUID,
							taskUUID: THREE.MathUtils.generateUUID(),
							taskType: "MessageToRead",
							generatedFromTaskUUID: taskInCastle.taskUUID,
							taskTitle: '关于加入xxx的申请已经批准的消息',
							taskCreatedby: '共享地球系统',
							taskStatus: '待办',
							taskDescription: '加入志愿者团队-' + teamObjects[i].teamName + '的申请已经批准，欢迎您的加入。',
						};
						editor.stationDB.addTask(JSON.stringify(taskObject), function() {
							//	editor.stationDB.addNotification();
						});

						//通知整个团队
						for (var j = 0; j < teamObjects[i].teamMemberUUIDs.length; ++j) {
							var taskObject = {
								objectUUID: teamObjects[i].teamMemberUUIDs[j],
								taskUUID: THREE.MathUtils.generateUUID(),
								taskType: "MessageToRead",
								generatedFromTaskUUID: taskInCastle.taskUUID,
								taskTitle: '志愿者已经加入团队:' + teamObjects[i].teamName,
								taskCreatedby: '共享地球系统',
								taskStatus: '待办',
								taskDescription: "",
							};

							editor.stationDB.addTask(JSON.stringify(taskObject), function() {
								//	editor.stationDB.addNotification();
							});
						}

					}
				}
			})
		});
	},

	applyUnpassed: function(taskInCastle, taskForNotification) {

		taskInCastle.voteResult = 'unpassed';
		//将任务放入已完成
		editor.stationDB.updateTaskStatus(taskInCastle, "已办", function() {

			editor.stationDB.fetchiTopobaseWorkTeams(taskInCastle.objectUUID, function(teamObjects) {
				for (var i = 0; i < teamObjects.length; ++i) {
					if (teamObjects[i].teamUUID === taskInCastle.applyDetail.teamToJoinUUID) {
						alert('info to each related members');
						//通知申请者申请未通过
						var taskObject = {
							objectUUID: taskInCastle.applyDetail.applicantUUID,
							taskUUID: THREE.MathUtils.generateUUID(),
							taskType: "MessageToRead",
							generatedFromTaskUUID: taskInCastle.taskUUID,
							taskTitle: '加入xxx的申请未批准',
							taskCreatedby: '共享地球系统',
							taskStatus: '待办',
							taskDescription: editor.starUser.info.userNickname + '想加入志愿者团队-' +
								teamObjects[i].teamName + '未通过集体投票，希望您再接再厉不要放弃。',
						};

						console.log(taskObject);
						editor.stationDB.addTask(JSON.stringify(taskObject), function() {
							//	editor.stationDB.addNotification();
						});

						//通知整个团队申请者申请未通过
						for (var j = 0; j < teamObjects[i].teamMemberUUIDs.length; ++j) {
							var taskObject = {
								objectUUID: teamObjects[i].teamMemberUUIDs[j],
								taskUUID: THREE.MathUtils.generateUUID(),
								taskType: "MessageToRead",
								generatedFromTaskUUID: taskInCastle.taskUUID,
								taskTitle: '志愿者加入团队:' + teamObjects[i].teamName + '的申请未通过',
								taskCreatedby: '共享地球系统',
								taskStatus: '待办',
								taskDescription: "",
							};

							console.log(taskObject);
							editor.stationDB.addTask(JSON.stringify(taskObject), function() {
								//	editor.stationDB.addNotification();
							});
						}

					}
				}
			})

		});

	}
}

export {
	iTopoUserBriefcaseMineNotification
};
