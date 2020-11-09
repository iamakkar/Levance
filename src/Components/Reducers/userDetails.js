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
    categories: [],
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
    if (action.type === 'SET_COLLEGE') {
        return {
            ...state,
            college: action.college
        }
    }
    if (action.type === 'SET_USERNAME') {
        return {
            ...state,
            username: action.username
        }
    }
    if (action.type === 'SET_PASSWORD') {
        return {
            ...state,
            password: action.password
        }
    }
    if (action.type === 'SET_INSTAGRAM') {
        return {
            ...state,
            instagram: action.instagram
        }
    }
    if (action.type === 'SET_FACEBOOK') {
        return {
            ...state,
            facebook: action.facebook
        }
    }
    if (action.type === 'SET_YOUTUBE') {
        return {
            ...state,
            youtube: action.youtube
        }
    }
    if (action.type === 'SET_CATEGORIES') {
        return {
            ...state,
            categories: action.categories,
            
        }
    }
    if (action.type === 'SET_AUTH') {
        return {
            ...state,
            authDone: action.authDone,
            
        }
    }
    return state
}

export default userDetailsReducer;