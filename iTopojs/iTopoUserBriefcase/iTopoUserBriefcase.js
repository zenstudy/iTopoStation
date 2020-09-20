import { UITabbedPanel, UISpan } from '../iTopoUI.js';
import { iTopoUserBriefcaseRegisterTool } from './iTopoUserBriefcase.RegisterTool.js';
import { iTopoUserBriefcaseMineAsset } from './iTopoUserBriefcase.MineAsset.js';
import { iTopoUserBriefcaseMineFocus } from './iTopoUserBriefcase.MineFocus.js';
import { iTopoUserBriefcaseMineFollower } from './iTopoUserBriefcase.MineFollower.js';
import { iTopoUserBriefcaseBluePrint } from './iTopoUserBriefcase.BluePrint.js';

function iTopoUserBriefcase(editor) {
	var scope = this;
	var signals = editor.signals;
	this.strings = editor.strings;
	var ActivedObjectType = '';
	scope.tabs = [];

	var container = new UITabbedPanel();
	this.container = container;

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

		// event.preventDefault();
	});

	if(editor.starUser.alreadyLoggedIn()){
		scope.createUserBriefcase();
		scope.refreshUserBriefcase(editor.starUser);
	} else {
		scope.createBluePrintPage();
	}

	return scope;
}

iTopoUserBriefcase.prototype.constructor = iTopoUserBriefcase;

iTopoUserBriefcase.prototype = {

	// events
	removeAllTabs: function() {
		var scope = this;
		scope.tabs.forEach(function(tab){
			console.log(tab);
			tab.panel.dispose();
		}) ;

		scope.tabs = [];
		scope.container.removeAllTab();
	},

	activeTab: function( tab ){
		var scope = this;
		scope.container.select(tab.name);
		scope.lastSelectTabName = tab.name;
		console.log(tab.name);
		tab.panel.activeTabPanel();
	},

	getTab: function( tabName ) {
		var scope = this;
		for(var i = 0 ; i < scope.tabs.length; ++i) {
			if(scope.tabs[i].name === tabName){
				return scope.tabs[i];
			}
		}
		return null;
	},

	createUserBriefcase: function () {
		var scope = this;
		var registerToolTab = new iTopoUserBriefcaseRegisterTool(editor,scope);
		var mineAssetTab = new iTopoUserBriefcaseMineAsset(editor);
		var userBriefcaseTab = new iTopoUserBriefcaseMineFocus(editor);
		var mineFollowerTab = new iTopoUserBriefcaseMineFollower(editor);

		scope.tabs.push( {name:'registerTool', title: scope.strings.getKey('userBriefcase/RegisterTool')  ,panel: registerToolTab} );
		scope.tabs.push( {name:'minAsset', title: scope.strings.getKey('userBriefcase/MineAsset'),panel: mineAssetTab} );
		scope.tabs.push( {name:'mineFocus', title: scope.strings.getKey('userBriefcase/MineFocus'),panel: userBriefcaseTab} );
		scope.tabs.push( {name:'mineFollower', title: scope.strings.getKey('userBriefcase/MineFollower'),panel: mineFollowerTab} );

		scope.tabs.forEach(function(tab){
			scope.container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;

		scope.activeTab( scope.tabs[0] );
	},

	createBluePrintPage: function () {
		var scope = this;
		var bluePrintTab = new iTopoUserBriefcaseBluePrint(editor);
		scope.tabs.push( {name:'bluePrintTab', title: scope.strings.getKey('userBriefcase/BluePrintPage'),panel: bluePrintTab} );
		scope.tabs.forEach(function(tab){
			scope.container.addTab(tab.name, tab.title, tab.panel.container);
		}) ;
		scope.activeTab( scope.tabs[0] );
	},

	refreshUserBriefcase: function(starUser) {

		var scope = this;
		if (starUser === null) {
			return;
		}
		//to refresh
		scope.tabs.forEach(function(tab) { tab.panel.setValue(starUser); });

	},

	registerBaseIntoMineAsset:function(baseObject)
	{
		var assetTab = this.getTab( 'minAsset' );
		assetTab.panel.registerMineAsset(baseObject);
	}
}

export { iTopoUserBriefcase };
