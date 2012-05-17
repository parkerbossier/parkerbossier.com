$(function() {
    var attributes = { 
        code: 'Sphere.class',
        archive: 'Sphere.jar,jl1.0.jar,jsminim.jar,minim-spi.jar,minim.jar,mp3spi1.9.4.jar,tritonus_aos.jar,tritonus_share.jar,core.jar',
        width: 800,
        height: 650,
        codebase: '/assets/sphere/'
    };
    var parameters = { 
        image: 'loading.gif',
        centerimage: 'true'
    };
    var version = '1.5';
    deployJava.runApplet(attributes, parameters, version, '#wrapper');
});
