/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from '../iTopoUI.js';
import { iTopoEarthSettings } from '../iTopoEarthSettings.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'

import { iTopoObjectSkyCastleHeader } from './iTopoObject.SkyCastle.Header.js';
import { iTopoObjectSkyCastleLife } from './iTopoObject.SkyCastle.Life.js';
import { iTopoObjectSkyCastleTeams } from './iTopoObject.SkyCastle.Teams.js';
import { iTopoObjectSkyCastleSponsor } from './iTopoObject.SkyCastle.Sponsor.js';

import { iTopoObjectInnerEarthHeader } from './iTopoObject.InnerEarth.Header.js';
import { iTopoObjectInnerEarthParts } from './iTopoObject.InnerEarth.Parts.js';
import { iTopoObjectInnerEarthLife } from './iTopoObject.InnerEarth.Life.js';

import { iTopoObjectLunarMoonHeader } from './iTopoObject.LunarMoon.Header.js';
import { iTopoObjectLunarMoonParts } from './iTopoObject.LunarMoon.Parts.js';
import { iTopoObjectLunarMoonLife } from './iTopoObject.LunarMoon.Life.js';

import { iTopoObjectStarUserHeader } from './iTopoObject.StarUser.Header.js';
import { iTopoObjectStarUserDiyCreations } from './iTopoObject.StarUser.DiyCreations.js';
import { iTopoObjectStarUserLife } from './iTopoObject.StarUser.Life.js';

import { iTopoObjectEcologicalFarmHeader } from './iTopoObject.EcologicalFarm.Header.js';
import { iTopoObjectEcologicalFarmProduct } from './iTopoObject.EcologicalFarm.Product.js';
import { iTopoObjectEcologicalFarmLife } from './iTopoObject.EcologicalFarm.Life.js';

import { iTopoObjectDynamic } from './iTopoObject.Dynamic.js';
import { iTopoObjectContribute } from './iTopoObject.Contribute.js';
import { iTopoObjectParticipants } from './iTopoObject.Participants.js';

import { iTopoObjectSharedCanteenHeader } from './iTopoObject.SharedCanteen.Header.js';
import { iTopoObjectSharedCanteenMenu } from './iTopoObject.SharedCanteen.Menu.js';
import { iTopoObjectSharedCanteenLife } from './iTopoObject.SharedCanteen.Life.js';


