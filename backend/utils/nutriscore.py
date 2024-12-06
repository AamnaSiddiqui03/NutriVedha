# Nutri-Score Calculation
def calculate_nutriscore(nutritional_data):
    try:
        # Extract nutrient values
        energy = nutritional_data.get('energy_100g', 0)  # in kJ
        fat = nutritional_data.get('fat_100g', 0)  # in g
        sugars = nutritional_data.get('sugars_100g', 0)  # in g
        proteins = nutritional_data.get('proteins_100g', 0)  # in g
        salt = nutritional_data.get('salt_100g', 0)  # in g
        carbs = nutritional_data.get('carbohydrates_100g', 0)  # in g

        # Negative points
        energy_score = 0
        if energy > 3350: energy_score = 10
        elif energy > 3015: energy_score = 9
        elif energy > 2680: energy_score = 8
        elif energy > 2345: energy_score = 7
        elif energy > 2010: energy_score = 6
        elif energy > 1675: energy_score = 5
        elif energy > 1340: energy_score = 4
        elif energy > 1005: energy_score = 3
        elif energy > 670: energy_score = 2
        elif energy > 335: energy_score = 1

        fat_score = min(int(fat / 1), 10)
        sugars_score = min(int(sugars / 4.5), 10)
        salt_score = min(int(salt / 0.09), 10)

        # Positive points
        proteins_score = min(int(proteins / 1.6), 5)

        # Carbohydrates can contribute to fiber-like scoring
        fiber_score = min(int(carbs / 3.2), 5)

        fruits_veggies_score = 0  # Placeholder; requires % of content

        # Total negative and positive points
        negative_points = energy_score + fat_score + sugars_score + salt_score
        positive_points = proteins_score + fiber_score + fruits_veggies_score

        # Nutri-Score Calculation
        if negative_points >= 11 and proteins_score < 5:
            nutriscore = negative_points - positive_points
        else:
            nutriscore = negative_points - (positive_points + proteins_score)

        return round(nutriscore, 2)
    except Exception as e:
        print("Error in Nutri-Score calculation:", e)
        return None

# Nutri-Score Category Function
def get_nutriscore_category(nutriscore):
    if nutriscore <= 0:
        return 'A'
    elif nutriscore <= 3:
        return 'B'
    elif nutriscore <= 10:
        return 'C'
    elif nutriscore <= 18:
        return 'D'
    else:
        return 'E'

# Example usage

# nutriscore = calculate_nutriscore(nutritional_data)
# nutri_score_category = get_nutriscore_category(nutriscore)

# # Corrected return statement
# result = {'nutriscore': nutriscore, 'nutri_score_category': nutri_score_category}

# print(result)  # Output: {'nutriscore': 15.0, 'nutri_score_category': 'D'}
