import './reset.less';
import './App.less';

class Thing {
	constructor() {
		console.log('thing created', this);
	}
}

const a = new Thing();
