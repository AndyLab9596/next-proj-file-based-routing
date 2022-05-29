import React, { Fragment, ReactNode } from 'react';
import MainHeader from './main-header';

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <Fragment>
            <MainHeader />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout