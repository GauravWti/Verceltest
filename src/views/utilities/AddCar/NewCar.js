import React, { useState } from "react";
import "./NewCar.css";
import Select from "react-select";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect } from "react";

const NewCar = () => {
  const [selectVenders, setSelectVenders] = useState();
  const[venderList,setVenderList]=useState([]);
  const [inputList, setInputList] = useState([{ vehicleType: "", quantity: "" }]);

  // const VenderList = [
  //   // { value: "Gaurav Car Service", label: "Gaurav Car Service" },
  //   // { value: "Sumit car vender", label: "Sumit car vender" },
  //   // { value: "Dhruv car point", label: "Dhruv car point" },
  //   // { value: "Neel vender", label: "Neel vender" },
  //   // { value: "Wti Vender", label: "Wti Vender" },
  // ];

  const CarTypeList=[
    {value:"Compact Cars",label:"Compact Cars"},
    {value:"Economy Cars",label:"Economy Cars"},
    {value:"4x4",label:"4x4"},
  ]


  useEffect(() => {
    const getAllVender = async () => {
      try {
        const response = await fetch('http://localhost:5000/0auth/getAllVender', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        const resdata = await response.json();
        console.log(resdata);
  
        const newVenderList = resdata.map((data) => ({
          value: data.venderName,
          label: data.venderName,
        }));
        setVenderList(newVenderList);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };
  
    getAllVender();
  }, []);  // Empty dependency array to run once on mount
  

  async function handleSelect(data) {
    setSelectVenders(data);

    try {
      const res = await fetch("http://localhost:5000/0auth/getAllCars", {
        method: "POST",
        body: JSON.stringify({
          venderName: data.value, // Use data.value instead of selectVenders.value
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const resdata = await res.json();
      console.log(resdata);

      const newInputList = resdata.map((element) => ({
        vehicleType: element.vehicleType,
        quantity: element.quantity,
      }));
       
      if(newInputList.length==0){
       setInputList( [{ vehicleType: "", quantity: "" }]);
      }
      else{

        setInputList(newInputList);
      }
    } catch (err) {
      console.log("error in car adding" + err);
    }
  }

  const handleInputChange = (value, index, name) => {
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { vehicleType: "", quantity: "" }]);
  };

  const handleSubmit = async () => {
    console.log(selectVenders.value);
    console.log(inputList);

    try {
      const res = await fetch("http://localhost:5000/0auth/addCarquantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venderName: selectVenders.value,
          cars: inputList,
        }),
        credentials: "include",
      });

      const resData = await res.json();
      console.log(resData);
      window.alert('successfully added')
      location.reload();
    } catch (err) {
      console.log("error in car adding" + err);
    }
  };

  return (

    <div className="newcar_app">
      <h2 className="font-extrabold text-4xl my-10 text-blue-950">Choose your Vender</h2>
      <div className="w-[300px] ">
        <Select
          options={venderList}
          placeholder="Select Vender"
          value={selectVenders}
          onChange={handleSelect}
          isSearchable={true}
        />
      </div>
      <div className="relative flex flex-col gap-2">

      {inputList.map((x, i) => (
        <div key={i} className="box flex md:flex-row flex-col gap-4  w-[40vw] ">
          <Select
            className="w-full md:w-[40%]"
            options={CarTypeList}
            placeholder="Select car type"
            value={CarTypeList.find((option) => option.value === x.vehicleType)}
            onChange={(data) => handleInputChange(data.value, i, "vehicleType")}
            isSearchable={true}
            />
          <input
            className="w-full md:w-[40%] block  px-4 py-2 text-[#053B50] border-black border-[1px] bg-white rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            name="quantity"
            placeholder="Enter Car Quantity"
            value={x.quantity}
            onChange={(e) => handleInputChange(e.target.value, i, "quantity")}
            />
          <div className="btn-box  ">
            {inputList.length !== 1 && (
              <button className="mr10" onClick={() => handleRemoveClick(i)}>
                <DeleteRoundedIcon style={{ color: 'red' }} />
              </button>
            )}
            {inputList.length - 1 === i && (
              <button className="absolute -top-[40px]" onClick={handleAddClick}>
                <AddCircleOutlineRoundedIcon style={{ color: 'blue' }} />
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
      <div className="mt-6">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover-bg-[#053B50] focus:outline-none focus-bg-[#053B50]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewCar;
