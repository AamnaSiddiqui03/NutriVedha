import pickle
import os

def load_gmm_model():
    """
    Load the trained GMM model from a pickle file in the 'models' folder.

    Returns:
        GaussianMixture: The trained GMM model.
    Raises:
        FileNotFoundError: If the model file is not found.
        RuntimeError: For any other error during model loading.
    """
    model_path = os.path.join(os.path.dirname(__file__), "gaussian_mixture_model.pkl")  # Dynamically locate the model file
    try:
        with open(model_path, "rb") as file:
            model = pickle.load(file)
        print("GMM model loaded successfully.")
        return model
    except FileNotFoundError:
        raise FileNotFoundError(f"Model file not found at {model_path}. Ensure the file exists.")
    except Exception as e:
        raise RuntimeError(f"Error occurred while loading the model: {e}")

if __name__ == "__main__":
    try:
        # Load the model
        model = load_gmm_model()

        # Check the number of features
        if hasattr(model, "n_features_in_"):
            print(f"The model expects {model.n_features_in_} features.")

        # Check feature names, if available
        if hasattr(model, "feature_names_in_"):
            print("Feature names used during training:")
            print(model.feature_names_in_)
        else:
            print("Feature names are not available for this model.")
    except Exception as e:
        print(f"An error occurred: {e}")
