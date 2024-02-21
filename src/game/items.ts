import {Player} from "./player";

export abstract class Items {
    owner: Player
    cost: number
    constructor(owner: Player, cost: number) {
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
    }

}
export class StealMoney extends Items {

    static readonly COST = 120;

    constructor(owner: Player) {
        super(owner, StealMoney.COST);
    }

    doBuy(): void {
    }

}
export class MakeSomeoneSkipATurn extends Items {
    static readonly COST = 80;

    constructor(owner: Player) {
        super(owner, MakeSomeoneSkipATurn.COST);
    }

    doBuy(): void {
    }

}
export class RollAnExtraDice extends Items {
    static readonly COST = 100;

    constructor(owner: Player) {
        super(owner, RollAnExtraDice.COST);
    }

    doBuy(): void {
    }

}
export class RollForNegativeSpaces extends Items {
    static readonly COST = 150;

    constructor(owner: Player) {
        super(owner, RollForNegativeSpaces.COST);
    }

    doBuy(): void {
    }

}
export class DoubleMoneyFor1Turn extends Items {
    static readonly COST = 60;

    constructor(owner: Player) {
        super(owner, DoubleMoneyFor1Turn.COST);
    }

    doBuy(): void {
    }

}
export class NextRollIsDouble extends Items {
    static readonly COST = 180;

    constructor(owner: Player) {
        super(owner, NextRollIsDouble.COST);
    }

    doBuy(): void {
    }

}
