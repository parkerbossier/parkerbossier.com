/*
 Project 1
 by Parker Bossier
 */

/*
 * README
 * How to play/about...
 *
 *    You are the upside down t-shaped ship. Manipulate the controller to move left, right, up, and down.
 * Avoid falling enemies. They hurt. One hit and you're dead.
 *
 *    Use the left button to turn on your shields. They can wistand two hits. When full, both green lights will
 * be lit. When low, one green light will be lit, and your shields will dim on the display. When empty, they will
 * not activate, and both green lights will be off.
 *
 *    Use the right button to use your main weapon. Shooting enemies will replenish your shields. Your shields
 * will also replenish over time. NOTE: you can't fire when your shields are up.
 * 
 *    When the game is over, your score (proportional to how many waves of enemies you survived) is displayed
 * in base-2. Pressing any key will restart the game.
 * 
 */

/*
 * program vars
 */
const int debugPin = 13;
const int ledSize = 8;
float frameBuffer[ledSize][ledSize];
float enemyBuffer[ledSize][ledSize];
float playerBuffer[ledSize][ledSize];
float playerBulletBuffer[ledSize][ledSize];
const int xPin = A5;
const int yPin = A6;
const int shieldPin = 13;
const int firePin = A7;
const int shieldLoPin = 0;
const int shieldHiPin = 1;

// game clock and flags
volatile long counter;
volatile boolean moveEnemyFlag;
volatile boolean movePlayerFlag;
volatile boolean movePlayerBulletsFlag;
volatile boolean readyToFireFlag;

// player vars
int playerWidth;
int playerHeight;
int playerRow;
int playerCol;
float shieldStrength;

// difficulty vars
int maxBulletsPerLine = 2;
int enemySpeed = 600;
int playerSpeed = 150;
int shieldReset = 15000;
int bulletSpeed = 250;
int bulletDelay = 500;

// init
void setup() {
  // var inits
  counter = 0;
  moveEnemyFlag = false;
  movePlayerFlag = false;
  movePlayerBulletsFlag = false;
  readyToFireFlag = true;
  playerWidth = 3;
  playerHeight = 3;
  playerRow = 5;
  playerCol = 2;
  shieldStrength = 1;

  // accelerometer pins
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(firePin, INPUT);
  pinMode(shieldLoPin, OUTPUT);
  pinMode(shieldHiPin, OUTPUT);

  // set columns as output
  DDRB = DDRB | B00011100;
  DDRC = DDRC | B00011111;

  // set rows low (never need to be set to anything elese)
  PORTD = PORTD & B00000011;
  PORTB = PORTB & B11111100;

  // initialize timer2 (clock speed/256)
  cli();
  TCCR2A = 0;
  TCCR2B = 0;
  TIMSK2 = (1 << TOIE1);
  TCCR2B |= (1 << CS12);
  sei();

  // initialize buffers
  memset(frameBuffer, 0, sizeof(frameBuffer));
  memset(enemyBuffer, 0, sizeof(frameBuffer));
  memset(playerBuffer, 0, sizeof(frameBuffer));
  memset(playerBulletBuffer, 0, sizeof(frameBuffer));

  // debug output
  pinMode(shieldPin, OUTPUT);
  for (int i = 0; i < 3; ++i) {
    digitalWrite(shieldPin, HIGH);
    delay(100);
    digitalWrite(shieldPin, LOW);
    if (i < 2)
      delay(100);
  }
  pinMode(shieldPin, INPUT);
}

// main loop
void loop() {
  // move existing enemies and add new ones
  if (moveEnemyFlag) {
    moveEnemies();
    for (int i = 0; i < random(maxBulletsPerLine); ++i) {
      enemyBuffer[0][random(ledSize)] = 1;
    }
    moveEnemyFlag = false;
  }

  // move the player
  if (movePlayerFlag) {
    movePlayer();
    movePlayerFlag = false;
  }

  // move existing bullets
  if (movePlayerBulletsFlag) {
    movePlayerBullets();
    movePlayerBulletsFlag = false;
  }

  // draw the player to the buffer
  drawPlayer(playerRow, playerCol, digitalRead(shieldPin) ? shieldStrength : 0);

  // fire player's bullet (only if shields are down)
  if (digitalAnalogRead(firePin) && readyToFireFlag && !playerBuffer[playerRow][playerCol]) {
    Serial.println("hmpf");
    playerBulletBuffer[playerRow+1][playerCol+1] = 1;
    readyToFireFlag = false;
  }

  // merge the buffers and check for collisions
  boolean shieldCollision = false;
  boolean playerCollision = false;
  mergeToFrame(&shieldCollision, &playerCollision);

  // handle collisions
  if (shieldCollision)
    shieldStrength = max(shieldStrength - .5, 0);
  if (playerCollision)
    gameOver();

  // show the shield status (led)
  if (shieldStrength == 0) {
    digitalWrite(shieldLoPin, LOW);
    digitalWrite(shieldHiPin, LOW);
  } 
  else if (shieldStrength == .5) {
    digitalWrite(shieldLoPin, HIGH);
    digitalWrite(shieldHiPin, LOW);
  } 
  else {
    digitalWrite(shieldLoPin, HIGH);
    digitalWrite(shieldHiPin, HIGH);
  }
}

