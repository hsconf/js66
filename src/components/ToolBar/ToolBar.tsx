import {NavLink} from "react-router-dom";

const ToolBar = () => {
    return (
        <nav className="navbar bg-body-tertiary border-bottom border-2">
            <div className="container">
                <NavLink to="/" className="navbar-brand fw-bold">Calorie tracker</NavLink>
            </div>
        </nav>
    );
};

export default ToolBar;