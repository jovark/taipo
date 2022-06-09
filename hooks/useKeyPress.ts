import { useEffect, useState } from 'react';

const useKeyPress = (callback: any) => {
    const [keyPressed, setKeyPressed] = useState(null);

    useEffect(() => {
        const downHandler = (e: KeyboardEvent) => {
            if (keyPressed !== e.key && e.key.length === 1) {
                setKeyPressed(e.key);
                callback && callback(e.key);
            } else if (e.key === 'Backspace' || e.key === 'Tab') {
                e.preventDefault();
                setKeyPressed(e.key);
                callback && callback(e.key);
            }
        };

        const upHandler = () => {
            setKeyPressed(null);
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
};

export default useKeyPress;
