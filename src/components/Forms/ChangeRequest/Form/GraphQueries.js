import gql from 'graphql-tag';

export default GET_TAB_FORM_DATA = gql`query($id:String!){
    requests(where: {id: {_eq: $id}}) {
      id
      changecategory
      changedescription
      changeintention
      changeitem
      changereason
      endtimeforimpact
      implementer
      implementationendtime
      plannedendtime
      plannedstarttime
      priority
      productid
      region
      sourceticketid
      starttimeforimpact
      tickettitle
      testresult
      vendorid
      changesource
      changerequestcategory
      changetype
      affectedserviceid
      affectedneid
      affectednetype
    }
  }
  `;