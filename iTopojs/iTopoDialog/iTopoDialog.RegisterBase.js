import { UIElement, UIPanel, UISpan, UIButton, UIRow, UISelect, UIText,UITextArea,UINumber, UIInteger, UIInput } from'../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoBaseObject } from '../iTopoElement/iTopoBaseObject.js';

function iTopoDialogRegisterBase( editor, dispalyContext ) {
	var scope = this;
	var strings = editor.strings;

	var container = new UISpan();
	container.setId( 'BluePrint' );
	container.setPosition( 'absolute' );
	scope.container = container;

	var header = new UIPanel();
	header.setBackgroundColor( '#dddddd' );
	header.setPadding( '10px' );
	scope.container.add( header );

	var title = new UIText().setColor( '#fff' );
	title.setValue(dispalyContext);
	header.add( title );

	var buttonSVG = ( function () {

		var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'width', 32 );
		svg.setAttribute( 'height', 32 );
		var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
		path.setAttribute( 'd', 'M 12,12 L 22,22 M 22,12 12,22' );
		path.setAttribute( 'stroke', '#fff' );
		svg.appendChild( path );
		return svg;

	} )();

	var closeBtn = new UIElement( buttonSVG );
	closeBtn.setPosition( 'absolute' );
	closeBtn.setTop( '3px' );
	closeBtn.setRight( '1px' );
	closeBtn.setCursor( 'pointer' );
	closeBtn.dom.addEventListener( 'click', function () {
		//container.setDisplay( 'none' );
		document.body.removeChild(scope.container.dom);
	} );
	header.add( closeBtn );
	scope.closeBtn = closeBtn;
	scope.header = header;

	var baseObjectOnEarth = new iTopoBaseObject();
	var baseInfo = baseObjectOnEarth.info;

	var dlgBody = new UIPanel();
	dlgBody.setPadding( '10px' );
	dlgBody.setBackgroundColor( '#eeeeee' );
	container.add(dlgBody);

	{
		// uuid
		var geometryUUIDRow = new UIRow();
		var geometryUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
		geometryUUID.setValue( THREE.MathUtils.generateUUID() );
		var geometryUUIDRenew = new UIButton( strings.getKey( 'iTopoDialog/lightEarth/newUUID' ) ).setMarginLeft( '7px' ).onClick( function () {

			geometryUUID.setValue( THREE.MathUtils.generateUUID() );

		//	editor.execute( new SetGeometryValueCommand( editor, editor.selected, 'uuid', geometryUUID.getValue() ) );

		} );

		geometryUUIDRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/baseUUID' ) ).setWidth( '90px' ) );
		geometryUUIDRow.add( geometryUUID );
		geometryUUIDRow.add( geometryUUIDRenew );

		dlgBody.add( geometryUUIDRow );
	}

	{
		var options = {
			'iTopoType/TaskObject/SharedCanteen': strings.getKey( 'iTopoType/TaskObject/SharedCanteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};
		var taskTypeRow = new UIRow();
		taskTypeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/taskType' ) ).setWidth( '90px' ) );

		var taskTypeSelect = new UISelect().setWidth( '160px' );
		taskTypeSelect.setOptions( options );
		taskTypeSelect.setValue(baseInfo.taskType);
		taskTypeSelect.onChange( function () {
			var value = this.getValue();
			baseInfo.taskType =  value;
			console.log(baseInfo.taskType );
		} );

		taskTypeRow.add( taskTypeSelect );
		dlgBody.add( taskTypeRow );
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/title' ) ).setWidth( '90px' ) );

		var titleInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		titleInput.setValue( baseInfo.title );
		titleInput.onChange( function () {
			baseInfo.title = this.getValue();
		} );
		titleRow.add( titleInput );

		dlgBody.add( titleRow );
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/city' ) ).setWidth( '90px' ) );

		var cityInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		cityInput.setValue( baseInfo.city );
		cityInput.onChange( function () {
			baseInfo.city = this.getValue();
		} );
		cityRow.add( cityInput );

		dlgBody.add( cityRow );
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/address' ) ).setWidth( '90px' ) );

		var addressInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		addressInput.setValue( baseInfo.address );
		addressInput.onChange( function () {
			baseInfo.lng = this.getValue();
		} );
		addressRow.add( addressInput );

		dlgBody.add( addressRow );
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/longitude' ) ).setWidth( '90px' ) );

		var longitudeValueUI = new UINumber( baseInfo.lng ).setRange( 2, Infinity );
		longitudeValueUI.onChange( function () {
			baseInfo.lng = this.getValue();
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/latitude' ) ).setWidth( '90px' ) );

		var latitudeValueUI = new UINumber( baseInfo.lat ).setRange( 2, Infinity );
		latitudeValueUI.onChange( function () {
			baseInfo.lat = this.getValue();

		} );
		latitudeRow.add( latitudeValueUI );

		dlgBody.add( latitudeRow );
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/lightWish' ) ).setWidth( '90px' ) );
		dlgBody.add( lightWishTitleRow );

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setHeight( '120px' ).setFontSize( '12px' )/*.onChange( update )*/;
		lightWishValueUI.dom.cols = 40;
		lightWishValueUI.setValue( baseInfo.lightWish );
		lightWishValueUI.onKeyUp( function () {
			baseInfo.lightWish = this.getValue();

		} );
		lightWishTextAreaRow.add( lightWishValueUI );

		dlgBody.add( lightWishTextAreaRow );
	}

	var bottomPanel = new UIPanel();
	bottomPanel.setPadding( '10px' );
	bottomPanel.setBackgroundColor( '#dddddd' );
	container.add( bottomPanel );
	{
		var lightEarth = new UIButton( strings.getKey( 'iTopoDialog/ok' ) );
		lightEarth.setLeft( '170px' );
		lightEarth.onClick( function () {

			//editor.signals.baseRegistered.dispatch( editor.starUser.starUUID, baseInfo);
			document.body.removeChild(document.getElementById("BluePrint"));

		} );
		bottomPanel.add( lightEarth );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/cancel' ) );
		cancelBtn.setLeft( '180px' );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("BluePrint"));
		} );
		bottomPanel.add( cancelBtn );
	}

	//
	return scope;
}

export { iTopoDialogRegisterBase };
