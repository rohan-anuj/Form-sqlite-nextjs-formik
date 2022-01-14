import Layout from '../components/Layout'
import '../styles/globals.css'
import {PopupProvider} from "react-custom-popup";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <PopupProvider>
        <Component {...pageProps} />
        </PopupProvider>
    </Layout>
  )
}

export default MyApp
