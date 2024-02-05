import {describe, expect, test} from '@jest/globals';
import {Board} from './board';
import {Player} from './player';

describe('Players', () => {
    test('take initial turn', () => {
        let board = new Board()
        let player = new Player()

        player.takeTurn(board)

        expect(board.playerPosition(player)).toBeGreaterThan(0)
    })

    test('take second turn', () => {
        let board = new Board()
        let player = new Player()

        player.takeTurn(board)

        expect(board.playerPosition(player)).toBeGreaterThan(0)
        let position = board.playerPosition(player)

        player.takeTurn(board)
        expect(board.playerPosition(player)).toBeGreaterThan(position)
    })
})
