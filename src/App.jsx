// app.jsx
// sert de mise en page commune à toutes les pages. 
// Il affiche le Header et le Footer, et réserve une zone centrale via <Outlet> où s'afficheront les pages enfants 

import { Outlet } from "react-router"
import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"
import ButtonShowcase from "./components/ui/ButtonShowcase"


function App() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
                {/* <ButtonShowcase /> */}
            </main>
            <Footer />
        </>
    )
}

export default App
