"use strict";

var samples = 100;
var speed = 250;
var values = new Map();
var labels = [];
var charts = [];
var value = 0;

labels.length = samples;
labels.fill(0);

var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

function initialize() {
    charts.push(new Chart(document.getElementById("chart0"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: []
        },
        options: {
            responsive: false,
            animation: {
                duration: speed * 1.5,
                easing: 'linear'
            },
            legend: false,
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
    }));
}

function advance(payloadName, payloadValue) {
    if (!values.has(payloadName)) {
        values.set(payloadName, new Array(samples).fill(0));
        var newDataset = {
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            lineTension: 0.25,
            pointRadius: 0,
            data: values.get(payloadName)
        };
        charts[0].data.datasets.push(newDataset);
    }  
    values.get(payloadName).push(payloadValue);
    values.get(payloadName).shift();
    charts.forEach(function (chart) { chart.update(); });
}

window.onload = function () {
    var connection = new signalR.HubConnectionBuilder().withUrl("/metricsHub").build();
    initialize();
    connection.start().then(function () {
    }).catch(function (err) {
        return console.error(err.toString());
    });
    connection.on("SendMetric", function (payloadName, payloadValue) {

        if (payloadName == qs["metric"]) {
            advance(payloadName, payloadValue);
        }

    });

};