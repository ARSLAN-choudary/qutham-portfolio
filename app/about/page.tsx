import AboutHeader from "../components/AboutHeader/AboutHeader"
import AboutHeroSection from "../components/AboutHeroSection/AboutHeroSection"
import ServiceSectionAbout from "../components/ServiceSectionAbout/ServiceSectionAbout"
import "./about.css"

function page() {
    return (
        <>

            <main className='style_gullyos__header__section__ePK8d'>
                <div className="style_gullyos__header__container__43gTf">
                    <AboutHeader />
                    <AboutHeroSection />
                </div>
            </main>
            <ServiceSectionAbout/>

        </>
    )
}

export default page