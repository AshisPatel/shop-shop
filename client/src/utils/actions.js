// Define how parts of the state will be maintained and updated

// The end goal with UPDATE_PRODUCTS and UPDATE_CATEGORIES is to grab the informaion once from Apollo and then host it in the global state. 
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// The goal with UPDATE_CURRENT_CATEGORY is to be able to select a category from the state created by UPDATE_CATEGORIES action and then display products from the category from the list created in the UPDATE_PRODUCTS action
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";