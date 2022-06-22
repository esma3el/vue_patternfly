<template>
  <div>
    <pf-nav @select="selectLink">
      <pf-nav-list>
        <pf-nav-group title="Section title 1">
          <pf-nav-item item-id="Home" to="/changerequest/create" active='Link1'>
            New Change Request
          </pf-nav-item>
          <pf-nav-item item-id="link2" :active="activeLink == 'link2'">
            Link 2
          </pf-nav-item>
          <pf-nav-item item-id="link3" :active="activeLink == 'link3'">
            Link 3
          </pf-nav-item>
        </pf-nav-group>
        <pf-nav-group title="Section title 2">
          <pf-nav-item class="pf-m-current" item-id="link4" :active="activeLink == 'link4'">
            Link 4
          </pf-nav-item>
          <pf-nav-item item-id="link5" :active="activeLink == 'link5'">
            Link 5
          </pf-nav-item>
          <pf-nav-item item-id="link6" :active="activeLink == 'link6'">
            Link 6
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