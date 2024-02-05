import {describe, expect, test} from '@jest/globals';
import {Finish, NormalSquare} from './square';
import {Player} from './player';
import {Board} from './board';

describe('Squares', () => {

    test('normal square just lands the plauer', () => {
        let square = new NormalSquare(1)

        expect(square.place).toBe(1)
        expect(square.player).toBeUndefined()

        let player = new Player()
        let board = new Board()
        square.playerLands(player, board)

        expect(square.place).toBe(1)
        expect(square.player).toBe(player)
    })

    test("finish square marks the player as a winner", () => {
        let square = new Finish(1)

        expect(square.place).toBe(1)
        expect(square.player).toBeUndefined()

        let player = new Player()
        let board = new Board()
        square.playerLands(player, board)

        expect(square.place).toBe(1)
        expect(square.player).toBe(player)
        expect(player.winner).toBeTruthy()
    })
})
