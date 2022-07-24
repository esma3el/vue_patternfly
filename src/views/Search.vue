<script>
import gql from "graphql-tag";

const QUERY = gql`
  query (
    $businesskey: String!
    $state: [Int!]
    $processname: String!
    $limit: Int!
    $offset: Int!
    $from: timestamp!
    $to: timestamp
  ) {
    processes_aggregate(
      where: {
        businesskey: { _iregex: $businesskey }
        starttime: { _gte: $from, _lt: $to }
        processname: { _iregex: $processname }
        state: { _in: $state }
      }
    ) {
      aggregate {
        count
      }
    }
    processes(
      where: {
        businesskey: { _iregex: $businesskey }
        starttime: { _gte: $from, _lt: $to }
        processname: { _iregex: $processname }
        state: { _in: $state }
      }
      limit: $limit
      offset: $offset
    ) {
      id
      processid
      businesskey
      processname
      starttime
      state
      variables
      tasks(where: {state: {_eq: "Ready"}}) {
        id
        state
        name
        referencename
        tasks_potential_users {
          user_id
        }
      }
    }
  }
`;

export default {
  name: "Search",
  data() {
    return {
      openSvgModal: false,
      data: [],
      count: 5,
      filter: {"Running":1,
              "Completed":2,
              "Pending":3},
      search: {
        id: "",
        title: "",
        state: [1,2,3,5],
        startTime: "",
        endTime: "",
        processname: "",
      },
      perPage: 10,
      page: 1,
      offset: (this.page - 1) * this.perPage,
    };
  },
  methods: {
    Onselect(e) {
      console.log(e.target);
      // const val = parseInt(e.target.value);
      const val = this.filter[e.target.value];

      if(this.search.state.includes(val))
      {
        this.search.state = this.search.state.filter((item)=>{
          if (val == 2) {            
            return item !== 5 || item !== 2 
          }else{      
          return item !== val          
          }
        })
      }else{
        this.search.state.push(val)
        if (val == 2) {
          this.search.state.push(5)
        }
      }
    },
    setdate(e) {
      let zone = new Date().getTimezoneOffset() * 60 * 1000;
      let d = new Date();
      let minus = 0;
      switch (parseInt(e.target.id)) {
        case 7:
          minus = 7;
          break;
        case 30:
          minus = 30;
          break;
        default:
          minus = 1;
      }
      d.setDate(d.getDate() - minus);
      this.search.startTime = new Date(d - zone).toISOString().slice(0, 16);
      this.search.endTime = new Date(new Date() - zone)
        .toISOString()
        .slice(0, 16);
    },
    reset() {
      this.perPage = 10;
      this.page = 1;
      this.offset = 0;
      this.searchdata()
    },    
    searchdata() {
      this.$apolloProvider.defaultClient
        .query({
          query: QUERY,
          variables: {
            id: this.search.id,
            businesskey: this.search.title,
            state: this.search.state,
            processname: this.search.processname,
            limit: this.perPage,
            offset: this.offset,
            from: this.search.startTime,
            to: this.search.endTime,
          },
        })
        .then((result) => {
          this.data = result.data.processes.map((row) => row);
          this.count = result.data.processes_aggregate?.aggregate?.count;
        });
    },
  },
  watch: {
    page() {
      this.offset = (this.page - 1) * this.perPage;
      this.searchdata();
    },
    perPage() {
      this.searchdata();
    },
  },
  computed: {    
    end() {
      return new Date(this.search.endTime);
    },
  },
};
</script>

