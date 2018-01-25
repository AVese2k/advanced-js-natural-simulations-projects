//Press the up arrow to increase the velocity of the spacehip
//Press the left arrow to turn it left
//Press the right arrow to turn it right

angleMode = "radians";

var Spaceship = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 4;
    this.xoff = 1000;
    this.yoff = 0;
    this.r = 16;
};

Spaceship.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Spaceship.prototype.applyForce = function() {
    this.velocity.add(this.acceleration);
    if (this.velocity.x < 0){
        this.velocity.x = 0;
    }
    this.position.add(this.velocity);
};

Spaceship.prototype.turnLeft = function() {
    pushMatrix();
    this.velocity.rotate(-0.5);
    popMatrix();
};

Spaceship.prototype.turnRight = function() {
    pushMatrix();
    this.velocity.rotate(0.5);
    popMatrix();
};

Spaceship.prototype.display = function () {
    // Step 3:
    var angle = this.velocity.heading();
    
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(127, 127, 127);
    pushMatrix();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    // Step 3:
    rotate(angle);
    triangle(0, -10, 0, 10, 25, 0);
    popMatrix();
};

Spaceship.prototype.checkEdges = function () {
    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var ship = new Spaceship();

var keyPressed = function() {
    if (keyCode === LEFT) {
        ship.turnLeft();
    }
    else if (keyCode === RIGHT) {
        ship.turnRight();
    }
    else if (keyCode === UP) {
        ship.acceleration.x = 0.1;
        ship.applyForce();
    }
};

draw = function() {
    background(1, 11, 66);
    ship.update();
    ship.checkEdges();
    ship.display();
};
