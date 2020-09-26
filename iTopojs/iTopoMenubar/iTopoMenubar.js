import { UIPanel } from '../iTopoUI.js';

import { iTopoMenubarEarthHub } from './iTopoMenubar.EarthHub.js';
import { iTopoMenubarSharedCanteen } from './iTopoMenubar.SharedCanteen.js';
import { iTopoMenubarEcologicalFarm } from './iTopoMenubar.EcologicalFarm.js';
import { iTopoMenubarBlockChain } from './iTopoMenubar.BlockChain.js';
import { iTopoMenubarAboutiTopoEarth } from './iTopoMenubar.AboutiTopoEarth.js';

import { iTopoMenubarLogin } from './iTopoMenubar.Login.js';
import { iTopoMenubarRegister } from './iTopoMenubar.Register.js';
import { iTopoMenubarStarUser } from './iTopoMenubar.StarUser.js';

function iTopoMenubar(editor) {

	this.container = new UIPanel();
	this.container.setId('menubar');

	this.container.add(new iTopoMenubarEarthHub(editor));
	this.container.add(new iTopoMenubarEcologicalFarm(editor));
	this.container.add(new iTopoMenubarSharedCanteen(editor));
	this.container.add(new iTopoMenubarBlockChain(editor));
	this.container.add(new iTopoMenubarAboutiTopoEarth(editor));

	if (editor.starUser.alreadyLoggedIn()) {
		this.addMenubarStarUser(new iTopoMenubarStarUser(editor, this, editor.starUser));
	} else {
		this.registerMenu = new iTopoMenubarRegister(editor, this);
		this.container.add(this.registerMenu);

		this.loginMenu = new iTopoMenubarLogin(editor, this);
		this.container.add(this.loginMenu);
	}

	return this.container;
}

iTopoMenubar.prototype = {

	addMenubarStarUser: function(starUserMenu) {
		this.starUserMenu = starUserMenu;
		this.container.add(this.starUserMenu);
	},

	addMenubarRegisterMenu: function() {
		if (this.registerMenu === undefined || this.registerMenu === undefined)
			this.registerMenu = new iTopoMenubarRegister(editor, this);
		this.container.add(this.registerMenu);
	},

	addMenubarLoginMenu: function() {
		if (this.loginMenu === undefined || this.loginMenu === undefined)
			this.loginMenu = new iTopoMenubarLogin(editor, this);
		this.container.add(this.loginMenu);
	},

	removeMenubarStarUser: function() {
		if (this.starUserMenu === undefined || this.starUserMenu === undefined)
			return;
		this.container.remove(this.starUserMenu);
		this.starUserMenu = null;
	},

	removeRegisterMenu: function() {
		if (this.registerMenu === undefined || this.registerMenu === undefined)
			return;
		this.container.remove(this.registerMenu);
		this.registerMenu = null;
	},

	removeLoginMenu: function() {
		if (this.loginMenu === undefined || this.loginMenu === undefined)
			return;
		this.container.remove(this.loginMenu);
		this.loginMenu = null;
	}
}

export { iTopoMenubar };
