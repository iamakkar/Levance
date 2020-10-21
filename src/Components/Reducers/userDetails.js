var initState = {
    authDone: false,
    fullName: '',
    email: '',
    phone: '',
    city: '',
    gender: '',
    college: false,
    username: '',
    password: '',
    instagram: '',
    facebook: '',
    youtube: '',
}

const userDetailsReducer = (state = initState, action) => {
    if (action.type === 'SET_NAME') {
        return {
            ...state,
            fullName: action.name
        }
    }
    if (action.type === 'SET_EMAIL') {
        return {
            ...state,
            email: action.email
        }
    }
    if (action.type === 'SET_PHONE') {
        return {
            ...state,
            phone: action.phone
        }
    }
    if (action.type === 'SET_CITY') {
        return {
            ...state,
            city: action.city
        }
    }
    if (action.type === 'SET_GENDER') {
        return {
            ...state,
            gender: action.gender
        }
    }
    return state
}

export default userDetailsReducer;