import  { useState } from 'react'
import Header from './Header'
import Hero from '../Components/Hero'
import Cards from '../Components/Cards'
import Loder from '../Components/Loder'

const Home = () => {
    const [iloder, setiloder] = useState(true)

    setTimeout(() => {
        setiloder(false)
    }, 2000);

    if (iloder) {
        return(

            <Loder />
        )
    }
    else {

        return (
            <>
                <Header />
                <Hero />
                <Cards />
            </>

        )
    }

}

export default Home