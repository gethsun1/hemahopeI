import Header from './header'
import Footer from './footer'
const About = ()=>{
 return (
    <>
     <Header/>
     <main>
     <div className="wrapper-box p-relative">
         <div className="breadcrumb-bg" data-background="assets/img/breadcrumb/breadcrumb-bg.png"></div>
         <div className="breadcrumb-area pt-265 pb-265">
            <div className="container">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="breadcrumb__content text-center">
                        <h1 className="breadcrumb__title">About me</h1>
                        <div className="breadcrumb__list">
                           <span><a href="index.html">Home</a></span>
                           <span className="dvdr"><i className="fa-solid fa-colon"></i></span>
                           <span className="underline">team details</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
  
 
      <section className="about-text-area pt-90 pb-130">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="about-me-personal-experience">
                     <h3 className="about-me-personal-title">
                        PERSONAL EXPERIENCE
                     </h3>
                     <p className="mb-30">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                        fugit,
                        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                        quisquam
                        est, qui dolorem ipsum quia dolor sit amet,</p>
                     <p>Must explain to you how all this mistaken idea of denouncing works pleasure and praising uts
                        pain
                        was born and I will gives you a itself completed account of the system, and sed expounds the ut
                        actual teachings of that greater sed explores truth. Denouncing works pleasures and praising
                        pains
                        was us born and I will gives you a completed ut workers accounts of the system. sit aspernatur
                        aut
                        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                     </p>
                  </div>
                  <div className="row">
                     <div className="col-lg-6 col-md-6">
                        <div className="about-me-skills">
                           <h3 className="about-me-skills-title">Skills</h3>
                           <p>Must explain to you how all praising uts pain was born and I will gives you a itself
                              completed account of the system, and sed expounds the ut actual teachings of that greater
                           </p>
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6">
                        <div className="about-me-awards">
                           <h3 className="about-me-awards-title">Awards</h3>
                           <p>Must explain to you how all praising uts pain was born and I will gives you a itself
                              completed account of the system, and sed expounds the ut actual teachings of that greater
                           </p>
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6">
                        <div className="about-me-education">
                           <h3 className="about-me-education-title">Education</h3>
                           <p>Must explain to you how all praising uts pain was born and I will gives you a itself
                              completed account of the system, and sed expounds the ut actual teachings of that greater
                           </p>
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6">
                        <div className="about-me-skills">
                           <h3 className="about-me-skills-title">Experience</h3>
                           <p>Must explain to you how all praising uts pain was born and I will gives you a itself
                              completed account of the system, and sed expounds the ut actual teachings of that greater
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center p-relative">
               <div className="col-lg-8">
                  <h3 className="about-me-send-message-title">Send me a message</h3>
               </div>
               <div className="col-lg-10">
                  <div className="about-me-send-message">
                     <div className="contact-form">
                        <form action="#">
                           <div className="row">
                              <div className="col-xl-6 col-lg-6">
                                 <div className="contact-input">
                                    <input type="text" placeholder="Enter your Name"/>
                                 </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                 <div className="contact-input">
                                    <input type="text" placeholder="Enter you mail"/>
                                 </div>
                              </div>
                              <div className="col-xl-12">
                                 <div className="contact-input">
                                    <textarea placeholder="Enter your message"></textarea>
                                 </div>
                                 <div className="about-me-btn text-center">
                                    <button className="tp-btn-black tp-btn-shine-effect">Send Message</button>
                                 </div>
                              </div>
                           </div>
                        </form>
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
export default About