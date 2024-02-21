import {Items, RollAnExtraDice} from "./items";
import {Player} from "./player";

export class Shop {

    buyVisa(player: Player) {
        let item = new RollAnExtraDice(player)
        item.buy()
    }
    buyRollAnExtraDice(player: Player) {
        let item = new RollAnExtraDice(player)
        item.buy()
    }
    buyDoubleMoneyFor1Turn(player: Player) {

    }
    buyNextRollIsDouble(player: Player) {

    }
    buyStealMoney(player: Player, target: Player) {

    }
    buyMakeSomeoneSkipATurn(player: Player, target: Player) {

    }
    buyRollForNegativeSpaces(player: Player, target: Player) {

    }
}
