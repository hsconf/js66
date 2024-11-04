import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Home from "./containers/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import NewMeal from "./containers/NewMeal/NewMeal.tsx";

const App = () => {
    document.body.style.backgroundColor = '#BED6C5';

    return (
        <>
            <header>
                <ToolBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="meals/new" element={<NewMeal />} />
                    <Route path="meals/:id/edit" element={<NewMeal />} />
                </Routes>
            </main>
        </>
    );
};

export default App;