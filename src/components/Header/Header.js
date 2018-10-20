import React from 'react';
import PropTypes from 'prop-types';

const Header = ({title, cssClasses}) => {
    const classNames = `Header row ${cssClasses}`;

    return (
        <div className={classNames}>
            <div className="col-12">
                <h1 className="text-center">{title}</h1>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string
};

export default Header;
