from flask import Flask, request, jsonify
from flask_cors import CORS  # Added for handling CORS
import os
from genai.extract_text_from_image import extract_text_from_image
from utils.nutriscore import get_nutriscore_category, calculate_nutriscore
from utils.nutrition_analysis import analyze_nutrition
from utils.recommender import recommend_products, sort_by_nutriscore
from utils.save_new_product import save_new_product
from utils.allergens import extract_allergens_and_non_veg
import pandas as pd

# Load nutrition table from CSV file
nutrition_table = pd.read_csv('dataset/nutrition_table.csv')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Directory to save uploaded images temporarily
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_images():
    # Check if both image1 and image2 are present in the request
    if 'image1' not in request.files or 'image2' not in request.files:
        return jsonify({'error': 'Both images are required'}), 400

    image1 = request.files['image1']
    image2 = request.files['image2']

    if image1.filename == '' or image2.filename == '':
        return jsonify({"error": "Files must have filenames"}), 400

    # Save images
    image1_path = os.path.join(app.config['UPLOAD_FOLDER'], 'nutritionTable_' + image1.filename)
    image2_path = os.path.join(app.config['UPLOAD_FOLDER'], 'ingredients_' + image2.filename)
    image1.save(image1_path)
    image2.save(image2_path)

    try:
        # Extract data from the images using GenAI (pass both images at once)
        nutritional_dict = extract_text_from_image(image1_path, image2_path)
        nutriscore = calculate_nutriscore(nutritional_dict)
        nutri_score_category = get_nutriscore_category(nutriscore)

        nutritional_dict['nutriscore'] = nutriscore
        nutritional_dict['nutri_score_category'] = nutri_score_category
        print("Extracted Nutritional Data:", nutritional_dict)

        # Call the function to get final nutritional_dict
        new_product = analyze_nutrition(nutritional_dict)
        allergens = extract_allergens_and_non_veg(nutritional_dict["ingredients_text"])
        for key, value in allergens.items():
            new_product[key] = value
        
        # Print result
        print("Final New Product Data:", new_product)

        # Save new product
        save_new_product(new_product)

        new_product_ingredients = new_product['ingredients_text']
        new_product_nutriscore = new_product['nutriscore']
        new_product_type = new_product['category']

        # Get product recommendations
        recommendations = recommend_products(nutrition_table, new_product_ingredients, new_product_nutriscore, new_product_type)
        sorted_recommendations = sort_by_nutriscore(recommendations)
        print("Sorted Recommendations:", sorted_recommendations)

        # Convert recommendations to JSON-compatible format
        recommendations_json = sorted_recommendations.to_dict(orient='records')

        # Prepare the response
        response = {
            "new_product": new_product,
            "sorted_recommendations": recommendations_json
        }

        return jsonify(response)

    except Exception as e:
        # Return a JSON response with an error message if an exception occurs
        return jsonify({"error": str(e)}), 500

    finally:
        # Clean up temporary files after extraction
        os.remove(image1_path)
        os.remove(image2_path)

if __name__ == '__main__':
    app.run(debug=True)
