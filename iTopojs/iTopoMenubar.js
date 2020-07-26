/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel } from '../js/libs/ui.js';


import { MenubarSharedCanteen } from './Menubar.SharedCanteen.js';
import { MenubarEcologicalFarm } from './Menubar.EcologicalFarm.js';
import { MenubarBlockChain } from './Menubar.BlockChain.js';
import { MenubarLogin } from './Menubar.Login.js';


function iTopoMenubar( editor ) {

	var container = new UIPanel();
	container.setId( 'menubar' );

	container.add( new MenubarSharedCanteen( editor ) );
	container.add( new MenubarEcologicalFarm( editor ) );
	container.add( new MenubarBlockChain( editor ) );

	container.add( new MenubarLogin( editor ) );

	return container;

}

export { iTopoMenubar };
