<p align="center">
  <img src="./assets/project/warden.png" alt="Warden" width="40%" />
</p>
<p align="center">
  <strong>🚀 Link Discord Members with Minecraft | PostgreSQL + Seyfert</strong>
</p>

# ⚙️ Setup

## 🛠️ Prerequisites

Before you begin, make sure you have the following installed:

### 🔹 Node.js & NPM
The bot is built using Typescript (Node.js). You'll need to install both Node.js and NPM (Node Package Manager) to get started.

1. Install **Node.js** (which includes NPM) from [here](https://nodejs.org/en/download/).
   - Alternatively, use a version manager like [nvm](https://github.com/nvm-sh/nvm) to install Node.js.
   - Recommended version: **Node.js 16.x** or higher.

2. Verify installation:
   ```bash
   node -v
   npm -v
   ```

### 🔹 A Server
You'll need a server to host both the Discord bot and the [PostgreSQL database](https://github.com/ZSMP-Public/WardenDB) (unless you're running everything locally).

1. **Cloud VPS/Server**: Consider a cloud service like [DigitalOcean](https://www.digitalocean.com/), [AWS](https://aws.amazon.com/), or [Linode](https://www.linode.com/) for hosting.
2. **Local Machine**: You can also run it on a local machine or dedicated server if preferred.

---

## 🤖 Bot Setup

1. **Clone the repository** (or download the project files):
   ```bash
   git clone https://github.com/ZSMP-Public/Warden.git
   ```

2. **Install dependencies** using NPM:
   ```bash
   npm install
   ```
3. Inside the project, you'll find a file called `.env.example`, this is an example configuration of the data necessary. Rename this to simply `.env` and change the credentials within it, ensuring it aligns with the credentials on your Database.

   You will need to create an application for the Bot instance on the Discord [Developer Portal](https://discord.com/developers/applications) and populate the `TOKEN` in your **env** file with your generated token.

4. **Run the bot** in development mode:
   ```bash
   npm run dev
   ```

The bot should now be running, connected to Discord, and ready to interact with your Minecraft server!

---

_🔐 **REMINDER**, Always make sure you change the default values in your env file._
