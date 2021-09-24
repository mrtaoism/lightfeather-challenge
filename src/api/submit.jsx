// import React from 'react';
// import ReactDOM from 'react-dom';

// let idCount = 0;

// function handleSubmit(){
//     idCount++;
//     let svpInfo={
//       id:idCount,
//       firstName:this.refs.firstName.value,
//       lastName:this.refs.lastName.value,
//       email:this.refs.email.value,
//       phone:this.refs.phone.value,
//       supervisor:this.refs.supervisor.value
//     };
  
//     fetch("", {
//       method:'POST',
//       headers:{'Content-type': 'application/json'},
//       body:JSON.stringify(svpInfo)
//     }).then(r=>r.json()).then(res=>{
//       if(res){
//         console.log(this.refs.lastName.value, this.refs.firstName.value, this.refs.email.value, this.refs.phone.value,this.refs.supervisor );
//       }
//     })
//   }
 
// export default handleSubmit;