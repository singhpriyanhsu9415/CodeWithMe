# 🧑‍💻 CodeWithMe – Real-Time Collaborative Code Editor

CodeWithMe is a **real-time collaborative code editor** that allows multiple users to write, edit, and review code together from different locations. It is designed especially for **interviews, learning, peer programming, and online education**.

---

## 🚀 Features

- 🔗 **Room-based collaboration** using a unique Room ID
- 👥 **Multiple users can join the same room** and edit code simultaneously
- ⚡ **Real-time code synchronization** using Socket.io
- 🟢 **User presence indicators** to show active participants
- 🧩 **Dynamic room joining and leaving**
- 📝 **Code editor powered by CodeMirror**
- 🐳 **Dockerized application** for easy setup and deployment

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **CodeMirror** (Code editor)
- **Socket.io Client**

### Backend
- **Node.js**
- **Express.js**
- **Socket.io**

### DevOps
- **Docker**
- **Docker Hub**
- **GitHub Actions (CI/CD)**

---

## Screenshots

<img width="1912" height="975" alt="Screenshot 2025-12-25 151253" src="https://github.com/user-attachments/assets/9971c403-746a-4c3e-93e9-95394dd56f3e" />
<img width="1915" height="976" alt="Screenshot 2025-12-25 151425" src="https://github.com/user-attachments/assets/a9cde1c6-dad0-491f-846a-04d426998219" />
<img width="286" height="311" alt="Screenshot 2025-12-25 151446" src="https://github.com/user-attachments/assets/f46d8730-2de4-4951-962f-bf5e94648c36" />

## 🧠 How It Works

1. A user creates or joins a room using a **unique Room ID**
2. Other users join the same room
3. Any code change made by one user is **instantly reflected** for all users
4. Socket.io maintains real-time communication between clients
5. User join/leave events are broadcast to all participants

---


