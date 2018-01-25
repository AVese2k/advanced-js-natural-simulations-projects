//the eye of the creature is acting as the origin for the space octopus to orbit around
//their movement is created using oscillations and angular velocity 
angleMode = "radians";

var Spaceship = function() {
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.03, 0.03), random(-0.03, 0.03));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
    this.rotAngle = 0;
    this.angularVelocity = 0;
};

var creature = function() {
    this.position = new PVector(width/2, height/2);
    this.eyeSize = new PVector(17, 9);
    this.increase = new PVector(0, 0);
};

creature.prototype.update = function() {
    this.eyeSize.add(this.increase);
};

creature.prototype.display = function() {
    stroke(53, 117, 30);
    strokeWeight(10);
    line(this.position.x-64, this.position.y-41, this.position.x, this.position.y);
    line(this.position.x-64, this.position.y+143, this.position.x, this.position.y);
    line(this.position.x+49, this.position.y-41, this.position.x, this.position.y-12);
    line(this.position.x+37, this.position.y+142, this.position.x+-12, this.position.y);
    noStroke();
    fill(53, 117, 30);
    rect(this.position.x-36, this.position.y-67, 54, 135, 50);
    ellipse(this.position.x-9, this.position.y-95, 85, 85);
    stroke(181, 63, 0);
    ellipse(this.position.x-9, this.position.y-106, this.eyeSize.x, this.eyeSize.y);
};

Spaceship.prototype.oscillate = function() {
    var angularAcc = dist(this.position.x, this.position.y, 0, 0) / 100000;
    this.angularVelocity +=  this.angularAcc;
    this.angularVelocity =  constrain(this.angularVelocity, 0, 1 );
    this.rotAngle += this.angularVelocity;
    this.angle.add(this.velocity);
    this.position = new PVector(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
};

Spaceship.prototype.display = function() {
    pushMatrix();
    translate(191, 94);
    stroke(181, 63, 0);
    strokeWeight(9);
    line(0, 0, this.position.x, this.position.y);
    imageMode(CENTER);
    //pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.rotAngle);
    image(getImage("space/octopus"),
        0, 0,
        80, 100);
    //popMatrix();
    popMatrix();
};

var ships = [];
for (var i = 0; i < 10; i++) {
    ships.push(new Spaceship());
}

var monster = new creature();

draw = function() {
    background(0, 0, 0);
    monster.update();
    monster.display();
    for (var i = 0; i < ships.length; i++) {
        ships[i].oscillate();
        ships[i].display();
    }
};
