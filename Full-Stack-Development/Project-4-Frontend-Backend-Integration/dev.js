const { spawn } = require("child_process");

function start(name, command, args, port) {
  const child = spawn(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  child.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`);
    process.exit(code || 0);
  });
  return child;
}

const backend = start("backend", process.execPath, ["backend/src/server.js"]);
const frontend = start("frontend", process.execPath, ["frontend/server.js"]);

console.log("Dev servers starting — API on :3000, frontend on :5500. Press Ctrl+C to stop both.");

function shutdown() {
  backend.kill("SIGTERM");
  frontend.kill("SIGTERM");
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);