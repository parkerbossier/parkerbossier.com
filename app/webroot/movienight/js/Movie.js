// movie object
function Movie(opts) {
    // instance vars
    this.flipAnim;
    this.dimAnim;
    this.theta = 0;
    this.isFlipped;

    // capture options
    this.actorIds = opts.actorIds;
    this.directorId = opts.directorId;
    this.genres = opts.genres;
    this.poster = opts.poster;
    this.revenue = opts.revenue;
    this.releaseDate = opts.releaseDate;
    this.title = opts.title;
    this.x = opts.x;
    this.y = opts.y;
    this.scale = opts.scale/8;

    /*
     * dim circle
     */
    this.dimCircle = new Kinetic.Circle({
        opacity: 0,
        fill: '#333333',
        stroke: null
    });
    this.dimCircle.hide();

    /*
     * minimal group
     */
    this.minimalGroup = new Kinetic.Group();

    // add the sun image
    var self = this;
    $('#movie-minimal').one('load', function() {
        // get the image from the DOM
        var image = new Kinetic.Image({
            image: this
        });

        // add the image to the group and center the group (offset)
        self.minimalGroup.add(image);
        self.minimalGroup.setOffset([image.getWidth()/2, image.getHeight()/2]);
        self.minimalGroup.draw();

        // set the dim circle's dimensions
        self.dimCircle.setRadius(image.getWidth()/2);
    });

    /*
     * image group
     */
    this.imageGroup = new Kinetic.Group();
    this.imageGroup.hide();

    // image clipping circle
    var imageCircle = new Kinetic.Circle({
        radius: 155,
        fillPatternOffset: [250, 320],
        fillPatternScale: .6,
        fillPatternRepeat: false
    });
    this.imageGroup.add(imageCircle);

    // start getting the poster image
    var imageObj = new Image();
    imageObj.onload = function() {
        imageCircle.setFillPatternImage(imageObj);
    }
    imageObj.src = opts.poster;

    // title group
    var titleGroup = new Kinetic.Group({
        y: 60
    });
    this.imageGroup.add(titleGroup);

    // title box
    var titleBoxImage = new Kinetic.Image();
    titleGroup.add(titleBoxImage);
    $('#movie-title-box').one('load', function() {
        titleBoxImage.setImage(this);
        titleBoxImage.setOffset([titleBoxImage.getWidth()/2, 0]);
    });

    // title text
    var labelWidth = 300;
    var title = new Kinetic.Text({
        x: 5,
        y: 77,
        fontSize: 26,
        fill: 'black',
        text: this.title,
        align: 'center',
        width: labelWidth,
        padding: 22,
        fontFamily: 'advent',
        fontStyle: 'bold'
    });
    title.setOffset([title.getWidth()/2, title.getHeight()/2]);
    titleGroup.add(title);

    /*
     * info group
     */
    this.infoGroup = new Kinetic.Group({
        scale: {
            x: -1
        }
    });
    this.infoGroup.hide();

    // background
    var background = new Kinetic.Image();
    this.infoGroup.add(background);

    // background image
    $('#movie-back').one('load', function() {
        background.setImage(this);
        background.setOffset([background.getWidth()/2, background.getHeight()/2]);
        self.infoGroup.draw();
    });

    // director text
    var directorText = new Kinetic.Text({
        y: -94,
        text: directorsJSON[self.directorId].name,
        fontSize: 25,
        fill: 'black',
        align: 'center',
        fontFamily: 'advent',
        fontStyle: 'bold'
    })
    directorText.setOffset([directorText.getTextWidth()/2, directorText.getTextHeight()/2]);
    this.infoGroup.add(directorText);

    // release date text
    var releaseDateText = new Kinetic.Text({
        x: 70,
        y: -14,
        text: this.releaseDate,
        fontSize: 25,
        fontFamily: 'advent',
        fontStyle: 'bold',
        fill: 'black',
        align: 'center'
    })
    releaseDateText.setOffset([releaseDateText.getTextWidth()/2, releaseDateText.getTextHeight()/2]);
    this.infoGroup.add(releaseDateText);

    // revenue
    var revenueText = new Kinetic.Text({
        x: -85,
        y: -14,
        text: Math.round(this.revenue*100/1000000)/100,
        fontSize: 25,
        fill: 'black',
        align: 'center',
        fontFamily: 'advent',
        fontStyle: 'bold'
    });
    revenueText.setOffset([revenueText.getTextWidth()/2, revenueText.getTextHeight()/2]);
    this.infoGroup.add(revenueText);

    // genres
    var genreGroup = new Kinetic.Group({
        x: -10,
        y: 36
    });
    this.infoGroup.add(genreGroup);

    var genreBullet, genreText;
    for (var i in this.genres) {
        // bullet
        genreBullet = new Kinetic.Circle({
            radius: 4,
            fill: 'black',
            y: i*37
        });
        genreGroup.add(genreBullet);

        // genre
        genreText = new Kinetic.Text({
            x: 20,
            y: i*37 - 9,
            text: this.genres[i],
            fill: 'black',
            fontSize: 25,
            fontFamily: 'advent',
            fontStyle: 'bold'
        });
        genreGroup.add(genreText);
    }

    /*
     * main group
     */
    this.group = new Kinetic.Group({
        x: this.x,
        y: this.y,
        scale: this.scale
    });

    // combine
    this.group.add(this.minimalGroup);
    this.group.add(this.imageGroup);
    this.group.add(this.infoGroup);
    this.group.add(this.dimCircle);

    // click handler
    this.group.on('click', function() {
        self.click(self);
    });

    // hover handlers. zoom the movie on hover for visibility
    this.group.on('mouseover', function() {
        // only scale at the maximum zoom
        if (currentZoom == zoomLevels.length-1) {
            // account for flipping
            if (self.group.getScale().x < 0)
                self.group.setScale([-self.fullSizeRatio, self.fullSizeRatio]);
            else
                self.group.setScale([self.fullSizeRatio, self.fullSizeRatio]);

            movieLayer.draw();
        }
    });
    this.group.on('mouseout', function() {
        // only scale at the maximum zoom
        if (currentZoom == zoomLevels.length-1) {
            // account for flipping
            if (self.group.getScale().x < 0)
                self.group.setScale([-self.scale, self.scale]);
            else
                self.group.setScale([self.scale, self.scale]);

            movieLayer.draw();
        }
    });
}

