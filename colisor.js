function Colisor() {
  this.sprites = [];
  this.deleteSprites = [];
}
Colisor.prototype = {
    newSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    deleteSprite: function(sprite) {
        this.deleteSprites.push(sprite);
    },
    processDeletions: function() {
        let newArray = [];
        for (let i in this.sprites) {
            if (this.deleteSprites.indexOf(this.sprites[i]) == -1) {
                newArray.push(this.sprites[i]);
            }
        }
            this.deleteSprites = [];

            this.sprites = newArray;
    },
    identifier: function(sprite) {
        let id = '';
        let rect = sprite.boundingBox();
    
        for (let i in rect) {
            id += 'x:' + rect[i].x + ',' +
                  'y:' + rect[i].y + ',' +
                  'w:' + rect[i].width + ',' +
                  'h:' + rect[i].height + '\n'
        }
        return id;
    },
    processor: function() {
        let listOfCollided = new Object();
            
        for (let i in this.sprites){
            for (let j in this.sprites){
                if (i == j) {continue;}
            
                let id1 = this.identifier(this.sprites[i]);
                let id2 = this.identifier(this.sprites[j]);

                if (!listOfCollided[id1]) {listOfCollided[id1] = []};
                if (!listOfCollided[id2]) {listOfCollided[id2] = []};

                if (! (listOfCollided[id1].indexOf(id2) >= 0 || listOfCollided[id2].indexOf(id1) >= 0) ) {
                    this.somebodyCollided(this.sprites[i], this.sprites[j]);
                        
                    listOfCollided[id1].push(id2);
                    listOfCollided[id2].push(id1);
                }   
            }
        }
        this.processDeletions();
    },
    somebodyCollided: function(sprite1, sprite2) {
        let rect1 = sprite1.boundingBox();
        let rect2 = sprite2.boundingBox();

        colisions:
        for (let i in rect1) {
            for (let j in rect2) {
                
                if (this.intersectRect(rect1[i], rect2[j])){ 
                    sprite1.iCollided(sprite2);
                    sprite2.iCollided(sprite1);
                
                    break colisions;
                }
            }
        }
    },
    intersectRect: function(rect1, rect2) {
        return  (rect1.x + rect1.width) > rect2.x &&
                rect1.x < (rect2.x + rect2.width) &&
                (rect1.y + rect1.height) > rect2.y &&
                rect1.y < (rect2.y + rect2.height);
    }
}