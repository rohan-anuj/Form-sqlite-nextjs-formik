const sqlite=require("sqlite")
const sqlite3=require("sqlite3")



async function setup(){
    const db=await sqlite.open({filename:"userdatabase.sqlite",driver:sqlite3.Database})
    if(db){
        db.migrate({migrationsPath:"./pages/migrations",force:"last"})
    }
    else{
        console.log("something went wrong")
    }

}
setup()
