const { execFile } = require("child_process");
module.exports.fifo = (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./fifo.exe",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        console.log(result);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
};
