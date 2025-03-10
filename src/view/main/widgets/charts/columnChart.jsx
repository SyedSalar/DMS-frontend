import React, { useState } from "react";

import { Card, Row, Col, DatePicker } from "antd";
import Chart from "react-apexcharts";
import moment from "moment";

export default function ColumnChart() {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const [data] = useState({
    series: [
      {
        name: "Complete %",
        data: [
          50, 40, 70, 90, 60, 80, 55, 30, 10, 5,
          15, 25,
        ],
      },
      {
        name: "Remaining %",
        data: [
          50, 60,30 , 10, 40, 20, 45, 70, 90, 95,
          85, 75,
        ],
      },
    ],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
        type: "bar",

        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: "#DFE6E9",
        row: {
          opacity: 0.5,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: "45%",
          endingShape: "rounded",
        },
        colors: {
          backgroundBarColors: ["#0063F7", "#00F7BF"],
        },
      },

      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      xaxis: {
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "#78909C",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },

        tickPlacement: "between",
        labels: {
          style: {
            colors: ["636E72"],
            fontSize: "14px",
          },
        },
        categories: [
          "Project1",
          "Project2",
          "Project3",
          "Project4",
          "Project5",
          "Project6",
          "Project7",
          "Project8",
          "Project9",
          "Project10",
          "Project11",
          "Project12",
        ],
      },
      legend: {
        horizontalAlign: "right",
        offsetX: 40,
        position: "top",
        markers: {
          radius: 12,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["636E72"],
            fontSize: "14px",
          },
          formatter: (value) => {
            return value;
          },
        },

        min: 0,
        max: 100,
        tickAmount: 4,
      },
    },
  });

  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col className="hp-mb-16" span={24}>
          <Row justify="space-between">
            <Row align="bottom" className="hp-pb-16">
              <h4 className="hp-mr-8">Project Progress</h4>
            </Row>
            
            <Col>
              <DatePicker
                onChange={onChange}
                picker="year"
                defaultValue={moment("2019", "YYYY")}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <div id="chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              height={350}
              legend="legend"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
