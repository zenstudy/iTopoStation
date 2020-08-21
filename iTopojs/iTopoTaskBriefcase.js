/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from './iTopoUI.js';

import { iTopoTaskChildSkyCastleHeader } from './iTopoTaskChild.SkyCastle.Header.js';
import { iTopoTaskChildSkyCastleItems } from './iTopoTaskChild.SkyCastle.Items.js';

import { iTopoTaskChildStarUserHeader } from './iTopoTaskChild.StarUser.Header.js';
import { iTopoTaskChildStarUserItems } from './iTopoTaskChild.StarUser.Items.js';

import { iTopoTaskChildEcologicalFarmHeader } from './iTopoTaskChild.EcologicalFarm.Header.js';
import { iTopoTaskChildEcologicalFarmProduct } from './iTopoTaskChild.EcologicalFarm.Product.js';
import { iTopoTaskChildEcologicalFarmLife } from './iTopoTaskChild.EcologicalFarm.Life.js';

import { iTopoTaskChildDynamic } from './iTopoTaskChild.Dynamic.js';
import { iTopoTaskChildContribute } from './iTopoTaskChild.Contribute.js';
import { iTopoTaskChildParticipants } from './iTopoTaskChild.Participants.js';

import { iTopoTaskChildSharedCanteenHeader } from './iTopoTaskChild.SharedCanteen.Header.js';
import { iTopoTaskChildSharedCanteenItems } from './iTopoTaskChild.SharedCanteen.Items.js';


import { iTopoEarthSettings } from './iTopoEarthSettings.js';
import { iTopoSkyCastle} from './iTopoSkyCastle.js';

function iTopoTaskBriefcase(editor) {
	var signals = editor.signals;
	var strings = editor.strings;
	var ActivedObjectType = '';
	var tabs = [];

	var container = new UITabbedPanel();
	container.setId('sidebar');
	//container.setId( 'properties' );

	container.tabsDiv.dom.addEventListener('click', function() {

		tabs.forEach(function(tab) {
			if(tab.name === container.selected){
				console.log('updateCanvasSize');
				
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

	function createiTopoSkyCastleFarmTabs() {
		var skyCastleTab = new iTopoTaskChildSkyCastleHeader(editor);
		var iTopoItemsTab = new iTopoTaskChildSkyCastleItems(editor);

		tabs = [];
		tabs.push( {name:'skyCastle', title:strings.getKey('sidebar/skyCastle/Header')  ,panel: skyCastleTab} );
		tabs.push( {name:'iTopoItems', title: strings.getKey('sidebar/skyCastle/iTopoItems'),panel: iTopoItemsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

	//	container.addTab('iTopoItems',strings.getKey('sidebar/skyCastle/iTopoItems'), iTopoItemsTab.container);

		container.select('skyCastle');
	}

	function createStarTabs() {
		var starUserTab = new iTopoTaskChildStarUserHeader(editor);
		var iTopoItemsTab = new iTopoTaskChildStarUserItems(editor);

		tabs = [];
		tabs.push( {name:'StarUser', title:strings.getKey('sidebar/StarUser/Header')  ,panel: starUserTab} );
		tabs.push( {name:'iTopoItems', title: strings.getKey('sidebar/StarUser/iTopoItems'),panel: iTopoItemsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

	//	container.addTab('StarUser', strings.getKey('sidebar/StarUser/Header'), starUserTab.container);
	//	container.addTab('iTopoItems', strings.getKey('sidebar/StarUser/iTopoItems'), iTopoItemsTab.container);

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

		// container.addTab('iTopoTaskHeader', strings.getKey('sidebar/EcologicalFarm/Header'), headerTab.container);
		// container.addTab('iTopoItems', strings.getKey('sidebar/EcologicalFarm/iTopoItems'), iTopoItemsTab.container);
		// container.addTab('dynamic', strings.getKey('sidebar/iTopoTask/dynamic'), dynamicTab.container);
		// container.addTab('contribute', strings.getKey('sidebar/iTopoTask/contribute'), contributeTab.container);
		// container.addTab('participants', strings.getKey('sidebar/iTopoTask/participants'), participantsTab.container);

		container.select('iTopoTaskHeader');
	}

	function createSharedCanteenTabs() {
		var headerTab = new iTopoTaskChildSharedCanteenHeader(editor);
		var iTopoItemsTab = new iTopoTaskChildSharedCanteenItems(editor);

		tabs = [];
		tabs.push( {name:'iTopoTaskHeader', title:strings.getKey('sidebar/EcologicalFarm/Header')  ,panel: headerTab} );
		tabs.push( {name:'iTopoItems', title: strings.getKey('sidebar/EcologicalFarm/iTopoItems'),panel: iTopoItemsTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;
		// container.addTab('iTopoTaskHeader', strings.getKey('sidebar/SharedCanteen/Header'), headerTab.container);
		// container.addTab('iTopoItems', strings.getKey('sidebar/SharedCanteen/iTopoItems'), iTopoItemsTab.container);

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

	function refreshiTopoSkyCastleFarmTabs() {
		var castle = new iTopoSkyCastle();
		if (castle.castleUUID === editor.selected.userData.objectUUID) {
			//geometryUUID.setValue(castle.castleUUID);
			tabs.forEach(function(tab) {
				tab.panel.setValue(castle);
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
			//container.setDisplay( 'none' );
			return;
		}

		//container.setDisplay( 'inline-block' );
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
					createiTopoSkyCastleFarmTabs();
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
				refreshiTopoSkyCastleFarmTabs();
				break;
			case 'iTopoType/TaskObject/Star':
				refreshStarTabs();
				break;
			default:
				console.log('did not implement');
		}
	}

	//signals.editorCleared.add(refreshUI);

	//signals.sceneGraphChanged.add(refreshUI);

	signals.objectSelected.add(function(object) {
		refreshObjectUI(object);
	});

	return container;
}

export { iTopoTaskBriefcase };
