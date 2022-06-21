// import the data from data.js
const tableData = data;
// Reference the HTML table using d3, Tell JS to look for the <tbody> in HTML
var tbody = d3.select("tbody");
//clear out any existing data
// loop through each object in the data
//tells JavaScript to find the <tbody> tag within the HTML and add a table row ("tr").
//Object.values: telling JavaScript to reference one object from the array of UFO sightings
//set up the action of appending data into a table data tag (<td>)

function buildTable(data) {
    tbody.html("");

  data.forEach((dataRow) => {
    let row = tbody.append("tr");
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
      }
    );
  });
}

//The .select() : select the very first element that matches our selector string: "#datetime"
//d3.select("#datetime") : telling D3 to look for the #datetime id in the HTML tags.
//By chaining .property("value"):grab teh info from datetime and hold it in date vaiable

function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
  
     // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    };
  
     // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  };

// selector string contains the id for the botton HTML tag "fildter-btn"
// .on("click", handleClick): execute our handleClick() function when when btn with an id of filter-btn is clicked.
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