function iTopoObjectBriefcase(editor) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;
	var ActivedObjectType = '';
	var tabs = [];

	var container = new UITabbedPanel();
	//container.setId( 'properties' );
	container.setId('sidebar');
	//container.setDisplay( 'none' );

	container.tabsDiv.dom.addEventListener('click', function() {

		tabs.forEach(function(tab) {
			if(tab.name === container.selected){
				if(tab.panel.activeTabPanel!== undefined){
					tab.panel.activeTabPanel();
				}
				scope.lastSelectTabName=tab.name;
			} else {
				if(tab.name === scope.lastSelectTabName){
					if(tab.panel.deactiveTabPanel!== undefined){
						tab.panel.deactiveTabPanel();
					}
				}
			}
		});
	});

	// events

	function removeAllTabs() {
		tabs.forEach(function(tab){
			//console.log(tab);
			tab.panel.dispose();
		}) ;

		tabs = [];

		container.removeAllTab();
	}

	function activeTab( tab ){
		container.select(tab.name);
		scope.lastSelectTabName = tab.name;
		console.log(tab.name);
		tab.panel.activeTabPanel();
	}

	function createiTopoSkyCastleTabs() {
		var headerTab = new iTopoObjectSkyCastleHeader(editor);
		var lifeTab = new iTopoObjectSkyCastleLife(editor);
		var teamsTab = new iTopoObjectSkyCastleTeams(editor);
		var sponsorTab = new iTopoObjectSkyCastleSponsor(editor);


		tabs.push( {name:'skyCastle', title:strings.getKey('sidebar/skyCastle/Header')  ,panel: headerTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/skyCastle/Life'),panel: lifeTab} );
		tabs.push( {name:'teams', title: strings.getKey('sidebar/skyCastle/Teams'),panel: teamsTab} );
		tabs.push( {name:'sponsors', title: strings.getKey('sidebar/skyCastle/Sponsors'),panel: sponsorTab} );


		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createiTopoInnerEarthTabs() {
		var headerTab = new iTopoObjectInnerEarthHeader(editor);
		var partsTab = new iTopoObjectInnerEarthParts(editor);
		var lifeTab = new iTopoObjectInnerEarthLife(editor);

		tabs.push( {name:'InnerEarth', title:strings.getKey('sidebar/InnerEarth/Header')  ,panel: headerTab} );
		tabs.push( {name:'parts', title: strings.getKey('sidebar/InnerEarth/Parts'),panel: partsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/InnerEarth/Life'),panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createiTopoLunarMoonTabs() {
		var headerTab = new iTopoObjectLunarMoonHeader(editor);
		var partsTab = new iTopoObjectLunarMoonParts(editor);
		var lifeTab = new iTopoObjectLunarMoonLife(editor);

		tabs.push( {name:'LunarMoon', title:strings.getKey('sidebar/LunarMoon/Header')  ,panel: headerTab} );
		tabs.push( {name:'parts', title: strings.getKey('sidebar/LunarMoon/Parts'),panel: partsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/LunarMoon/Life'),panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createStarTabs() {
		var starUserTab = new iTopoObjectStarUserHeader(editor);
		var diyCreationsTab = new iTopoObjectStarUserDiyCreations(editor);
		var lifeTab = new iTopoObjectStarUserLife(editor);

		tabs.push( {name:'StarUser', title:strings.getKey('sidebar/StarUser/Header'), panel: starUserTab} );
		tabs.push( {name:'DiyCreations', title: strings.getKey('sidebar/StarUser/DiyCreations'), panel: diyCreationsTab} );
		tabs.push( {name:'lifeTab', title: strings.getKey('sidebar/StarUser/life'), panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createEcologicalFarmTabs() {
		var headerTab = new iTopoObjectEcologicalFarmHeader(editor);
		var productItemsTab = new iTopoObjectEcologicalFarmProduct(editor);
		var lifeItemsTab = new iTopoObjectEcologicalFarmLife(editor);
		var participantsTab = new iTopoObjectParticipants(editor);

		tabs.push( {name:'farmHeader', title:strings.getKey('sidebar/EcologicalFarm/Header')  ,panel: headerTab} );
		tabs.push( {name:'product', title: strings.getKey('sidebar/EcologicalFarm/product'),panel: productItemsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/EcologicalFarm/life'),panel: lifeItemsTab} );
		tabs.push( {name:'participants', title: strings.getKey('sidebar/iTopoTask/participants'),panel: participantsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createSharedCanteenTabs() {
		var headerTab = new iTopoObjectSharedCanteenHeader(editor);
		var menuTab = new iTopoObjectSharedCanteenMenu(editor);
		var lifeItemsTab = new iTopoObjectSharedCanteenLife(editor);

		tabs.push( {name:'canteenHeader', title:strings.getKey('sidebar/SharedCanteen/Header')  ,panel: headerTab} );
		tabs.push( {name:'menu', title: strings.getKey('sidebar/SharedCanteen/menu'),panel: menuTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/SharedCanteen/life'),panel: lifeItemsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function refreshEcologicalFarmTabs() {

		editor.stationDB.fetchiTopobase(function(json){

			if(editor.selected === null)
				return;

			if(editor.selected.userData === null || editor.selected.userData === undefined)
				return;

			if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
				return;

			for (var i = 0; i < json.length; i++) {
				if (json[i].baseUUID === editor.selected.userData.objectUUID) {

					tabs.forEach(function(tab) {
						tab.panel.setValue(json[i]);
					});

					return;
				}
			}

		});

	}

	function refreshSharedCanteenTabs() {

		editor.stationDB.fetchiTopobase(function(json){

			if(editor.selected === null)
				return;

			if(editor.selected.userData === null || editor.selected.userData === undefined)
				return;

			if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
				return;

			for (var i = 0; i < json.length; i++) {
				if (json[i].baseUUID === editor.selected.userData.objectUUID) {

					tabs.forEach(function(tab) {
						tab.panel.setValue(json[i]);
					});

					return;
				}
			}

		});
	}

	function refreshiTopoSkyCastleTabs() {

		if(editor.selected === null)
			return;

		if(editor.selected.userData === null || editor.selected.userData === undefined)
			return;

		if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
			return;

		if (iTopoEarthModel.SkyCastle.info.castleUUID === editor.selected.userData.objectUUID) {

		editor.stationDB.fetchiTopoSkyCastleTeams( iTopoEarthModel.SkyCastle.info.castleUUID, function(json){
				iTopoEarthModel.SkyCastle.info.teams = json;

				editor.stationDB.fetchiTopoSkyCastleSponsors( iTopoEarthModel.SkyCastle.info.castleUUID, function(json){
					iTopoEarthModel.SkyCastle.info.sponsors = json;
					tabs.forEach(function(tab) {
						tab.panel.setValue(iTopoEarthModel.SkyCastle);
					});
				});
			});
		}
	}

	function refreshiTopoInnerEarthTabs() {

		if(editor.selected === null)
			return;

		if(editor.selected.userData === null || editor.selected.userData === undefined)
			return;

		if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
			return;

		if (iTopoEarthModel.InnerEarth.innerEarthUUID === editor.selected.userData.objectUUID) {

			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.InnerEarth);
			});

			return;
		}
	}

	function refreshiTopoLunarMoonTabs() {

		if(editor.selected === null)
			return;

		if(editor.selected.userData === null || editor.selected.userData === undefined)
			return;

		if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
			return;

		if (iTopoEarthModel.LunarMoon.lunarMoonUUID === editor.selected.userData.objectUUID) {

			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.LunarMoon);
			});

			return;
		}
	}

	function refreshStarTabs() {

		editor.stationDB.fetchiTopoStars(function(json){
			if(editor.selected === null)
					return;

				if(editor.selected.userData === null || editor.selected.userData === undefined)
					return;

				if(editor.selected.userData.objectUUID === null || editor.selected.userData.objectUUID === undefined)
					return;

				for (var i = 0; i < json.length; i++) {
					if (json[i].starUUID === editor.selected.userData.objectUUID) {

						tabs.forEach(function(tab) {
							tab.panel.setValue(json[i]);
						});

						return;
					}
				}
		});

	}

	var ignoreObjectSelectedSignal = false;

	function refreshObjectUI(object) {

		if (ignoreObjectSelectedSignal === true)
			return;

		if (object === null) {
			ActivedObjectType = '';
			removeAllTabs();
			console.log('ActivedObjectType:' + ActivedObjectType);
			//container.setDisplay( 'none' );

			var skyCastle = editor.objectByiTopoUUID(iTopoEarthModel.SkyCastle.castleUUID);
			//editor.select(skyCastle);// this function will call
			createiTopoSkyCastleTabs();
			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.SkyCastle);
			});
			return;
		}

		container.setDisplay( 'inline-block' );
		if (object.userData.objectType !== ActivedObjectType) {
			ActivedObjectType = object.userData.objectType;
			removeAllTabs();
			console.log('ActivedObjectType:' + ActivedObjectType);
			switch (ActivedObjectType) {
				case "iTopoType/TaskObject/EcologicalFarm":
					createEcologicalFarmTabs();
					break;
				case "iTopoType/TaskObject/SharedCanteen":
					createSharedCanteenTabs();
					break;
				case "iTopoType/TaskObject/iTopoSkyCastle":
					createiTopoSkyCastleTabs();
					break;
				case "iTopoType/TaskObject/iTopoInnerEarth":
					createiTopoInnerEarthTabs();
					break;
				case "iTopoType/TaskObject/iTopoLunarMoon":
					createiTopoLunarMoonTabs();
					break;
				case "iTopoType/TaskObject/Star":
					createStarTabs();
					break;
				default:
					createiTopoSkyCastleTabs();
					console.log('did not implement');
			}
		}

		//to refresh
		switch (ActivedObjectType) {
			case 'iTopoType/TaskObject/EcologicalFarm':
				refreshEcologicalFarmTabs();
				break;
			case 'iTopoType/TaskObject/SharedCanteen':
				refreshSharedCanteenTabs();
				break;
			case 'iTopoType/TaskObject/iTopoSkyCastle':
				refreshiTopoSkyCastleTabs();
				break;
			case 'iTopoType/TaskObject/iTopoInnerEarth':
				refreshiTopoInnerEarthTabs();
				break;
			case 'iTopoType/TaskObject/iTopoLunarMoon':
				refreshiTopoLunarMoonTabs();
				break;
			case 'iTopoType/TaskObject/Star':
				refreshStarTabs();
				break;
			default:
				refreshiTopoSkyCastleTabs();
				console.log('did not implement');
		}
	}

	signals.objectSelected.add(function(object) {
		refreshObjectUI(object);
	});

	createiTopoSkyCastleTabs();

	editor.stationDB.fetchiTopoSkyCastleTeams( iTopoEarthModel.SkyCastle.info.castleUUID, function(json){
			iTopoEarthModel.SkyCastle.info.teams = json;

			editor.stationDB.fetchiTopoSkyCastleSponsors( iTopoEarthModel.SkyCastle.info.castleUUID, function(json){
				iTopoEarthModel.SkyCastle.info.sponsors = json;
				tabs.forEach(function(tab) {
					tab.panel.setValue(iTopoEarthModel.SkyCastle);
				});
			});
		});

	return container;
}

export { iTopoObjectBriefcase };
