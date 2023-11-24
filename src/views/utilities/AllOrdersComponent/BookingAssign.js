import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router';


const BookingAssign = ({setpopupwindow , data }) => {
  const [selectVenders, setSelectVenders] = useState();
  const [venderList, setVenderList] = useState([]);

  const userid=useParams().userid;

  console.log(userid);
  useEffect(() => {
    const getAllVender = async () => {
      try {
        const response = await fetch('http://localhost:5000/0auth/getAllVender', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const resdata = await response.json();
        console.log(resdata);

        const newVenderList = resdata.map((data) => ({
          value: data.venderName,
          label: data.venderName
        }));

        setVenderList(newVenderList);

      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    getAllVender();
  }, []);



   function handleSelect(data) {
    setSelectVenders(data);
    
  }

  const handleclose=()=>{
    setpopupwindow(0);
  }

const carTransactionfun=async()=>{
      try{
         const result=await fetch('https://wticarrental.ae:3000/app/v1/reservation/assignVendorDetails',{
          method:'patch',
          body:JSON.stringify({
            reservationID: data.reservationID  ,
            vendorID: selectVenders.value
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
         })
         console.log(result);
      }
      catch(err){
        console.log('err in carTransactionfun');
      }
}

  const handlesubmit=async()=>{
 console.log(selectVenders);
    try{
      const result=await fetch('http://localhost:5000/0auth/addReservationToVender',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venderName: selectVenders.value,
          reservationId:data.reservationID,
          carType:data.car.type,
          Operatorid:userid,
          
          
        }),
        credentials: 'include',
      })

      const resdata=await result.json();
      console.log(resdata);
      window.alert('added');
      carTransactionfun();
      handleclose();
    }
    catch(err){
         console.log(err);
    }
  }
  return (
    <>
    
 <div className='w-screen h-screen fixed top-0 left-0 backdrop-filter backdrop-blur-sm flex items-center justify-center'>

    
      <div className='w-[50vw] h-[50vh] relative  bg-slate-50  flex flex-col items-center justify-between py-8'>
        <CancelIcon className=' absolute top-5  right-3 cursor-pointer' onClick={()=>handleclose()} />
        <p className='text-blue-950 text-xl font-bold'>Assign The booking to Vender</p>

        
          <div className="w-[300px] ">
            <Select options={venderList} placeholder="Select Vender" value={selectVenders} onChange={handleSelect} isSearchable={true} />
          </div>
          <button className='bg-blue-950 px-2 py-1 rounded-lg text-white' onClick={handlesubmit} >submit</button>
        
      </div>
      
 </div>
    </>
  );
};

export default BookingAssign;
