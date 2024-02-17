import {describe, expect, test} from '@jest/globals';
import {Board} from './board';
import {Finish} from './square';
import {Player} from './player';

describe('Board', () => {
    test('board constructor creates a new board', () => {
        let board = new Board()

        expect(board.squares.length).toBe(63)
        expect(board.squares[board.squares.length - 1]).toBeInstanceOf(Finish)
        expect(board.squares[10].place).toBe(10)
    })

    test("moving a player which is not yet on the board, places the player on the board", () => {
        let board = new Board()
        let player = new Player()

        expect(board.squares[10].player).toBeUndefined()
        var newPos = board.movePlayer(player, 10)
        expect(newPos).toBe(10)
        expect(board.squares[10].player).toBe(player)
    })

    test("moving a player to an empty square", () => {
        let board = new Board()
        let player = new Player()

        board.movePlayer(player, 1)
        expect(board.squares[1].player).toBe(player)
        var newPos = board.movePlayer(player, 2)
        expect(newPos).toBe(3)
        expect(board.squares[1].player).toBeUndefined()
        expect(board.squares[3].player).toBe(player)
    })

    test("moving a player to an occupied square", () => {
        let board = new Board()
        let player1 = new Player()
        let player2 = new Player()

        board.movePlayer(player1, 3)
        expect(board.squares[3].player).toBe(player1)
        board.movePlayer(player2, 3)
        expect(board.squares[3].player).toBe(player1)
        expect(board.squares[4].player).toBe(player2)
    })

    test("moving a player further than the finish square", () => {
        let board = new Board()
        let player = new Player()

        board.movePlayer(player, board.squares.length + 2)
        expect(board.squares[board.squares.length - 2].player).toBe(player)
    })

    test("moving a player to a special square", () => {
        // TODO: Need special squares first
    })
})
