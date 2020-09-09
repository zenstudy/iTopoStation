/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel } from '../iTopoUI.js';

import { iTopoMenubarEarthHub } from './iTopoMenubar.EarthHub.js';
import { iTopoMenubarSharedCanteen } from './iTopoMenubar.SharedCanteen.js';
import { iTopoMenubarEcologicalFarm } from './iTopoMenubar.EcologicalFarm.js';
import { iTopoMenubarBlockChain } from './iTopoMenubar.BlockChain.js';

import { iTopoMenubarLogin } from './iTopoMenubar.Login.js';
import { iTopoMenubarRegister } from './iTopoMenubar.Register.js';

function iTopoMenubar( editor ) {

	this.container = new UIPanel();
	this.container.setId( 'menubar' );

	this.container.add( new iTopoMenubarEarthHub( editor ) );
	this.container.add( new iTopoMenubarEcologicalFarm( editor ) );
	this.container.add( new iTopoMenubarSharedCanteen( editor ) );
	this.container.add( new iTopoMenubarBlockChain( editor ) );

	this.registerMenu = new iTopoMenubarRegister( editor );
	this.loginMenu = new iTopoMenubarLogin( editor, this );
	this.container.add( this.registerMenu );
	this.container.add( this.loginMenu );

	return this.container;
}

iTopoMenubar.prototype = {

	addMenubarStarUser:function (starUserMenu) {
		this.starUserMenu = starUserMenu;
		this.container.add( this.starUserMenu );
	},

	removeMenubarStarUser: function (){
		this.container.remove(this.starUserMenu);
	},

	removeRegisterMenu: function ( ) {
		this.container.remove(this.registerMenu);
	},
	
	removeLoginMenu: function ( ) {
		this.container.remove(this.loginMenu);
	}
}
export { iTopoMenubar };
