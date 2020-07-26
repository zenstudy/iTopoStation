/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UISelect } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js';

function GlobalKindView( editor ) {

	var signals = editor.signals;

	//

	var globalSelect = new UISelect();
	globalSelect.setPosition( 'absolute' );
	globalSelect.setRight( '10px' );
	globalSelect.setTop( '10px' );
	globalSelect.onChange( function () {
		editor.clear();
		iTopoEarthModel.earthSettings.GLOBAL_KIND = this.getValue();
		iTopoEarthModel.ReCreate();

	} );

	update();
	//

	function update() {

		var options = {Global2D: "Global2D", Global3D: "Global3D"};
		globalSelect.setOptions( options );
		globalSelect.setValue( iTopoEarthModel.earthSettings.GLOBAL_KIND );
	}

	return globalSelect;

}

export { GlobalKindView };
