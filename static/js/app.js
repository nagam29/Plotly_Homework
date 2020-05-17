// Use the D3 library to read in samples.json.

d3.json("../data/samples.json").then(function(data){
   console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
/*
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  } */
// Select sample_values

d3.json("../data/samples.json").then(function(data){
    sampleValue_t=data.samples;
    sampleValue=sampleValue_t.map(data=>data.sample_values);
    console.log(sampleValue);
}); 