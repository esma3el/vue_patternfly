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
      tasks {
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
      data: [],
      count: 0,
      selected: [],
      search: {
        id: "",
        title: "",
        state: 1,
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
    onselect(e) {
      console.log(e);
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
      <pf-form @submit.prevent="searchdata" class="pf-l-grid">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
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
            </select>
          </div>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
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
            <select
              class="pf-c-form-control"
              v-model="search.state"
              name=""
              id=""
            >
              <option value="">All ticket Status</option>
              <option value="Completed">Completed</option>
              <option value="Ready">Running</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div
          class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-3-col-on-xl"
        ></div>
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
            <small>{{ search.startTime }}</small>
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
            <!-- <small>{{search.endTime}}</small> -->
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
              @click="reset"
              :disabled="!search.processname"
              small
              >Search</pf-button
            >
          </pf-action-group>
        </div>
      </pf-form>
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
        <th role="columnheader" scope="col">Ticket State</th>
        <th role="columnheader" scope="col">Handler</th>
        <th role="columnheader" scope="col">Process Name</th>
        <th role="columnheader" scope="col">Status</th>
        <th role="columnheader" scope="col">Created</th>
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
        <td>{{ item.tasks[0]?.referencename }}</td>
        <td>{{ item.tasks[0]?.tasks_potential_users[0]?.user_id }}</td>
        <td>{{ item.processname }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.starttime }}</td>
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
