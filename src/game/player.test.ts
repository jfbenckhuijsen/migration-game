import {describe, expect, test} from '@jest/globals';
import {Board} from './board';
import {Player} from './player';

describe('Players', () => {
    test('take initial turn', () => {
        let board = new Board()
        let player = new Player(0)

        let turn = player.takeTurn(board)

        expect(turn.diceValues[0]).toBeGreaterThan(0)
        expect(board.playerPosition(player)).toBe(turn.diceValues[0])
    })

    test('take second turn', () => {
        let board = new Board()
        let player = new Player(0)

        let turn = player.takeTurn(board)

        expect(board.playerPosition(player)).toBe(turn.diceValues[0])

        let turn2 = player.takeTurn(board)
        expect(board.playerPosition(player)).toBe(turn.diceValues[0] + turn2.diceValues[0])
    })
})
