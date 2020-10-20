import { UIElement,UISpan ,UIPanel, UIRow, UIText,  } from '../iTopoUI.js';
import { iTopoDialogRegisterBase } from '../iTopoDialog/iTopoDialog.RegisterBase.js';
import { iTopoStandSponsor } from '../iTopoFrame/iTopoStandSponsor.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoDialogGetSponsors } from '../iTopoDialog/iTopoDialog.GetSponsors.js';

//iTopoStandSponsor
var iTopoSpriteSponsor = function ( editor ) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'SponsorSprite' );
	container.setDisplay( 'block' );

	// baseUUID
	var toolHeaderRow = new UIRow();
	var labelSponsor = new UIText(strings.getKey('iTopoSpriteSponsor/iTopoEarthSponsor'));
	labelSponsor.setFontSize('10px');
	labelSponsor.setMarginLeft('5px');
	toolHeaderRow.add(labelSponsor);
	container.add(toolHeaderRow);

	var elementListItem = document.createElement('div');
	elementListItem.className = 'register-item';

	var sceneElement=document.createElement("div");
	elementListItem.appendChild(sceneElement);

	var descriptionElement = document.createElement('div');
	descriptionElement.innerText = strings.getKey('iTopoSpriteSponsor/becomeSponsor');
	elementListItem.appendChild(descriptionElement);

	descriptionElement.addEventListener('click', function(){
		scope.onClickSponsor();
	} );
	container.dom.appendChild(elementListItem);

	editor.stationDB.fetchiTopobaseSponsors( iTopoEarthModel.SkyCastle.info.castleUUID, function(sponsorsInfo){
		iTopoEarthModel.SkyCastle.info.sponsors = sponsorsInfo;

		var tmpSponsors = [];
		var tmpArray = [];
		sponsorsInfo.forEach(function(sponsorInfo) {
			sponsorInfo.teamMemberUUIDs.forEach( function(teamMemberUUID){
				if( tmpArray.indexOf(teamMemberUUID) < 0){
					var imgURL = "./iTopoObjects/" + teamMemberUUID + "/myiTopoLogo.jpg";
					tmpSponsors.push({
						sponsorUnit: 'starUser',
						objectUUID : teamMemberUUID,
						imgTitle:'starUser',
						imgURL: imgURL,
						imgDesc: 'starUser',
						});
					tmpArray.push(teamMemberUUID);
				}
			})

			sponsorInfo.sponsoredOrganizations.forEach( function(sponsoredOrganizationUUID){
				if( tmpArray.indexOf( sponsoredOrganizationUUID ) < 0){
					var imgURL = "./iTopoObjects/" + sponsoredOrganizationUUID + "/myiTopoLogo.jpg";
					tmpSponsors.push( {
						sponsorUnit: 'team',
						objectUUID : sponsoredOrganizationUUID,
						imgTitle:'team',
						imgURL: imgURL,
						imgDesc: 'team',
						});
					tmpArray.push(sponsoredOrganizationUUID);
				}
			})
		})

		var explore = new iTopoStandSponsor.Explore(sceneElement);
		var films=[];
		films.push({filmTopic:"赞助单位",album2DImgs:tmpSponsors});
		explore.show3D(null , films );
		explore.play();

	});

	return container;

};

iTopoSpriteSponsor.prototype = Object.create( UIElement.prototype );
iTopoSpriteSponsor.prototype.constructor = iTopoSpriteSponsor;

iTopoSpriteSponsor.prototype = {

	activeTabPanel: function() {
		var scope = this;
		// if(scope.thumbnailManager === null) return;
		// if(scope.thumbnailManager === undefined) return;

		// scope.thumbnailManager.updateCanvasSize();
		// scope.thumbnailManager.active();
	},

	deactiveTabPanel: function(){
		var scope = this;
		// if(scope.thumbnailManager === null) return;
		// scope.thumbnailManager.deactive();
	},

	dispose: function() {
		var scope = this;
		// scope.thumbnailManager.dispose();
		// scope.thumbnailManager = null;
	},

	onClickSponsor: function() {
		var strings = editor.strings;
		var title = editor.strings.getKey('iTopoDialog/Sponsor/SponsorEarthSystem');
		var sponsorsDlg = new iTopoDialogGetSponsors(editor,title, function fnOK(msgFromSponsor){

			var taskObject = {
				objectUUID : '8E59BDD4-25EE-4E90-A612-4537AFAA80FF',
				taskUUID:THREE.MathUtils.generateUUID(),
				taskType:"MessageToRead",
				generatedFromTaskUUID: "",
				taskTitle:'有用户想赞助共享地球',
				taskCreatedby: strings.getKey('iTopoSpriteSponsor/becomeSponsor')+'对话框',
				taskStatus:'待办',
				taskDescription: msgFromSponsor,
			};

			editor.stationDB.addTask(taskObject, function(){
		
			});

		});

		document.body.appendChild(sponsorsDlg.container.dom);
		sponsorsDlg.container.setDisplay('block');
		sponsorsDlg.container.setPosition('absolate');

		sponsorsDlg.container.dom.addEventListener('resize', function() {

		});

		sponsorsDlg.closeBtn.dom.addEventListener('click', function() {

		});

	},

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );

		}

		this.taskObject = taskObject;
	}
}

export { iTopoSpriteSponsor };
