<p align="center">
  <img src="./assets/project/warden.png" alt="Warden" width="40%" />
  
  **Link Discord Members with Minecraft | PostgreSQL + Seyfert**
</p>

## Preparing the Environment
In order to use any component of Warden, you'll need to properly setup your environment. How you wish to structure your environment is completely up to you. 


### Single Location
By default, both the database and the bot rely on the same Environmental Variable source file (`.env`) which is perfect if both components will be hosted on the one machine.

If you intend to use the bot and database on one machine, rename `.env.example` to `.env` and edit the details accordingly. Skip the following section.

### Seperate Machine
If you intend to host them seperately, you'll need to copy the .env file to both locations:
   ```bash
   cp .env.example Bot/.env
   cp .env.example Database/.env
   ```
   Modify the docker-compose.yml to remove the following lines, this will instead use the .env file in the root directory rather than the parent.
   ```yml
    env_file:
     - ../.env
   ```
   Likewise for both files `seyfert.config.js` and `index.ts` replace the lines: 
   ```js
   require('dotenv').config({ path: '../.env' });
   ```
   with:
   ```js
   require('dotenv').config();
   ````
---
_Regardless, it goes without saying you'll need to change your details here afterwards, and ensure both files match._

### Bot
1. You will need to create an application for the Bot instance on the Discord [Developer Portal](https://discord.com/developers/applications) and populate the `TOKEN` in your **env** file with your generated token. 

2. Install all necessary components;
   ```bash
   npm i
   ```
3. Run the bot:
   ```bash
   npm run dev
   ```
 ### Database
The PostgreSQL Database serves as both the storage, and middleman between the MC Server & Discord Bot, facilitating the connection without requiring an addition Server Port.

This implementation is only as secure as you make it; you'll need to change the Database userrname and password.

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