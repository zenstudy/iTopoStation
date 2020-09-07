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


	function refreshTaskbar(object) {
		tabs.forEach(function(tab) {tab.panel.setValue(object);	});
	}

	var ignoreObjectSelectedSignal = false;

	function refreshObjectUI(object) {

		if (ignoreObjectSelectedSignal === true)
			return;

		if (object === null) {
			container.setDisplay( 'none' );
			return;
		}

		container.setDisplay( 'inline-block' );

		//to refresh
		refreshTaskbar(object);
	}

	signals.taskCardSelected.add(function(object) {
		if(object === null || object === undefined){
			refreshObjectUI(null);
			return;
		}

		if(object.userData === null || object.userData === undefined){
			refreshObjectUI(null);
			return;
		}

		var taskFile = './iTopoObjects/' + object.userData.objectUUID + '/tasks.json';
		fetch( taskFile, {
			method: 'GET',
			mode: 'cors', // 允许发送跨域请求
			credentials: 'include'
		}).then(function(response) {
			//打印返回的json数据
			response.json().then(function(json) {
				for (var i = 0; i < json.length; i++) {
					if (json[i].taskUUID === object.userData.taskUUID) {
						refreshObjectUI(json[i]);
						return;
					}
				}
			})
		}).catch(function(e) {
			console.log('error: ' + e.toString());
		})
	});

	return container;
}

export { iTopoTaskBriefcase };
