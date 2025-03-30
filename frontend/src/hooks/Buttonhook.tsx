
import { useState, useCallback } from 'react';

const useButtonHook = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async (action: () => Promise<void>) => {
        setIsLoading(true);
        try {
            await action();
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        handleClick,
    };
};

export default useButtonHook;
