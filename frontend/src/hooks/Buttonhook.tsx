import { useState, useCallback } from 'react';

// Define a type for the action parameter
type AsyncAction = () => Promise<void>;

/**
 * Custom hook for managing button click actions with loading state.
 * @returns An object containing the loading state and the handleClick function.
 */
const useButtonHook = () => {
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles button click events by executing an async action and managing the loading state.
     * @param action The async action to execute.
     */
    const handleClick = useCallback(async (action: AsyncAction) => {
        setIsLoading(true);
        try {
            await action();
        } catch (error) {
            // Log the error or handle it as needed
            console.error('An error occurred:', error);
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
