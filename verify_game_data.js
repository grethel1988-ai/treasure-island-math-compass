// Validation script for Return to Treasure Island questions database (verify_game_data.js)
const fs = require('fs');
const path = require('path');

console.log('--- Starting Game Data Validation ---');

// Mock browser global window/variable
global.QUESTION_BANK = null;

// Read questions.js as a string and execute it in Node.js context
const questionsJSPath = path.join(__dirname, 'questions.js');
if (!fs.existsSync(questionsJSPath)) {
  console.error('ERROR: questions.js does not exist.');
  process.exit(1);
}

const jsContent = fs.readFileSync(questionsJSPath, 'utf8');
try {
  // Evaluate the code to populate global.QUESTION_BANK
  eval(jsContent.replace('const QUESTION_BANK =', 'global.QUESTION_BANK ='));
} catch (e) {
  console.error('ERROR: Failed to evaluate questions.js syntax.', e);
  process.exit(1);
}

const qBank = global.QUESTION_BANK;
if (!qBank) {
  console.error('ERROR: QUESTION_BANK is not defined or is null.');
  process.exit(1);
}

// 1. Total count check
console.log(`Total questions in bank: ${qBank.length}`);
if (qBank.length !== 70) {
  console.error(`ERROR: Expected exactly 70 questions, but found ${qBank.length}`);
  process.exit(1);
}

// 2. Stage count distributions
const stageCounts = { 1: 0, 2: 0, 3: 0 };

// 3. Question structure check
qBank.forEach((q, idx) => {
  const qNum = idx + 1;
  
  // Field existence
  const requiredFields = ['id', 'indicator', 'indicatorText', 'text', 'options', 'answer', 'stage'];
  requiredFields.forEach(field => {
    if (q[field] === undefined || q[field] === null) {
      console.error(`ERROR: Question ${qNum} (ID: ${q.id}) is missing field: "${field}"`);
      process.exit(1);
    }
  });

  // Options count
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`ERROR: Question ${qNum} (ID: ${q.id}) must have exactly 4 options. Found:`, q.options);
    process.exit(1);
  }

  // Answer matching option
  const answerIndex = q.options.indexOf(q.answer);
  if (answerIndex === -1) {
    console.error(`ERROR: Question ${qNum} (ID: ${q.id}) answer "${q.answer}" does not match any of its options:`, q.options);
    process.exit(1);
  }

  // Check stage values
  if (![1, 2, 3].includes(q.stage)) {
    console.error(`ERROR: Question ${qNum} (ID: ${q.id}) has invalid stage: ${q.stage}`);
    process.exit(1);
  }

  stageCounts[q.stage]++;
});

console.log('Stage distribution:');
console.log(`- Stage 1 (Admiral Benbow Inn): ${stageCounts[1]} questions (Expected: 20)`);
console.log(`- Stage 2 (Skeleton Mountain): ${stageCounts[2]} questions (Expected: 30)`);
console.log(`- Stage 3 (Dried-up Ditch): ${stageCounts[3]} questions (Expected: 20)`);

if (stageCounts[1] !== 20 || stageCounts[2] !== 30 || stageCounts[3] !== 20) {
  console.error('ERROR: Stage distribution does not match requirements (20, 30, 20)!');
  process.exit(1);
}

console.log('✅ Success: All questions are valid and stage distributions match perfectly!');
process.exit(0);
