const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                categoryError: null,
            };
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                 categoryError: null,
                categoryLoader: false,
            };
        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload || "An error occurred",
                 categoryLoader: false,
            };

        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader: true,
                categoryError: null,
                errorMessage: null,
            }
        default:
            return state;
    }

};