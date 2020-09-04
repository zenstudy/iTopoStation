/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from '../iTopoUI.js';
import { iTopoTaskHeader } from './iTopoTask.Header.js';
import { iTopoTaskHistory } from './iTopoTask.History.js';
import { iTopoTaskLinks } from './iTopoTask.Links.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';

function iTopoTaskBriefcase(editor) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;
	var ActivedObjectType = '';
	var tabs = [];

	var container = new UITabbedPanel();
	//container.setId( 'properties' );
	container.setId('taskBar');
	container.setDisplay( 'none' );

	createTaskbar();

	// var sharedCanteen = new UISpan().add(
	// 	new iTopoObjectHeader( editor ),
	// 	new iTopoTaskBriefcaseBody( editor )
	// );

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

		 event.preventDefault();
	});

	// events

	function removeAllTabs() {
		tabs.forEach(function(tab){
			console.log(tab);
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

	function createTaskbar() {
		var headerTab = new iTopoTaskHeader(editor);
		var historyTab = new iTopoTaskHistory(editor);
		historyTab.setValue();
		var linkTab = new iTopoTaskLinks(editor);
		linkTab.setValue();

		tabs.push( {name:'header', title:strings.getKey('taskbar/Header')  ,panel: headerTab} );
		tabs.push( {name:'history', title: strings.getKey('taskbar/History'),panel: historyTab} );
		tabs.push( {name:'link', title: strings.getKey('taskbar/link'),panel: linkTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}


	function refreshTaskbar() {

		if (iTopoEarthModel.SkyCastle.castleUUID === editor.selected.userData.objectUUID) {

			tabs.forEach(function(tab) {
				tab.panel.setValue(iTopoEarthModel.SkyCastle);
			});

			return;
		}
	}

	var ignoreObjectSelectedSignal = false;

	function refreshObjectUI(object) {

		if (ignoreObjectSelectedSignal === true)
			return;

		if (object === null) {
			//ActivedObjectType = '';
			// removeAllTabs();
			// console.log('ActivedObjectType:' + ActivedObjectType);
			container.setDisplay( 'none' );
			return;
		}

		container.setDisplay( 'inline-block' );
		// if (object.userData.objectType !== ActivedObjectType) {
		// 	ActivedObjectType = object.userData.objectType;
		// 	removeAllTabs();
		// 	console.log('ActivedObjectType:' + ActivedObjectType);
		// 	createiTopoSkyCastleTabs();
		// }

		//to refresh
		refreshTaskbar();
	}

	signals.taskCardSelected.add(function(object) {
		refreshObjectUI(object);
	});

	return container;
}

export { iTopoTaskBriefcase };
