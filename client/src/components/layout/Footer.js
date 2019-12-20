import React from 'react';

export default () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center" style={{
            position: "relative",
            top: "-5vh"
        }}>
            Copyright &copy; {new Date().getFullYear()} PehChaan
    </footer>
    );
};
