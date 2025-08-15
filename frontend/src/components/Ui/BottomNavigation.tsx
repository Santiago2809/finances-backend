
const BottomNavigation = () => {
    return (
        <section className="absolute bottom-0 w-screen bg-white">
            <ul className="text-black flex justify-around items-center py-5 rounded-t-3xl">
                <li>Transactions</li>
                <li>Home</li>
                <li>Presupuestos</li>
            </ul>
        </section>
    );
}

export default BottomNavigation;
