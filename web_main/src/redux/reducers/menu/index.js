// ** Initial State
const initialState = {
    menu: [],
    menuSelected: {},
    itemSelected: {},
    breadCrumb: [],
    selectedDetail: {},
    image: []
}
const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MENU':
            return { ...state, menu: action.menu }
        case 'GET_SIDEBAR':
            return { ...state, menuSelected: action.menuSelected }
        case 'UPDATE_SELECTMENU':
            return { ...state, menuSelected: action.selectedItem, selectedDetail: action.selectedDetail, breadCrumb: action.breadCrumbArr, image: action.image }
        case 'UPDATE_RESEARCH':
            return { ...state, menuSelected: action.menuSelected }
        case 'UPDATE_PATENT':
            return { ...state, menuSelected: action.menuSelected }
        case 'UPDATE_BREADCRUMBNEWS':
            return { ...state, breadCrumb: action.breadCrumbArr }
        case 'UPDATE_CATEGORYNEWS':
            return { ...state, menuSelected: action.categoryArr, selectedDetail: action.selectedDetail }
        case 'UPDATE_SELECTEDETAIL':
            return { ...state, selectedDetail: action.selectedDetail }
        default:
            return state
    }
}

export default menuReducer