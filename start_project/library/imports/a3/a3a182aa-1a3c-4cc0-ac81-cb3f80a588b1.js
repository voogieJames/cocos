"use strict";
cc._RF.push(module, 'a3a18KqGjxMwKyByz+ApYix', 'Star');
// scripts/Star.js

"use strict";

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
        //  When the distance between the star and main character is less than this value, 
        //  points will be collected
        pickRadius: 3
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance: function getPlayerDistance() {
        //  get player position
        if (this.node && this.game) {
            var playerPos = this.game.player.getPosition();
            var starPos = this.node.position;
            if (starPos && playerPos) {
                //  calculate the distance between the player and a star
                var dist = starPos.sub(playerPos).mag();
                return dist;
            }
        }
    },
    onPicked: function onPicked() {
        //  generate a new star when previous is collected
        this.game.spawnNewStar();
        //  get that goddamed point
        this.game.gainPoint();
        //  now destroy currect star object
        this.node.destroy();
    },
    start: function start() {},

    //  on each frame check the distance and if it is lower than pickRadius, run collect function
    update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            debugger;
            return;
        }
        // update the transparency of the star according to the timer in the Game script
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
});

cc._RF.pop();