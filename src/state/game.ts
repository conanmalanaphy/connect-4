import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player } from "types";
import localStorageEffect from "./utils";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
  effects: [localStorageEffect("boardState")],
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
  effects: [localStorageEffect("playerState")],
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
  effects: [localStorageEffect("gameOverState")],
});

export const winCountState = atom<number[]>({
  key: "winCountState",
  default: [0, 0],
  effects: [localStorageEffect("winCountState")],
});

export const playersNamesState = atom<string[]>({
  key: "playersNamesState",
  default: ["Red", "Yellow"],
  effects: [localStorageEffect("playersNamesState")],
});

export const playersColourState = atom<string[]>({
  key: "playersColourState",
  default: ["#f10000", "#ece100"],
  effects: [localStorageEffect("playersColourState")],
});
