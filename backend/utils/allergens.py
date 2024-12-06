def extract_allergens_and_non_veg(ingredients_text):
    """
    Extract allergens and non-vegetarian content from the product ingredients text.
    
    Args:
    - ingredients_text: Ingredients list from the product.

    Returns:
    - Dictionary of allergens and non-vegetarian information.
    """
    allergens = {
        "contains_peanuts": "peanut" in ingredients_text.lower(),
        "gluten_free": "gluten" not in ingredients_text.lower(),
        "contains_dairy": any(x in ingredients_text.lower() for x in [
            "milk", "lactose", "cheese", "butter", "cream", "yogurt", "ghee", "curd", "whey"
        ]),
        "safe_for_pregnancy": not any(x in ingredients_text.lower() for x in [
            "unpasteurized", "deli meats", "raw fish", "soft cheese", "brie", 
            "camembert", "blue cheese", "raw eggs", "sushi", "smoked seafood", 
            "pâté", "cured meats"
        ]),
        "contains_eggs": "egg" in ingredients_text.lower(),
        "contains_tree_nuts": any(x in ingredients_text.lower() for x in [
            "almond", "cashew", "walnut", "hazelnut"
        ]),
        "safe_for_sugar_patients": not any(x in ingredients_text.lower() for x in [
            "sugar", "honey", "syrup", "glucose"
        ]),
        "non_veg": any(x in ingredients_text.lower() for x in [
            "chicken", "fish", "meat", "beef", "pork", "lamb", "shrimp", "crab", "lobster", 
            "turkey", "bacon", "mutton", "pig"
        ]),
    }

    return allergens
