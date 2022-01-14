import styles from '../styles/Home.module.css'
import FormData from 'form-data'
import axios from 'axios'
import { Formik } from 'formik'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import {usePopup, DialogType} from "react-custom-popup";
export default function Home() {
  const Input = styled('input')({
    visibility: 'hidden',
  });
  const {showAlert} = usePopup();
  
  const formdata=new FormData( )
  return (
    <div className={styles.container}>
      <Formik  initialValues={{email:"",password:"",file:"" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if(!values.password){
            errors.password='Required'
          }else if(values.password.length < 6){
            errors.password="Minimum length 6";
          }
          return errors;
        }}
        onSubmit={async(values, { setSubmitting }) => {
          formdata.append("email",values.email)
          formdata.append("password",values.password)
          
          console.log(formdata.get("email"))
          

         const res= await axios.post("api/users",formdata,{headers:{
            "Content-Type":"multipart/form-data"
          }})
          const data=await res
          if(data.data){
            showAlert({
              title: "Success",
              type: DialogType.SUCCESS,
              text: "USER ADDED SUCCESSFULLY"
          });
  
          }
          else{
            showAlert({
              title: "Error",
              type: DialogType.WARNING,
              text: "Something Went Wrong !"
          });
  
          }

          
      

        
        }}
      
      
      
      >
        {({handleChange,setFieldValue,values,handleSubmit,handleBlur,errors,touched,isSubmitting,})=><form onSubmit={handleSubmit}  method="post" encType="multipart/form-data" className="form" >
        <TextField  type="email" label="Email" name="email"  variant="outlined" value={values.email} className="text" onBlur={handleBlur} onChange={handleChange} />
        {errors.email && touched.email && errors.email}
        
        <TextField  type="password" label="password" name="password"  variant="outlined"  className="text" onBlur={handleBlur} onChange={handleChange} />
        {errors.password && touched.password && errors.password}
        
       
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>formdata.append("file",e.currentTarget.files[0])}  />
        <IconButton color="primary" aria-label="upload picture"  component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      
           <Button type="submit" disabled={isSubmitting}>
             Submit
           </Button>

      </form>}
      
      </Formik>



      
    </div>
  )
}
