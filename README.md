# Meliora Impact Case Project

### Oppsett
1. Git clone
2. Kjør `npm install`
3. Dobbeltsjekk at project line endings er satt til LF (hvis du er på Windows), at du har prettier som plugin, og at package er satt opp riktig
4. Legg inn .env-fil i `/server`
   * Du trenger: 
     * GOOGLE_ID, 
     * MONGO_URI (mongodb+srv://*username*:*password*@cluster0.*unique string*.mongodb.net/meliora_impact, 
     * COOKIE_SECRET
5. Kjør `npm run dev` for å spinne opp server og client i dev-modus

# Server endpoints
* `/api/user`
* `/api/category`
* `/api/company`