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

		// event.preventDefault();
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

	var ignoreObjectSelectedSignal = false;

	function refreshTaskUI(standUserData) {

		var taskType = "";
		if(standUserData.standStatus === "待办")
			taskType = "Todo";
		if(standUserData.standStatus === "在办")
			taskType = "InProgress";
		if(standUserData.standStatus === "已办")
			taskType = "Done";

		editor.stationDB.fetchiTopoTasks(standUserData.objectUUID, taskType, function(json){
			for (var i = 0; i < json.length; i++) {
				if (json[i].taskUUID === standUserData.standUUID) {

					tabs.forEach(function(tab) { tab.panel.setValue(json[i]); });
					return;
				}
			}
		});
	};

	function refreshStandUI(thrObject){

		if (ignoreObjectSelectedSignal === true)
			return;

		if(thrObject === null || thrObject === undefined){
			container.setDisplay( 'none' );
			return;
		}

		if(thrObject.userData === null || thrObject.userData === undefined){
			container.setDisplay( 'none' );
			return;
		}

	//	removeAllTabs();
		container.setDisplay( 'inline-block' );

		var standUserData = thrObject.userData;

		if(standUserData.standType === 'iTopoType/standObject/task'){
			//console.log(standUserData);
			refreshTaskUI(standUserData);
		}

	}

	signals.objectInStandPlatformSelected.add(function(thrObject) {

		refreshStandUI(thrObject);

	});

	return container;
}

export { iTopoTaskBriefcase };
