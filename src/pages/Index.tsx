import Footer from "../atoms/Footer";
import Header from "../atoms/Header";
import VirtualContestGenerator from "../templates/VirtualContestGenerator";

function Index() {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div style={{ paddingTop: "0.5em" }}>
                <VirtualContestGenerator/>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Index;
