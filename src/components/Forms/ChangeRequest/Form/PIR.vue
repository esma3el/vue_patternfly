<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
export default {
  name: "Handle",
  data() {
    return {
      attachments:[],
      data: {
        
      }
    };
  },methods:{
        submitData(){
            
        
        }
      }
};
</script>


<template>
    <div>
        
    </div>
</template>


<style>
.pf-l-grid {
  gap: 2em;
}
</style>