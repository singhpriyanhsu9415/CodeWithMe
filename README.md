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

## 🧠 How It Works

1. A user creates or joins a room using a **unique Room ID**
2. Other users join the same room
3. Any code change made by one user is **instantly reflected** for all users
4. Socket.io maintains real-time communication between clients
5. User join/leave events are broadcast to all participants

---


