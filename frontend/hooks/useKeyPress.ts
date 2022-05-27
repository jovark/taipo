import { useEffect, useState } from 'react';

const useKeyPress = (callback: any) => {
    const [keyPressed, setKeyPressed] = useState(null);

    useEffect(() => {
        const downHandler = ({ key }: any) => {
            if (keyPressed !== key && key.length === 1) {
                setKeyPressed(key);
                callback && callback(key);
            } else if (key === 'Backspace') {

                setKeyPressed(key);
                callback && callback(key);
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
