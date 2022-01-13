import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FormData from 'form-data'
import axios from 'axios'

export default function Home() {
  const formdata=new FormData( )
  return (
    <div className={styles.container}>
      <form onSubmit={(e)=>{
          e.preventDefault()
          axios.post("api/users",formdata)
          .then(res=>console.log(res))

        }} >
        <input type="file" name="file" onChange={(e)=>{formdata.append("file",e.target.files[0])
      console.log(e.target.files[0])}} />
        <button type='submit'  >submit</button>



      </form>



      
    </div>
  )
}
