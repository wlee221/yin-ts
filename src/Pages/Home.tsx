import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC<{}> = () => {
    return (
        <div>
            <Link to='/upload'>
                Try it out.
            </Link>
        </div>
    );
};
