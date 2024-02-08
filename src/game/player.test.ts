import {describe, expect, test} from '@jest/globals';
import {Board} from './board';
import {Player} from './player';

describe('Players', () => {
    test('take initial turn', () => {
        let board = new Board()
        let player = new Player()

        let turn = player.takeTurn(board)

        expect(turn.diceValue).toBeGreaterThan(0)
        expect(board.playerPosition(player)).toBe(turn.diceValue)
    })

    test('take second turn', () => {
        let board = new Board()
        let player = new Player()

        let turn = player.takeTurn(board)

        expect(board.playerPosition(player)).toBe(turn.diceValue)

        let turn2 = player.takeTurn(board)
        expect(board.playerPosition(player)).toBeGreaterThan(turn.diceValue + turn2.diceValue)
    })
})
