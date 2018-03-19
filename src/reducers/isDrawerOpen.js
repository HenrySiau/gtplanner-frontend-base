const isDrawerOpen = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return !state
        default:
            return false
    }
}

export default isDrawerOpen