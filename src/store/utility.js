export const updatedObject = (oldState, updatedProperties) => {
    return {
        ...oldState,
        ...updatedProperties
    }
}
