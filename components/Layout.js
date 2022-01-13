import Nav from "./Nav"
import style from "../styles/Home.module.css"

const Layout = ({children}) => {
    return (
        <div className={style.conatiner} >
            <Nav/>
            {children}
            
        </div>
    )
}

export default Layout
