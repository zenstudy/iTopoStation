/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
//import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'


function iTopoTaskChildStarUser(editor) {

	var strings = editor.strings;

	var starUser = {
	"starUUID": "88F48BD-823C-42F1-857A-124E495B351B",
	"cellPhone": 13688888888,
	"password": "starstar",
	"lng": 100,
	"lat": 100,
	"starWish": "star wish",
	"wxQRcode": ""
	};

	var container = new UIPanel();
	this.container = container;
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	{
		// starUUID
		var starUUIDRow = new UIRow();
		this.starUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.starUUID.setValue(starUser.starUUID);
		starUUIDRow.add(new UIText(strings.getKey('sidebar/starUser/starUUID')).setWidth('90px'));
		starUUIDRow.add(this.starUUID);

		container.add(starUUIDRow);
	}

	{
		// cellPhone
		var cellPhoneRow = new UIRow();
		cellPhoneRow.add(new UIText(strings.getKey('sidebar/starUser/cellPhone')).setWidth('90px'));

		this.cellPhoneInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cellPhoneInput.setValue(starUser.cellPhone);
		this.cellPhoneInput.onChange(function() {
			starUser.title = this.getValue();
		});
		cellPhoneRow.add(this.cellPhoneInput);

		container.add(cellPhoneRow);
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('sidebar/starUser/longitude')).setWidth('120px'));

		this.longitudeValueUI = new UINumber(starUser.longitude).setRange(2, Infinity);
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		longitudeRow.add(this.longitudeValueUI);

		container.add(longitudeRow);
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add(new UIText(strings.getKey('sidebar/starUser/latitude')).setWidth('120px'));

		this.latitudeValueUI = new UINumber(starUser.latitude).setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(this.latitudeValueUI);

		container.add(latitudeRow);
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add(new UIText(strings.getKey('sidebar/starUser/starWish')).setWidth('120px'));
		container.add(starWishTitleRow);

		var starWishTextAreaRow = new UIRow();
		this.starWishValueUI = new UITextArea().setWidth('250px').setFontSize('12px') /*.onChange( update )*/ ;
		this.starWishValueUI.dom.style.height = '662px';
		this.starWishValueUI.onKeyUp(function() {
			starUser.starWish = this.getValue();

		});
		starWishTextAreaRow.add(this.starWishValueUI);

		container.add(starWishTextAreaRow);
	}

	return this;
}

iTopoTaskChildStarUser.prototype = Object.create( UIElement.prototype );
iTopoTaskChildStarUser.prototype.constructor = iTopoTaskChildStarUser;

iTopoTaskChildStarUser.prototype = {

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.starUUID.setValue(taskObject.starUUID);
			this.cellPhoneInput.setValue(taskObject.cellPhone);
			this.longitudeValueUI.setValue(taskObject.lng);
			this.latitudeValueUI.setValue(taskObject.lat);
			this.starWishValueUI.setValue(taskObject.starWish);
		}

		this.taskObject = taskObject;
	},

}

export { iTopoTaskChildStarUser };
