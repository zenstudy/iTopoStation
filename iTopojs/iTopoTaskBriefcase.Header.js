/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../js/libs/ui.js';
import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoTaskBriefcaseHeader(editor) {

	var lightTask = {
		baseUUID: THREE.MathUtils.generateUUID(),
		taskType: 'Canteen',
		title: "湖北恩施宣恩县:松果家园",
		city: "恩施",
		address: "湖北恩施宣恩县",
		longitude: 0,
		latitude: 0,
		lightWish: "light wish",
	};

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	{
		// baseUUID
		var geometryUUIDRow = new UIRow();
		var geometryUUID = new UIInput().setWidth('120px').setFontSize('12px').setDisabled(true);
		geometryUUID.setValue(lightTask.baseUUID);
		geometryUUIDRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/baseUUID')).setWidth('90px'));
		geometryUUIDRow.add(geometryUUID);

		container.add(geometryUUIDRow);
	}

	{
		var options = {
			Canteen: "Canteen",
			EcologicalFarm: "EcologicalFarm",
		};

		var taskTypeRow = new UIRow();
		var taskTypeSelect = new UISelect().setWidth('150px');
		taskTypeSelect.setOptions(options);
		taskTypeSelect.setValue(options.Canteen);
		taskTypeSelect.onChange(function() {
			var value = this.getValue();
			lightTask.taskType = value;
		});

		taskTypeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/taskType')).setWidth('90px'));
		taskTypeRow.add(taskTypeSelect);

		container.add(taskTypeRow);
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/title')).setWidth('90px'));

		var titleInput = new UIInput().setWidth('160px').setFontSize('12px');
		titleInput.setValue(lightTask.title);
		titleInput.onChange(function() {
			lightTask.title = this.getValue();
		});
		titleRow.add(titleInput);

		container.add(titleRow);
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/city')).setWidth('90px'));

		var cityInput = new UIInput().setWidth('160px').setFontSize('12px');
		cityInput.setValue(lightTask.city);
		cityInput.onChange(function() {
			lightTask.city = this.getValue();
		});
		cityRow.add(cityInput);

		container.add(cityRow);
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/address')).setWidth('90px'));

		var addressInput = new UIInput().setWidth('160px').setFontSize('12px');
		addressInput.setValue(lightTask.address);
		addressInput.onChange(function() {
			lightTask.lng = this.getValue();
		});
		addressRow.add(addressInput);

		container.add(addressRow);
	}


	{
		var longitudeRow = new UIRow();

		longitudeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/longitude')).setWidth('120px'));

		var longitudeValueUI = new UINumber(lightTask.longitude).setRange(2, Infinity);
		longitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		longitudeRow.add(longitudeValueUI);

		container.add(longitudeRow);
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/latitude')).setWidth('120px'));

		var latitudeValueUI = new UINumber(lightTask.latitude).setRange(2, Infinity);
		latitudeValueUI.onChange(function() {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		});
		latitudeRow.add(latitudeValueUI);

		container.add(latitudeRow);
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add(new UIText(strings.getKey('iTopoDialog/lightEarth/lightWish')).setWidth('120px'));
		container.add(lightWishTitleRow);

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setWidth('250px').setFontSize('12px') /*.onChange( update )*/ ;
		lightWishValueUI.dom.style.height = '662px';
		console.log(lightWishValueUI.dom);
		lightWishValueUI.onKeyUp(function() {
			lightTask.lightWish = this.getValue();

		});
		lightWishTextAreaRow.add(lightWishValueUI);
		console.log(lightWishTextAreaRow.dom);

		container.add(lightWishTextAreaRow);
	}


	var ignoreObjectSelectedSignal = false;

	function refreshUI() {

		if (editor.selected !== null) {

			let P1 = new Promise(resolve => {
				fetch(iTopoEarthSettings.ITOPOBASE_FILE, {
					method: 'GET',
					mode: 'cors', // 允许发送跨域请求
					credentials: 'include'
				}).then(function(response) {
					//打印返回的json数据
					response.json().then(function(json) {
						for (var i = 0; i < json.length; i++) {
							if (json[i].baseUUID === editor.selected.userData.objectUUID) {
								geometryUUID.setValue(json[i].baseUUID);
								taskTypeSelect.setOptions(options);
								taskTypeSelect.setValue(json[i].taskType);
								titleInput.setValue(json[i].title);
								cityInput.setValue(json[i].city);
								addressInput.setValue(json[i].address);
								longitudeValueUI.setValue(json[i].lng);
								latitudeValueUI.setValue(json[i].lat);
								lightWishValueUI.setValue(json[i].lightWish);
								break;
							}
						}
					})
				}).catch(function(e) {
					console.log('error: ' + e.toString());
				})
			});
			let P2 = new Promise(resolve => {
				fetch(iTopoEarthSettings.ITOPOUSER_FILE, {
					method: 'GET',
					mode: 'cors', // 允许发送跨域请求
					credentials: 'include'
				}).then(function(response) {
					//打印返回的json数据
					response.json().then(function(json) {
						for (var i = 0; i < json.length; i++) {
							if (json[i].starUUID === editor.selected.userData.objectUUID) {
								geometryUUID.setValue(json[i].starUUID);
								// taskTypeSelect.setOptions(options);
								// taskTypeSelect.setValue(json[i].taskType);
								// titleInput.setValue(json[i].title);
								// cityInput.setValue(json[i].city);
								// addressInput.setValue(json[i].address);
								// longitudeValueUI.setValue(json[i].lng);
								// latitudeValueUI.setValue(json[i].lat);
								// lightWishValueUI.setValue(json[i].lightWish);
								break;
							}
						}
					})
				}).catch(function(e) {
					console.log('error: ' + e.toString());
				})
			});

			Promise.race([P1, P2])
				.then(value => {
					console.log(value);
				})
		}
	}

	refreshUI();

	// events

	signals.editorCleared.add(refreshUI);

	signals.sceneGraphChanged.add(refreshUI);

	signals.objectSelected.add(function(object) {

		if (ignoreObjectSelectedSignal === true) return;

		if (object !== null) {
			refreshUI();
		} else {
			//outliner.setValue( null );
		}

	});

	return container;
}

export {
	iTopoTaskBriefcaseHeader
};
