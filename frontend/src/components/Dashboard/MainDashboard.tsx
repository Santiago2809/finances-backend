import { useUiStore } from "../../store/store"


function MainDashboard() {

    const showMenu = useUiStore(state => state.showMenu)

    return (
        <section>
            <h1>Contenido principal</h1>
            <button onClick={showMenu}>Show menu</button>
        </section>
    )
}

export default MainDashboard