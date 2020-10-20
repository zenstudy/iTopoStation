import { UIElement,UISpan,UIPanel, UIBreak, UIText , UIRow, UIInput} from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoDialogApplyToJoining } from '../iTopoDialog/iTopoDialog.ApplyToJoining.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';


function iTopoObjectSkyCastleTeams( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UISpan();
	scope.container = container;

	var groupPanel = new UIPanel();
	groupPanel.setWidth('280px');
	groupPanel.setHeight('460px');
	groupPanel.setOverflow('auto');
	scope.thumbnailManager = new iTopoThumbnailManager();
//	scope.thumbnailManager.setItemClassName("register-item");
	scope.thumbnailManager.create(groupPanel.dom);

	container.add(groupPanel);

	var memberDetailPanel = new UIPanel();
	memberDetailPanel.setTop( '530px' );
	memberDetailPanel.setWidth('260px');
	memberDetailPanel.setHeight('400px');
	memberDetailPanel.setOverflow('auto');

	var geometryUUIDRow = new UIRow();
	scope.thumbnailManager2 = new iTopoThumbnailManager();
	scope.thumbnailManager2.setItemClassName("register-item");
	scope.thumbnailManager2.create(geometryUUIDRow.dom);
	memberDetailPanel.add(geometryUUIDRow);
	container.add(memberDetailPanel);

	return scope;
}

iTopoObjectSkyCastleTeams.prototype = Object.create( UIElement.prototype );
iTopoObjectSkyCastleTeams.prototype.constructor = iTopoObjectSkyCastleTeams;

iTopoObjectSkyCastleTeams.prototype = {

	activeTabPanel: function() {
		var scope = this;
		if(scope.thumbnailManager !== null){
		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
		}

		if(scope.thumbnailManager2 !== null){
		scope.thumbnailManager2.updateCanvasSize();
		scope.thumbnailManager2.active();
		}
	},

	deactiveTabPanel: function(){
		var scope = this;
		if(scope.thumbnailManager !== null){
			scope.thumbnailManager.deactive();
		}
		if(scope.thumbnailManager2 !== null){
			scope.thumbnailManager2.deactive();
		}
	},

	dispose: function() {
		if(this.thumbnailManager !== undefined && this.thumbnailManager !== null){
			this.thumbnailManager.dispose();
			this.thumbnailManager = null;
		}

		if(this.thumbnailManager2 !== undefined && this.thumbnailManager2 !== null){
			this.thumbnailManager2.dispose();
			this.thumbnailManager2 = null;
		}
	},

	getValue: function () {
		return this.taskObject;
	},

	setValue: function (taskObject) {

		var scope = this;
		if (taskObject !== null) {

			var material = new THREE.MeshStandardMaterial({
						color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
						roughness: 0.5,
						metalness: 0,
						flatShading: true
					});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

			if(taskObject.info.teams.length !== 0){
				 taskObject.info.teams.forEach(function(teamObject){
				 	scope.thumbnailManager.createThumbnailItem( teamObject.teamName ,
				 	mesh.clone(), function(){scope.onSelectTeam(teamObject)});
				 })
			}

			scope.thumbnailManager.updateCanvasSize();
		}

		scope.taskObject = taskObject;
	},

	onSelectTeam: function(teamObject) {

		var scope = this;

		var material = new THREE.MeshStandardMaterial({
					color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
					roughness: 0.5,
					metalness: 0,
					flatShading: true
				});
		var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

		scope.thumbnailManager2.clearAllThumbnailItems();

		scope.thumbnailManager2.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Teams/applyToJoining' ) ,
		mesh.clone(), function() {

			var title = editor.strings.getKey('sidebar/skyCastle/Teams/applyToJoining');
			var applyDlg = new iTopoDialogApplyToJoining(editor, title, function(applyReason) {

				//在SkyCastle公共事务中心添加一个任务
				var taskToAcceptNewMember = {
					objectUUID : iTopoEarthModel.SkyCastle.info.castleUUID,
					taskUUID: THREE.MathUtils.generateUUID(),
					taskTitle:'处理志愿者的加入申请',
					taskCreatedby:'共享地球系统',
					taskStatus:'待办',
					applyDetail:{ applicantUUID:editor.starUser.info.starUUID, teamToJoinUUID: teamObject.teamUUID, reason:applyReason },
					taskDescription: "",
				};
				//console.log(taskToAcceptNewMember);
				editor.stationDB.addTask(taskToAcceptNewMember, function(){
				//	editor.stationDB.addNotification();
				});

				//并通知团队内的每一个成员，供团队投票，以决定是否同意加入
				for(var i=0; i < teamObject.teamMemberUUIDs.length; ++i){

					var taskObject = {
						objectUUID : teamObject.teamMemberUUIDs[i],
						taskUUID:THREE.MathUtils.generateUUID(),
						taskType:"JoiningApplyToVote",
						generatedFromTaskUUID: taskToAcceptNewMember.taskUUID,
						taskTitle:'处理志愿者的加入申请',
						taskCreatedby:'共享地球系统',
						taskStatus:'待办',
						taskDescription: editor.starUser.info.userNickname + '想加入志愿者团队-' + teamObject.teamName + ',因为' + applyReason,
					};

					editor.stationDB.addTask(taskObject, function(){
					//	editor.stationDB.addNotification();
					});
				}

			});
			document.body.appendChild(applyDlg.container.dom);
			applyDlg.container.setDisplay('block');
			applyDlg.container.setPosition('absolate');

			applyDlg.container.dom.addEventListener('resize', function() {

			});

			applyDlg.closeBtn.dom.addEventListener('click', function() {

			});

		});

		editor.stationDB.fetchiTopoStars(function(allUsers){

			teamObject.teamMemberUUIDs.forEach(function( teamMemberUUID ){
				allUsers.forEach(function(starUserInfo) {
					if( teamMemberUUID === starUserInfo.starUUID ){
						scope.thumbnailManager2.createThumbnailItem( starUserInfo.userNickname ,
						mesh.clone(), function() {
							scope.locationStarUser(starUserInfo);
						});
					}
				})
			})

			scope.thumbnailManager2.updateCanvasSize();
			scope.thumbnailManager2.active();

		});

	},

	locationStarUser: function(starUserJson) {
		iTopoEarthModel.focusStar(starUserJson);
	}
}

export { iTopoObjectSkyCastleTeams };
