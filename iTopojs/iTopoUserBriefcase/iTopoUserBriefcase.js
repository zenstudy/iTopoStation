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
	var tabs = [];

	var container = new UITabbedPanel();
	//container.setId( 'properties' );
	container.setId('userBriefcase');
	//container.setDisplay( 'none' );

	//createUserBriefcase();

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

	function createUserBriefcase() {
		var registerToolTab = new iTopoUserBriefcaseRegisterTool(editor);
		var mineAssetTab = new iTopoUserBriefcaseMineAsset(editor);
		mineAssetTab.setValue();
		var userBriefcaseTab = new iTopoUserBriefcaseMineFocus(editor);
		userBriefcaseTab.setValue();
		var mineFollowerTab = new iTopoUserBriefcaseMineFollower(editor);
		mineFollowerTab.setValue();

		tabs.push( {name:'registerTool', title:strings.getKey('userBriefcase/RegisterTool')  ,panel: registerToolTab} );
		tabs.push( {name:'minAsset', title: strings.getKey('userBriefcase/MineAsset'),panel: mineAssetTab} );
		tabs.push( {name:'mineFocus', title: strings.getKey('userBriefcase/MineFocus'),panel: userBriefcaseTab} );
		tabs.push( {name:'mineFollower', title: strings.getKey('userBriefcase/MineFollower'),panel: mineFollowerTab} );

		tabs.forEach(function(tab){
			container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		activeTab( tabs[0] );
	}

	function createBluePrintPage() {

		var bluePrintTab = new iTopoUserBriefcaseBluePrint(editor);

		tabs.push( {name:'bluePrintTab', title: strings.getKey('userBriefcase/BluePrintPage'),panel: bluePrintTab} );

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

	signals.userRegisteredOrLogin.add(function(object) {
		removeAllTabs();
		createUserBriefcase();
		refreshTaskbar(object);
	});

	signals.userLogoff.add(function() {
		removeAllTabs();
		createBluePrintPage();
	});

	// var sharedCanteen = new UISpan().add(
	// 	new iTopoObjectHeader( editor ),
	// 	new iTopoTaskBriefcaseBody( editor )
	// );

	createBluePrintPage();

	return container;
}

export { iTopoUserBriefcase };
