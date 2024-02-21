import {DoubleMoneyFor1Turn, MakeSomeoneSkipATurn, NextRollIsDouble, RollAnExtraDice, StealMoney} from "./items";
import {Player} from "./player";

export class Shop {

    buyVisa(player: Player) {
        let item = new RollAnExtraDice(player)
        item.buy()
    }
    buyRollAnExtraDice(player: Player) {
        if (!player.hasExtraDice()) {
            let item = new RollAnExtraDice(player)
            item.buy()
        }
    }
    buyDoubleMoneyFor1Turn(player: Player) {
        if (!player.hasDoubleMoney()) {
            let item = new DoubleMoneyFor1Turn(player)
            item.buy()
        }
    }
    buyNextRollIsDouble(player: Player) {
        if (!player.hasRollIsDouble()) {
            let item = new NextRollIsDouble(player)
            item.buy()
        }
    }
    buyStealMoney(player: Player, target: Player) {
        let item = new StealMoney(player, target)
        item.buy()
    }
    buyMakeSomeoneSkipATurn(player: Player, target: Player) {
        let item = new MakeSomeoneSkipATurn(player, target)
        item.buy()
    }
    buyRollForNegativeSpaces(player: Player, target: Player) {
        let item = new MakeSomeoneSkipATurn(player, target)
        item.buy()
    }
}
