/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from './iTopoUI.js';

import { iTopoTaskChildHeader } from './iTopoTaskChild.header.js';
import { iTopoTaskChildDynamic } from './iTopoTaskChild.Dynamic.js';
import { iTopoTaskChildContribute } from './iTopoTaskChild.Contribute.js';
import { iTopoTaskChildParticipants } from './iTopoTaskChild.Participants.js';
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

	// var sharedCanteen = new UISpan().add(
	// 	new iTopoTaskChildHeader( editor ),
	// 	new iTopoTaskBriefcaseBody( editor )
	// );

	// events

	function removeAllTabs() {
		// tabs.forEach(function(tab){
		//    container.remove(tab);
		// });
		console.log('removeAllTabs');
		container.removeAllTab();
	}

	function createEcologicalFarmTabs() {
		console.log('createEcologicalFarmTabs');
		var headerTab = new iTopoTaskChildHeader(editor);
		// var dynamicTab = new iTopoTaskChildDynamic(editor);
		// var contributeTab = new iTopoTaskChildContribute(editor);
		// var participantsTab = new iTopoTaskChildParticipants(editor);

		tabs = [];
		tabs.push(headerTab);
		// tabs.push(dynamicTab);
		// tabs.push(contributeTab);
		// tabs.push(participantsTab);
		container.addTab('iTopoTask', strings.getKey('sidebar/iTopoTask'), headerTab.container);
		//	container.addTab('dynamic', strings.getKey('sidebar/iTopoTask/dynamic'), dynamicTab.container);
		//	container.addTab('contribute', strings.getKey('sidebar/iTopoTask/contribute'), contributeTab.container);
		//	container.addTab('participants', strings.getKey('sidebar/iTopoTask/participants'), participantsTab.container);

		container.select('iTopoTask');
	}

	function createCanteenTabs() {
		console.log('createCanteenTabs');
		var headerTab = new iTopoTaskChildHeader(editor);
		// var dynamicTab = new iTopoTaskChildDynamic(editor);
		// var contributeTab = new iTopoTaskChildContribute(editor);
		// var participantsTab = new iTopoTaskChildParticipants(editor);

		tabs = [];
		tabs.push(headerTab);
		// tabs.push(dynamicTab);
		// tabs.push(contributeTab);
		// tabs.push(participantsTab);

		container.addTab('iTopoTask', strings.getKey('sidebar/iTopoTask'), headerTab.container);
		//	container.addTab('dynamic', strings.getKey('sidebar/iTopoTask/dynamic'), dynamicTab.container);
		//	container.addTab('contribute', strings.getKey('sidebar/iTopoTask/contribute'), contributeTab.container);
		//	container.addTab('participants', strings.getKey('sidebar/iTopoTask/participants'), participantsTab.container);

		//	container.select('iTopoTask');
	}

	function createiTopoSkyCastleFarmTabs() {

		var headerTab = new iTopoTaskChildHeader(editor);

		tabs = [];
		tabs.push(headerTab);

		container.addTab('iTopoTask', strings.getKey('sidebar/iTopoTask'), headerTab.container);

		container.select('iTopoTask');
	}

	function createStarTabs() {
		var headerTab = new iTopoTaskChildHeader(editor);

		tabs = [];
		tabs.push(headerTab);

		container.addTab('iTopoTask', strings.getKey('sidebar/iTopoTask'), headerTab.container);

		container.select('iTopoTask');
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
							tab.setValue(json[i]);
						});

						return;
					}
				}
			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	}

	function refreshCanteenTabs() {

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
							//   tab.setValue(json[i]);
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
				// tab.setValue(castle);
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
							//   tab.setValue(json[i]);
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
				case "iTopoType/TaskObject/Canteen":
					createCanteenTabs();
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
			case 'iTopoType/TaskObject/Canteen':
				refreshCanteenTabs();
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
