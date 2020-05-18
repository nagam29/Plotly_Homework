// Use the D3 library to read in samples.json.

d3.json("../data/samples.json").then(function(data){
   console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// Select sample_values, otu_ids, otu_labels
var selectD = d3.select('#selDataset');

// reference https://github.com/d3/d3-selection
function builtDropdown(data){
    selectD.html(" ");
    var optionTag=selectD.append('option')
    .text('Select subject ID')
    .attr("value","");
    data.forEach((eachPerson) => {
        var optionTag=selectD.append('option')
            .text(eachPerson.id)
            .attr("value",eachPerson.id);
    });
}

d3.json("../data/samples.json").then(function(data){
    valueAll=data.samples;
    console.log(valueAll);

    builtDropdown(valueAll);
});

function optionChanged(id){
    if (id != "") {
    d3.json("../data/samples.json").then(function(data){
        valueAll=data.samples;

        //var dataset = selectD.property("value"); // save the user selected value
        console.log(id);

        var filterData=valueAll.filter(row => row.id===id); // select the person's data based on the ID that is selcted with dropdown menu
        console.log(filterData);

        // take sample_values from filterData
        var sampleValue=filterData.map(data1 => data1.sample_values);
        console.log(sampleValue);
        console.log(sampleValue[0]);

        // get the first 10 items for plotting
        var sampleValue10=sampleValue[0].slice(0,10);  //sample_value is in [Array(44)]-- array within array. Table the items [0] is this item
        console.log(sampleValue10);

        // take otu_ids from filterData
         var otuIds=filterData.map(data1 => data1.otu_ids);

        // get the first 10 items for plotting
        var otuIds10=otuIds[0].slice(0,10);
        console.log(otuIds10);
        otuIds10=otuIds10.map(function(otu){ console.log(otu);
            otu= 'OTU'+ otu.toString();
            console.log(otu);
            return otu;
        });
        
        //otu_ids is in [Array(44)]-- array within array
        console.log(otuIds10);

        // take otu_labels from filterData
        var otuLabels=filterData.map(data1 => data1.otu_labels);

        // get the first 10 items for plotting
        var otuLabels10=otuLabels[0].slice(0,10);  //otu_labels is in [Array(44)]-- array within array
        console.log(otuLabels10);      

        // create bar chart
        // create trace

        var trace1={
            x: sampleValue10,
            y: otuIds10,
            text: otuLabels10,
            type: 'bar',
            orientation: 'h'
        };
   
        var data2=[trace1];

        var layout={
            title: 'Top 10 OTUs found in an individual',
            hight: 600,
            base: 0,
            xaxis: {title: 'Bacteria Count'},
            yaxis: {title: 'Bacteria ID'},

        };
        Plotly.newPlot("bar", data2, layout); 
    })
}
};

// Call updatePlotly() when a change takes place to the DOM
//d3.selectAll("#selDataset").on("change", updatePlotly);

/*
    // Sort valueAll by sample_values, descending order 
    var sortedValueAll=valueAll.sort((a,b) => b.sample_values - a.sample_values);
    console.log(sortedValueAll);

    // Slice the first 10 objects for plotting
    slicedData = sortedValueAll.slice(0, 10);
    console.log(slicedData);

*/
/*
    // take sample_values from SlicedData
    slicedSampleValue=slicedData.map(data1=>data1.sample_values);
    console.log(slicedSampleValue);

    // Reverse the sample_values array to accommodate Plotly's defaults
    reversedSampleValue = slicedSampleValue.reverse();   
    console.log(reversedSampleValue);
    
    //take otu_ids from SlicedData
    slicedOtuIds=slicedData.map(data1=>data1.otu_ids);
    console.log(slicedOtuIds);

    // Reverse the otu_ids array to accommodate Plotly's defaults
    reversedOtuIds = slicedOtuIds.reverse();   
    console.log(reversedOtuIds);

    //take otu_labels from SlicedData
    slicedOtuLabels=slicedData.map(data1=>data1.otu_labels);
    console.log(slicedOtuLabels);

    // Reverse the otu_ids array to accommodate Plotly's defaults
    reversedOtuLabels = slicedOtuLabels.reverse();   
    console.log(reversedOtuLabels);

    // create trace

    var trace1={
        x: reversedSampleValue,
        y: reversedOtuIds,
        text: reversedOtuLabels,
        type: 'bar',
        orientation: 'h'
    };
    console.log(trace1);

    var data2=[trace1];

    var layout={
        title: 'Top 10 OTUs found in an individual',
    };
    Plotly.newPlot("bar", data2, layout); 
    */
 
