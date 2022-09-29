import React from 'react';
import { Message } from "../../common";

export const renderErrorMessage = (hasError, errorMessage) => {
    
    if(!hasError) {
        return;
    }

    return (
        <Message theme="error">
            {errorMessage}
        </Message>
    )
}