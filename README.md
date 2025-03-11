# React Movie Search App
This project is a React-based app that allows users to search for movies using the TMDB API. Search queries are tracked and stored in an Appwrite database to analyze search term frequency.

**Key Features**

* **Movie Search:** Enables users to search for movies using the TMDB API.
* **Debounced Input:** Implements debouncing to minimize API requests and enhance performance.
* **Appwrite Integration:** Utilizes Appwrite to store and track search terms, including frequency and associated movie data.
* **Responsive UI:** Provides a clean and responsive user interface for seamless browsing.
* **Error Handling:** Implements robust error handling and loading states for a smooth user experience.

**Technologies Used:**

* **React:** For building the user interface.
* **Vite:** For fast development and bundling.
* **TMDB API:** For fetching movie data.
* **Appwrite:** For backend data storage and management.
* **React Use:** For debouncing functionality.
* **Tailwind CSS:** 

**Getting Started:**

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/MwanikiG/react-movie-app-just-simple.git](https://github.com/MwanikiG/react-movie-app-just-simple.git)
    cd react-movie-app-just-simple
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    * Create a `.env` file in the root directory.
    * Add your TMDB API key and Appwrite credentials:

        ```
        VITE_TMBD_API_KEY=your_tmdb_api_key
        VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
        VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
        VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
        ```

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

5.  **Access the Application:**

    * Open your browser and navigate to `http://localhost:5173`.

