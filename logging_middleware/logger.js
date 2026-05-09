const axios = require("axios");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJydXB5YXNyZWVrYXJyZUBnbWFpbC5jb20iLCJleHAiOjE3NzgzMDk4MDcsImlhdCI6MTc3ODMwODkwNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImUyYzhmMmUxLWNhMGMtNGZmZS04OTZhLTIxNGI2OTViZWQ5MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJ1cHlhc3JlZSBrYXJyZSIsInN1YiI6IjM1MTc0OWUyLWI0YjUtNGM2NC1iZTFlLWI2MjcxNmNkMWUyYyJ9LCJlbWFpbCI6InJ1cHlhc3JlZWthcnJlQGdtYWlsLmNvbSIsIm5hbWUiOiJydXB5YXNyZWUga2FycmUiLCJyb2xsTm8iOiIyMzQ4MWEwNTk5IiwiYWNjZXNzQ29kZSI6ImVKZEN1QyIsImNsaWVudElEIjoiMzUxNzQ5ZTItYjRiNS00YzY0LWJlMWUtYjYyNzE2Y2QxZTJjIiwiY2xpZW50U2VjcmV0IjoiQnhLSnV0VkFHbXBhR1pWWiJ9.npZaV9l_qj0q9mn65TAGgc-cHWnAkdlp1VYUr4ceiI4";
async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"} } );
    console.log("Log Created:", response.data);
  } catch (error) {
    console.log(
      "Logging Error:",
      error.response?.data || error.message
    );}
}
module.exports = Log;