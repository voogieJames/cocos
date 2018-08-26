"use strict";
cc._RF.push(module, '055d97aTftPfJ1p8qbkYenb', 'Player');
// scripts/Player.js

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
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0
    },

    setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    setInputControl: function setInputControl() {
        var self = this;
        // add keyboard event listener
        // When there is a key being pressed down, check the designated direction 
        // and set up acceleration in the corresponding direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.macro.KEY.d:
                    self.accRight = true;
                    break;
            }
        });

        // when releasing the button, stop acceleration in this direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.macro.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //  init jump action
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        //  acceleration direction switch
        this.accLeft = false;
        this.accRight = false;
        //  current horizontal speed of main character
        this.xSpeed = 0;
        //  init keyboard input listener
        this.setInputControl();
    },
    start: function start() {},
    update: function update(dt) {
        // update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reaches its limit, use the max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        //  update position of the character according to the current speed
        this.node.x += this.xSpeed * dt;
    }
});

cc._RF.pop();