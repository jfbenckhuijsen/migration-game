import {Player} from "./player";

export abstract class Items {
    owner: Player
    cost: number
    protected constructor(owner: Player, cost: number) {
        this.owner = owner
        this.cost = cost
    }

    buy() {
        this.owner.money -= this.cost
        this.doBuy()
    }

    abstract doBuy() :void
}

export class Visa extends Items {

    static readonly COST = 80;

    constructor(owner: Player) {
        super(owner, Visa.COST);
    }

    doBuy(): void {
        this.owner.visa += 1
    }

}
export class StealMoney extends Items {

    static readonly COST = 120;

    target: Player

    constructor(owner: Player, target: Player) {
        super(owner, StealMoney.COST);
        this.target = target
    }

    doBuy(): void {
        let moneyToSteal = Math.min(this.target.money, 100)

        this.target.money -= moneyToSteal
        this.owner.money += moneyToSteal
    }

}
export class MakeSomeoneSkipATurn extends Items {
    static readonly COST = 80;

    target: Player
    constructor(owner: Player, target: Player) {
        super(owner, MakeSomeoneSkipATurn.COST);
        this.target = target
    }

    doBuy(): void {
        this.target.skipTurns += 1
    }

}
export class RollAnExtraDice extends Items {
    static readonly COST = 100;

    constructor(owner: Player) {
        super(owner, RollAnExtraDice.COST);
    }

    doBuy(): void {
        this.owner.amountDices += 1
    }

}
export class RollForNegativeSpaces extends Items {
    static readonly COST = 150;

    target: Player

    constructor(owner: Player, target: Player) {
        super(owner, RollForNegativeSpaces.COST);
        this.target = target
    }

    doBuy(): void {
        if (this.target.rollDouble == 2) {
            this.target.rollDouble = 1
        } else {
            this.target.rollDouble = -1
        }
    }

}
export class DoubleMoneyFor1Turn extends Items {
    static readonly COST = 60;

    constructor(owner: Player) {
        super(owner, DoubleMoneyFor1Turn.COST);
    }

    doBuy(): void {
        this.owner.doubleMoney = 2
    }

}
export class NextRollIsDouble extends Items {
    static readonly COST = 180;

    constructor(owner: Player) {
        super(owner, NextRollIsDouble.COST);
    }

    doBuy(): void {
        if (this.owner.rollDouble == -1) {
            this.owner.rollDouble = 1
        } else {
            this.owner.rollDouble = 2
        }
    }

}
