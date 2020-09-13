/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UITabbedPanel, UISpan } from '../iTopoUI.js';
import { iTopoUserBriefcaseRegisterTool } from './iTopoUserBriefcase.RegisterTool.js';
import { iTopoUserBriefcaseMineAsset } from './iTopoUserBriefcase.MineAsset.js';
import { iTopoUserBriefcaseMineFocus } from './iTopoUserBriefcase.MineFocus.js';
import { iTopoUserBriefcaseMineFollower } from './iTopoUserBriefcase.MineFollower.js';
import { iTopoUserBriefcaseBluePrint } from './iTopoUserBriefcase.BluePrint.js';
// import { iTopoEarthModel } from '../iTopoEarthModel.js';

function iTopoUserBriefcase(editor) {
	var scope = this;
	var signals = editor.signals;
	var strings = editor.strings;
	var ActivedObjectType = '';
	scope.tabs = [];

	var container = new UITabbedPanel();
	//container.setId( 'properties' );
	container.setId('userBriefcase');
	//container.setDisplay( 'none' );

	container.tabsDiv.dom.addEventListener('click', function() {

		scope.tabs.forEach(function(tab) {
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
		scope.tabs.forEach(function(tab){
			console.log(tab);
			tab.panel.dispose();
		}) ;

		scope.tabs = [];

		container.removeAllTab();
	}

	function activeTab( tab ){
		container.select(tab.name);
		scope.lastSelectTabName = tab.name;
		console.log(tab.name);
		tab.panel.activeTabPanel();
	}

	function getTab( tabName ) {
		for(var i = 0 ; i < scope.tabs.length; ++i) {
			if(scope.tabs[i].name === tabName){
				return scope.tabs[i];
			}
		}
		return null;
	}

	function createUserBriefcase() {
		var registerToolTab = new iTopoUserBriefcaseRegisterTool(editor,scope);
		var mineAssetTab = new iTopoUserBriefcaseMineAsset(editor);
		//mineAssetTab.setValue();
		var userBriefcaseTab = new iTopoUserBriefcaseMineFocus(editor);
		//userBriefcaseTab.setValue();
		var mineFollowerTab = new iTopoUserBriefcaseMineFollower(editor);
		//mineFollowerTab.setValue();

		scope.tabs.push( {name:'registerTool', title:strings.getKey('userBriefcase/RegisterTool')  ,panel: registerToolTab} );
		scope.tabs.push( {name:'minAsset', title: strings.getKey('userBriefcase/MineAsset'),panel: mineAssetTab} );
		scope.tabs.push( {name:'mineFocus', title: strings.getKey('userBriefcase/MineFocus'),panel: userBriefcaseTab} );
		scope.tabs.push( {name:'mineFollower', title: strings.getKey('userBriefcase/MineFollower'),panel: mineFollowerTab} );

		scope.tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( scope.tabs[0] );
	}

	function createBluePrintPage() {

		var bluePrintTab = new iTopoUserBriefcaseBluePrint(editor);

		scope.tabs.push( {name:'bluePrintTab', title: strings.getKey('userBriefcase/BluePrintPage'),panel: bluePrintTab} );

		scope.tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( scope.tabs[0] );
	}


	function refreshTaskbar(object) {
		scope.tabs.forEach(function(tab) {tab.panel.setValue(object);	});
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

	signals.userRegisteredOrLogin.add(function(object) {
		removeAllTabs();
		createUserBriefcase();
		refreshTaskbar(object);
	});

	signals.userLogoff.add(function() {
		removeAllTabs();
		createBluePrintPage();
	});

	signals.baseRegistered.add( function(object){
		var assetTab = getTab( 'minAsset' );
		assetTab.panel.registerMineAsset(object);
	});

	createBluePrintPage();

	return container;
}

export { iTopoUserBriefcase };
