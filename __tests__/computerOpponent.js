import { getComputerNextMove } from "../js/computerOpponent.js";

describe("getComputerNextMove", () => {
  it("should win with move 0", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", "☻", " ", " ", " ", " "],
      ["☻", "☻", "☺", "☻", "☻", "☺", "☻"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(0);
  });

  it("should block column with move 0", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", "☻", " ", " ", " ", " "],
      ["☻", "☻", "☺", "☻", "☻", "☺", " "],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(0);
  });

  it("should win with move 2", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", "☻", "☺", " ", " ", " "],
      [" ", " ", "☻", "☻", "☺", " ", " "],
      [" ", "☻", "☺", "☻", "☻", "☺", "☺"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(2);
  });

  it("should block diagonal with move 2", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", "☻", "☺", " ", " ", " "],
      [" ", " ", "☻", "☻", "☺", " ", " "],
      ["☺", "☻", "☺", "☻", "☻", "☺", "☺"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(2);
  });

  it("should block with move 4", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", " ", "☺", "☻", " ", "☻", "☻"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(4);
  });

  it("should block row with move 1", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      ["☻", " ", "☻", "☻", "☺", "☺", " "],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(1);
  });

  it("should block with move 5", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☻", " ", " ", " "],
      [" ", " ", "☺", "☻", "☻", " ", " "],
      [" ", " ", "☻", "☺", "☻", " ", " "],
      [" ", "☺", "☺", "☻", "☺", " ", " "],
      ["☺", "☻", "☺", "☻", "☺", " ", " "],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(5);
  });

  it("should block column with move 0", () => {
    const board = [
      [" ", " ", " ", "☺", "☻", "☺", " "],
      [" ", " ", "☻", "☻", "☻", "☺", "☻"],
      ["☺", " ", "☺", "☻", "☻", "☻", "☺"],
      ["☺", " ", "☻", "☻", "☺", "☺", "☺"],
      ["☺", " ", "☺", "☺", "☻", "☺", "☻"],
      ["☻", " ", "☺", "☻", "☺", "☻", "☻"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(0);
  });

  it("should win with move 0", () => {
    const board = [
      [" ", "☻", "☻", "☺", "☺", "☺", "☻"],
      ["☻", "☺", "☺", "☻", "☺", "☺", "☺"],
      ["☺", "☻", "☺", "☺", "☺", "☻", "☺"],
      ["☺", "☺", "☻", "☺", "☻", "☺", "☻"],
      ["☻", "☻", "☻", "☺", "☻", "☻", "☻"],
      ["☻", "☻", "☺", "☻", "☻", "☻", "☺"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(0);
  });

  it("should block diagonal with move 0", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", "☻", " ", " "],
      [" ", " ", " ", "☺", "☻", " ", " "],
      [" ", " ", "☺", "☻", "☺", " ", " "],
      [" ", "☺", "☻", "☺", "☺", "☻", " "],
      [" ", "☺", "☻", "☻", "☻", "☺", " "],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(0);
  });

  it("should block diagonal with move 6", () => {
    const board = [
      [" ", " ", " ", "☻", "☻", " ", " "],
      [" ", " ", " ", "☺", "☻", " ", " "],
      [" ", " ", "☺", "☻", "☺", " ", " "],
      [" ", " ", "☻", "☻", "☺", "☺", " "],
      [" ", " ", "☺", "☺", "☻", "☺", " "],
      [" ", " ", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(6);
  });
});
