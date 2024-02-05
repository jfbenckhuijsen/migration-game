import {describe, expect, test} from '@jest/globals';
import {Dice} from './dice';

describe('Dice', () => {
    test('Single dice', () => {
        let dice = new Dice();
        for (let i = 0; i < 1000; i++) {
            let value = dice.roll()
            expect(value).toBeGreaterThan(0)
            expect(value).toBeLessThanOrEqual(6)

        }
    })

    test('Multiple dice', () => {
        let dice = new Dice();
        for (let i = 0; i < 1000; i++) {
            let value = dice.rollDices(2)
            expect(value).toBeGreaterThan(0)
            expect(value).toBeLessThanOrEqual(12)
        }
    })
})
