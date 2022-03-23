//here we will include all validation methods of different Components used in React Application.
// const Validation = (values) => {

//     const validName = new RegExp('^[a-zA-Z0-9_]{5,20}$')
//     const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
//     const validNumber = new RegExp('[789][0-9]{9}');
//     const validPass = new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$');
//     const validFile = new RegExp('(.jpg|.jpeg|.png|.png|.gif)$');
    

//     let errors={};
 
//     if(!values.name){
//         errors.name="name cannot be empty field"
//     }else if(!validName.test(values.name)){
//         errors.name="Invalid Username"
//     }

//     if(!values.email){
//         errors.email="email cannot be empty field"
//     }else if(!validEmail.test(values.email)){
//         errors.email="Invalid Email"
//     }

//     if(!values.number){
//         errors.number="number cannot be empty field"
//     }else if(!validNumber.test(values.number) || values.number.length>10){
//         errors.number="Invalid number"
//     }

//     if(!values.password){
//         errors.password="Password cannot be empty field"
//     }else if(!validPass.test(values.password)){
//         errors.password="password should contain atleast one number and one special character"
//     }

//     if(!values.age){
//         errors.age="Age cannot be empty field"
//     }else if(values.age<=0){
//         errors.age="Invalid Age"
//     }

//     if(!validFile.test(values.File)){
//         errors.File='Please upload File having extensions .pdf/.jpeg/.jpg/.png/.gif only.'
//     }else if(validFile.test(values.File)){
//         let Fs=values.File;
//         console.log(Fs.size);
//         console.log(Fs);
//         if(Fs>200000){
//             errors.File="Too large"
//         }
//    }


//     if(values.sdate > values.edate){
//         errors.sdate="Start Date should be less than End Date"
//     }


//  return errors; 
//     let errors={};

//     if(!values.name){
//         errors.name="name cannot be empty field"
//     }else if(!validName.test(values.name)){
//         errors.name="Invalid Username"
//     }

//     if(!values.email){
//         errors.email="email cannot be empty field"
//     }else if(!validEmail.test(values.email)){
//         errors.email="Invalid Email"
//     }

//     if(!values.number){
//         errors.number="number cannot be empty field"
//     }else if(!validNumber.test(values.number) || values.number.length>10){
//         errors.number="Invalid number"
//     }

//     if(!values.password){
//         errors.password="Password cannot be empty field"
//     }else if(!validPass.test(values.password)){
//         errors.password="password should contain atleast one number and one special character"
//     }

//     if(!values.age){
//         errors.age="Age cannot be empty field"
//     }else if(values.age<=0){
//         errors.age="Invalid Age"
//     }

//     if(!validFile.test(values.File)){
//         errors.File='Please upload File having extensions .pdf/.jpeg/.jpg/.png/.gif only.'
//     }else if(validFile.test(values.File)){
//         let Fs=values.File;
//         console.log(Fs.size);
//         console.log(Fs);
//         if(Fs>200000){
//             errors.File="Too large"
//         }
//    }


//     if(values.sdate > values.edate){
//         errors.sdate="Start Date should be less than End Date"
//     }


//  return errors; 
    
// }
 
//  export default Validation


//This is how you can use this validation in different components

//  import React,{useState} from 'react'
// import Validation from './Validation';


// const From2 = () => {

//     const [values, setvalues] = useState({
//         name:"",
//         email:"",
//         number:"",
//         password:"",
//         age:"",
//         sdate:"",
//         edate:"", 
//         File:"",
//     })

//     const [errors, seterrors] = useState({});

//     let name,value;

//     const handleChange=(event)=>{
//         name= event.target.name;
//         value= event.target.value;
//         setvalues({...values,[name]:value});
//     }

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         seterrors(Validation(values))
        
//     }
//     return (
//         <div>
//             <form action="" onSubmit={handleSubmit}>
//                 name:
//                 <input type="text" name="name" value={values.name} onChange={handleChange}/>
//                 {errors.name && <p>{errors.name}</p>} 
//                 <br/> <br/>

//                 email:
//                 <input type="text" name="email" value={values.email} onChange={handleChange}/>
//                  {errors.email && <p>{errors.email}</p>} 
//                  <br/> <br/>

//                 number:
//                 <input type="number" name="number" value={values.number} onChange={handleChange}/>
//                  {errors.number && <p>{errors.number}</p>} 
//                  <br/> <br/>

//                  password:
//                 <input type="password" name="password" value={values.password} onChange={handleChange}/>
//                  {errors.password && <p>{errors.password}</p>} 
//                  <br/> <br/>

//                 Age:
//                 <input type="number" name="age" value={values.age} onChange={handleChange}/>
//                  {errors.age && <p>{errors.age}</p>} 
//                  <br/> <br/>

//                  File:
//                 <input type="file" name="File" value={values.File} onChange={handleChange}/>
//                  {errors.File && <p>{errors.File}</p>} 
//                  <br/> <br/>

//                  Start Date:
//                 <input type="date" name="sdate" value={values.sdate} onChange={handleChange}/>

//                  End Date:
//                 <input type="date" name="edate" value={values.edate} onChange={handleChange}/>
//                  {errors.sdate && <p>{errors.sdate}</p>} 
//                  <br/> <br/>
                 

//                 <input type="submit" value="submit"/>
//             </form>
            
//         </div>
        
//     )
// }

// export default From2

 