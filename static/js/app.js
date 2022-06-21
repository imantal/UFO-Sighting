// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters={};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let date = d3.select("#datetime");
    let cityname = d3.select("#city");
    let statename = d3.select("#state");
    let countryname = d3.select("#country");
    let shapename = d3.select("#shape");
    
    // 4b. Save the value that was changed as a variable.
    let datevalue=date.property("value");
    let cityvalue=cityname.property("value");
    let statevalue=statename.property("value");
    let countryvalue=countryname.property("value");
    let shapevalue=shapename.property("value");
  
    // 4c. Save the id of the filter that was changed as a variable.
    let dateid=date.attr("id");
    let cityid=cityname.attr("id");
    let stateid=statename.attr("id");
    let countryid=countryname.attr("id");
    let shapeid=shapename.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (datevalue) {
      filters[dateid]=datevalue;
    } 
    else{
      delete filters[dateid]
    } 
    if (cityvalue) {
      filters[cityid]=cityvalue;
    } 
    else{
      delete filters[cityid]
    }
    if (countryvalue) {
      filters[countryid]=countryvalue;
    } 
    else{
      delete filters[countryid]
    }
    if (statevalue) {
      filters[stateid]=statevalue;
    } 
    else{
      delete filters[stateid]
    }
    if (shapevalue) {
      filters[shapeid]=shapevalue;
    } 
    else{
      delete filters[shapeid]
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
}
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;  
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
 
     for (let i=0; i<(Object.keys(filters).length); i++) {
       filteredData = filteredData.filter(row => row[Object.keys(filters)[i]] === Object.values(filters)[i]);
      }
   
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
}
 
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters);

  // Build the table when the page loads
  buildTable(tableData);

