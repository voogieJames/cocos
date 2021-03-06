// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //  this property sets the PreFab resource of stars
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        //  the random scale of disappearing time for stars
        maxStarDuration: 0,
        minStarDuration: 0,
        //  ground node for confirming the height of the generated star's position
        ground: {
            default: null,
            type: cc.Node
        },
        //  player node for obtaining the jump height of the main character 
        //  and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        },
        //  score display
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //  obtain the anchor point of ground level on the y axis
        this.groundY = this.ground.y + (this.ground.height / 2);
        this.timer = 0;
        this.startDuration = 0;
        //  generate a new star
        this.spawnNewStar();
        //  init score
        this.score = 0;
    },

    spawnNewStar() {
        //  generate a new node in the scene with a present template
        const newStar = cc.instantiate(this.starPrefab);
        //  make a newly created node a Canvas node's child
        this.node.addChild(newStar);
        //  set a random position for the star
        newStar.setPosition(this.getNewStarPosition());
        //  temporarily store game object in the star component
        newStar.getComponent('Star').game = this;
        // reset timer, randomly choose a value according the scale of star duration
        this.starDuration = this.minStarDuration + (Math.random() * (this.maxStarDuration - this.minStarDuration));
        this.timer = 0;
    },

    getNewStarPosition() {
        let randX = 0;
        //  According to the position of the ground level and the main character's jump height,
        //  randomly obtain an anchor point of the star on the y axis
        const randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        //  According to the width of the screen, randomly obtain an anchor point of star on the x axis
        const maxX = this.node.width / 2;
        randX = ((Math.random() - 0.5) * 2) * maxX;
        //  return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    gainPoint() {
        this.score += 1;
        this.scoreDisplay.string = "score: " + this.score.toString();
        // play the scoring sound effect
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver () {
        this.player.stopAllActions(); // stop the jumping action of the player node
        cc.director.loadScene('game');
    },

    start() {

    },

    update (dt) {
        // update timer for each frame, when a new star is not generated after exceeding duration
        // invoke the logic of game failure
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
});
