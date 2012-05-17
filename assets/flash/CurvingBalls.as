dynamic class CurvingBalls extends MovieClip {
	var rotation:Number;
	function CurvingBalls() {
		_rotation = Math.random()*360;
		_x = Math.random()*(Stage.width-_width);
		_y = Math.random()*(Stage.height-_height);
		rotation = (Math.random()*2)-1;
	}
	function onEnterFrame() {
		if (_currentframe == _totalframes) {
			removeMovieClip(this);
		}
		_alpha -= .5;
		_rotation += rotation;
	}
}
