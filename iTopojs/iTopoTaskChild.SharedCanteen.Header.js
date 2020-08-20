/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from './iTopoUI.js';
//import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'


function iTopoTaskChildSharedCanteenHeader(editor) {

	var strings = editor.strings;

	var lightTask = {
		baseUUID: THREE.MathUtils.generateUUID(),
		taskType: "iTopoType/TaskObject/EcologicalFarm",
		title: "湖北恩施宣恩县:松果家园",
		city: "恩施",
		address: "湖北恩施宣恩县",
		longitude: 0,
		latitude: 0,
		lightWish: "light wish",
	};

	var container = new UIPanel();
	this.container = container;
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	{
		// baseUUID
		var geometryUUIDRow = new UIRow();
		this.geometryUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		this.geometryUUID.setValue(lightTask.baseUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/baseUUID')).setWidth('90px'));
		geometryUUIDRow.add(this.geometryUUID);

		container.add(geometryUUIDRow);
	}

	{
		var options = {
			'iTopoType/TaskObject/SharedCanteen': strings.getKey( 'iTopoType/TaskObject/SharedCanteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};

		var taskTypeRow = new UIRow();
		taskTypeRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/taskType')).setWidth('90px'));
		this.taskTypeSelect = new UISelect().setWidth('150px');
		this.taskTypeSelect.setOptions(options);
		this.taskTypeSelect.setValue(strings.getKey(lightTask.taskType));
		this.taskTypeSelect.onChange(function() {
			var value = this.getValue();
			console.log(value);
			lightTask.taskType = value;
		});

		taskTypeRow.add(this.taskTypeSelect);

		container.add(taskTypeRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/title')).setWidth('90px'));

		this.titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.titleInput.setValue(lightTask.title);
		this.titleInput.onChange(function() {
			lightTask.title = this.getValue();
		});
		titleRow.add(this.titleInput);

		container.add(titleRow);
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/city')).setWidth('90px'));

		this.cityInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.cityInput.setValue(lightTask.city);
		this.cityInput.onChange(function() {
			lightTask.city = this.getValue();
		});
		cityRow.add(this.cityInput);

		container.add(cityRow);
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/address')).setWidth('90px'));

		this.addressInput = new UIInput().setWidth('160px').setFontSize('12px');
		this.addressInput.setValue(lightTask.address);
		this.addressInput.onChange(function() {
			lightTask.lng = this.getValue();
		});
		addressRow.add(this.addressInput);

		container.add(addressRow);
	}


	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/longitude')).setWidth('120px'));

		this.longitudeValueUI = new UINumber(lightTask.longitude).setRange(2, Infinity);
		this.longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		longitudeRow.add(this.longitudeValueUI);

		container.add(longitudeRow);
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/latitude')).setWidth('120px'));

		this.latitudeValueUI = new UINumber(lightTask.latitude).setRange(2, Infinity);
		this.latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(this.latitudeValueUI);

		container.add(latitudeRow);
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add(new UIText(strings.getKey('sidebar/SharedCanteen/Header/lightWish')).setWidth('120px'));
		container.add(lightWishTitleRow);

		var lightWishTextAreaRow = new UIRow();
		this.lightWishValueUI = new UITextArea().setWidth('250px').setFontSize('12px') /*.onChange( update )*/ ;
		this.lightWishValueUI.dom.style.height = '662px';
		this.lightWishValueUI.onKeyUp(function() {
			lightTask.lightWish = this.getValue();

		});
		lightWishTextAreaRow.add(this.lightWishValueUI);

		container.add(lightWishTextAreaRow);
	}

	return this;
}

iTopoTaskChildSharedCanteenHeader.prototype = Object.create( UIElement.prototype );
iTopoTaskChildSharedCanteenHeader.prototype.constructor = iTopoTaskChildSharedCanteenHeader;

iTopoTaskChildSharedCanteenHeader.prototype = {

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			this.geometryUUID.setValue(taskObject.baseUUID);
			this.taskTypeSelect.setValue(taskObject.taskType);
			this.titleInput.setValue(taskObject.title);
			this.cityInput.setValue(taskObject.city);
			this.addressInput.setValue(taskObject.address);
			this.longitudeValueUI.setValue(taskObject.lng);
			this.latitudeValueUI.setValue(taskObject.lat);
			this.lightWishValueUI.setValue(taskObject.lightWish);
		}

		this.taskObject = taskObject;
	},

}

export { iTopoTaskChildSharedCanteenHeader };
