// Implement the FIFO algorithm directly in Node.js
function fifoAlgorithm(capacity, pages) {
  let cache = [];
  let cacheStates = [];
  let hits = 0;
  let misses = 0;

  pages.forEach((page) => {
    if (!cache.includes(page)) {
      misses++;
      if (cache.length >= capacity) {
        cache.shift(); // Remove the oldest page
      }
      cache.push(page);
    } else {
      hits++;
    }
    // Store the current state of the cache
    cacheStates.push([...cache]);
  });

  return { cacheStates, hits, misses };
}

module.exports.fifo = (req, res) => {
  const { capacity, pages } = req.body;

  try {
    const result = fifoAlgorithm(capacity, pages);
    res.json(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "FIFO algorithm failed" });
  }
};
