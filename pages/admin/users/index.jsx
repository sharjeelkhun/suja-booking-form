import {
    columnsDataCheck,
  } from "@/app/components/default/variables/columnsData";
  
  import CheckTable from "@/app/components/default/CheckTable";
  
  import tableDataCheck from "@/app/components/default/variables/tableDataCheck.json";
import Layout from "@/app/components/Layout";
  
  
  const Index = () => {
    return (
  <div>
    <Layout>
      <CheckTable
      columnsData={columnsDataCheck}
      tableData={tableDataCheck}
      />
    </Layout>
  </div>  );
  };
  
  export default Index;