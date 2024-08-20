import Sidenav from 'Components/Common/SideNav/Sidenav'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosInstance from 'Config/apicalls'
import { Errortoast } from 'plugin/Toast/Toast'
import { ToastContainer } from 'react-toastify'
import Ordertamplate from 'Components/OrderTemplates/Ordertamplate'

function Orders() {
  const [data, setData] = useState([]); 
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    handleOrder();
  }, [user._id]);

  const handleOrder = () => {
    const userId = user._id;
    if (!userId) return; 

    AxiosInstance.get('users/getorderdata', { params: { userId } })
      .then((res) => {
        setData(res.data); 
      })
      .catch((err) => {
        Errortoast('You Have Currently No Orders')
      });
  };

  return (
    <div>
      <ToastContainer />
      {data.length ? (
        data.map((data) => (
          <Ordertamplate  Udata={data} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
