$(document).ready(function () {
  $("#fifo-form").on("submit", function (event) {
    event.preventDefault();
    const capacity = $("#capacity").val();
    const pages = $("#pages")
      .val()
      .split(",")
      .map((page) => parseInt(page.trim()));

    $.ajax({
      url: "/run-fifo",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ capacity: capacity, pages: pages }),
      success: function (data) {
        displayCacheTable(data.cache);
        displayHitsAndMisses(data.hits, data.misses);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });

    // Function to display hits and misses
    function displayHitsAndMisses(hits, misses) {
      const resultDiv = $("#result");
      resultDiv.html(`
        <h2>Results</h2>
        <p>Total Hits: <strong>${hits}</strong></p>
        <p>Total Page Faults: <strong>${misses}</strong></p>
      `);
    }
  });

  function displayCacheTable(data) {
    let tableDiv = $("#cache-table");
    tableDiv.empty(); // Clear previous table

    if (data.length === 0) return;

    let table = $("<table></table>");
    let thead = $("<thead></thead>");
    let tbody = $("<tbody></tbody>");

    // Create table header
    let headerRow = $("<tr></tr>");
    let headers = ["Steps"];
    headers.forEach((header) => {
      let th = $("<th></th>").text(header);
      headerRow.append(th);
    });
    thead.append(headerRow);

    // Create table rows
    data.forEach((frame, index) => {
      let row = $("<tr></tr>");
      let stepCell = $("<td></td>").text(`Step ${index + 1}`);
      row.append(stepCell);

      frame.forEach((page) => {
        let cell = $("<td></td>").text(page);
        row.append(cell);
      });

      tbody.append(row);
    });

    table.append(thead);
    table.append(tbody);
    tableDiv.append(table);
  }
});
