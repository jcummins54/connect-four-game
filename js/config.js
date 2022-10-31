export const IS_CONSOLE = typeof window === "undefined" ||
  (typeof process !== "undefined" && process.env.NODE_ENV === "test");
export const PLAYER1 = "☻";
export const PLAYER2 = "☺";
export const EMPTY = IS_CONSOLE? " " : "&nbsp;";
export const BOARD_ROWS = 6;
export const BOARD_COLS = 7;
export const WINCOUNT = 4;
export const LINE_BREAK = IS_CONSOLE? "\n" : "<br />";
