<template>
  <div>
    <pf-nav @select="selectLink">
      <pf-nav-list>
        <pf-nav-group title="Section title 1">
          <pf-nav-item item-id="Home" :to="{name:'create_cr'}"  active='Link1'>
            New Change Request
          </pf-nav-item>
          <pf-nav-item item-id="link2" :active="activeLink == 'link2'">
            Link 2
          </pf-nav-item>
          <pf-nav-item item-id="link3" :to="{name:'Dashboard'}" :active="activeLink == 'link3'">
            Dashboard
          </pf-nav-item>
        </pf-nav-group>
        <pf-nav-group title="Section title 2">

          <pf-nav-item class="pf-m-current" item-id="link4" :to="{name:'Home'}" :active="activeLink == 'link4'">
            Pending For Me
          </pf-nav-item>
          <pf-nav-item item-id="link5" to="/pendingforgroup" :active="activeLink == 'link5'">
            Pending For My Group
          </pf-nav-item>
          <pf-nav-item item-id="link6" :to="{name:'ProcessedByMe'}" :active="activeLink == 'link6'">
            Processed By Me
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
        
        }
    }
}
</script>