<template>
  <pf-card>
    <pf-card-body>
      <!-- <pf-form @submit.prevent="searchdata" class="pf-l-grid"> -->
      <section class="pf-l-grid">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-3-col-on-xl"
        >
          <div class="pf-c-form__group-label">
            <label class="pf-c-form__label" for="Change Category">
              <span class="pf-c-form__label-text">Workflow</span>
            </label>
          </div>
          <div class="pf-c-form__group-control">
            <select
              class="pf-c-form-control"
              v-model="search.processname"
              name=""
              id=""
            >
              <option value="Incident Management">Incident Management</option>
              <option value="Change Management">Change Management</option>
              <option value="Work Orders">Work Orders</option>
              <option value="Field Support">Field Support</option>
            </select>
          </div>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-3-col-on-xl"
        >
          <pf-form-group label="Ticket ID" field-id="form-id-group">
            <pf-text-input
              id="form-id-input"
              name="id"
              v-model="search.id"
              :auto-validate="false"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
        >
          <pf-form-group label="Ticket Title" field-id="form-title-group">
            <pf-text-input
              id="form-title-input"
              name="title"
              v-model="search.title"
              :auto-validate="false"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
        >
          <div class="pf-c-form__group-label">
            <label class="pf-c-form__label" for="Change Category">
              <span class="pf-c-form__label-text">Ticket Status</span>
            </label>
          </div>
          <div class="pf-c-form__group-control">
            <pf-select @select="Onselect" placeholder="Filter" variant="checkbox">
              <pf-select-option :checked="true" value="Running" />
              <pf-select-option :checked="true" value="Completed"/>
              <pf-select-option :checked="true" value="Pending" />
            </pf-select>
            <!-- <select
              class="pf-c-form-control"
              v-model="search.state"
              name=""
              id=""
            >
              <option value="">All ticket Status</option>
              <option value="Completed">Completed</option>
              <option value="Ready">Running</option>
              <option value="Closed">Closed</option>
            </select> -->
          </div>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-3-col-on-xl"
        >
          <pf-form-group label="From" field-id="startTime">
            <pf-text-input
              type="datetime-local"
              id="startTimeForinput"
              name="startTime"
              v-model="search.startTime"
              :auto-validate="false"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-3-col-on-xl"
        >
          <pf-form-group label="To" field-id="endTime">
            <pf-text-input
              type="datetime-local"
              id="endTimeForinput"
              name="endTime"
              v-model="search.endTime"
              :auto-validate="false"
            />
          </pf-form-group>
        </div>
        
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-2-col-on-xl"
        >
          <div class="search-date">
            <a href="#" @click="setdate" id="1">Today</a>
            <a href="#" @click="setdate" id="7">Last 7 Days</a>
            <a href="#" @click="setdate" id="30">Last 30 Days</a>
          </div>
        </div>
        
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-1-col-on-xl"
        >
          <pf-action-group class="btn">
            <pf-button
              type="submit"
              variant="primary"
              @click.prevent="reset"
              :disabled="!search.processname"
              small
              >Search</pf-button
            >
          </pf-action-group>
        </div>
      </section>
    </pf-card-body>
  </pf-card>
  <br />
  <table
    class="pf-c-table pf-m-compact pf-m-grid-md"
    role="grid"
    aria-label="This is a simple table example"
    id="table-basic"
  >
    <caption></caption>
    <thead>
      <tr role="row">
        <th role="columnheader" scope="col">Ticket ID</th>
        <th role="columnheader" scope="col">SLA</th>
        <th role="columnheader" scope="col">Ticket State</th>
        <th role="columnheader" scope="col">Handler</th>
        <th role="columnheader" scope="col">Process Name</th>
        <th role="columnheader" scope="col">Status</th>
        <th role="columnheader" scope="col">Created</th>
        <th role="columnheader" scope="col">Options</th>
      </tr>
    </thead>

    <tbody role="rowgroup" v-if="$apollo.loading">
      <pf-spinner />
    </tbody>
    <tbody role="rowgroup" v-else>
      <tr v-for="item in data">
        <td>
          <router-link
            target="_blank"
            v-if="item.tasks[0]"
            :to="`/${item.processid}/${item.id}/${item.tasks[0]?.name}/${item.tasks[0]?.id}`"
            >{{ item.businesskey }}</router-link
          >
          <router-link
            v-else
            :to="`/${item.processid}/${item.id}`"
            target="_blank"
            >{{ item.businesskey }}</router-link
          >
        </td>
        <td role="cell" data-label="SLA">
            <img v-if="item.variables?.meta?.restorationSla?.status == 'Within Milestone'" src="http://localhost:9000/kogito/public/green.png"/>
            <img v-else-if="item.variables?.meta?.restorationSla?.status == 'Exeeds Milestone'" src="http://localhost:9000/kogito/public/yellow.png"/>
            <img v-else-if="item.variables?.meta?.restorationSla?.status == 'Exeeds Target'" src="http://localhost:9000/kogito/public/red.png"/>
            <img v-else src="http://localhost:9000/kogito/public/green.png"/>
          </td>
          <td v-if="item.tasks[0]" role="cell" data-label="Ticket State">
            {{ item.tasks[0]?.referencename }}
          </td>
          <td v-else role="cell" data-label="Ticket State">Closed</td>
        <td>{{ item.tasks[0]?.tasks_potential_users[0]?.user_id }}</td>
        <td>{{ item.processname }}</td>
        <td v-if="item.state == 1">Running</td>
        <td v-else-if="item.state == 2">Completed</td>
        <td v-else>{{ item.state }}</td>
        <td>{{ item.starttime.slice(0,16).replace("T"," ") }}</td>
        <td>
            <pf-dropdown v-model:open="open7" plain>
                <template #toggle>
                  <pf-kebab-toggle />
                </template>
                <pf-dropdown-item>
                  <router-link
                    target="_blank"
                    v-if="item.tasks[0]"
                    :to="`/${item.processid}/${item.id}/${item.tasks[0]?.name}/${item.tasks[0]?.id}`"
                    ><i class="fa-solid fa-arrow-right"></i> View Ticket</router-link
                  >
                  <router-link
                    v-else
                    :to="`/${item.processid}/${item.id}`"
                    target="_blank"
                    ><i class="fa-solid fa-arrow-right"></i> View Ticket</router-link
                  >
                </pf-dropdown-item>
                <pf-dropdown-item>
                  <a @click="openSvgModal = !openSvgModal"><i class="fa-solid fa-timeline"></i> View SVG</a>
                </pf-dropdown-item>
                <pf-modal variant="large" v-model:open="openSvgModal" title="Process SVG">
                  <img :src="`http://localhost:8780/svg/processes/${item.processid}/instances/${item.id}`" />
                </pf-modal>
              </pf-dropdown>
            </td>
      </tr>
    </tbody>
  </table>

  <pre v-if="$apollo.loading"></pre>
  <pf-pagination
    v-else
    v-model:page="page"
    v-model:per-page="perPage"
    :count="count"
  />
</template>

<style>
.search-date {
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  font-size: 0.7em;
  align-items: flex-start;
}
.search-date a {
  margin-left: 1em;
}
</style>