Movie.prototype.fullSizeRatio = 1/6;

// show the movie's image instead of the sun
Movie.prototype.showImage = function() {
    this.imageGroup.show();
    movieLayer.draw();
}

// show the minimal movie view (sun instead of image)
Movie.prototype.hideImage = function() {
    this.imageGroup.hide();
    movieLayer.draw();
}

// flip the movie to the info side
Movie.prototype.flipToInfo = function() {
    // no-op if already on info
    if (this.theta == Math.PI)
        return;

    // stop existing animation
    if (this.flipAnim)
        this.flipAnim.stop();

    // start the animation
    this.isFlipped = false;
    this.flipAnim = new Kinetic.Animation((function(self) {
        return function() {
            self.theta += Math.PI/180*10;

            // handle flipping over
            if (!self.isFlipped && self.theta >= Math.PI/2) {
                self.flipped = true;

                // hide and show
                self.infoGroup.show();
                self.imageGroup.hide();

                // change the scale
                self.group.setScale(self.fullSizeRatio);
            }

            // stop flipping at 180 degrees
            if (self.theta >= Math.PI) {
                self.theta = Math.PI;
                self.group.attrs.scale.x = -self.scale;
                self.flipAnim.stop();
            }

            self.group.attrs.scale.x = Math.cos(self.theta) * self.group.getScale().y;
            movieLayer.draw();
        }
    })(this));
    this.flipAnim.start();
}

// flip the movie to the image side
Movie.prototype.flipToImage = function() {
    // no-op if already on image
    if (this.theta == 0)
        return;

    // stop existing animation
    if (this.flipAnim)
        this.flipAnim.stop();

    // start the animation
    this.isFlipped = false;
    this.flipAnim = new Kinetic.Animation((function(self) {
        return function() {
            self.theta -= Math.PI/90*3;

            // handle flipping over
            if (!self.isFlipped && self.theta <= Math.PI/2) {
                self.flipped = true;

                // hide and show
                self.imageGroup.show();
                self.infoGroup.hide();

                // change the scale
                self.group.setScale(self.scale);
            }

            // stop flipping at 0 degrees
            if (self.theta <= 0) {
                self.theta = 0;
                self.group.attrs.scale.x = self.scale;
                self.flipAnim.stop();
            }

            self.group.attrs.scale.x = Math.cos(self.theta) * self.group.getScale().y;
            movieLayer.draw();
        }
    })(this));
    this.flipAnim.start();
}

// click handler
Movie.prototype.click = function(self) {
    // closest zoom. toggleflip
    if (currentZoom == zoomLevels.length-1) {
        // image to info
        if (self.theta == 0)
            self.flipToInfo();

        // info to image
        else if (self.theta == Math.PI)
            self.flipToImage();
    }

    // zoomed out. zoom in
    else {
        setZoomLevel(currentZoom+1, self.group.getPosition());
    }
}

// dim the movie
Movie.prototype.dim = function() {
    // show the image group
    this.dimCircle.show();

    // stop existing animation
    if (this.dimAnim)
        this.dimAnim.stop();

    // start the animation
    this.dimAnim = new Kinetic.Animation((function(self) {
        return function() {
            var newOpacity = self.dimCircle.getOpacity() + .2;
            if (newOpacity >= .9) {
                self.dimCircle.setOpacity(.9);
                self.dimAnim.stop();
            }
            self.dimCircle.setOpacity(newOpacity);
            self.group.draw();
        }
    })(this));
    this.dimAnim.start();
}

// undim the movie
Movie.prototype.unDim = function() {
    // stop existing animation
    if (this.dimAnim)
        this.dimAnim.stop();

    // start the animation
    this.dimAnim = new Kinetic.Animation((function(self) {
        return function() {
            var newOpacity = self.dimCircle.getOpacity() - .2;
            if (newOpacity <= 0) {
                self.dimCircle.setOpacity(0);
                self.dimCircle.hide();
                self.dimAnim.stop();
            }
            self.dimCircle.setOpacity(newOpacity);
            self.group.draw();
        }
    })(this));
    this.dimAnim.start();
}

// returns true if the movie has any of the specified genres
Movie.prototype.hasAnyGenres = function(genres) {
    var found = false;
    var self = this;
    $.each(genres, function(i, elem) {
        if (self.genres.indexOf(elem) > -1) {
            found = true;
            return false;
        }
    });
    return found;
}

// returns true if the movie has any of the specified years
Movie.prototype.hasYear = function(years) {
    var found = false;
    var self = this;
    $.each(years, function(i, elem) {
        if (self.releaseDate.indexOf(elem) > -1) {
            found = true;
            return false;
        }
    });
    return found;
}