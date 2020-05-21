// Use the D3 library to read in samples.json.

d3.json("../data/samples.json").then(function(data){
   console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// Select html location for sample_values, otu_ids, otu_labels
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
        builtDemdata(id);

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

        // get the first 10 otu_id items for plotting. Convert the numbers to string
        var otuIds10=otuIds[0].slice(0,10);
        console.log(otuIds10);
        otuIds10c=otuIds10.map(function(otu){ console.log(otu);
            otu= 'OTU'+ otu.toString();
            console.log(otu);
            return otu;
        });

        // get the first 10 otu_id items for plotting. Keep numbers as is for bubble chart
        otuIds10n=otuIds10.map(function(otu){ console.log(otu);
            //otu= 'OTU'+ otu.toString();
            console.log(otu);
            return otu;
        });
        
        //otu_ids is in [Array(44)]-- array within array
        //console.log(otuIds10c);

        // take otu_labels from filterData
        var otuLabels=filterData.map(data1 => data1.otu_labels);

        // get the first 10 items for plotting
        var otuLabels10=otuLabels[0].slice(0,10);  //otu_labels is in [Array(44)]-- array within array
        console.log(otuLabels10);      

        // create bar chart
        // create trace

        var trace1={
            x: sampleValue10,
            y: otuIds10c,
            text: otuLabels10,
            type: 'bar',
            orientation: 'h'
        };
   
        var data2=[trace1];

        var layout={
            title: 'Chart1: Top 10 OTUs for an individual',
            hight: 600,
            base: 0,
            xaxis: {title: 'Bacteria Count'},
            yaxis: {title: 'Bacteria ID'},

        };
        Plotly.newPlot("bar", data2, layout); 

        // automating to add color to bubblr chart
        // Ployly takes rgb for deciding color like 'rgb(93, 164, 214)'
        // Determine these 3 colors using the method below
        // 1. rgb ranges between 0 and 255. Take a starting value as 15 (arbitrary)
        // 2. take each otu_id number, devide this by 15, and get a remainder. rgb values are integer, so take floor of the remainder
        // 3. Remainder tends to be small (darker color), so multiply it by scaleup value
        // 4. g (middle value of rgb) is determined by otuid/n, and repeat the step 2 and 3 for determining the value
        // 5. b value ( the last value of rgb) is determined by the same way as step 4.
        // 6. map returns an array of string value for rgb through concatenating rgb, ( , r , g , b ).  This string value array is stored in colors.
        var colors = otuIds10n.map(otuid => {
            var n = 15;
            var scaleup = 255/n;
            var r = Math.floor((otuid % n)*scaleup);
            otuid = (otuid/n);
            var g = Math.floor((otuid % n)*scaleup);
            otuid = (otuid/n);
            var b = Math.floor((otuid % n)*scaleup);
            return 'rgb' + '(' + r + ', ' + g + ', ' + b +')';
        });

        //create bubble chart
        // reference https://plotly.com/javascript/bubble-charts/#bubble-size-scaling-on-charts
        var trace2={
            x: otuIds10n,
            y: sampleValue10,
            text: otuLabels10,
            mode: 'markers',
            marker: {
                color: colors,
                size:sampleValue10,
                sizeref: 0.02,
                sizemode: 'area',
               /* colorscale: 'Earth'*/
            }
        };
        var data22=[trace2];

        var layout2={
            title: 'Chart2: Top 10 OTUs for an individual', 
            xaxis: {title: 'Bacteria ID'},
            showlegend: false,
            height:600,
            width:1000
        };
        Plotly.newPlot("bubble",data22,layout2);

    })
}
};


//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.

// reference https://github.com/d3/d3-selection
function builtDemdata(sample){
    d3.json("../data/samples.json").then(function(data){
        var valueMeta=data.metadata;
        var resultArray=valueMeta.filter(object => object.id == sample);
        var result = resultArray[0];

// Select html location for demographic information
    var selectDem = d3.select('#sample-metadata');
    selectDem.html(" ");

    Object.entries(result).forEach(([key,value])=>{
        selectDem.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
});
}


