/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UITabbedPanel } from '../js/libs/ui.js';

import { iTopoTaskChildDynamic } from './iTopoTaskChild.Dynamic.js';
import { iTopoTaskChildParticipants } from './iTopoTaskChild.Participants.js';

function iTopoTaskBriefcaseBody( editor ) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId( 'properties' );

	container.addTab( 'dynamic', strings.getKey( 'sidebar/iTopoTask/dynamic' ), new iTopoTaskChildDynamic( editor ) );
	container.addTab( 'participants ', strings.getKey( 'sidebar/iTopoTask/participants' ), new iTopoTaskChildParticipants( editor ) );

	container.select( 'dynamic' );

	return container;

}

export { iTopoTaskBriefcaseBody };