// game clock; used for display driving, movement, etc.
volatile float thresh = .5;
ISR(TIMER2_OVF_vect)
{
  // drive the row
  displayRow(counter % ledSize, thresh);

  // toggle the threshold every other scan for redscale
  if (counter % ledSize == 0 && counter != 0) {
    if (thresh == 1)
      thresh = .5;
    else 
      thresh = 1;
  }

  // move the enemies
  if (counter % enemySpeed == 0)
    moveEnemyFlag = true;

  // move the player
  if (counter % playerSpeed == 0)
    movePlayerFlag = true;

  // shield reset
  if (counter % shieldReset == 0)
    shieldStrength = min(1, shieldStrength + .5);

  // move player bullets
  if (counter % bulletSpeed == 0)
    movePlayerBulletsFlag = true;

  // bullet delay
  if (counter % bulletDelay == 0)
    readyToFireFlag = true;

  // advance
  counter++;
}

// light up only the given row
void displayRow(int row, float thresh) {
  // turn off (input) all rows
  DDRD = DDRD & B00000011;
  DDRB = DDRB & B11111100;

  // clear all columns
  PORTB = PORTB & B11100011;
  PORTC = PORTC & B11100000;

  // turn on appropriate columns
  for (int i = 0; i < ledSize; ++i) {
    if (frameBuffer[row][i] >= thresh) {
      if (i < 3)
        PORTB = PORTB | (1 << i + 2);
      else
        PORTC = PORTC | (1 << i - 3);
    }
  }

  // set row to output and low
  if (row < 6)
    DDRD = DDRD | (1 << row + 2);
  else
    DDRB = DDRB | (1 << row - 6);
}

// move the enemies in the enemy buffer
void moveEnemies() {
  for (int row = ledSize-1; row > -1; --row) {
    for (int col = 0; col < ledSize; ++col) {
      if (enemyBuffer[row][col]) {
        enemyBuffer[row][col] = 0;

        if (row < ledSize - 1)
          enemyBuffer[row + 1][col] = 1;
      }
    }
  }
}

// merge the enemy and player buffers into the frame buffer
// return the collision statuses through the pass-by-reference params
void mergeToFrame(boolean *shieldCollision, boolean *playerCollision) {
  for (int row = 0; row < ledSize; ++row) {
    for (int col = 0; col < ledSize; ++col) {
      // collisions
      if (enemyBuffer[row][col]) {
        // shield
        if (playerBuffer[row][col] && row == playerRow && col >= playerCol && col < playerCol + playerWidth) {
          *shieldCollision = true;
          enemyBuffer[row][col] = 0;
        }

        // player
        if ((row == playerRow + 1 && col == playerCol + 1) || (row == playerRow + 2 && col >= playerCol && col < playerCol + playerWidth))
          *playerCollision = true;

        // player bullet
        if (playerBulletBuffer[row][col]) {
          enemyBuffer[row][col] = 0;
          playerBulletBuffer[row][col] = 0;
          shieldStrength = min(1, shieldStrength + .5);
        }
      }

      float myMax = max(enemyBuffer[row][col], playerBuffer[row][col]);
      myMax = max(myMax, playerBulletBuffer[row][col]);
      frameBuffer[row][col] = myMax;
    }
  }
}

// draw the player's ship and optionally shield
void drawPlayer(int row, int col, float shield) {
  memset(playerBuffer, 0, sizeof(playerBuffer));

  // player
  playerBuffer[row+1][col+1] = 1;
  playerBuffer[row+2][col] = 1;
  playerBuffer[row+2][col+1] = 1;
  playerBuffer[row+2][col+2] = 1;

  // shield
  playerBuffer[row][col] = shield;
  playerBuffer[row][col+1] = shield;
  playerBuffer[row][col+2] = shield;
}

// check the accelerations and move the player
void movePlayer() {
  int horizAccel = analogRead(yPin);
  int vertAccel = analogRead(xPin);

  // left
  if (horizAccel < 500) {
    if (playerCol > 0)
      --playerCol;
  }
  // right
  else if (horizAccel > 540) {
    if (playerCol < ledSize - playerWidth)
      ++playerCol;
  }

  // up
  if (vertAccel < 480) {
    if (playerRow > 0)
      --playerRow;
  }
  // down
  else if (vertAccel > 620) {
    if (playerRow < ledSize - playerHeight)
      ++playerRow;
  }
}

// move the player bullets in the buffer
void movePlayerBullets() {
  for (int row = 0; row < ledSize; ++row) {
    for (int col = 0; col < ledSize; ++col) {
      if (playerBulletBuffer[row][col]) {
        playerBulletBuffer[row][col] = 0;

        if (row > 0)
          playerBulletBuffer[row - 1][col] = 1;
      }
    }
  }
}

void gameOver() {
  // stop the timer
  TIMSK2 = 0;

  // light the whole screen
  DDRD = DDRD | B11111100;
  DDRB = DDRB | B00000011;
  PORTB = PORTB | B00011100;
  PORTC = PORTC | B00011111;
  delay(1000);

  // display the score in base 2
  char score = (char)(counter/enemySpeed/8);
  score = (score * 0x0202020202ULL & 0x010884422010ULL) % 1023; // 8-bit reverse
  PORTB = PORTB & B11100011;
  PORTB = PORTB | ((score & B00000111) << 2);
  PORTC = PORTC & B11100000;
  PORTC = PORTC | (score >> 3);

  // wait for button press
  while (1) {
    if (digitalAnalogRead(firePin) || digitalRead(shieldPin))
      break; 
  }

  // pass out at 3, wake up at 10, go out to eat, and do it again
  setup();
}

// digital read for analog-only pins (A6 and A7)
int digitalAnalogRead(int pin) {
  return analogRead(pin) > 800;
}






















