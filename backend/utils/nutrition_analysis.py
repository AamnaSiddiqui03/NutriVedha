import pandas as pd
from models.gmm import load_gmm_model
from scipy.stats import boxcox
import numpy as np

# Cluster names mapping
cluster_names = {
    0: "Grain-Based Staples",
    1: "Savory Soups and Stews",
    2: "Savory Snacks and Meats",
    3: "Vegetable-Based Soups and Sides",
    4: "Sweet Chocolate Treats",
    5: "Savory Chips and Crackers",
    6: "Smoothies and Yogurts",
    7: "Protein-Packed Meats and Fish",
    8: "Specialty Grains and Gluten-Free Items",
    9: "Nuts and Seeds",
    10: "Dressings and Dips",
    11: "Sweet Cookies and Snacks",
    12: "Protein Powders and Jerky",
    13: "Sweet Drinks and Syrups",
    14: "Fruits and Jams",
    15: "Cooking Oils and Spreads",
    16: "Frozen Desserts and Treats",
    17: "Sauces and Condiments",
    18: "Smoked Meats and Cottage Cheese",
    19: "Creamy Dressings and Sides",
    20: "Cheeses and Dairy Products",
    21: "Beverages and Drinks",
    22: "Breads and Sandwiches",
    23: "Seasonings and Cooking Essentials",
    24: "Sweet Candies and Snacks",
}

# Box-Cox transformation constants
constants = {
    "carbohydrates_100g": {"const": 0.5, "lam": 0.9},
    "fat_100g": {"const": 0.5, "lam": 0.05},
    "proteins_100g": {"const": 0.5, "lam": 0.1},
    "sugars_100g": {"const": 0.5, "lam": 0.03},
    "other_carbs": {"const": 0.5, "lam": 0.3},
    "salt_100g": {"const": 0.5, "lam": 0.005},
    "energy_100g": {"const": 10, "lam": 0.7},
    "reconstructed_energy": {"const": 10, "lam": 0.7},
    "g_sum": {"const": 0.5, "lam": 1.2},
}

# Load your Gaussian Mixture Model
# Replace this with actual model loading logic
# e.g., import joblib and load a saved model
model = load_gmm_model()  # Update with actual model object


def custom_boxcox_transform(series, lam, c):
    shifted_values = series + c
    transformed_values = boxcox(shifted_values, lam)
    return transformed_values, shifted_values


def analyze_nutrition(nutritional_dict):
    if model is None:
        raise ValueError("Model is not loaded. Please load the model before calling this function.")

    # Convert the input dict to a DataFrame
    new_product = pd.DataFrame([nutritional_dict])

    # Calculate additional columns
    new_product["g_sum"] = (
        new_product["fat_100g"]
        + new_product["carbohydrates_100g"]
        + new_product["proteins_100g"]
        + new_product["salt_100g"]
    )
    new_product["other_carbs"] = new_product["carbohydrates_100g"] - new_product["sugars_100g"]
    new_product["reconstructed_energy"] = (
        new_product["fat_100g"] * 37
        + (new_product["proteins_100g"] + new_product["carbohydrates_100g"]) * 17
    )

    # Apply Box-Cox transformations
    for feature, params in constants.items():
        if feature in new_product.columns:
            try:
                transformed_col = f"transformed_{feature}"
                boxcox_col = f"boxcox_{feature}"
                transformed_values, shifted_values = custom_boxcox_transform(
                    new_product[feature], lam=params["lam"], c=params["const"]
                )
                new_product[transformed_col] = transformed_values
                new_product[boxcox_col] = shifted_values
            except Exception as e:
                print(f"Transformation failed for {feature}: {e}")
                new_product[f"transformed_{feature}"] = new_product[feature]  # Fallback

    # Extract features for prediction
    features = [
        "transformed_carbohydrates_100g",
        "transformed_fat_100g",
        "transformed_proteins_100g",
        "transformed_sugars_100g",
        "transformed_salt_100g",
        "transformed_other_carbs",
        "transformed_energy_100g",
        "transformed_reconstructed_energy",
        "transformed_g_sum",
    ]

    X_new = new_product[features].values

    # Predict cluster and probabilities
    predicted_cluster = model.predict(X_new)[0]
    cluster_probas = model.predict_proba(X_new)[0]

    # Get alternative cluster (second-highest probability)
    alternative_cluster = np.argsort(cluster_probas)[-2]

    # Update the product DataFrame with prediction-related fields
    new_product["cluster"] = predicted_cluster
    new_product["category"] = cluster_names.get(predicted_cluster, "Uncategorized")
    new_product["certainty"] = cluster_probas[predicted_cluster]  # Probability of the predicted cluster
    new_product["alternative_cluster"] = alternative_cluster
    new_product["alternative_category"] = cluster_names.get(alternative_cluster, "Uncategorized")
    new_product["anomaly"] = 1 - cluster_probas[predicted_cluster]  # Inverse of certainty

    # Convert the DataFrame to a dictionary with all required columns
    result_dict = {
        k: v
        for k, v in new_product.iloc[0].to_dict().items()
        if not k.startswith("boxcox_")
    }

    return result_dict
