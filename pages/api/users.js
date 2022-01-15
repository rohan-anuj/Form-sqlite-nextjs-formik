import nextConnect from 'next-connect';
import multer from 'multer';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';


//setting Storage destination & filename
const upload = multer({
  storage: multer.diskStorage({
    destination: './tmp/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

//initializing route 
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Post method of route to store data


apiRoute.post(upload.single('file'),async(req, res) => {
  console.log(req.file)

  const db=await open({filename:"userdatabase.sqlite",driver:sqlite3.Database})
  const inserted=await db.run("insert into users (email,password,file) values (?,?,?)",req.body.email,req.body.password,req.file.path)
  if(inserted){
  res.json({message:"user added successfully !"})
  }
  else{
    res.status(401).json({message:"user not added!"})
  }

});

//getting data from route


apiRoute.get(async(req,res)=>{
  const db=await open({filename:"userdatabase.sqlite",driver:sqlite3.Database})
  const data=await db.all("select * from users")
  res.json(data)
  
})

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};