import produce from 'immer'

const userDetailsReducer = produce((draft, action) => {
    if (action.type === 'SET_NAME') {
            draft.fullName = action.name
    }
    if (action.type === 'SET_EMAIL') {
            draft.email = action.email
    }
    if (action.type === 'SET_PHONE') {
            draft.phone = action.phone        
    }
    if (action.type === 'SET_CITY') {
            draft.city = action.city 
    }
    if (action.type === 'SET_GENDER') {
            draft.gender = action.gender
    }
    if (action.type === 'SET_COLLEGE') {
            draft.college = action.college 
    }
    if (action.type === 'SET_USERNAME') {
            draft.username = action.username   
    }
    if (action.type === 'SET_PASSWORD') {
           draft.password = action.password 
    }
    if (action.type === 'SET_INSTAGRAM') {
            draft.instagram = action.instagram
    }
    if (action.type === 'SET_FACEBOOK') {
            draft.facebook = action.facebook
    }
    if (action.type === 'SET_YOUTUBE') {
            draft.youtube = action.youtube
    }
    if (action.type === 'SET_CATEGORIES') {
            draft.categories = action.categories             
    }
    if (action.type === 'SET_AUTH') {
            draft.authDone = action.authDone         
    }
}, {
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
    instagram: null,
    facebook: null,
    youtube: null,
})

export default userDetailsReducer