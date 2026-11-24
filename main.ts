import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

// One word from your ex: the word she would use to describe you.
// "unread" — she never opened the message, and neither did the relationship.
const ENTRY = "unread";

function main(): void {
  // Gate: exactly one word, 1-24 characters, no whitespace.
  // Revision: also reject leading/trailing whitespace explicitly, and
  // re-assert the read-back byte for byte (no trailing newline in the file).
  if (ENTRY !== ENTRY.trim() || !/^[^\s]{1,24}$/.test(ENTRY)) {
    throw new Error(
      `entry must be a single word of 1-24 characters, got: ${JSON.stringify(ENTRY)}`,
    );
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== ENTRY) throw new Error("read-back mismatch");
  console.log(`entry: ${back} (${back.length} chars)`);
}

main();
