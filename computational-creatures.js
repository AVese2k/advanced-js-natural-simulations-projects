//when the up arrow is pressed the red eye will expand outwards both ways making it look like it can shoot laser beams
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
    fill(252, 70, 70);
    ellipse(this.position.x-9, this.position.y-106, this.eyeSize.x, this.eyeSize.y);
};

var monster = new creature();

draw = function() {
    if (keyIsPressed && keyCode === 38) {
        monster.increase.x = 10;
    }
    monster.update();
    monster.display();
};
