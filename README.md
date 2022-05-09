# Meliora Impact Case Project

### Oppsett
1. Git clone
2. Kjør `npm install`
3. Legg inn .env-fil i `/server`
   * Du trenger: 
     * GOOGLE_ID, 
     * MONGO_URI (mongodb+srv://*username*:*password*@cluster0.*unique string*.mongodb.net/meliora_impact, 
     * COOKIE_SECRET
4. Kjør `npm run dev` for å spinne opp server og client i dev-modus

# Server endpoints
* `/api/users`
* `/api/categories`
* `/api/companies`