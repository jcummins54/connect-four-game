import {
  isColumnFull,
  isBoardStateValid,
  getCurrentPlayer,
} from "../boardState";

describe("isColumnFull", () => {
  it("should return false", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", "☻", "☺", " ", " ", " "],
      [" ", "☻", "☺", "☻", " ", " ", " "],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = isColumnFull(board, 3);
    expect(result).toBe(false);
  });

  it("should return true", () => {
    const board = [
      [" ", " ", " ", "☻", " ", " ", " "],
      [" ", " ", " ", "☻", "☺", " ", " "],
      [" ", " ", "☻", "☺", "☻", "☺", " "],
      [" ", "☻", "☺", "☻", "☻", "☺", "☺"],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = isColumnFull(board, 3);
    expect(result).toBe(true);
  });
});

describe("isBoardStateValid", () => {
  it("should return true", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", "☻", "☺", "☻", "☺", " ", " "],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = isBoardStateValid(board);
    expect(result).toBe(true);
  });

  it("should return false", () => {
    const board = [
      [" ", " ", " ", "☻", " ", " ", " "],
      [" ", " ", " ", "☻", "☺", " ", " "],
      [" ", " ", "☻", "☺", "☻", "☺", " "],
      [" ", "☻", "☺", "☻", "☻", "☺", "☺"],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = isBoardStateValid(board);
    expect(result).toBe(false);
  });

  it("should return false", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", "☻", "☺", " ", "☺", " ", " "],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = isBoardStateValid(board);
    expect(result).toBe(false);
  });
});

describe("getCurrentPlayer", () => {
  it("should return R", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", "☻", "☺", "☻", "☺", " ", " "],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = getCurrentPlayer(board);
    expect(result).toBe("☺");
  });

  it("should return Y", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", "☻", "☺", "☻", "☺", " ", "☺"],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = getCurrentPlayer(board);
    expect(result).toBe("☻");
  });
});
