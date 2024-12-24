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

### 🔹 PostgreSQL
Make sure PostgreSQL is installed on your server or accessible through Docker. You'll use it to store and manage the linked data between Discord and Minecraft.

- Install PostgreSQL from [here](https://www.postgresql.org/download/).
- Alternatively, you can use Docker to run a PostgreSQL container (check the database section for details). PREFFERED

### 🔹 Recommended: Docker & Docker Compose
You'll need Docker and Docker Compose to run the PostgreSQL database and potentially other components of the system.

1. Install **Docker** from [here](https://docs.docker.com/get-docker/).
2. Install **Docker Compose** from [here](https://docs.docker.com/compose/install/).

### 🔹 A Server
You'll need a server to host both the Discord bot and the PostgreSQL database (unless you're running everything locally).

1. **Cloud VPS/Server**: Consider a cloud service like [DigitalOcean](https://www.digitalocean.com/), [AWS](https://aws.amazon.com/), or [Linode](https://www.linode.com/) for hosting.
2. **Local Machine**: You can also run it on a local machine or dedicated server if preferred.

---

### 🤖 Bot Setup

1. **Clone the repository** (or download the project files):
   ```bash
   git clone https://github.com/yourusername/warden.git
   ```

2. **Navigate to the bot directory**:
   ```bash
   cd warden/Bot
   ```

3. **Install dependencies** using NPM:
   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root of the `Bot` directory and add your configuration. You'll need the **Discord Bot Token** and other environment variables, such as the database credentials.

5. **Run the bot** in development mode:
   ```bash
   npm run dev
   ```

The bot should now be running, connected to Discord, and ready to interact with your Minecraft server!

---

### 🖥️ Server Requirements

If you're hosting on a server:

1. **Operating System**: Any Linux distribution (Ubuntu preferred), or Windows/MacOS for local development.
2. **Public IP/Domain**: Ensure your server has a static public IP or domain to interact with Discord and the PostgreSQL database.
3. **Firewall Configuration**: Make sure the necessary ports (e.g., for the bot and PostgreSQL) are open and accessible.

---

Now that your environment is set up and the prerequisites are in place, you can proceed to the database and bot configuration!

## 🌍 Preparing the Environment
In order to use any component of Warden, you'll need to properly set up your environment. How you wish to structure your environment is completely up to you.

### 🏠 Single Location
By default, both the database and the bot rely on the same Environmental Variable source file (`.env`), which is perfect if both components will be hosted on the same machine.

If you intend to use the bot and database on one machine, rename `.env.example` to `.env` and edit the details accordingly. Skip the following section.

### 🌐 Separate Machines
If you intend to host them separately, you'll need to copy the `.env` file to both locations:
   ```bash
   cp .env.example Bot/.env
   cp .env.example Database/.env
   ```
   Modify the `docker-compose.yml` to remove the following lines. This will instead use the `.env` file in the root directory rather than the parent.
   ```yml
    env_file:
     - ../.env
   ```
   Likewise, for both files `seyfert.config.js` and `index.ts`, replace the lines:
   ```js
   require('dotenv').config({ path: '../.env' });
   ```
   with:
   ```js
   require('dotenv').config();
   ```
---

_🔐 Regardless, make sure you change your details here afterward and ensure both files match._

### 🤖 Bot
1. You will need to create an application for the Bot instance on the Discord [Developer Portal](https://discord.com/developers/applications) and populate the `TOKEN` in your **env** file with your generated token. 

2. Install all necessary components:
   ```bash
   npm i
   ```

3. Run the bot:
   ```bash
   npm run dev
   ```

### 🗄️ Database
The PostgreSQL Database serves as both the storage and middleman between the MC Server & Discord Bot, facilitating the connection without requiring an additional Server Port.

This implementation is only as secure as you make it; you'll need to change the Database username and password.

1. You can start the container, and it will automatically create the schema:
    ```bash
    docker-compose up -d
    ```

2. To verify it worked, you can connect to the database:
    ```bash
    # Connect to the container
    docker-compose exec db psql -U yourusername -d mclink
    
    # Once connected, list the tables
    \dt
    
    # View the schema of a specific table
    \d linking_requests
    \d linked_accounts 
    ```

If for some reason you find yourself needing to reset everything and start fresh:
```bash
# Stop and remove containers, networks, volumes, and images
docker-compose down -v

# Then start again
docker-compose up -d
```

