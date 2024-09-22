const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
function analyzeData(inputArray) {
  const numbers = inputArray.filter(value => !isNaN(value));  // Extract numbers
  const alphabets = inputArray.filter(value => /^[a-zA-Z]$/.test(value));  // Extract alphabets
  const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());  // Only lowercase
  const topLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];
  
  return { numbers, alphabets, topLowercase };
}
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;
  const { numbers, alphabets, topLowercase } = analyzeData(data);

  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKB = null;

  if (file_b64) {
    try {
      const buffer = Buffer.from(file_b64, 'base64');
      fileSizeKB = (buffer.length / 1024).toFixed(2);
      fileMimeType = 'application/octet-stream';
      fileValid = true;
    } catch (error) {
      fileValid = false;
    }
  }
  res.json({
    is_success: true,
    user_id: "bhoomika_kotharu_03102003",
    email: "bhoomika_k@srmap.edu.in",
    roll_number: "AP21110011616",
    numbers,
    alphabets,
    highest_lowercase_alphabet: topLowercase,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB
  });
});
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});
