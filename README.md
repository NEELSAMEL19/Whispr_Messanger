<a href="https://whisprmessanger.vercel.app"><img align="right" src="./frontend-button.svg" width="140" alt="Live Frontend" /></a>

### Whispr Messenger

<em>A responsive messaging frontend for finding contacts, sharing real-time messages, and keeping conversations in sync.</em>

<p align="left">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
  &nbsp;
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
  &nbsp;
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  &nbsp;
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  &nbsp;
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white" alt="Redux Toolkit" />
  &nbsp;
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white" alt="React Router" />
  &nbsp;
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white" alt="Socket.IO" />
</p>

<hr />

### 🚀 About the project

**Whispr Messenger** is a browser-based messaging application. Users can create an account, sign in, find contacts by phone number, and exchange messages in a protected chat interface. The frontend uses HTTP endpoints for account and conversation operations and Socket.IO for real-time messaging, typing indicators, presence, and message status updates.

### ✨ Features

<table>
  <tr>
    <td valign="top">

- ✅ Account registration with name, email, password, and phone number
- ✅ Login, logout, and session restoration from the backend
- ✅ Client-side registration and login validation with Zod
- ✅ Contact search by phone number and conversation list
- ✅ Load and display conversation history

</td>
    <td valign="top">

- ✅ Real-time message sending and receiving with Socket.IO
- ✅ Typing indicators, online presence, and last-seen status
- ✅ Sent, delivered, and read message status updates
- ✅ Edit or delete your messages; copy messages and delete conversations
- ✅ Emoji picker and responsive chat interface

</td>
  </tr>
</table>

### 🛠️ Tech Stack

|               Frontend                |              State & Data              |                        UI & Utilities                        |
| :-----------------------------------: | :------------------------------------: | :----------------------------------------------------------: |
| React, TypeScript, Vite, Tailwind CSS | Redux Toolkit, Axios, Socket.IO Client | React Router, Zod, Emoji Picker, Framer Motion, Lucide React |

### 📷 Screenshots

Screenshots are not currently included in this repository.

### 🚀 Getting Started

<table>
  <tr>
    <td valign="top" width="40%">

#### Prerequisites

- **Node.js** (a version supported by Vite 8)
- **npm**
- **Whispr Messenger backend** implementing the HTTP API and Socket.IO events below

#### ⚙️ Environment Variables

The frontend uses `VITE_API_BASE_URL` for both its HTTP API and Socket.IO connection. If it is not set, the app defaults to `https://whispr-messanger-backend.onrender.com`.

Create a `.env.local` file in the project root to use a different URL:

```env
VITE_API_BASE_URL=http://localhost:3030
```

> 💡 Set this variable to your backend URL when running a local backend. Vite exposes `VITE_*` variables to the browser, so do not put secrets in them. `.env.local` is ignored by Git.

</td>
    <td valign="top" width="60%">

#### Installation

1. Clone the repository and enter the project directory:

```bash
   git clone https://github.com/NEELSAMEL19/Whispr_Messanger.git
   cd Whispr_Messanger
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open the local URL printed by Vite in your browser.

</td>
  </tr>
</table>

### 📁 Project Structure

```text
Whispr_Messanger/
├── src/
│   ├── assets/             # Frontend assets
│   ├── components/
│   │   ├── Basic/          # Buttons, inputs, loader, and 404 page
│   │   └── Chat/           # Chat list, header, messages, search, and input
│   ├── features/           # Authentication and chat Redux slices
│   ├── hooks/              # Shared hooks, including search debounce
│   ├── pages/              # Login, registration, and chat pages
│   ├── redux/              # Redux store and typed hooks
│   ├── services/           # Axios client, auth/chat APIs, and endpoint config
│   ├── types/              # Authentication and chat types
│   ├── utils/              # Error handling and shared utilities
│   ├── App.tsx             # Routes and route guards
│   ├── index.css           # Global styles and animations
│   └── main.tsx            # Application entry point
├── public/                 # Static icons and favicon
├── package.json
├── vite.config.ts
└── README.md
```

### 🔗 Backend API 

|  Method  | Endpoint                           | Description                                    | Auth Required |
| :------: | ---------------------------------- | ---------------------------------------------- | :-----------: |
|  `POST`  | `/api/auth/register`               | Register with name, email, password, and phone |      No       |
|  `POST`  | `/api/auth/login`                  | Log in with email and password                 |      No       |
|  `GET`   | `/api/auth/profile`                | Get the current user's profile on startup      |    Session    |
|  `POST`  | `/api/auth/logout`                 | Log out the current user                       |    Session    |
|  `GET`   | `/api/auth/users?q={phone}`        | Search for users by phone number               |    Session    |
|  `GET`   | `/api/messages/conversations`      | Get the current user's conversations           |    Session    |
|  `GET`   | `/api/messages/:userId`            | Get messages with a user                       |    Session    |
| `DELETE` | `/api/messages/:userId`            | Delete the conversation with a user            |    Session    |
| `PATCH`  | `/api/messages/:userId/read`       | Mark messages from a user as read              |    Session    |
| `PATCH`  | `/api/messages/message/:messageId` | Edit a message (`content` in request body)     |    Session    |
| `DELETE` | `/api/messages/message/:messageId` | Delete a message                               |    Session    |

<table>
  <tr>
    <td valign="top" width="50%">

#### 👥 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for bug fixes, improvements, and new messaging features.

</td>
    <td valign="top" width="50%">

#### 📄 License

This project is licensed under the [MIT License](LICENSE).

</td>
  </tr>
</table>

Made with ❤️ by [Neel Samel](https://github.com/NEELSAMEL19)
