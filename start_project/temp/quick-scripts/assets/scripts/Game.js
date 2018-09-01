(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f5db2hVn6pB+YjrQYvwyM75', 'Game', __filename);
// scripts/Game.js

'use strict';

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
        maxStartDuration: 0,
        minStartDuration: 0,
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //  obtain the anchor point of ground level on the y axis
        this.groundY = this.ground.y + this.ground.height / 2;
        //  generate a new star
        this.spawnNewStar();
    },
    spawnNewStar: function spawnNewStar() {
        //  generate a new node in the scene with a present template
        var newStar = cc.instantiate(this.starPrefab);
        //  make a newly created node a Canvas node's child
        this.node.addChild(newStar);
        //  set a random position for the star
        newStar.setPosition(this.getNewStarPosition());
        //  temporarily store game object in the star component
        newStar.getComponent('Star').game = this;
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        //  According to the position of the ground level and the main character's jump height,
        //  randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        //  According to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        //  return to the anchor point of the star
        return cc.v2(randX, randY);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        