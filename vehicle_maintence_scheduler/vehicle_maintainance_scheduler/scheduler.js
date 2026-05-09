const axios = require("axios");
const Log = require("../logging_middleware/logger");
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJydXB5YXNyZWVrYXJyZUBnbWFpbC5jb20iLCJleHAiOjE3NzgzMDk4MDcsImlhdCI6MTc3ODMwODkwNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImUyYzhmMmUxLWNhMGMtNGZmZS04OTZhLTIxNGI2OTViZWQ5MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJ1cHlhc3JlZSBrYXJyZSIsInN1YiI6IjM1MTc0OWUyLWI0YjUtNGM2NC1iZTFlLWI2MjcxNmNkMWUyYyJ9LCJlbWFpbCI6InJ1cHlhc3JlZWthcnJlQGdtYWlsLmNvbSIsIm5hbWUiOiJydXB5YXNyZWUga2FycmUiLCJyb2xsTm8iOiIyMzQ4MWEwNTk5IiwiYWNjZXNzQ29kZSI6ImVKZEN1QyIsImNsaWVudElEIjoiMzUxNzQ5ZTItYjRiNS00YzY0LWJlMWUtYjYyNzE2Y2QxZTJjIiwiY2xpZW50U2VjcmV0IjoiQnhLSnV0VkFHbXBhR1pWWiJ9.npZaV9l_qj0q9mn65TAGgc-cHWnAkdlp1VYUr4ceiI4";
const api = "http://4.224.186.213/evaluation-service";
async function fetchDepots() {
  try {
    const response = await axios.get(
      `${api}/depots`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      } );
await Log(
      "backend",
      "info",
      "service",
      "Fetched depots successfully"
    );

    return response.data.depots;

  } catch (error) {

    await Log(
      "backend",
      "error",
      "service",
      "Failed to fetch depots"
    );

    console.log(error.message);
  }
}

async function fetchVehicles() {

  try {

    const response = await axios.get(
      `${api}/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    await Log(
      "backend",
      "info",
      "service",
      "Fetched vehicles successfully"
    );

    return response.data.vehicles;

  } catch (error) {

    await Log(
      "backend",
      "error",
      "service",
      "Failed to fetch vehicles"
    );

    console.log(error.message);
  }
}

function solveKnapsack(vehicles, maxHours) {

  let selected = [];
  let totalHours = 0;
  let totalImpact = 0;

  vehicles.sort((a, b) => {
    return (b.Impact / b.Duration) - (a.Impact / a.Duration);
  });

  for (let vehicle of vehicles) {
    if (totalHours + vehicle.Duration <= maxHours) {
      selected.push(vehicle);
      totalHours += vehicle.Duration;
      totalImpact += vehicle.Impact;
    }}
  return {
    selected,
    totalHours,
    totalImpact
  };
}
async function startScheduler() {
  console.log("Scheduler Started");
  const depots = await fetchDepots();
  const Vehicles = await fetchVehicles();
  for (let depot of depots) {
    const result = solveKnapsack(
      Vehicles,
      depot.MechanicHours
    );
    console.log("\nDepot:", depot.ID);
    console.log("Hours:", result.totalHours);
    console.log("Impact:", result.totalImpact);
    console.log("Tasks Selected:", result.selected.length);
    await Log(
      "backend",
      "info",
      "cron_job",
      `Processed depot ${depot.ID}` );
  }
}
startScheduler();