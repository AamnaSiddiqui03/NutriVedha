# utils/recommender.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_products(nutrition_table, new_product_ingredients, new_product_nutriscore, new_product_type):
    # Convert NutriScore to numeric values for comparison
    nutriscore_map = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5}
    nutrition_table['nutriscore_value'] = nutrition_table['nutri_score_category'].map(nutriscore_map)
    new_product_nutriscore_value = nutriscore_map.get(new_product_nutriscore, 5)  # Default to 5 if not found

    # Filter products with NutriScore equal to or better (lower) than the new product's NutriScore
    filtered_df = nutrition_table[nutrition_table['nutriscore_value'] < new_product_nutriscore_value].copy()

    # Combine product type, category, and ingredients_text for vectorization
    filtered_df['combined_features'] = (filtered_df['ingredients_text'] + " " + 
                                         filtered_df['category'] + " " + filtered_df['product_name'])

    # Handle NaN values by filling with empty strings
    filtered_df['combined_features'] = filtered_df['combined_features'].fillna('')

    # Vectorize combined features
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(filtered_df['combined_features'])

    # Compute similarity with the new product's combined features
    new_product_combined = new_product_ingredients + " " + new_product_type
    new_product_tfidf = tfidf_vectorizer.transform([new_product_combined])
    filtered_df['similarity'] = cosine_similarity(new_product_tfidf, tfidf_matrix).flatten()

    # Sort and return recommendations
    recommendations = filtered_df.sort_values(by='similarity', ascending=False).head(7)
    return recommendations[['id', 'product_name', 'category', 'nutri_score_category', 'similarity']]

# Function to sort the recommendations with 'A' NutriScore first, and then by similarity
def sort_by_nutriscore(recommendations_df):
    # Sort by NutriScore so that 'A' comes first, keeping other sorting intact
    nutriscore_order = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5}
    recommendations_df['nutriscore_value'] = recommendations_df['nutri_score_category'].map(nutriscore_order)
    
    # Sort primarily by nutriscore_value (ascending, so 'A' comes first) and then by similarity (descending)
    recommendations_df = recommendations_df.sort_values(by=['nutriscore_value', 'similarity'], ascending=[True, False])
    
    # Drop the 'nutriscore_value' column as it's no longer needed for display
    recommendations_df = recommendations_df.drop(columns=['nutriscore_value'])
    
    return recommendations_df[['id', 'product_name', 'category', 'nutri_score_category', 'similarity']]

# Example usage of the above functions
# Assuming you have a nutrition_table dataframe loaded and new_product details
# nutrition_table = pd.read_csv("nutrition_table.csv")  # Example CSV loading
# new_product_ingredients = "chocolate, sugar, milk"
# new_product_nutriscore = "B"
# new_product_type = "Sweet Cookies and Snacks"

# # Get the top recommendations from the main logic
# recommendations = recommend_products(nutrition_table, new_product_ingredients, new_product_nutriscore, new_product_type)

# # Now apply the sort_by_nutriscore function to reorder based on NutriScore
# sorted_recommendations = sort_by_nutriscore(recommendations)

# # Print the final sorted recommendations
# print(sorted_recommendations[['id', 'product_name', 'category', 'nutri_score_category', 'similarity']])
