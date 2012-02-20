import processing.core.*; 
import processing.xml.*; 

import ddf.minim.analysis.*; 
import ddf.minim.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Sphere extends PApplet {

// Audio includes



// Define the necessary global audio objects.
Minim minim;
AudioPlayer song;
FFT lFft;
FFT rFft;
int numAverages;

// Define the visualizers.
PulseSphere pSphere1;
PulseSphere pSphere2;
PulseSphere pSphere3;

// Remember if the song is playing or not.
boolean playing = false;
  
// Button coordinates (x, y, width, height)
int[] pause_play_coords = {700, 100, 75, 35};


// Functions called before execution
// PulseSphere(float x, float y, float z, float theta, float rho, float radius, float barScale, FFT lFft, FFT rFft, int bufferSize) {
public void setup() {
  // Set the stage size.
  size(800, 650, P3D);

  // Create the Minim object.
  minim = new Minim(this);

  // Load a song.
  song = minim.loadFile("GingerBeatMan_Progression.mp3");

  // Initialize the FFTs and their averages.
  lFft = new FFT(song.bufferSize(), song.sampleRate());
  lFft.logAverages(60, 1);
  rFft = new FFT(song.bufferSize(), song.sampleRate());
  rFft.logAverages(60, 1);
  numAverages = lFft.avgSize();

  // Add the spheres.
  pSphere1 = new PulseSphere(width/3, height/3, 0, 0, 0, 60, 5, lFft, rFft, 300);
  pSphere2 = new PulseSphere(width/3*2, height/3, 0, 0, 0, 60, 5, lFft, rFft, 300);
  pSphere3 = new PulseSphere(width/2, height/3*2, 0, 0, 0, 60, 5, lFft, rFft, 300);
  
  // Goskies
  song.play();
}

// Function called every frame
public void draw() {
  // Set the background.
  background(0);

  // Update the FFTs.
  lFft.forward(song.left);
  rFft.forward(song.right);

  // Update the spheres.
  pSphere1.update();
  pSphere2.update();
  pSphere3.update();

  // Draw the axes.
  stroke(0xffFF0000);
  strokeWeight(1);
  line(-1000, 0, 0, 1000, 0, 0);
  stroke(0xff00FF00);
  line(0, -1000, 0, 0, 1000, 0);
  stroke(0xff0000FF);
  line(0, 0, -1000, 0, 0, 1000);
  //camera();
  
  // Draw the buttons
  stroke(255);
  fill(0);
  rect(pause_play_coords[0], pause_play_coords[1], pause_play_coords[2], pause_play_coords[3]);
  fill(255);
  text("play/stop", pause_play_coords[0] + 15, pause_play_coords[1] + 15);
}

//
// FlyingCamera class
//
class FlyingCamera {
  // Camera variables.
  float _eyeX = width/2;
  float _eyeY = height/2;
  float _eyeZ = (height/2.0f) / tan(PI*60.0f / 360.0f);
  float _xVel = 0;
  float _yVel = 0;
  float _zVel = 0;
  float _speed;
  float _camTheta = 0;
  float _camRho = 0;
  
  // Constructor
  FlyingCamera(float speed) {
  }
}


// Create a flyby camera.
// w -> +Z
// s -> -Z
// a -> -X
// d -> +X
// q -> +Y
// e -> -Y
public void moveCamera() {
}

// Set the correct velocity based on the pressed key.
/*
void keyPressed() {
 switch(keyCode) {
 // w
 case 87:
 zVel = speed;
 break;
 // s
 case 83:
 zVel = -speed;
 break;
 // a
 case 65:
 xVel = -speed;
 break;
 // d
 case 68:
 xVel = speed;
 break;
 // q
 case 81:
 yVel = speed;
 break;
 // e
 case 69:
 yVel = -speed;
 break;
 }
 }
 
 void keyReleased() {
 xVel = 0;
 yVel = 0;
 zVel = 0;
 }
 */

// Function called at the end of execution.
public void stop() {
  // Close and stop the audio objects.
  song.close();
  minim.stop();
  super.stop();
}

//
// PulseSphere class
//
class PulseSphere {
  // Argument variables
  float _x;
  float _y;
  float _z;
  float _theta;
  float _rho;
  float _radius;
  float _scale;
  FFT _lFft;
  FFT _rFft;
  int _bufferSize;

  // Private variables
  private float _maxSignal = 0;
  private float[] _sampleArray;
  private int _currentSample = 0;

  // Constructor
  PulseSphere(float x, float y, float z, float theta, float rho, float radius, float barScale, FFT lFft, FFT rFft, int bufferSize) {
    // Argument variables initialization
    _x = x;
    _y = y;
    _z = z;
    _theta = theta;
    _rho = rho;
    _radius = radius;
    _scale = barScale;
    _lFft = lFft;
    _rFft = rFft;
    _bufferSize = bufferSize;

    // Private variable initialization
    _sampleArray = new float[_bufferSize*numAverages];
    for (int i = 0; i < _sampleArray.length; ++i) {
      _sampleArray[i] = 0;
    }
  }

  // Should be called every frame
  public void update() {
    //print(_maxSignal);
    //print("\n");
    // Translate and rotate.
    translate(_x, _y, _z);
    rotateZ(radians(_theta));
    rotateX(radians(_rho));

    // Draw the sphere.
    noStroke();
    fill(0);
    lights();
    sphere(_radius);

    // Loop through 360 degrees.
    int stepSize = floor(360/50);
    for (int i = 0; i < 360; i += stepSize) {    
      // Draw the bars
      float curSignal;
      int index = 0;
      for (float curTheta = -180; curTheta < -90; curTheta += 90/numAverages) {
        // Grab the signal value and update the maximum signal value.
        curSignal = _lFft.getAvg(numAverages-1-index);
        updateMaxSignal(curSignal);

        // Draw the left bar.
        drawBar(curTheta, curSignal);

        // Grab the signal value and update the maximum signal value.
        curSignal = _rFft.getAvg(index);
        ++index;
        updateMaxSignal(curSignal);

        // Draw the right bar.
        drawBar(curTheta+90, curSignal);
      }

      // Rotate to the next degree.
      rotateX(radians(stepSize));
    }

    // Finish the rotation.
    rotateX(radians(360 - floor(360/50)*50));
    
    // Draw the X line.
    float ratio = 1;
    stroke(0xffFF0000);
    strokeWeight(12);
    line(-_radius - _maxSignal/ratio, 0, _radius + _maxSignal/ratio, 0);
    
    // Draw the Y line.
    stroke(0xff00FF00);
    strokeWeight(12);
    line(0, -_radius - _maxSignal/ratio, 0, _radius + _maxSignal/ratio);
    
    // Draw the Z line.
    stroke(0xff0000FF);
    strokeWeight(12);
    line(0, 0, -_radius - _maxSignal/ratio, 0, 0, _radius + _maxSignal/ratio);

    // Return the orientation to normal.
    rotateX(radians(-_rho));
    rotateZ(radians(-_theta));
    translate(-_x, -_y, -_z);
  }

  // Updates the maximum signal encountered
  private void updateMaxSignal(float signal) {
    // Loop the array index if necessary.
    if (_currentSample > _sampleArray.length - 1) {
      _currentSample = 0;
    }

    // Overwrite the correct signal value and get the average.
    _sampleArray[_currentSample] = signal;
    _maxSignal = average(_sampleArray);

    // Increment the counter.
    ++_currentSample;
  }

  // Returns the average of floats
  public float average(float[] sampleArray) {
    float returnVal = 0;
    for (int i = 0; i < sampleArray.length; ++i) {
      returnVal += sampleArray[i];
    }
    return returnVal/sampleArray.length;
  }

  // Draws a bar.
  private void drawBar(float theta, float signal) {
    // Convert to radians.
    theta = radians(theta);

    // Scale the signal.
    float newSignal = signal/_maxSignal*_scale;

    // Compute the coordinates.
    float x1 = cos(theta)*_radius;
    float y1 = sin(theta)*_radius;
    float x2 = cos(theta)*(_radius+newSignal);
    float y2 = sin(theta)*(_radius+newSignal);

    // Calculate the color.
    stroke(signal/_maxSignal*55);
    strokeWeight(12);

    // Draw the line.
    line(x1, y1, x2, y2);
  }
  
  // Handle clicks (buttons)
  public void mousePressed() {
    int x = mouseX;
    int y = mouseY;
    
    // Stop
  }
}

  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "Sphere" });
  }
}
