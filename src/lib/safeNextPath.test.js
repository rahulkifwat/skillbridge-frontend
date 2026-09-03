const test = require("node:test");
const assert = require("node:assert/strict");
const { safeNextPath } = require("./safeNextPath");

test("allows an in-app student assessments path", () => {
  assert.equal(safeNextPath("/student/assessments", "/student"), "/student/assessments");
});

test("rejects protocol-relative and off-site destinations", () => {
  assert.equal(safeNextPath("//evil.example/phish", "/student"), "/student");
  assert.equal(safeNextPath("https://evil.example", "/student"), "/student");
  assert.equal(safeNextPath("student/assessments", "/student"), "/student");
});
