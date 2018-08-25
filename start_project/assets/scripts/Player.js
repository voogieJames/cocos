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

    setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight))
            .easing(cc.easeCubicActionOut());

        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight))
            .easing(cc.easeCubicActionIn());
        
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    },

    start() {

    },

    // update (dt) {},
});
