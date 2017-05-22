import './reset.less';
import { Nav } from './Nav';
import { Flightplan } from './Flightplan';
import './App.less';

// reset the hash on load if applicable
if (window.location.hash === '#flightplan')
	window.history.replaceState(null, document.title, '/');

const nav = new Nav($('.Nav'));
const filghtplan = new Flightplan($('.Flightplan'));
