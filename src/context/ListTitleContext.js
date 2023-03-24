import React from 'react';

const ListTitle = {
  list: {
    title:'',
    status:''
  }
}
const ListTitleContext = React.createContext(ListTitle)
export default ListTitleContext;