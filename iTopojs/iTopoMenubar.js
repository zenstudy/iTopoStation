/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel } from '../js/libs/ui.js';

import { iTopoMenubarEarthHub } from './iTopoMenubar.EarthHub.js';
import { iTopoMenubarSharedCanteen } from './iTopoMenubar.SharedCanteen.js';
import { iTopoMenubarEcologicalFarm } from './iTopoMenubar.EcologicalFarm.js';
import { iTopoMenubarBlockChain } from './iTopoMenubar.BlockChain.js';
import { iTopoMenubarLogin } from './iTopoMenubar.Login.js';


function iTopoMenubar( editor ) {

	var container = new UIPanel();
	container.setId( 'menubar' );

	container.add( new iTopoMenubarEarthHub( editor ) );
	container.add( new iTopoMenubarEcologicalFarm( editor ) );
	container.add( new iTopoMenubarSharedCanteen( editor ) );
	container.add( new iTopoMenubarBlockChain( editor ) );

	container.add( new iTopoMenubarLogin( editor ) );

	return container;
}

export { iTopoMenubar };
