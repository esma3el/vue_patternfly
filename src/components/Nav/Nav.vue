<template>
  <div>
    <pf-nav @select="selectLink">
      <pf-nav-list>
        <pf-nav-group title="">
          <pf-nav-item item-id="Home" :to="{name:'create_cr'}"  :active="activeLink == 'Link1'">
            New Change Request
          </pf-nav-item>
          <pf-nav-item item-id="incidents" :to="{name:'new_incident'}"  :active="activeLink == 'Link2'">
            New Incident
          </pf-nav-item>          
          <pf-nav-item item-id="link3" :to="{name:'Dashboard'}" :active="activeLink == 'link3'">
            Dashboard
          </pf-nav-item>
        </pf-nav-group>
        <pf-nav-group title="">

          <pf-nav-item item-id="link4" :to="{name:'Home'}" :active="activeLink == 'link4'">
            Pending For Me
          </pf-nav-item>
          <pf-nav-item item-id="link5" :to="{name:'pendingformygroup'}" :active="activeLink == 'link5'">
            Pending For My Group
          </pf-nav-item>
          <pf-nav-item item-id="link6" :to="{name:'ProcessedByMe'}" :active="activeLink == 'link6'">
            Processed By Me
          </pf-nav-item>
          <pf-nav-item item-id="link7" :to="{name:'search'}" :active="activeLink == 'link7'">
           Advanced Search
          </pf-nav-item>
        </pf-nav-group>
      </pf-nav-list>
    </pf-nav>
  </div>
</template>

<script>
export default{
    name:'Nav',
    data(){
        return{
        activeLink:''
        }
    }
}
</script>