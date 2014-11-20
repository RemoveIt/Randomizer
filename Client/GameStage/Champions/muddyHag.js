var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MuddyHag = (function (_super) {
    __extends(MuddyHag, _super);
    function MuddyHag(data) {
        _super.call(this, data);
        this.standSpr = PIXI.Sprite.fromImage(config.Players[0 /* MuddyHag */].Picture);
        this.standSpr.position = new PIXI.Point(-(config.Players[0].PicSize.width - 70) / 2, -(config.Players[0].PicSize.height - 70) / 2);

        this.PixiContainer.addChild(this.standSpr);
        this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, 0.7, false);
        this.teleportInAnim.visible = false;
        this.PixiContainer.addChild(this.teleportInAnim);

        this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, 0.7, false);
        this.teleportOutAnim.visible = false;
        this.PixiContainer.addChild(this.teleportOutAnim);
    }
    MuddyHag.prototype.UseAbility = function (keyLetter) {
        var _this = this;
        if (keyLetter === 'Q') {
            this.standSpr.visible = false;
            this.teleportInAnim.visible = true;
            this.teleportInAnim.gotoAndPlay(0);

            this.teleportInAnim.onComplete = function () {
                _this.PixiContainer.x += 140;
                _this.teleportInAnim.visible = false;
                _this.teleportOutAnim.visible = true;
                _this.teleportOutAnim.gotoAndPlay(0);
                _this.teleportOutAnim.onComplete = function () {
                    setTimeout(function () {
                        _this.standSpr.visible = true;
                        _this.teleportOutAnim.visible = false;
                    }, 0);
                };
            };
        }
    };
    return MuddyHag;
})(Player);
