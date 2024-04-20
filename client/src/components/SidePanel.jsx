import { NavLink } from "react-router-dom";

const SidePanel = () => {
    return (
        <>
            <div className="outer-panel">
                <div className="inner-panel">
                    <NavLink id="panel-navigator" to="/review">Review</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/revoke">Revoke</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/commit">Commit</NavLink><br></br>
                </div>
            </div>
        </>
    );
}
export default SidePanel;
