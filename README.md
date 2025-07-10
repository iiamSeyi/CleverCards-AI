


# CleverCards AI

## Description

CleverCards AI is an AI-powered flashcard web app that helps students study smarter by generating custom flashcards based on their notes, topics, or uploaded documents.  
We built this project to solve the problem of inefficient study methods and scattered resources. Many students spend more time organizing than actually studying. Our goal was to simplify the process and allow learners to focus on mastering content.

**Why?**  
We were motivated by our own struggles as students—flipping through pages, hunting for key info, and getting lost in cluttered study materials.  

**What we learned:**  
Throughout this project, we deepened our skills in full-stack development, authentication, API integration, and user-centered design.

## Features

- 🔐 User authentication with Clerk and Firebase  
- 📄 Upload documents or type prompts to generate flashcards  
- 🧠 AI-generated flashcards with adjustable difficulty  
- 📊 Track progress and organize decks by subject  
- 💳 Secure Stripe integration for premium features  
- 📱 Fully responsive design across desktop and mobile  

![Flashcard Screenshot](https://your-image-link.com/screenshot.png)  
*Optional: Add a GIF of flashcard generation here*

## How to Use

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/clevercards-ai.git
```

2. Install dependencies

   ```bash
   cd clevercards-ai  
   npm install
   ```

3. Create a `.env.local` file and add your API keys for:

   * OpenAI
   * Firebase
   * Clerk
   * Stripe

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser to use the app

### Requirements

* Node.js 18+
* Firebase Project (Firestore, Storage)
* Clerk Account
* OpenAI API Key
* Stripe Account (for payments)

## Technologies Used

* **React / Next.js** – Frontend & routing
* **Firebase** – Backend data storage and authentication
* **Clerk** – Easy and secure user authentication
* **OpenAI API** – AI-powered flashcard generation
* **Stripe** – Payment handling for subscriptions
* **Tailwind CSS** – Styling and responsive design
* **Vercel** – Deployment platform

## Collaborators

* **Oluwaseyi Salisu** – [GitHub](https://github.com/oluwaseyi-salisu) *(Team Lead, Full-stack Dev)*
* **Jeffrey Luu** – [GitHub](https://github.com/jeffreyexample)
* **Abid Hossain** – [GitHub](https://github.com/abidexample)
* **Richard Huynh** – [GitHub](https://github.com/richardexample)

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
See the LICENSE file for more details.


