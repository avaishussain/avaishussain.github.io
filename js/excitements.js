  var c = document.getElementById("cvs");
  var ctx = c.getContext("2d");

  var grad1 = ctx.createLinearGradient(0, 0, 0, c.height);
  grad1.addColorStop(0, "violet");
  grad1.addColorStop(1, "red");

  var jsData = {
    "fields": ["September", "October", "December", "February", "March"],
    "data": [
      [62000, 136000, 357000, 731000, 922000], // Births
      [38000, 66000, 255000, 631000, 388000] // Deaths
    ]
  };

  var niData = jsData.data[0].map((val, idx) => val - jsData.data[1][idx]);


  var myData = {
    labels: jsData.fields,
    datasets: [{
        type: "line",
        label: "Natural Increase",
        data: niData,
        fill: false,
        lineTension: 0,
        borderColor: "green",
        radius: 8,
        pointStyle: "crossRot",
      },
      {
        label: "Males",
        data: jsData.data[0],
        backgroundColor: grad1,
        hoverBackgroundColor: "red",
        pointStyle: "rect",
      },
      {
        label: "Females",
        data: jsData.data[1],
        backgroundColor: "orange",
        hoverBackgroundColor: "yellow",
        pointStyle: "rect",
      },
    ]
  };

  var myChart = Chart.Bar(ctx, {
    data: myData,
    options: {
      responsive: false,

      title: {
        display: true,
        text: "Excitement level between September-March.",
        fontSize: 16,
      },

      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
        onClick: null,
      },

      scales: {
        xAxes: [{
          scaleLabel: {
            display: false,
          },
          gridLines: {
            display: false,
          },
          barPercentage: 0.8,
          categoryPercentage: 0.6,
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Number of people.",
          },
          gridLines: {
            display: true,
          },

          type: "logarithmic",

          ticks: {
            min: 1e4,
            max: 3e6,

            callback: function(label) {
              if ([1e4, 1e5, 1e6].indexOf(label) != -1)
                return label / 1000 + "K";
            },
          }
        }],
      }
    }
  });
