import { getComputerNextMove } from "../computerOpponent";

describe("getComputerNextMove", () => {
  it("should move 4", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☻", "☺", "☺", " "],
      [" ", " ", "☺", "☺", "☻", "☻", " "],
      ["☺", " ", "☻", "☻", "☻", "☺", " "],
      ["☻", " ", "☺", "☻", "☻", "☺", " "],
    ];
    const result = getComputerNextMove(board);
    expect(result).toBe(4);
  });

  it("should win with move 0", () => {
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

  it("should block with move 0", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", " ", " ", " ", " ", " "],
      ["☺", " ", "☻", " ", " ", "☺", " "],
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

  it("should block with move 2", () => {
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

  it("should block with move 1", () => {
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
});
