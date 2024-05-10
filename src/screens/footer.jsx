const Footer = () => {
    return (
        <>
          <footer className="bg-black">
                <div className="footer-social-area pt-70">
                    <div className="container">
                        <div className="tpborder-bottom pb-35">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 ">
                                    <div className="tpfooter__logo mb-30">
                                        <a href="index.html">
                                            <img src="/assets/img/home hope transparent on white.png" style={{width:100}} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 ">
                                    <div className="tpfooter__social text-start text-md-end">
                                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                        <a href="#"><i className="fa-brands fa-behance"></i></a>
                                        <a href="#"><i className="fa-brands fa-youtube"></i></a>
                                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-widget-area">
                    <div className="container">
                        <div className="tpborder-bottom pt-35 pb-50 mb-20 mt-20">
                          
                        </div>
                    </div>
                </div>
                <div className="footer-copyright-area pb-50">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-8 col-lg-6 col-md-6">
                                <div className="tp-copyright">
                                    <p>Copyright@hemahope 2024 all right Reserved</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                <div className="d-flex justify-content-md-end backtop">
                                    <div className="tp-backtop">
                                        <button type="button" className="back-to-top-btn">
                                            <span>Scroll Top</span>
                                            <span><i className="fa-thin fa-arrow-up"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;