import React from 'react';


  const Ninjas=(props)=> {
   
        const{ninjas,deleteNinja}=props;
       /* console.log(ninjas)
        const ninjaList=ninjas.map(ninja=>{
            return(
                <div className="ninja" key={ninja.id}>
                <div>Name:{ninja.name}</div>
                <div>Age:{ninja.age}</div>
                <div>Belt:{ninja.belt}</div>
                
                </div>
            )
        })
        */
      return (
        <div className="ninja-list">
            {
                ninjas.map(ninja=>{
            return ninja.age>20?(
                <div className="ninja" key={ninja.id}>
                <div>Name:{ninja.name}</div>
                <div>Age:{ninja.age}</div>
                <div>Belt:{ninja.belt}</div>
                <button onClick={()=>{deleteNinja(ninja.id)}}>Delete</button>
                </div>
            ):null;
            })
            }
        </div>
      );
      
    }


export default Ninjas;
