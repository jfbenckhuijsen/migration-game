import * as p5 from "p5";
import {Player} from "../game/player";
import {Game} from "../game/game";
import {Shop} from "../game/shop";
import {
    DoubleMoneyFor1Turn,
    MakeSomeoneSkipATurn,
    NextRollIsDouble,
    RollAnExtraDice, RollForNegativeSpaces,
    StealMoney,
    Visa
} from "../game/items";
import goldcoin from "./gold-coin-dollar-icon.png";
import {Image} from "p5";

export class ShopScreen {
    static goldCoin: Image

    player: Player
    game: Game
    shop: Shop

    elements: Array<p5.Element> = new Array<p5.Element>()
    targetSelector: Select

    ownButtons : Array<Button> = [
        {
            title: "Buy Visa",
            callback: function (self: ShopScreen) {
                self.shop.buyVisa(self.player)
            },
            cost: Visa.COST,
            button: undefined
        },
        {
            title: "Extra dice",
            callback: function( self: ShopScreen) {
                self.shop.buyRollAnExtraDice(self.player)
            },
            cost: RollAnExtraDice.COST,
            button: undefined
        },
        {
            title: "Double \u20AC",
            callback: function( self: ShopScreen) {
                self.shop.buyDoubleMoneyFor1Turn(self.player)
            },
            cost: DoubleMoneyFor1Turn.COST,
            button: undefined
        },
        {
            title: "Double roll",
            callback: function( self: ShopScreen) {
                self.shop.buyNextRollIsDouble(self.player)
            },
            cost: NextRollIsDouble.COST,
            button: undefined
        },
    ]

    targetButtons : Array<Button> = [
        {
            title: "Steal \u20AC",
            callback: function( self: ShopScreen) {
                self.shop.buyStealMoney(self.player, self.selectedPlayer())
            },
            cost: StealMoney.COST,
            button: undefined
        },
        {
            title: "Skip a turn",
            callback: function( self: ShopScreen) {
                self.shop.buyMakeSomeoneSkipATurn(self.player, self.selectedPlayer())
            },
            cost: MakeSomeoneSkipATurn.COST,
            button: undefined
        },
        {
            title: "Move back",
            callback: function( self: ShopScreen) {
                self.shop.buyRollForNegativeSpaces(self.player, self.selectedPlayer())
            },
            cost: RollForNegativeSpaces.COST,
            button: undefined
        },
    ]

    constructor(player: Player, game: Game, shop: Shop) {
        this.player = player
        this.game = game
        this.shop = shop
    }

    static preload(sketch: p5) {
        ShopScreen.goldCoin = sketch.loadImage(goldcoin)
    }

    setup(sketch: p5, x: number, y: number) {
        this.createButtons(this.ownButtons, x, y, sketch)

        this.targetSelector = sketch.createSelect() as Select
        this.game.otherPlayers(this.player).forEach(player => {
            this.targetSelector.option(`Player ${player.id}`, player.id)
        })
        this.targetSelector.position(x, y + 100)

        this.createButtons(this.targetButtons, x, y + 125, sketch)

        this.elements.push(this.targetSelector)
        this.elements.forEach(e => e.addClass("shopScreen"))
    }

    private createButtons(buttons: Array<Button>, x: number, y: number, sketch: p5) {
        buttons.forEach((b, index) => {
            b.button = sketch.createButton(b.title)
                .mouseClicked(() => {
                    b.callback(this)
                })
                .position(x, y + index * 25)

            let img = sketch.createImg(goldcoin, "")
                .position(x  + 80, y + index * 25)
                .addClass("goldcoin")

            let cost = sketch.createDiv(`\u20AC ${b.cost}`)
                .position(x + 100, y + index * 25)
                .addClass("cost")

            this.elements.push(b.button)
            this.elements.push(img)
            this.elements.push(cost)
        })
    }

    showForPlayer(player: Player) {
        if (this.player.id == player.id) {
            this.show()
            this.updateButtons(this.ownButtons)
            this.updateButtons(this.targetButtons)
        } else {
            this.hide()
        }
    }

    private show() {
        this.elements.forEach(e => e.removeClass("hidden"))
    }

    private updateButtons(buttons: Array<Button>) {
        buttons.forEach(b => {
            b.button.elt.disabled = this.player.money < b.cost;
        })
    }

    private hide() {
        this.elements.forEach(e => e.addClass("hidden"))
    }

    private selectedPlayer(): Player {
        let playerId = this.targetSelector.value()
        return this.game.players[playerId]
    }
}

interface Select extends p5.Element {

    option(name: string, value: any): void

    value(): any
}

interface Button {
    title: string,
    callback: (self: ShopScreen) => void
    cost: number
    button: p5.Element | undefined
}