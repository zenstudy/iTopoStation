import { UIElement,UISpan,UIPanel, UIBreak, UIText , UIRow, UIInput} from '../iTopoUI.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'

function iTopoObjectSkyCastleTeams( editor ) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UISpan();
	scope.container = container;

	var groupPanel = new UIPanel();
	groupPanel.setWidth('280px');
	groupPanel.setHeight('250px');
	groupPanel.setOverflow('auto');
	scope.thumbnailManager = new iTopoThumbnailManager();
	scope.thumbnailManager.setItemClassName("register-item");
	scope.thumbnailManager.create(groupPanel.dom);

	container.add(groupPanel);

	var memberDetailPanel = new UIPanel();
	memberDetailPanel.setTop( '310px' );
	memberDetailPanel.setWidth('280px');
	memberDetailPanel.setHeight('680px');
	memberDetailPanel.setOverflow('auto');

	var geometryUUIDRow = new UIRow();
	scope.thumbnailManager2 = new iTopoThumbnailManager();
	scope.thumbnailManager2.setItemClassName("register-item");
	scope.thumbnailManager2.create(geometryUUIDRow.dom);
	memberDetailPanel.add(geometryUUIDRow);
	container.add(memberDetailPanel);

	return scope;
}

function onSelect() {
		console.log(this);
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
				 taskObject.info.teams.forEach(function(team){
				 	scope.thumbnailManager.createThumbnailItem( team.teamName ,
				 	mesh.clone(), function(){scope.onSelectTeam()});
				 })
			}

			scope.thumbnailManager.updateCanvasSize();
		}

		scope.taskObject = taskObject;
	},

	onSelectTeam: function() {

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
			iTopoEarthModel.SkyCastle.applyToJoining( teamUUID, starUUID );
		});

		editor.stationDB.fetchiTopoStars(function(json){

			json.forEach(function(starUserInfo) {
				scope.thumbnailManager2.createThumbnailItem( starUserInfo.userNickname ,
				mesh.clone(), function() {
					scope.locationStarUser(starUserInfo);
				});
			});

			scope.thumbnailManager2.updateCanvasSize();
			scope.thumbnailManager2.active();

		});

	},

	locationStarUser: function(starUserJson) {
		iTopoEarthModel.focusStar(starUserJson);
	}
}

export { iTopoObjectSkyCastleTeams };
