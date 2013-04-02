// actor object
function Actor(opts) {
    // local vars
    this.tailPlaceInterval;
    this.tailDegradeInterval;
    this.imageAnim;

    // capture options
    this.dob = opts.dob;
    this.name = opts.name;
    this.path = opts.movieIds;
    this.currentMovie = 0;
    this.rad = 25;
    this.period = 5000;
    this.state = "orbit";
    this.time = 0;
    this.angle = 0;

    var self = this;

    // image circle
    this.imageCircle = new Kinetic.Circle({
        radius: 50,
        fillPatternRepeat: false
    });

    // start getting the image
    if (opts.profile) {
        var imageObj = new Image();
        imageObj.onload = function() {
            self.imageCircle.setFillPatternImage(imageObj);
            self.imageCircle.setFillPatternOffset([250, 250]);
            self.imageCircle.setFillPatternScale(.2);
        }
        imageObj.src = opts.profile;
    }

    // missing image
    else {
        $('#missing-actor-image').one('load', function() {
            self.imageCircle.setFillPatternImage(this);
            self.imageCircle.setFillPatternOffset([170, 160]);
            self.imageCircle.setFillPatternScale(.4);
        });
    }

    // star group
    this.starGroup = new Kinetic.Group();

    // gradient background
    this.starGroup.add(new Kinetic.Circle({
        radius: 50,
        opacity: 0.6,
        fillRadialGradientStartPoint: 0,
        fillRadialGradientStartRadius: 5,
        fillRadialGradientEndPoint: 0,
        fillRadialGradientEndRadius: 50,
        fillRadialGradientColorStops: [0, 'black', 1, 'white']
    }));

    // star
    this.starGroup.add(new Kinetic.Star({
        numPoints: 5,
        innerRadius: 25,
        outerRadius: 40,
        fill: 'white',
        stroke: null
    }));

    // image group
    this.imageGroup = new Kinetic.Group();
    this.imageGroup.hide();

    // background circle
    this.imageGroup.add(new Kinetic.Circle({
        radius: 50,
        fill: 'white',
        opacity: .9
    }));

    // label (don't add yet)
    var label = new Kinetic.Text({
        fontSize: 20,
        fill: 'black',
        text: this.name,
        y: 40
    });
    label.setX(-label.textWidth/2);

    // image circle
    this.imageGroup.add(this.imageCircle);

    // label background
    this.imageGroup.add(new Kinetic.Rect({
        width: label.textWidth + 20,
        height: label.textHeight + 10,
        x: -(label.textWidth + 20)/2,
        y: 40,
        fill: 'white',
        stroke: null,
        cornerRadius: 5
    }));

    // now we can add the label text
    this.imageGroup.add(label);

    // group
    this.group = new Kinetic.Group({
        x: opts.x,
        y: opts.y
    });

    // trail
    this.tail = new Kinetic.Group();
    tailLayer.add(this.tail);

    // combine
    this.group.add(this.starGroup);
    this.group.add(this.imageGroup);
}

// show the actor's image instead of the star
Actor.prototype.showImage = function() {
    this.imageGroup.show();
    this.starGroup.hide();
    this.group.draw();
}

// show the minimal actor view (star instead of image)
Actor.prototype.hideImage = function() {
    this.starGroup.show();
    this.imageGroup.hide();
    this.group.draw();
}

// start dropping a tail
Actor.prototype.startTail = function() {
    var maxTails = 20;
    var self = this;

    // palce tails
    this.tailPlaceInterval = setInterval(function() {
        // truncate the trail
        if (self.tail.children.length > maxTails-1)
            self.tail.children = self.tail.children.splice(1, maxTails-1);

        // create a new trail marker
        var tailMarker = new Kinetic.Circle({
            x: self.group.getX(),
            y: self.group.getY(),
            radius: 8,
            fill: 'white',
            stroke: null
        });
        self.tail.add(tailMarker);
    }, 500);

    // degrade tails
    this.tailDegradeInterval = setInterval(function() {
        var opacity;
        for (var i = 0; i < self.tail.children.length; ++i) {
            opacity = self.tail.children[i].getOpacity();
            self.tail.children[i].setOpacity(opacity*.99);
        }
    }, 50);
}

// stop and clear the tail
Actor.prototype.stopTail = function() {
    this.tail.children = [];
    clearInterval(this.tailPlaceInterval);
    clearInterval(this.tailDegradeInterval);
}