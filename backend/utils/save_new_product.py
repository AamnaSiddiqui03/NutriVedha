import pandas as pd

def save_new_product(new_product):
    # Path to the existing CSV file
    file_path = 'dataset/nutrition_table.csv'

    # Given column structure (you may adjust if necessary)
    columns = [
        'id', 'energy_100g', 'fat_100g', 'carbohydrates_100g', 'sugars_100g',
        'proteins_100g', 'salt_100g', 'g_sum', 'other_carbs',
        'reconstructed_energy',
        'transformed_carbohydrates_100g',
        'transformed_fat_100g',
        'transformed_proteins_100g',
        'transformed_sugars_100g',
        'transformed_other_carbs',  'transformed_salt_100g',
        'transformed_energy_100g',
        'transformed_reconstructed_energy',
        'transformed_g_sum', 'cluster', 'category',
        'certainty', 'alternative_cluster', 'alternative_category', 'anomaly',
        'product', 'ingredients_text', 'nutriscore',
        'nutri_score_category', 'contains_peanuts', 'gluten_free',
        'contains_dairy', 'safe_for_pregnancy', 'contains_eggs',
        'contains_tree_nuts', 'safe_for_sugar_patients', 'non_veg'
    ]

    # Add missing keys with default values as None
    for col in columns:
        if col not in new_product:
            new_product[col] = None

    # Create DataFrame for the new product
    new_product_df = pd.DataFrame([new_product], columns=columns)

    # Add an incremental ID (assuming the existing CSV already has data)
    # If the file exists, get the last 'id' and increment by 1
    try:
        existing_df = pd.read_csv(file_path)
        new_product_df['id'] = existing_df['id'].max() + 1
    except FileNotFoundError:
        # If the file doesn't exist, start with 'id' = 1
        new_product_df['id'] = 1

    # Append the new product to the existing CSV
    new_product_df.to_csv(file_path, mode='a', header=not pd.io.common.file_exists(file_path), index=False)

    print("New product saved to nutrition_table.csv")