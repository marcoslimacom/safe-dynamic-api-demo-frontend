import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import StatCards2 from "./shared/StatCards2";
import Campaigns from "./shared/Campaigns";
import { withStyles } from "@material-ui/styles";
import dashboardService from "../../services/dashboardService";

class Dashboard1 extends Component {
  state = {
    chartData: { seriesData: [], xData: [] },
    generalStats: {},
    campaignsStats: [],
    top5Sales: [],
  };

  componentDidMount() {
    dashboardService.getYearSalesByMonth().then((data) => {
      const chartData = {
        seriesData: Object.values(data),
        xData: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      };

      this.setState({ chartData });
    });

    dashboardService.getGeneralStats().then((data) => {
      this.setState({ generalStats: data });
    });

    dashboardService.getCampaignsStats().then((data) => {
      this.setState({ campaignsStats: data });
    });

    dashboardService.getTop5Sales().then((data) => {
      this.setState({ top5Sales: data });
    });
  }

  render() {
    let { theme } = this.props;

    return (
      <Fragment>
        <div className="pb-86 pt-30 px-30 bg-primary">
          <ModifiedAreaChart
            height="280px"
            option={{
              series: [
                {
                  data: this.state.chartData.seriesData,
                  type: "line",
                  name: "Total sales",
                },
              ],
              xAxis: {
                data: this.state.chartData.xData,
              },
              yAxis: {
                min: parseInt(Math.min(...this.state.chartData.seriesData) / 2),
                max: Math.max(...this.state.chartData.seriesData),
                labels: {
                  enable: false,
                },
              },
            }}
          ></ModifiedAreaChart>
        </div>

        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StatCards theme={theme} generalStats={this.state.generalStats} />

              {/* Top Selling Products */}
              <TableCard top5Sales={this.state.top5Sales} />

              <StatCards2 generalStats={this.state.generalStats} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card className="px-24 py-16 mb-16">
                <div className="card-title">Campaigns</div>
                <div className="card-subtitle">This year</div>
                <DoughnutChart
                  campaignsStats={this.state.campaignsStats}
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light,
                  ]}
                />
              </Card>

              <Campaigns campaignsStats={this.state.campaignsStats} />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
