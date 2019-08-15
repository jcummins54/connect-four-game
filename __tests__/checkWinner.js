import { checkWinner } from "../checkWinner";

describe("checkWinner", () => {
  it("should return Y", () => {
    const board = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "☻", " ", " ", " "],
      [" ", " ", "☻", "☺", " ", " ", " "],
      [" ", "☻", "☺", "☻", " ", " ", " "],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = checkWinner(board);
    expect(result).toBe("☻");
  });

  it("should return R", () => {
    const board = [
      [" ", " ", " ", "☺", " ", " ", " "],
      [" ", " ", " ", "☻", "☺", " ", " "],
      [" ", " ", "☺", "☺", "☻", "☺", " "],
      [" ", "☻", "☺", "☻", "☻", "☺", "☺"],
      ["☻", "☻", "☻", "☺", "☻", "☺", "☻"],
      ["☺", "☺", "☻", "☻", "☺", "☻", "☺"],
    ];
    const result = checkWinner(board);
    expect(result).toBe("☺");
  });
});
