import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.css";

const sideDrawer = (props) => {
    <div className={classes.SideDrawer}>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </div>
}

export default sideDrawer;