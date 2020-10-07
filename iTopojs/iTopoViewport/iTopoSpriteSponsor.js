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
	var labelSponsor = new UIText(strings.getKey('iTopoSpriteSponsor/iTopoEarthSponsor')).setFontSize('10px');
	labelSponsor.setMarginLeft('5px');
	toolHeaderRow.add(labelSponsor);
	container.add(toolHeaderRow);

	var containerSponsorLogo = new UIPanel();
	containerSponsorLogo.setTop('12px');
	containerSponsorLogo.setMarginLeft('2px');
	containerSponsorLogo.setMarginRight('2px');
	containerSponsorLogo.setWidth('83px');
	containerSponsorLogo.setHeight('83px');
	container.add(containerSponsorLogo);

	editor.stationDB.fetchiTopoSkyCastleSponsors( iTopoEarthModel.SkyCastle.info.castleUUID, function(sponsorsInfo){
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
						imgURL: imgURL,
						imgDesc: teamMemberUUID,
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
						imgURL: imgURL,
						imgDesc: sponsoredOrganizationUUID,
						});
					tmpArray.push(sponsoredOrganizationUUID);
				}
			})
		})

		var explore = new iTopoStandSponsor.Explore(containerSponsorLogo.dom);

		explore.show3D(null , tmpSponsors );
		explore.play();

	});



	var registerSponsor = new UIRow();
	var becomeSponsorLabel = new UIText(strings.getKey('iTopoSpriteSponsor/becomeSponsor')).setFontSize('10px');
	becomeSponsorLabel.setMarginLeft('5px');
	registerSponsor.add(becomeSponsorLabel);
	container.add(registerSponsor);
	becomeSponsorLabel.dom.addEventListener('click', function() {
		scope.onRegisterEcologicalFarm();
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

	onRegisterEcologicalFarm: function() {

		var title = editor.strings.getKey('iTopoDialog/Sponsor/applyToJoining');
		var sponsorsDlg = new iTopoDialogGetSponsors(editor,title);
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
