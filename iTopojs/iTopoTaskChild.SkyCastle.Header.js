/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
//import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'


function iTopoTaskChildSkyCastleHeader(editor) {

	var strings = editor.strings;

	var container = new UIPanel();
	this.container = container;
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	{
		// baseUUID
		var geometryUUIDRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.geometryUUID.setValue(iTopoEarthModel.SkyCastle.castleUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/castleUUID')).setWidth('90px'));
		geometryUUIDRow.add(this.geometryUUID);

		container.add(geometryUUIDRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/SkyCastle/Header/Title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(iTopoEarthModel.SkyCastle.title);
		this.titleInput.onChange(function() {
			//lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		container.add(titleRow);
	}

	return this;
}

iTopoTaskChildSkyCastleHeader.prototype = Object.create( UIElement.prototype );
iTopoTaskChildSkyCastleHeader.prototype.constructor = iTopoTaskChildSkyCastleHeader;

iTopoTaskChildSkyCastleHeader.prototype = {

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.castleUUID);
			this.titleInput.setValue(taskObject.title);
		}

		this.taskObject = taskObject;
	},

}

export { iTopoTaskChildSkyCastleHeader };
