# 🧪 Guide de Test - Atelier CRUD

## ✅ Avant de Commencer

### 1. Démarrer le Backend
```powershell
# Terminal 1
cd c:\Users\SBS\Desktop\Test_Angular\Omar_Ben_Jannet\src\app\services\node-user-mysql-main
npm start

# Vous devriez voir:
# Server is running on port 3000
# Database connected
```

### 2. Démarrer Angular
```powershell
# Terminal 2
cd c:\Users\SBS\Desktop\Test_Angular\Omar_Ben_Jannet
npm start

# Vous devriez voir:
# ✔ Compiled successfully
# Navigate to http://localhost:4200/
```

### 3. Ouvrir l'Application
- Allez à: **http://localhost:4200/**
- Ouvrez la Console: **F12 → Console tab**

---

## 🧪 Scénario 1: Créer un Atelier (Succès)

1. **Naviguer vers Création:**
   - Cliquez "Add New Atelier" (le bouton bleu)
   - Ou allez à: http://localhost:4200/atelier/add

2. **Remplir le Formulaire:**
   ```
   Atelier Name: Atelier Ahmed Ali
   Instructor Email: ahmed@example.com
   Number of Participants: 20
   Status: Active (défaut)
   ```

3. **Vérifier la Console:**
   Vous devriez voir:
   ```
   [Log] Form submitted
   [Log] Creating atelier with data: {nom: "Atelier Ahmed Ali", ...}
   [Log] Sending atelier data to API: http://localhost:3000/ateliers {nom: "Atelier Ahmed Ali", ...}
   [Log] API response: {id: 5, nom: "Atelier Ahmed Ali", ...}
   [Log] Mapped result: {id: 5, nom: "Atelier Ahmed Ali", ...}
   [Log] Atelier created successfully: {...}
   [Log] Navigating to /atelier
   ```

4. **Résultat Attendu:**
   - Message vert: "Atelier created successfully!"
   - Redirection vers la liste
   - Le nouvel atelier apparaît dans le tableau

---

## ❌ Scénario 2: Backend Pas Connecté

### Symptôme:
- Le formulaire "tourne" après cliquer "Create"
- Aucune redirection

### Diagnostic:
1. **Ouvrir F12 → Console**
2. **Chercher l'erreur:**
   ```
   [Error] Failed to create atelier. Backend server is not responding. Make sure the server is running on port 3000.
   ```

3. **Vérifier le Backend:**
   ```powershell
   netstat -ano | findstr :3000
   # Si rien ne s'affiche: le backend n'est pas en train de tourner
   ```

4. **Démarrer le Backend:**
   ```powershell
   cd src/app/services/node-user-mysql-main
   npm start
   ```

---

## ⚠️ Scénario 3: Validation du Formulaire

### Test: Mauvais Format du Nom
1. **Entrez:** `Ahmed Ali` (sans "Atelier")
2. **Résultat:**
   ```
   Erreur: Format must be "Atelier FirstName LastName" (e.g., "Atelier Ahmed Ali")
   ```

### Test: Nom Trop Court
1. **Entrez:** `At Bo` (moins de 5 caractères)
2. **Résultat:**
   ```
   Erreur: nom must be at least 5 characters
   ```

### Test: Email Invalide
1. **Entrez:** `not-an-email`
2. **Résultat:**
   ```
   Erreur: Please enter a valid email address
   ```

### Test: Participants < 15
1. **Entrez:** `10`
2. **Résultat:**
   ```
   Erreur: nbrParticipant must be greater than 15
   ```

---

## 🔍 Vérifier l'API Directement

### Tester GET (Récupérer tous les ateliers)
```powershell
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/ateliers" -Method GET | ConvertFrom-Json | Format-Table

# Ou dans Postman:
# GET http://localhost:3000/ateliers
```

### Tester POST (Créer un atelier)
```powershell
# PowerShell
$body = @{
    nom = "Atelier Test"
    emailFormateur = "test@example.com"
    nbrParticipant = 25
    statut = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/ateliers" -Method POST -Body $body -ContentType "application/json" | ConvertFrom-Json
```

---

## 📊 Tester les Logs en Détail

### Logs à Surveiller:

#### 1. Formulaire Soumis:
```
Form submitted
Form is invalid: false (doit être false!)
Creating atelier with data: {...}
```

#### 2. Service API:
```
Fetching atelier data from: http://localhost:3000/ateliers
API response: [...]
Normalized ateliers: [...]
```

#### 3. Succès:
```
Atelier created successfully: {id: 5, ...}
Navigating to /atelier
```

#### 4. Erreur Réseau:
```
Error creating atelier: TypeError: Failed to fetch
Status: 0 (connexion refusée)
```

---

## 🛠️ Troubleshot Rapide

| Problème | Solution |
|----------|----------|
| Le formulaire ne submit pas | Vérifier F12 → Console pour les erreurs |
| "Backend not responding" | Démarrer le backend sur port 3000 |
| Validation échoue | Vérifier le format "Atelier NomPrenom" |
| Pas de redirection | Vérifier les logs, peut-être une erreur d'API |
| La BD n'est pas mise à jour | Vérifier que le backend réussit le POST (status 200/201) |

---

## 🎯 Success Criteria

✅ **Test 1: Créer un Atelier Valide**
- Le formulaire accepte les données
- Le consolelog "Atelier created successfully" apparaît
- L'utilisateur est redirigé vers la liste
- Le nouvel atelier apparaît dans le tableau

✅ **Test 2: Validation Correcte**
- Les champs invalides montrent des erreurs rouges
- Les messages d'erreur sont clairs
- Le bouton "Create" est désactivé si le formulaire est invalide

✅ **Test 3: Gestion d'Erreur**
- Si l'API ne répond pas, un message clair l'indique
- La page n'est pas bloquée, l'utilisateur peut corriger

---

## 📝 Notes Importantes

1. **La BD doit exister** - Vérifier `src/app/services/node-user-mysql-main/database.sql`
2. **Les migrations doivent être appliquées** - Vérifier qu'elle a la table `ateliers`
3. **CORS doit être configuré** - Le backend doit accepter les requests de localhost:4200
4. **Port 3000 doit être libre** - Vérifier avec `netstat -ano | findstr :3000`

---

**Bon Testing! 🚀**
