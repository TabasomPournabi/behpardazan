import React from 'react';
import { useRef } from 'react';
import { useState,useEffect } from 'react';
import './FetchData.css'

export default function FetchData() {
   
        const [data, setData] = useState([

        ])
        const [filter, setFilter] = useState(data)
        const[showModal,setShowModal]=useState(false)
        const[showModalUser,setShowModalUser]=useState([])
        const [loading, setLoading] = useState(false)

        const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  var jsonData = 
              {
                  "firstName": firstName, 
                  "id":Math.floor(Math.random()*1000),
                  "lastName": lastName,
                  "city": city,
                  "address":address
              }
          
        
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jsonData)
    fetch('https://63581241c27556d289368088.mockapi.io/api/v1/users', {
          
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify({ 
                id:Math.floor(Math.random()*1000),
                firstName: firstName,
                lastName: lastName,
                city: city,
            address:address}) 
      
          })}
   
    

        let componentMounted = true;
        useEffect(() => {
            
          const getProducts = async () => {
              const response = await fetch("http://63581241c27556d289368088.mockapi.io/api/v1/users")
              if (componentMounted) {
                setData(await response.clone().json())
                setFilter(await response.json())
            }
            return () => {
                componentMounted = false
            }
          }
          getProducts()
      
      }, []);

   
        
          
      //
     const showDataHandler=(datas)=>{
            setShowModal(true)
            console.log(datas)
            setShowModalUser(datas)

            
           
        }
       
      const ShowProducts = () => {
     const addHandler=(e)=>{
        e.preventdefault()
        console.log(e.current.value)
     }
        return (

            <>
            
                 {filter.map((product) => {
                    return (
                        <>
                           
                                <div className='child'>
                                    <div   key={product.id}>
                                    <div  onClick={()=>showDataHandler(product)}  > User {product.id}</div>
                                  
                                   
                                </div>
                             
                                

                            </div>
                           
                        </>
                    )
                })}
           
    <div className="formParent">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          placeholder="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="lastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="city"
          onChange={(e) => setCity(e.target.value)}
        />
         <input
          type="text"
          value={address}
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>

                          
            </>
        )

    }
    //
    const ShowModal=()=>{
        return(
            <> 
               <div className='show-modal-parents'>
                <div className='show-modal-firstName show-modal-child'>  {showModalUser.firstName}</div>
                <div className='show-modal-lastName show-modal-child'>  {showModalUser.lastName}</div>
                <div className='show-modal-city show-modal-child'>  {showModalUser.city}</div>
                <div className='show-modal-address show-modal-child'>  {showModalUser.address}</div>
                <button className='show-modal-button'  onClick={()=>setShowModal(false)} >Close</button>
                <button className='show-modal-button'  onClick={()=>setShowModal(false)} >Edit</button>
             
               
               </div>
            </>
        )
    
    }
 
    return (
        <div>
            <div >
                <div >
                    <div>
                        <h1 >بهپردازان نوین</h1>
                    </div>
                    <div className="parent">
                    {showModal ? <ShowModal/> : <ShowProducts/>} 
                    {/* {editModal? <Edit/>:<EditModal/>} */}


                    </div>
                </div>
            </div>
        </div>
    )
      }