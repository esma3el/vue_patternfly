<template>
  <div class="pf-l-grid">
    <!-- <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl">
      <pf-card>
        <pf-card-title>Total Breached</pf-card-title>
        <pf-card-body> 1 </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl">
      <pf-card>
        <pf-card-title>Total Breached</pf-card-title>
        <pf-card-body> <h4>78</h4> </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl">
      <pf-card>
        <pf-card-title>Total Breached</pf-card-title>
        <pf-card-body> 1 </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl">
      <pf-card>
        <pf-card-title>Total Breached</pf-card-title>
        <pf-card-body> 1 </pf-card-body>
      </pf-card>
    </div> -->
    <br /><br /><br />
    <pf-divider />
    <!-- <pre>{{tickets_per_date_data}}</pre> -->
    <pre>{{ tickets_per_function_data[0][0] || null }}</pre>
    <pre>{{ tickets_per_employee_data[0][0] }}</pre>
    <pre>{{ total_opened_tickets_data[0][0] || null }}</pre>
    <!-- <pre>{{ tickets_per_date_data}}</pre> -->
    <div class="pf-l-grid" style="gap: 1em; margin-bottom: 1em">
      <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <fusioncharts
          :type="data.type"
          :width="data.width"
          :height="data.height"
          :dataFormat="data.dataFormat"
          :dataSource="data.dataSource"
          ref="fc"
        ></fusioncharts>
      </div>

      <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
        <pf-spinner v-if="$apollo.loading" size="lg" />
        <fusioncharts
          v-else
          :type="type"
          :width="width"
          :height="height"
          :dataFormat="dataFormat"
          :dataSource="dataSource"
        ></fusioncharts>
      </div>
    </div>
    <div class="pf-l-grid" style="gap: 1em; margin-bottom: 1em">
      <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
        <fusioncharts
          :type="data1.type"
          :width="data1.width"
          :height="data1.height"
          :dataFormat="data1.dataFormat"
          :dataSource="data1.dataSource"
        ></fusioncharts>
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-4-col-on-xl">
        <table
          class="pf-c-table pf-m-compact pf-m-grid-md"
          role="grid"
          aria-label="This is a simple table example"
          id="table-basic"
        >
          <caption>
            Top Tickets Per User
          </caption>
          <thead>
            <tr role="row">
              <th role="columnheader" scope="col">User</th>
              <th role="columnheader" scope="col">Number Of Tickets</th>
            </tr>
          </thead>
          <tbody role="rowgroup" v-for="ticket in tickets_per_employee_data">
            <tr role="row">
              <td role="cell" data-label="User">{{ ticket.label }}</td>
              <td role="cell" data-label="Number Of Tickets">
                {{ ticket.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import FusionCharts from "fusioncharts";
import gql from "graphql-tag";

const schema = [
  {
    name: "Time",
    type: "date",
    format: "%Y-%m-%d",
  },
  {
    name: "Daily Visitors",
    type: "number",
  },
];

const TOTAL_TICKETS_PER_EMPLOYESS = gql`
  {
    totla_tickets_per_employess {
      creator
      total
    }
  }
`;

const TICKETS_PER_FUNCTION = gql`
  query {
    tickets_per_function {
      domain
      count
    }
  }
`;

const TOTAL_OPEN_TICKETS = gql`
  query {
    total_opened_tickets {
      count
      processname
    }
  }
`;

const TICKETS_PER_DATE = gql`
  query {
    ticket_per_date {
      count
      firstoccurtime
    }
  }
`;

const dataSource1 = {
  chart: {
    caption: "Total Osdasdas",
    plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
    showLegend: "1",
    showPercentValues: "1",
    legendPosition: "bottom",
    useDataPlotColorForLabels: "1",
    enableMultiSlicing: "0",
    theme: "fusion",
    showlegend: "0",
  },
  data: [],
};
// const dataSource2 = {
//   schema:
//   {
//     "name": "Time",
//     "type": "date",
//     "format": "%Y-%m-%d"
//   },
//   data:[]
// };

const dataSource = {
  chart: {
    caption: "Total Tickets Per Fucntion",
    subCaption: "",
    xAxisName: "Function",
    yAxisName: "Number of Ticket",
    numberSuffix: "",
    theme: "fusion",
  },
  data: [],
};
export default {
  name: "Dashboard",
  components: { FusionCharts },
  data() {
    return {
      data1: {
        width: "100%",
        height: "400",
        type: "timeseries",
        dataFormat: "json",
        dataSource: {
          caption: { text: "Online Sales of a SuperStore in the US" },
          data: null,
          chart: {
            showLegend: 0,
          },
          caption: {
            text: "Daily Visitors Count of a Website",
          },
          yAxis: [
            {
              plot: {
                value: "Daily Visitors",
                type: "area",
              },
              title: "Daily Visitors (in thousand)",
            },
          ],
        },
      },
      data: {
        type: "pie2d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: dataSource1,
        radioValue: "none",
        lastActive: "none",
      },
      width: "100%",
      height: "400",
      type: "column2d",
      dataFormat: "json",
      dataSource: dataSource,
      mydata:[]
    };
  },
  computed: {
    total_opened_tickets_data() {
      return (this.data.dataSource.data = this.total_opened_tickets.map((row) => ({
        label: row.processname,
        value: row.count,
      })));
    },
    tickets_per_function_data() {
      return (this.dataSource.data = this.tickets_per_function.map((row) => ({
        label: row.domain,
        value: row.count,
      })));
    },
    tickets_per_employee_data() {
      return (this.data.dataSource.data = this.totla_tickets_per_employess?.map(
        (row) => ({
          label: row.creator,
          value: row.total,
        })
      ));
    },
    tickets_per_date_data() {
      return this.ticket_per_date.map((row) => [
        row.count,
        row.firstoccurtime,
      ]);
    },
  },
  methods: {    
    // test(){
    //   this.$apolloProvider.defaultClient.query({
    //     query:TICKETS_PER_DATE
    //   }).then(res => console.log('reeeeeeees',res)).catch(err=> console.log(err))
    // }
  },
  apollo: {
    tickets_per_function: TICKETS_PER_FUNCTION,
    totla_tickets_per_employess: TOTAL_TICKETS_PER_EMPLOYESS,
    ticket_per_date: TICKETS_PER_DATE,
    total_opened_tickets: TOTAL_OPEN_TICKETS,
  },
};
</script>
