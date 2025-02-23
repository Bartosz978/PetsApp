// File.js
const fs = require('fs').promises;
const path = require('path');

async function save(filename, jsonData) {
  try {
    // Ensure the filename has .json extension
    const file = filename.endsWith('.json') ? filename : `${filename}.json`;
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Create the file if it doesn't exist
    await fs.writeFile(file, jsonString);
    console.log(`File ${file} saved successfully!`);
    return true;
  } catch (err) {
    console.error('Error saving file:', err);
    throw err;
  }
}

async function read(filename) {
  try {
    // Ensure the filename has .json extension
    const file = filename.endsWith('.json') ? filename : `${filename}.json`;
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist
      console.log(`File ${filename} not found, returning null`);
      return null;
    }
    console.error('Error reading file:', err);
    throw err;
  }
}

module.exports = { save, read };