<template>
  <div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-8-col pf-m-8-col-on-md pf-m-8-col-on-xl">

  <pf-card>
    <pf-card-body>
        <pf-spinner v-if="$apollo.loading" size="sm" />
      <div class="pf-l-grid pf-m-gutter" v-else>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Ticket ID</pf-title>
          <small>{{data.businesskey}}</small>        
        </div>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Start Time</pf-title>
          <small>{{data.starttime.replace("T"," ").substring(0,16)}}</small>                
        </div>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Ticket Originator</pf-title>
          <small>{{data.variables}}</small>                
        </div>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Process Name</pf-title>
          <small>{{data.processname}}</small>                
        </div>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Current Phase</pf-title>
          <small>{{data.tasks[0]?.referencename || "Closed"}}</small>          
        </div>
        <div v-if="data.tasks.length !== 0" class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title size="md">Current Handlers</pf-title>
          <small v-for="handler in data.tasks[0]?.tasks_potential_users">{{handler.user_id || "none"}}</small>                
        </div>
        <div v-if="data.tasks.length !== 0" class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
          <pf-title  size="md">Current Groups</pf-title>
          <small v-for="handler in data.tasks[0]?.tasks_potential_groups">{{handler.group_id}}</small>                
        </div>
      </div>
    </pf-card-body>
  </pf-card>
  </div>
  <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
      <pf-card>
          <pre v-if="$apollo.loading"></pre>
          <pf-card-body v-else>        
        <fusioncharts
          :type="data1.type"
          :width="data1.width"
          :height="data1.height"
          :dataFormat="data1.dataFormat"
          :dataSource="data1.dataSource"          
        ></fusioncharts>
    </pf-card-body>
  </pf-card>
  </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import FusionCharts from "fusioncharts";

const dataSource = {
  chart: {
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

const TOTAL_OPEN_TICKETS = gql`
  query {
    total_opened_tickets {
      count
      processname
    }
  }
`;

const GET_TICKET_INFO = gql`
  query ($id: String!) {
    processes(where: { id: { _eq: $id } }) {
      businesskey
      starttime
      processname
      variables(path: "originator")
      tasks(where: { state: { _eq: "Ready" } }) {
        referencename
        tasks_potential_users {
          user_id
        }
        tasks_potential_groups {
          group_id
        }
      }
    }
  }
`;

export default {
    components: { FusionCharts },
  data() {
    return {
      data: [],
      data1: {
        type: "pie2d",
        width: "300",
        height: "200",
        dataFormat: "json",
        dataSource: dataSource,
        radioValue: "none",
        lastActive: "none",
      }
    }
  },
  apollo: {
    processes: {
      query: GET_TICKET_INFO,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update(data) {
        this.data = data.processes[0];
      },
    },
    total_opened_tickets:{
        query: TOTAL_OPEN_TICKETS,
        update(data){
            return (this.data1.dataSource.data = data.total_opened_tickets.map((row) => ({
                label: row.processname,
                value: row.count,
            })));
        }
  }}
}
</script>
