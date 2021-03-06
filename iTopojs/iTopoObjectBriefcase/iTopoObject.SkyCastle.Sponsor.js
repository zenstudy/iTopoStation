import { UIElement,UISpan,UIPanel, UIBreak, UIText , UIRow, UIInput} from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoDialogApplyToJoining } from '../iTopoDialog/iTopoDialog.ApplyToJoining.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';

function iTopoObjectSkyCastleSponsor( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UISpan();
	scope.container = container;

	var groupPanel = new UIPanel();
	groupPanel.setWidth('280px');
	groupPanel.setHeight('460px');
	groupPanel.setOverflow('auto');
	scope.thumbnailManager = new iTopoThumbnailManager();
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

iTopoObjectSkyCastleSponsor.prototype = Object.create( UIElement.prototype );
iTopoObjectSkyCastleSponsor.prototype.constructor = iTopoObjectSkyCastleSponsor;

iTopoObjectSkyCastleSponsor.prototype = {

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

			if(taskObject.info.sponsors.length !== 0){
				 taskObject.info.sponsors.forEach(function(sponsor){
				 	scope.thumbnailManager.createThumbnailItem( sponsor.teamName ,
				 	mesh.clone(), function(){scope.onSelectSponsor(sponsor)});
				 })
			}

			scope.thumbnailManager.updateCanvasSize();
		}

		scope.taskObject = taskObject;
	},

	onSelectSponsor: function(sponsor) {

		var scope = this;

		var material = new THREE.MeshStandardMaterial({
					color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
					roughness: 0.5,
					metalness: 0,
					flatShading: true
				});
		var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

		scope.thumbnailManager2.clearAllThumbnailItems();

		scope.thumbnailManager2.createThumbnailItem( scope.strings.getKey( 'sidebar/skyCastle/Sponsors/clickToSponsor' ) ,
		mesh.clone(), function() {

			var title = editor.strings.getKey('iTopoDialog/Sponsor/applyToJoining');
			var applyToJoinDlg = new iTopoDialogApplyToJoining(title);
			document.body.appendChild(applyToJoinDlg.container.dom);
			applyToJoinDlg.container.setDisplay('block');
			applyToJoinDlg.container.setPosition('absolate');

			applyToJoinDlg.container.dom.addEventListener('resize', function() {

			});

			applyToJoinDlg.closeBtn.dom.addEventListener('click', function() {

			});

		});

		editor.stationDB.fetchiTopoStars(function(allUsers){
			
			sponsor.teamMemberUUIDs.forEach(function( teamMemberUUID ){
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



		editor.stationDB.fetchiTopobase(function(allBases){

			sponsor.sponsoredOrganizations.forEach(function( orginizationUUID ){
				allBases.forEach(function(baseInfo) {
						console.log(orginizationUUID + ',' + baseInfo.baseUUID);
					if( orginizationUUID === baseInfo.baseUUID ){
						scope.thumbnailManager2.createThumbnailItem( baseInfo.title ,
						mesh.clone(), function() {
							editor.scene.rotation.y = 0;
							editor.sceneHelpers.rotation.y = 0;
							iTopoEarthModel.focusObject(baseInfo);
						});
					}
				})
			})

			scope.thumbnailManager2.updateCanvasSize();
			scope.thumbnailManager2.active();

		});
	},

	locationStarUser: function(starUserJson) {
		editor.scene.rotation.y = 0;
		editor.sceneHelpers.rotation.y = 0;
		iTopoEarthModel.focusStar(starUserJson);
	}
}

export { iTopoObjectSkyCastleSponsor };
