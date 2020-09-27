import { UISelect } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import {iTopoEarthSettings} from'../iTopoEarthSettings.js';

function GlobalKindView( editor ) {
	var signals = editor.signals;

	//
	var globalSelect = new UISelect();
	globalSelect.setPosition( 'absolute' );
	globalSelect.setLeft( '120px' );
	globalSelect.setTop( '10px' );
	globalSelect.onChange( function () {
		editor.clear();
		iTopoEarthSettings.GLOBAL_KIND = this.getValue();
		iTopoEarthModel.ReCreate();

	} );

	update();
	//

	function update() {

		var options = {Global2D: "Global2D", Global3D: "Global3D"};
		globalSelect.setOptions( options );
		globalSelect.setValue( iTopoEarthSettings.GLOBAL_KIND );
	}

	return globalSelect;
}

export { GlobalKindView };
