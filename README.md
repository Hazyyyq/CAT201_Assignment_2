# CAT201 Project
A repository for CAT201 Project. This project features a dynamic webpage with a Java Tomcat backend and a React frontend.

## 🔗 Kaki Gamerz Website Link
[https://kakigamerz-frontend.onrender.com](https://kakigamerz-frontend.onrender.com)

> **⚠️ Important Note**
> This link hosts the **frontend only**. Since the backend is not connected to this deployment, features requiring data processing or fetching will not function. Consequently, some pages may appear empty or incomplete.

---

## [STEP 1] Run Locally (Backend)
To run the backend on your localhost:

> **⚠️ Prerequisites & Checks**
>
> * **Maven Project Setup:**
>     * Ensure the `pom.xml` file exists in the `java-backend` directory.
>     * If your IDE does not recognize it, right-click `pom.xml` and select **"Add as Maven Project"**.
> * **Java Version:**
>     * Ensure you are using a compatible JDK (e.g., JDK 17, 19, or 21).
> * **Edit Run Configuration:**
>     1.  **Java:** Set to JDK 19 or higher.
>     2.  **Main Class:** Set to `com.kakigamerz.Main`.
>     3.  **Working Directory:** Set to the backend folder path (e.g., `..\CAT201_Project\java-backend`).

### **Steps to Start Server**
1.  Navigate to the `java-backend` directory.
2.  Locate `Main.java` inside `src/main/java/com.kakigamerz/Main`.
3.  Run the file to start the Tomcat server.
    * *Server should start on:* `http://localhost:8080` (or your configured port).

---

## [STEP 2] Run Locally (Frontend)
To run the frontend on your localhost:

1.  **Clone the repository** or download it as a ZIP file.
2.  Open your terminal at the root of the project.
3.  Change into the frontend directory:
    ```bash
    cd react-frontend
    ```
4.  Install the dependencies:
    ```bash
    npm install
    ```
5.  Run the development server:
    ```bash
    npm run dev
    ```
6.  Click the link provided in the terminal (usually `Ctrl + Click`):
    ```bash
      VITE v7.3.0  ready in 3328 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```
7.  **Enjoy the Kaki Gamerz website!**
