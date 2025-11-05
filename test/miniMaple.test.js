import {MiniMaple} from "../src/miniMaple";

test('it fails', () => {
    expect(false).toBeTruthy();
});import { MiniMaple } from "../src/miniMaple.js";

function assertEqual(a, b) {
  const clean = s => s.replace(/\s+/g, '');
  expect(clean(a)).toBe(clean(b));
}

test("4*x^3, x → 12*x^2", () => {
  assertEqual(MiniMaple.symbolicDiff("4*x^3", "x"), "12*x^2");
});

test("4*x^3, y → 0", () => {
  assertEqual(MiniMaple.symbolicDiff("4*x^3", "y"), "0");
});

test("4*x^3 - x^2, x → 12*x^2 - 2*x", () => {
  assertEqual(MiniMaple.symbolicDiff("4*x^3 - x^2", "x"), "12*x^2 - 2*x");
});

test("x, x → 1", () => {
  assertEqual(MiniMaple.symbolicDiff("x", "x"), "1");
});

test("-x^2, x → -2*x", () => {
  assertEqual(MiniMaple.symbolicDiff("-x^2", "x"), "-2*x");
});

test("5, x → 0", () => {
  assertEqual(MiniMaple.symbolicDiff("5", "x"), "0");
});

test("x^1, x → 1", () => {
  assertEqual(MiniMaple.symbolicDiff("x^1", "x"), "1");
});

test("Ошибка на sin(x)", () => {
  expect(() => MiniMaple.symbolicDiff("sin(x)", "x")).toThrow();
});

test("Ошибка на x!", () => {
  expect(() => MiniMaple.symbolicDiff("x!", "x")).toThrow();
});
