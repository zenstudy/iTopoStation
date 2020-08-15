/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UISelect } from './iTopoUI.js';
import { iTopoEarthModel } from './iTopoEarthModel.js';
import {iTopoEarthSettings} from'./iTopoEarthSettings.js';

function GlobalStyleView( editor ) {

	var signals = editor.signals;

	//

	var globalSelect = new UISelect();
	globalSelect.setPosition( 'absolute' );
	globalSelect.setRight( '10px' );
	globalSelect.setTop( '40px' );
	globalSelect.onChange( function () {
		editor.clear();
		iTopoEarthSettings.EARTH_STYLE = this.getValue();
		iTopoEarthModel.ReCreate();

	} );

	update();
	//

	function update() {

		var options = {标准地图: "标准地图", 粒子地壳: "粒子地壳", 彩色地壳:'彩色地壳', 线框地壳: "线框地壳"};
		globalSelect.setOptions( options );
		globalSelect.setValue( iTopoEarthSettings.EARTH_STYLE );
	}

	return globalSelect;

}

export { GlobalStyleView };
