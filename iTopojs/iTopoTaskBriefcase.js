/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UITabbedPanel, UISpan } from '../js/libs/ui.js';

import { iTopoTaskBriefcaseHeader } from './iTopoTaskBriefcase.header.js';
import { iTopoTaskBriefcaseBody } from './iTopoTaskBriefcase.Body.js';

function iTopoTaskBriefcase( editor ) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId( 'sidebar' );

	var sharedCanteen = new UISpan().add(
		new iTopoTaskBriefcaseHeader( editor ),
		new iTopoTaskBriefcaseBody( editor )
	);

	container.addTab( 'iTopoTask', strings.getKey( 'sidebar/iTopoTask' ), sharedCanteen );
	container.select( 'iTopoTask' );

	return container;
}

export { iTopoTaskBriefcase };
