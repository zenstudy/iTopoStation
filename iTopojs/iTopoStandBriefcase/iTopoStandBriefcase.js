import { UITabbedPanel, UISpan } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoTaskHeader } from './iTopoTask.Header.js';
import { iTopoTaskHistory } from './iTopoTask.History.js';
import { iTopoTaskLinks } from './iTopoTask.Links.js';
import { iTopoArticleHeader } from './iTopoArticle.Header.js';
import { iTopoAudioHeader } from './iTopoAudio.Header.js';
import { iTopoVideoHeader } from './iTopoVideo.Header.js';

function iTopoStandBriefcase(editor) {
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
	// 	new iTopoStandBriefcase( editor )
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
//			console.log(tab);
			tab.panel.dispose();
		}) ;

		tabs = [];

		container.removeAllTab();
	}

	function activeTab( tab ){
		container.select(tab.name);
		scope.lastSelectTabName = tab.name;
//		console.log(tab.name);
		tab.panel.activeTabPanel();
	}

	function createTaskbar() {
		var headerTab = new iTopoTaskHeader(editor);
		var historyTab = new iTopoTaskHistory(editor);
		historyTab.setValue();
		var linkTab = new iTopoTaskLinks(editor);
		linkTab.setValue();

		tabs.push( {name:'header', title:strings.getKey('iTopoStand/taskbar/Header')  ,panel: headerTab} );
		tabs.push( {name:'history', title: strings.getKey('iTopoStand/taskbar/History'),panel: historyTab} );
		tabs.push( {name:'link', title: strings.getKey('iTopoStand/taskbar/link'),panel: linkTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createArticlebar() {
		var headerTab = new iTopoArticleHeader(editor);

		tabs.push( {name:'header', title:strings.getKey('iTopoStand/article/Header')  ,panel: headerTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createVideobar() {
		var headerTab = new iTopoVideoHeader(editor);

		tabs.push( {name:'header', title:strings.getKey('iTopoStand/video/Header')  ,panel: headerTab} );

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

	function refreshArticleUI(ArticleUserData) {
		tabs.forEach(function(tab) { tab.panel.setValue(ArticleUserData); })
		return;
	};

	function refreshVideoUI(standUserData) {

		var taskType = "";
		if(standUserData.standStatus === "待办")
			taskType = "Todo";
		if(standUserData.standStatus === "在办")
			taskType = "InProgress";
		if(standUserData.standStatus === "已办")
			taskType = "Done";

		// editor.stationDB.fetchiTopoTasks(standUserData.objectUUID, taskType, function(json){
		// 	for (var i = 0; i < json.length; i++) {
		// 		if (json[i].taskUUID === standUserData.standUUID) {

		// 			tabs.forEach(function(tab) { tab.panel.setValue(json[i]); });
		// 			return;
		// 		}
		// 	}
		// });
	};

	function refreshAudioUI(standUserData) {

		var taskType = "";
		if(standUserData.standStatus === "待办")
			taskType = "Todo";
		if(standUserData.standStatus === "在办")
			taskType = "InProgress";
		if(standUserData.standStatus === "已办")
			taskType = "Done";

		// editor.stationDB.fetchiTopoTasks(standUserData.objectUUID, taskType, function(json){
		// 	for (var i = 0; i < json.length; i++) {
		// 		if (json[i].taskUUID === standUserData.standUUID) {

		// 			tabs.forEach(function(tab) { tab.panel.setValue(json[i]); });
		// 			return;
		// 		}
		// 	}
		// });
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

		removeAllTabs();

		if(thrObject.userData.standType === 'iTopoType/standObject/task'){
			//console.log(standUserData);
			createTaskbar();
			refreshTaskUI(thrObject.userData);
		} else if(thrObject.userData.standType === 'iTopoType/standObject/article'){
			console.log('article comming soon');
			createArticlebar();
			refreshArticleUI(thrObject.userData);
		} else if(thrObject.userData.standType === 'iTopoType/standObject/video'){
			console.log('video comming soon');
			createVideobar();
			refreshVideoUI(thrObject.userData);
		} else if(thrObject.userData.standType === 'iTopoType/standObject/audio'){
			console.log('audio comming soon');
			createAudiobar();
			refreshAudioUI(thrObject.userData);
		}

		container.setDisplay( 'inline-block' );
	}

	signals.objectInStandPlatformSelected.add(function(thrObject) {

		refreshStandUI(thrObject);

	});

	return container;
}

export { iTopoStandBriefcase };
