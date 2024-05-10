import Header from './header'
import Footer from './footer'
const Home = () => {
    return (
        <>
            <Header/>

            <main>

                <section className="hero-area hero-area-2" data-background="/assets/img/slider/home2/home2.jpg">
                    <div className="hero-slider hero-style-2">
                        <div className="hero-item hero-height p-relative">
                            <div className="tpslider__thumb"><img src="/assets/img/homeless14.jpeg" alt=""/></div>
                            <div className="hero-item-box">
                                <div className="hero-item-inner">
                                    <div className="container-fluid">
                                        <div className="row hero-plr-225">
                                            <div className="col-xl-12">
                                                <div className="tpslider__content" style={{marginBottom:300}}>
                                                    <span className="tphero__subtitle has-before-hero">Who what we</span>
                                                    <h2 className="tphero__title">Give a helping hand to <br/> those who need <span>...</span>
                                                    </h2>
                                                    {/* <div className="hero-btn">
                                                        <a className="tp-btn tp-btn-shine-effect" href="about-foundation.html">Connect Wallet</a>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                       
                        </div>
                </section>

               

            </main>


           <Footer/>
        </>
    )
}
export default Home;