import * as THREE from '../../threejs/build/three.module.js';

import { TransformControls } from '../../threejs/examples/jsm/controls/TransformControls.js';
import { UIPanel } from '../iTopoUI.js';

import { EditorControls } from '../../js/EditorControls.js';

import { GlobalKindView } from './GlobalKindView.js';
import { GlobalStyleView } from './GlobalStyleView.js';
import { iTopoViewportInfo } from './iTopoViewport.Info.js';
import { ViewHelper } from './iTopoViewport.ViewHelper.js';;

import { SetPositionCommand } from '../commands/SetPositionCommand.js';
import { SetRotationCommand } from '../commands/SetRotationCommand.js';
import { SetScaleCommand } from '../commands/SetScaleCommand.js';

import { TWEEN } from '../../threejs/examples/jsm/libs/tween.module.min.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoEarthSettings } from'../iTopoEarthSettings.js';
import { iTopoBaseHelper } from'../iTopoBaseHelper.js';

function iTopoViewport( editor ) {

	var signals = editor.signals;

	var container = new UIPanel();
	container.setId( 'viewport' );
	container.setPosition( 'absolute' );

	container.add( new GlobalKindView( editor ) );
	container.add( new GlobalStyleView( editor ) );
	container.add( new iTopoViewportInfo( editor ) );

	//

	var renderer = null;
	var pmremGenerator = null;
	var pmremTexture = null;

	var camera = editor.camera;
	var scene = editor.scene;
	var sceneHelpers = editor.sceneHelpers;
//	var showSceneHelpers = true;

	var needsUpdate = true;
	var objects = [];

	// helpers

	var grid = new THREE.GridHelper( 30, 30, 0x444444, 0x888888 );

	var array = grid.geometry.attributes.color.array;
	for ( var i = 0; i < array.length; i += 60 ) {
		for ( var j = 0; j < 12; j ++ ) {
			array[ i + j ] = 0.26;
		}
	}
	grid.visible = false; //added by zeping 2020/07/19

	var viewHelper = new ViewHelper( camera, container );

	//

	var box = new THREE.Box3();

	var selectionBox = new iTopoBaseHelper();
//	selectionBox.material.depthTest = false;
//	selectionBox.material.transparent = true;
	selectionBox.visible = false;
	sceneHelpers.add( selectionBox );

	var objectPositionOnDown = null;
	var objectRotationOnDown = null;
	var objectScaleOnDown = null;

	var transformControls = new TransformControls( camera, container.dom );
	transformControls.addEventListener( 'change', function () {

		var object = transformControls.object;

		if ( object !== undefined ) {

			selectionBox.setFromObject( object );

			var helper = editor.helpers[ object.id ];

			if ( helper !== undefined && helper.isSkeletonHelper !== true ) {

				helper.update();

			}
		}

		render();

	} );
	transformControls.addEventListener( 'mouseDown', function () {

		var object = transformControls.object;

		objectPositionOnDown = object.position.clone();
		objectRotationOnDown = object.rotation.clone();
		objectScaleOnDown = object.scale.clone();

		controls.enabled = false;

	} );
	transformControls.addEventListener( 'mouseUp', function () {

		var object = transformControls.object;

		if ( object !== undefined ) {

			switch ( transformControls.getMode() ) {

				case 'translate':

					if ( ! objectPositionOnDown.equals( object.position ) ) {

						editor.execute( new SetPositionCommand( editor, object, object.position, objectPositionOnDown ) );

					}

					break;

				case 'rotate':

					if ( ! objectRotationOnDown.equals( object.rotation ) ) {

						editor.execute( new SetRotationCommand( editor, object, object.rotation, objectRotationOnDown ) );

					}

					break;

				case 'scale':

					if ( ! objectScaleOnDown.equals( object.scale ) ) {

						editor.execute( new SetScaleCommand( editor, object, object.scale, objectScaleOnDown ) );

					}

					break;

			}

		}

		controls.enabled = true;

	} );

	//sceneHelpers.add( transformControls );

	// object picking

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	// events

	function updateAspectRatio() {

		camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
		camera.updateProjectionMatrix();

	}

	function getIntersects( point, objects ) {

		mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );

		raycaster.setFromCamera( mouse, camera );

		return raycaster.intersectObjects( objects );
	}

	function getIntersectsWithChildren( point, objects ) {
		mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
		raycaster.setFromCamera( mouse, camera );
		return raycaster.intersectObjects( objects, true /*recursive */);
	}

	var onDownPosition = new THREE.Vector2();
	var onUpPosition = new THREE.Vector2();
	var onDoubleClickPosition = new THREE.Vector2();

	function getMousePosition( dom, x, y ) {

		var rect = dom.getBoundingClientRect();
		return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

	}

	function handleClick() {

		if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
			var intersects = getIntersects( onUpPosition, objects );
			if ( intersects.length > 0 ) {

				var object = intersects[ 0 ].object;

				if ( object.userData.object !== undefined ) {
					// helper
					editor.select( object.userData.object );
				} else {
					editor.select( object );
				}

			} else {
				console.log('handleClick select and send null object');
				editor.select( null );
			}

			render();
		} else {
			editor.select( null );
		}
	}

	function onMouseMove( event ) {
		if(editor.selected !== null)
			return;

		var mousePosition = new THREE.Vector2();
		var array = getMousePosition( container.dom, event.clientX, event.clientY );
		mousePosition.fromArray( array );

		if(selectionBox.visible){
			var intersectsWithHelper = getIntersectsWithChildren( mousePosition, selectionBox.children );
			//console.log(selectionBox.children);
			if ( intersectsWithHelper.length !== 0 ) {
				selectionBox.visible = true;
				return;
			} else {
				selectionBox.visible = false;
			}
		}

		needsUpdate = true;

		var intersects = getIntersects( mousePosition, objects );
		if ( intersects.length > 0 ) {
			var object = intersects[ 0 ].object;
			editor.signals.objectHovered.dispatch(object);//send hovered message
		} else {
			selectionBox.visible = false;
			editor.select( null );
		}

		render();
	}


	function onMouseDown( event ) {

		// event.preventDefault();

		var array = getMousePosition( container.dom, event.clientX, event.clientY );
		onDownPosition.fromArray( array );

		document.addEventListener( 'mouseup', onMouseUp, false );

	}

	function onMouseUp( event ) {

		var array = getMousePosition( container.dom, event.clientX, event.clientY );
		onUpPosition.fromArray( array );

		handleClick();

		document.removeEventListener( 'mouseup', onMouseUp, false );

	}

	function onTouchStart( event ) {

		var touch = event.changedTouches[ 0 ];

		var array = getMousePosition( container.dom, touch.clientX, touch.clientY );
		onDownPosition.fromArray( array );

		document.addEventListener( 'touchend', onTouchEnd, false );

	}

	function onTouchEnd( event ) {

		var touch = event.changedTouches[ 0 ];

		var array = getMousePosition( container.dom, touch.clientX, touch.clientY );
		onUpPosition.fromArray( array );

		handleClick();

		document.removeEventListener( 'touchend', onTouchEnd, false );

	}

	function onDoubleClick( event ) {

		var array = getMousePosition( container.dom, event.clientX, event.clientY );
		onDoubleClickPosition.fromArray( array );

		var intersects = getIntersects( onDoubleClickPosition, objects );

		if ( intersects.length > 0 ) {

			var intersect = intersects[ 0 ];

			signals.objectFocused.dispatch( intersect.object );

		}

	}

	container.dom.addEventListener( 'mousemove', onMouseMove, false );
	container.dom.addEventListener( 'mousedown', onMouseDown, false );
	container.dom.addEventListener( 'touchstart', onTouchStart, false );
	container.dom.addEventListener( 'dblclick', onDoubleClick, false );

	// controls need to be added *after* main logic,
	// otherwise controls.enabled doesn't work.

	var controls = new EditorControls( camera, container.dom );
	controls.addEventListener( 'change', function () {

		signals.cameraChanged.dispatch( camera );

	} );
	viewHelper.controls = controls;

	// signals

	signals.editorCleared.add( function () {

		controls.center.set( 0, 0, 0 );
		render();

	} );

	signals.transformModeChanged.add( function ( mode ) {

		transformControls.setMode( mode );

	} );

	signals.snapChanged.add( function ( dist ) {

		transformControls.setTranslationSnap( dist );

	} );

	signals.spaceChanged.add( function ( space ) {

		transformControls.setSpace( space );

	} );

	signals.rendererUpdated.add( function () {

		scene.traverse( function ( child ) {

			if ( child.material !== undefined ) {

				child.material.needsUpdate = true;

			}

		} );

		render();

	} );

	signals.rendererChanged.add( function ( newRenderer ) {

		if ( renderer !== null ) {

			renderer.dispose();
			pmremGenerator.dispose();
			pmremTexture = null;

			container.dom.removeChild( renderer.domElement );

		}

		renderer = newRenderer;

		renderer.setClearColor( iTopoEarthSettings.BACKGROUND_COLOR );

		if ( window.matchMedia ) {

			var mediaQuery = window.matchMedia( '(prefers-color-scheme: dark)' );
			mediaQuery.addListener( function ( event ) {

				renderer.setClearColor( event.matches ? 0x333333 : iTopoEarthSettings.BACKGROUND_COLOR );

				if ( scene.background === null ) render();

			} );

			renderer.setClearColor( mediaQuery.matches ? 0x333333 : iTopoEarthSettings.BACKGROUND_COLOR );

		}

		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );

		pmremGenerator = new THREE.PMREMGenerator( renderer );
		pmremGenerator.compileEquirectangularShader();

		container.dom.appendChild( renderer.domElement );

		render();

	} );

	signals.sceneGraphChanged.add( function () {

		render();

	} );

	signals.cameraChanged.add( function () {

		render();

	} );

	signals.objectHovered.add( function ( object ) {

		selectionBox.visible = false;
		transformControls.detach();

		if ( object !== null && object !== scene && object !== camera ) {
			box.setFromObject( object );
			console.log('objectUUID=' + object.userData.objectUUID + ',objectType=' + object.userData.objectType);
			if ( box.isEmpty() === false ) {
				selectionBox.setFromObject( object );
				selectionBox.visible = true;
				needsUpdate = true;
				//setTimeout_nTimes(20, 0, 200, render);
			}
			transformControls.attach( object );
			needsUpdate = false;

		} else {
			selectionBox.resMgr.clearResources();
			needsUpdate = true;
			render();
		}
	} );

	signals.objectSelected.add( function ( object ) {

		if ( object !== null && object !== scene && object !== camera ) {
			if(object.userData.objectUUID === editor.selected.userData.objectUUID)
				return;

			transformControls.detach();//平移对象的control，暂时无用
			box.setFromObject( object );
			console.log('objectUUID=' + object.userData.objectUUID + ',objectType=' + object.userData.objectType);
			if ( box.isEmpty() === false ) {
				selectionBox.setFromObject( object );
				selectionBox.visible = true;
			}
			render();
			transformControls.attach( object );
			needsUpdate = false;

		} else {
			selectionBox.visible = false;
			//selectionBox.resMgr.clearResources();
			needsUpdate = true;
			render();
		}
	} );

	signals.objectFocused.add( function ( object ) {
		//controls.focus( object );

		editor.stationDB.fetchiTopobase(function(json){
			for (var i = 0; i < json.length; i++) {
				if (json[i].baseUUID === object.userData.objectUUID) {
					iTopoEarthModel.focusObject(json[i]);
					break;
				}
			}
		});

	} );

	signals.geometryChanged.add( function ( object ) {

		if ( object !== undefined ) {

			selectionBox.setFromObject( object );

		}

		render();

	} );

	signals.objectAdded.add( function ( object ) {

		if(object.name == "layerPlanet" || object.name == "layerCloud")
			return;

//		console.log( 'added object = '+ object.name);

		object.traverse( function ( child ) {
			objects.push( child );
		} );

	} );

	signals.objectChanged.add( function ( object ) {

		if ( editor.selected === object ) {

			selectionBox.setFromObject( object );

		}

		if ( object.isPerspectiveCamera ) {

			object.updateProjectionMatrix();

		}

		if ( editor.helpers[ object.id ] !== undefined ) {

			editor.helpers[ object.id ].update();

		}

		render();

	} );

	signals.objectRemoved.add( function ( object ) {

		controls.enabled = true; // see #14180
		if ( object === transformControls.object ) {

			transformControls.detach();

		}

		object.traverse( function ( child ) {

			objects.splice( objects.indexOf( child ), 1 );

		} );

	} );

	signals.objectArrayAdded.add( function ( objArray ) {
		if(objArray.length === 0)
			return;

		if(objArray[0].name == "layerPlanet" || objArray[0].name == "layerCloud")
			return;

		objArray.forEach( function ( obj ) {
			obj.traverse( function ( child ) {
				objects.push( child );
			} );
		} );
	} );

	signals.helperAdded.add( function ( object ) {

		var picker = object.getObjectByName( 'picker' );

		if ( picker !== undefined ) {

			objects.push( picker );

		}

	} );

	signals.helperRemoved.add( function ( object ) {

		var picker = object.getObjectByName( 'picker' );

		if ( picker !== undefined ) {

			objects.splice( objects.indexOf( picker ), 1 );

		}

	} );


	// background

	signals.sceneBackgroundChanged.add( function ( backgroundType, backgroundColor, backgroundTexture, backgroundEquirectangularTexture, environmentType ) {

		pmremTexture = null;

		switch ( backgroundType ) {

			case 'None':

				scene.background = null;

				break;

			case 'Color':

				scene.background = new THREE.Color( backgroundColor );

				break;

			case 'Texture':

				if ( backgroundTexture ) {

					scene.background = backgroundTexture;

				}

				break;

			case 'Equirectangular':

				if ( backgroundEquirectangularTexture ) {

					pmremTexture = pmremGenerator.fromEquirectangular( backgroundEquirectangularTexture ).texture;

					var renderTarget = new THREE.WebGLCubeRenderTarget( 512 );
					renderTarget.fromEquirectangularTexture( renderer, backgroundEquirectangularTexture );
					renderTarget.toJSON = function () { return null }; // TODO Remove hack

					scene.background = renderTarget;

				}

				break;

		}

		if ( environmentType === 'Background' ) {

			scene.environment = pmremTexture;

		}

		render();

	} );

	// environment

	signals.sceneEnvironmentChanged.add( function ( environmentType ) {

		switch ( environmentType ) {

			case 'None':
				scene.environment = null;
				break;
			case 'Background':
				scene.environment = pmremTexture;
				break;

		}

		render();

	} );

	// fog

	signals.sceneFogChanged.add( function ( fogType, fogColor, fogNear, fogFar, fogDensity ) {

		switch ( fogType ) {

			case 'None':
				scene.fog = null;
				break;
			case 'Fog':
				scene.fog = new THREE.Fog( fogColor, fogNear, fogFar );
				break;
			case 'FogExp2':
				scene.fog = new THREE.FogExp2( fogColor, fogDensity );
				break;

		}

		render();

	} );

	signals.sceneFogSettingsChanged.add( function ( fogType, fogColor, fogNear, fogFar, fogDensity ) {

		switch ( fogType ) {

			case 'Fog':
				scene.fog.color.setHex( fogColor );
				scene.fog.near = fogNear;
				scene.fog.far = fogFar;
				break;
			case 'FogExp2':
				scene.fog.color.setHex( fogColor );
				scene.fog.density = fogDensity;
				break;

		}

		render();

	} );

	signals.viewportCameraChanged.add( function () {

		var viewportCamera = editor.viewportCamera;

		if ( viewportCamera.isPerspectiveCamera ) {

			viewportCamera.aspect = editor.camera.aspect;
			viewportCamera.projectionMatrix.copy( editor.camera.projectionMatrix );

		} else if ( viewportCamera.isOrthographicCamera ) {

			// TODO

		}

		// disable EditorControls when setting a user camera

		controls.enabled = ( viewportCamera === editor.camera );

		render();

	} );

	//

	signals.windowResize.add( function () {

		updateAspectRatio();

		renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );

		render();

	} );

	signals.showGridChanged.add( function ( showGrid ) {

		grid.visible = showGrid;
		render();

	} );

	signals.showHelpersChanged.add( function ( showHelpers ) {

		//showSceneHelpers = showHelpers;
		transformControls.enabled = showHelpers;

		render();

	} );

	signals.locateiTopoObject.add( function ( userData ) {

		if(userData.sponsorUnit === 'starUser'){
			editor.stationDB.fetchiTopoStars(function(json){
				for (var i = 0; i < json.length; i++) {
					if (json[i].starUUID === userData.objectUUID) {
						iTopoEarthModel.focusStar(json[i]);
						break;
					}
				}
			});
		} else {
			editor.stationDB.fetchiTopobase(function(json){
				for (var i = 0; i < json.length; i++) {
					if (json[i].baseUUID === userData.objectUUID) {
						iTopoEarthModel.focusObject(json[i]);
						break;
					}
				}
			});
		}
	} );

	signals.cameraResetted.add( updateAspectRatio );

	// animations

	var clock = new THREE.Clock(); // only used for animations

	function animate() {

		requestAnimationFrame( animate );

		if(needsUpdate === true) {

			var mixer = editor.mixer; //stop or start all anmiation
			var delta = clock.getDelta();

			if ( mixer.stats.actions.inUse > 0 ) {
				mixer.update( delta );
			}

			if ( viewHelper.animating === true ) {
				viewHelper.update( delta );
			}

			render();
			TWEEN.update();
		}
	}

	requestAnimationFrame( animate );

	//

	var startTime = 0;
	var endTime = 0;

	function render() {

		startTime = performance.now();

	//	editor.cameraHelper.update();

		if(iTopoEarthSettings.GLOBAL_KIND == 'Global3D') {
			 scene.rotation.y += iTopoEarthSettings.EARTH_ROTATE_SPEED;
			 sceneHelpers.rotation.y += iTopoEarthSettings.EARTH_ROTATE_SPEED;
		 }  else {
			scene.rotation.y = 0;
			sceneHelpers.rotation.y = 0;
		 }

		 // Adding/removing grid to scene so materials with depthWrite false
		 // don't render under the grid.

		 scene.add( grid );
		 renderer.setViewport( 0, 0, container.dom.offsetWidth, container.dom.offsetHeight );
		 renderer.render( scene, editor.viewportCamera );
		 scene.remove( grid );

		if ( camera === editor.viewportCamera ) {

			//---BEGIN---
			renderer.autoClear = false;

			//if ( showSceneHelpers === true )
			renderer.render( sceneHelpers, camera );

			//屏幕左下角文字提示区
			viewHelper.render( renderer );

			//---END---
			renderer.autoClear = true;

		}

		endTime = performance.now();
		editor.signals.sceneRendered.dispatch( endTime - startTime );
	}

	return container;
}

export { iTopoViewport };
