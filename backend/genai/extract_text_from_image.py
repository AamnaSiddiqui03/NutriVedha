import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Extract text from both images (one for nutritional values, one for ingredients)
def extract_text_from_image(image1_path, image2_path):
    # Load both images
    image1 = Image.open(image1_path)
    image2 = Image.open(image2_path)

    # Generate the response to extract nutritional details from image1
    response_nutritional = genai.GenerativeModel("gemini-1.5-flash").generate_content(
        ["Extract the following nutritional details from the given content in the format of a Python list of floats, "
         "in the order provided: [energy_100g, fat_100g, carbohydrates_100g, sugars_100g, proteins_100g, salt_100g]. "
         "If a value does not exist, replace it with value 0. Do not return any text or explanations, only the list of float values.", image1]
    )

    # Extract the nutritional list from the response
    nutritional_values = response_nutritional.text.strip()
    nutritional_list = eval(nutritional_values)  # Convert string to list

    # Define the nutritional labels
    nutrient_labels = [
        "energy_100g", "fat_100g", "carbohydrates_100g", "sugars_100g",
        "proteins_100g", "salt_100g"
    ]

    # Convert the list to a dictionary
    nutritional_dict = dict(zip(nutrient_labels, nutritional_list))

    # Extract ingredients list from image2
    response_ingredients = genai.GenerativeModel("gemini-1.5-flash").generate_content(
        ["Extract the ingredients list from the provided image as raw text with no brackets or parentheses. "
         "Format the result as a plain comma-separated string.", image2]
    )

    ingredients_text = response_ingredients.text.strip()

    # Extract product name from image2 (optional, can be extracted from either image)
    response_product_name = genai.GenerativeModel("gemini-1.5-flash").generate_content(
        ["Extract the product name from the provided image as plain text, if not given in the text, you think and give me a product name, but the output should only be a name, and no extra text.", image2]
    )

    product_name = response_product_name.text.strip()

    # Add extracted values to the nutritional_dict
    nutritional_dict["product"] = product_name
    nutritional_dict["ingredients_text"] = ingredients_text

    return nutritional_dict
