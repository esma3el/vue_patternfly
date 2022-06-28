<script>
import gql from "graphql-tag";
import VueMultiselect from "vue-multiselect";
 

const SEARCH_QUERY = gql`
query ($search: String!) {
  site(where: {keycode: {_iregex: $search}}, limit: 10) {
    keycode
  }
}
`;

export default{
    components: { VueMultiselect},
    data(){
        return{
            useroptions:[]
        }
    },methods:{
        searchfunc(query){
        this.$apolloProvider.defaultClient.query({
            query:SEARCH_QUERY,
            variables:{search:query}
        }).then(res=>this.useroptions = res.data.site.map(row=>row.keycode))
        }
    }
}
</script>

<template>
    <div>
        <VueMultiselect
                v-model="selected"
                :options="useroptions"
                id="ajax"
                :searchable="true"                
                @search-change="searchfunc"
              >
              </VueMultiselect>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>