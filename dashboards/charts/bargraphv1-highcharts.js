 //On page ready
 $(function() {
    //Array to hold our data
    var datasets = [];
    //Pull data using jquery ajax request
    $.getJSON('https://www.chapelhillopendata.org/api/records/1.0/search/?dataset=ts_dashboard_test&rows=1000&apikey=0f36dcd81171f4408301b87c9afc8f8e1294f744eafa61a0dbda3ea4&callback=?', function(data) {
       //Iterate through data
       for (var i = 0; i < data.records.length; i++) {
          //Grab the details of each account
          var item = data.records[i];
          //Create a new dataset for this account
          var account = {};
          //Set the name of the account objects to their description
          account.name = item.fields.description;
          //Populate relevant data
          account.data = [
             item.fields["2017_revised_budget"],
             item.fields["2017_available"],
             item.fields["2017_encumbrances"],
             item.fields["2017_actual"]
          ];
          //Store the account into our datasets array
          datasets.push(account);
       }
       //Create an array with the data names
       var data_names = [
          "Revised Budget",
          "Available Budget",
          "Encumbrances",
          "Actual Budget"
       ];
       //Returns the value of the data from the selected data_names array above)
       function getData(i) {
          var ds = {};
          ds.name = data_names[i];
          ds.data = $.map(datasets, function(value, key) {
             return value.data[i];
          });
          return ds;
       }
       //Creates our graph
       $('#container1').highcharts({
          chart: {
             type: "column"
          },
          title: {
             text: "2017 Technology Solutions Budget"
          },
          //#What the mapping below does
          // var accountNames = []
          // for (var i = 0; i < datasets.length; i++)
          //    accountNames.push(datasets[i].name)
          //Sets the x-axis to the description set to an account
          xAxis: {
             categories: $.map(datasets, function(value, key) {
                return value.name
             }),
             title: {
                text: "Accounts"
             },
             labels: {
                enabled: true
             }
          },
          yAxis: {
             title: {
                text: "Dollars"
             }
          },
          series: [
             //Grabs the data from the data_name array by passing it through getData function
             getData(0),
             getData(1),
             getData(2),
             getData(3)
          ],
          legend: {
             //Can turn on legend with 'true' if preferred
             //enabled: false
          }
       });
    });
 });
 