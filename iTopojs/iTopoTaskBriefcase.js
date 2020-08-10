/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UITabbedPanel, UISpan } from '../js/libs/ui.js';

import { iTopoTaskBriefcaseHeader } from './iTopoTaskBriefcase.header.js';
import { iTopoTaskChildDynamic } from './iTopoTaskChild.Dynamic.js';
import { iTopoTaskChildContribute } from './iTopoTaskChild.Contribute.js';
import { iTopoTaskChildParticipants } from './iTopoTaskChild.Participants.js';

function iTopoTaskBriefcase( editor ) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId( 'sidebar' );
	//container.setId( 'properties' ); 

	// var sharedCanteen = new UISpan().add(
	// 	new iTopoTaskBriefcaseHeader( editor ),
	// 	new iTopoTaskBriefcaseBody( editor )
	// );

	container.addTab( 'iTopoTask', strings.getKey( 'sidebar/iTopoTask' ), new iTopoTaskBriefcaseHeader( editor ) );
	container.addTab( 'dynamic', strings.getKey( 'sidebar/iTopoTask/dynamic' ), new iTopoTaskChildDynamic( editor ) );
	container.addTab( 'contribute ', strings.getKey( 'sidebar/iTopoTask/contribute' ), new iTopoTaskChildContribute( editor ) );
	container.addTab( 'participants ', strings.getKey( 'sidebar/iTopoTask/participants' ), new iTopoTaskChildParticipants( editor ) );

	container.select( 'iTopoTask' );

	return container;
}

export { iTopoTaskBriefcase };
