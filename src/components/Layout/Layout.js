import React from 'react';
import classes from "./Layout.css";

const layout = (props) => (
    <>
    <div>Toolbar, sideDrawer, Backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </>
);

export default layout;
