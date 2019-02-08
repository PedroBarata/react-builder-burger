import React from 'react';

const layout = (props) => (
    <>
    <div>Toolbar, sideDrawer, Backdrop</div>
    <main>
        {props.children}
    </main>
    </>
);

export default layout;
