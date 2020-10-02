import React from 'react';

import Menu from '../../component/Menu';

import './styles.css';

function PageDefault({ children }) {
    return(
        <>
            <Menu />

            <div className="container">
                {children}
            </div>
            
        </>
    );
}

export default PageDefault;