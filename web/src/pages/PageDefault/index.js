import React from 'react';

import Menu from '../../component/Menu';
import Appbar from '../../component/Appbar';

import './styles.css';

function PageDefault({ children }) {
    return(
        <>
            <Appbar>

            <div className="container">
                {children}
            </div>
            </Appbar>
        </>
    );
}

export default PageDefault;