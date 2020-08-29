/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from './iTopoUI.js';

import { iTopoTaskChildSkyCastleHeader } from './iTopoTaskChild.SkyCastle.Header.js';
import { iTopoTaskChildSkyCastleParts } from './iTopoTaskChild.SkyCastle.Parts.js';
import { iTopoTaskChildSkyCastleLife } from './iTopoTaskChild.SkyCastle.Life.js';

import { iTopoTaskChildInnerEarthHeader } from './iTopoTaskChild.InnerEarth.Header.js';
import { iTopoTaskChildInnerEarthParts } from './iTopoTaskChild.InnerEarth.Parts.js';
import { iTopoTaskChildInnerEarthLife } from './iTopoTaskChild.InnerEarth.Life.js';

import { iTopoTaskChildLunarMoonHeader } from './iTopoTaskChild.LunarMoon.Header.js';
import { iTopoTaskChildLunarMoonParts } from './iTopoTaskChild.LunarMoon.Parts.js';
import { iTopoTaskChildLunarMoonLife } from './iTopoTaskChild.LunarMoon.Life.js';

import { iTopoTaskChildStarUserHeader } from './iTopoTaskChild.StarUser.Header.js';
import { iTopoTaskChildStarUserDiyCreations } from './iTopoTaskChild.StarUser.DiyCreations.js';
import { iTopoTaskChildStarUserLife } from './iTopoTaskChild.StarUser.Life.js';

import { iTopoTaskChildEcologicalFarmHeader } from './iTopoTaskChild.EcologicalFarm.Header.js';
import { iTopoTaskChildEcologicalFarmProduct } from './iTopoTaskChild.EcologicalFarm.Product.js';
import { iTopoTaskChildEcologicalFarmLife } from './iTopoTaskChild.EcologicalFarm.Life.js';

import { iTopoTaskChildDynamic } from './iTopoTaskChild.Dynamic.js';
import { iTopoTaskChildContribute } from './iTopoTaskChild.Contribute.js';
import { iTopoTaskChildParticipants } from './iTopoTaskChild.Participants.js';

import { iTopoTaskChildSharedCanteenHeader } from './iTopoTaskChild.SharedCanteen.Header.js';
import { iTopoTaskChildSharedCanteenMenu } from './iTopoTaskChild.SharedCanteen.Menu.js';
import { iTopoTaskChildSharedCanteenLife } from './iTopoTaskChild.SharedCanteen.Life.js';

import { iTopoEarthSettings } from './iTopoEarthSettings.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'


function iTopoTaskBriefcase(editor) {
	var signals = editor.signals;
	var strings = editor.strings;
	var ActivedObjectType = '';
	var tabs = [];

	var container = new UITabbedPanel();
	//container.setId( 'properties' );
	container.setId('sidebar');
	container.setDisplay( 'none' );

	container.tabsDiv.dom.addEventListener('click', function() {

		tabs.forEach(function(tab) {
			if(tab.name === container.selected){
				console.log( tab.name + ',updateCanvasSize');

				if(tab.panel.updateCanvasSize !== undefined){
					tab.panel.updateCanvasSize();
				}
			}
		});
	});

	// var sharedCanteen = new UISpan().add(
	// 	new iTopoTaskChildHeader( editor ),
	// 	new iTopoTaskBriefcaseBody( editor )
	// );

	// events

	function removeAllTabs() {
		container.removeAllTab();
	}

	function createiTopoSkyCastleTabs() {
		var headerTab = new iTopoTaskChildSkyCastleHeader(editor);
		var partsTab = new iTopoTaskChildSkyCastleParts(editor);
		var lifeTab = new iTopoTaskChildSkyCastleLife(editor);

		tabs = [];
		tabs.push( {name:'skyCastle', title:strings.getKey('sidebar/skyCastle/Header')  ,panel: headerTab} );
		tabs.push( {name:'parts', title: strings.getKey('sidebar/skyCastle/Parts'),panel: partsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/skyCastle/Life'),panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('skyCastle');
	}

	function createiTopoInnerEarthTabs() {
		var headerTab = new iTopoTaskChildInnerEarthHeader(editor);
		var partsTab = new iTopoTaskChildInnerEarthParts(editor);
		var lifeTab = new iTopoTaskChildInnerEarthLife(editor);

		tabs = [];
		tabs.push( {name:'InnerEarth', title:strings.getKey('sidebar/InnerEarth/Header')  ,panel: headerTab} );
		tabs.push( {name:'parts', title: strings.getKey('sidebar/InnerEarth/Parts'),panel: partsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/InnerEarth/Life'),panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('InnerEarth');
	}

	function createiTopoLunarMoonTabs() {
		var headerTab = new iTopoTaskChildLunarMoonHeader(editor);
		var partsTab = new iTopoTaskChildLunarMoonParts(editor);
		var lifeTab = new iTopoTaskChildLunarMoonLife(editor);

		tabs = [];
		tabs.push( {name:'LunarMoon', title:strings.getKey('sidebar/LunarMoon/Header')  ,panel: headerTab} );
		tabs.push( {name:'parts', title: strings.getKey('sidebar/LunarMoon/Parts'),panel: partsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/LunarMoon/Life'),panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('LunarMoon');
	}

	function createStarTabs() {
		var starUserTab = new iTopoTaskChildStarUserHeader(editor);
		var diyCreationsTab = new iTopoTaskChildStarUserDiyCreations(editor);
		var lifeTab = new iTopoTaskChildStarUserLife(editor);

		tabs = [];
		tabs.push( {name:'StarUser', title:strings.getKey('sidebar/StarUser/Header'), panel: starUserTab} );
		tabs.push( {name:'DiyCreations', title: strings.getKey('sidebar/StarUser/DiyCreations'), panel: diyCreationsTab} );
		tabs.push( {name:'lifeTab', title: strings.getKey('sidebar/StarUser/life'), panel: lifeTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('StarUser');
	}

	function createEcologicalFarmTabs() {
		var headerTab = new iTopoTaskChildEcologicalFarmHeader(editor);
		var productItemsTab = new iTopoTaskChildEcologicalFarmProduct(editor);
		var lifeItemsTab = new iTopoTaskChildEcologicalFarmLife(editor);
		// var dynamicTab = new iTopoTaskChildDynamic(editor);
		// var contributeTab = new iTopoTaskChildContribute(editor);
		var participantsTab = new iTopoTaskChildParticipants(editor);

		tabs = [];
		tabs.push( {name:'iTopoTaskHeader', title:strings.getKey('sidebar/EcologicalFarm/Header')  ,panel: headerTab} );
		tabs.push( {name:'product', title: strings.getKey('sidebar/EcologicalFarm/product'),panel: productItemsTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/EcologicalFarm/life'),panel: lifeItemsTab} );
		// tabs.push( {name:'dynamic', title:strings.getKey('sidebar/iTopoTask/dynamic')  ,panel: dynamicTab} );
		// tabs.push( {name:'contribute', title: strings.getKey('sidebar/iTopoTask/contribute'),panel: contributeTab} );
		tabs.push( {name:'participants', title: strings.getKey('sidebar/iTopoTask/participants'),panel: participantsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('iTopoTaskHeader');
	}

	function createSharedCanteenTabs() {
		var headerTab = new iTopoTaskChildSharedCanteenHeader(editor);
		var menuTab = new iTopoTaskChildSharedCanteenMenu(editor);
		var lifeItemsTab = new iTopoTaskChildSharedCanteenLife(editor);

		tabs = [];
		tabs.push( {name:'iTopoTaskHeader', title:strings.getKey('sidebar/SharedCanteen/Header')  ,panel: headerTab} );
		tabs.push( {name:'menu', title: strings.getKey('sidebar/SharedCanteen/menu'),panel: menuTab} );
		tabs.push( {name:'life', title: strings.getKey('sidebar/SharedCanteen/life'),panel: lifeItemsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		container.select('iTopoTaskHeader');
	}

	function refreshEcologicalFarmTabs() {
		fetch(iTopoEarthSettings.ITOPOBASE_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {
				for (var i = 0; i < json.length; i++) {
					if (json[i].baseUUID === editor.selected.userData.objectUUID) {

						tabs.forEach(function(tab) {
							tab.panel.setValue(json[i]);
						});

						return;
					}
				}
			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	}

	function refreshSharedCanteenTabs() {

		fetch(iTopoEarthSettings.ITOPOBASE_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {
				for (var i = 0; i < json.length; i++) {
					if (json[i].baseUUID === editor.selected.userData.objectUUID) {

						tabs.forEach(function(tab) {
							tab.panel.setValue(json[i]);
						});

						return;
					}
				}
			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})

	}

	function refreshiTopoSkyCastleTabs() {

		if (iTopoEarthModel.SkyCastle.castleUUID === editor.selected.userData.objectUUID) {
			//geometryUUID.setValue(castle.castleUUID);
			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.SkyCastle);
			});

			return;
		}
	}

	function refreshiTopoInnerEarthTabs() {

		if (iTopoEarthModel.InnerEarth.innerEarthUUID === editor.selected.userData.objectUUID) {
			//geometryUUID.setValue(castle.castleUUID);
			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.InnerEarth);
			});

			return;
		}
	}

	function refreshiTopoLunarMoonTabs() {

		if (iTopoEarthModel.LunarMoon.lunarMoonUUID === editor.selected.userData.objectUUID) {
			//geometryUUID.setValue(castle.castleUUID);
			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.LunarMoon);
			});

			return;
		}
	}

	function refreshStarTabs() {
		fetch(iTopoEarthSettings.ITOPOUSER_FILE, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {
				for (var i = 0; i < json.length; i++) {
					if (json[i].starUUID === editor.selected.userData.objectUUID) {

						tabs.forEach(function(tab) {
							tab.panel.setValue(json[i]);
						});

						return;
					}
				}
			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	}

	var ignoreObjectSelectedSignal = false;

	function refreshObjectUI(object) {

		if (ignoreObjectSelectedSignal === true)
			return;

		if (object === null) {
			ActivedObjectType = '';
			removeAllTabs();
			console.log('ActivedObjectType:' + ActivedObjectType);
			container.setDisplay( 'none' );
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
				console.log('did not implement');
		}
	}

	signals.objectSelected.add(function(object) {
		refreshObjectUI(object);
	});

	return container;
}

export { iTopoTaskBriefcase };
