# Nexora Digital — site officiel (prototype)

Site commercial bilingue (FR / EN) de l'agence **Nexora Digital** : création de sites web, SEO et gestion des avis Google.
Objectif principal : **convertir les visiteurs en prospects** (« Demander une soumission », « Réserver une consultation »).

> Statut : **prototype**. Le site est bloqué pour les moteurs de recherche (`SITE_INDEXABLE=false`) tant que le lancement n'est pas validé.

---

## 1. Choix techniques

| Choix | Pourquoi |
| --- | --- |
| **Next.js 16 (App Router) + React 19** | Génération statique (SSG) de toutes les pages : HTML prêt à l'emploi, excellent pour le SEO et les Core Web Vitals. Routes serveur intégrées pour le formulaire → Notion, sans backend séparé. Déploiement natif sur Vercel. |
| **TypeScript** | Les dictionnaires FR/EN sont typés : une clé manquante en anglais casse le build au lieu de casser le site. |
| **Tailwind CSS v4** | Système de design par tokens (`app/globals.css`), CSS minimal généré, aucune feuille de style inutilisée. |
| **Pas de Framer Motion** | Les animations (révélations au défilement, timeline, parallaxe, micro-interactions) sont faites en CSS + un seul `IntersectionObserver`. Environ 40 Ko de JS en moins, aucune perte visuelle. |
| **Geist + Instrument Serif** | Geist est servie localement (paquet `geist`, aucune requête externe). Instrument Serif est utilisée en italique pour un seul mot-accent par titre : la signature « luxury tech ». |
| **Aucune librairie d'UI, d'i18n ou de formulaires** | i18n, validation et anti-spam sont écrits sur mesure en quelques centaines de lignes : moins de dépendances, moins de JS, plus de contrôle. |

Dépendances de production : `next`, `react`, `react-dom`, `geist`, `server-only`. C'est tout.

## 2. Direction artistique

- **Luxury Tech monochrome** : noir profond `#050506`, surfaces `#0B0B0D → #18181C`, blanc cassé `#F5F5F6`, gris `#A3A3AB`.
- **Un seul accent** : bleu électrique froid `#4F7CFF`, réservé au CTA principal, aux états actifs et aux petits détails. Le fond des boutons utilise `#3D66F5` pour garantir un contraste AA avec le texte blanc.
- **Une section claire** (« Le constat », engagement éthique) qui casse le rythme et met en valeur les problèmes des clients.
- Grandes typographies serrées (`letter-spacing: -0.045em`), mot-accent en serif italique, labels en mono majuscules espacées.
- Bordures fines (hairlines), grille technique en arrière-plan avec masque radial, grain subtil, halo lumineux unique et très doux.
- Visuels 100 % HTML/SVG (tableau de bord, résultats de recherche, maquettes multi-appareils) : nets sur tous les écrans, sans aucune image à charger. Chaque visuel fictif porte la mention « Illustration ».

## 3. Architecture

```
app/
  [locale]/                    # racine : /fr (défaut, Loi 96) et /en
    layout.tsx                 # <html lang>, polices, header/footer, JSON-LD, Plausible
    page.tsx                   # accueil
    services/page.tsx
    services/seo/page.tsx
    services/creation-site-web/  (FR)   services/web-design/      (EN)
    services/avis-google/        (FR)   services/google-reviews/  (EN)
    a-propos/                    (FR)   about/                    (EN)
    soumission/                  (FR)   quote/                    (EN)
    politique-de-confidentialite/(FR)   privacy-policy/           (EN)
    portfolio/page.tsx  portfolio/[slug]/page.tsx
    consultation/page.tsx  faq/page.tsx
    not-found.tsx  opengraph-image.tsx
  api/quote/route.ts           # formulaire → Notion (validation, honeypot, rate limit)
  global-not-found.tsx         # 404 hors /fr et /en
  robots.ts  sitemap.ts  manifest.ts  icon.svg  apple-icon.tsx  globals.css
components/
  brand/      Logo, monogramme
  layout/     Header (sous-menu, menu mobile), Footer, LanguageSwitcher, MobileCta, Enhancements
  sections/   Hero, Problems, ServiceCards, ReviewsHighlight, Process, WhyNexora, FaqAccordion, CtaBanner, PageHero…
  views/      une vue par page (partagée FR/EN)
  forms/      QuoteForm, CalendlyEmbed
  portfolio/  ProjectCard, PortfolioGrid (filtres par secteur)
  visuals/    HeroVisual, ReviewsDashboard, SearchVisual, SiteVisual, ProjectMockup
  ui/         Button, Icon, Section
content/
  dictionaries/fr.ts, en.ts    # TOUT le texte du site
  projects.ts                  # portfolio
  site.ts                      # coordonnées, réseaux, responsable Loi 25…
  legal/privacy.ts             # politique de confidentialité FR/EN
lib/
  i18n.ts         # table des URL localisées + sélecteur FR | EN
  seo.ts schema.ts  # métadonnées, canonical, hreflang, Open Graph, JSON-LD
  quote-schema.ts # validation partagée client/serveur
  notion.ts rate-limit.ts env.ts analytics.ts
```

**URL localisées** : chaque page a un slug par langue (`/fr/a-propos` ↔ `/en/about`), déclaré une seule fois dans `lib/i18n.ts`. Le sélecteur FR | EN mène à la page équivalente, pas à l'accueil. Une URL dans la mauvaise langue (ex. `/en/a-propos`) renvoie une 404.

**Modifier le contenu** : tout le texte se trouve dans `content/`. Aucune modification de composant n'est nécessaire pour changer un titre, un service, une question de FAQ ou un projet.

## 4. Lancer le site en local

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
cp .env.example .env.local   # puis compléter les valeurs
npm run dev                  # http://localhost:3000 → redirige vers /fr
```

Autres commandes :

```bash
npm run build && npm start   # build de production en local
npm run typecheck            # vérification TypeScript
```

En développement, sans configuration Notion, les soumissions sont affichées dans la console du serveur et le formulaire affiche sa confirmation. Cela permet de tester l'interface de bout en bout.

## 5. Déploiement sur Vercel

1. Pousser le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importer le dépôt. Le framework Next.js est détecté automatiquement, sans réglage particulier.
3. **Settings → Environment Variables** : ajouter les variables de la section 6 (Production et Preview).
4. Déployer. Chaque push sur la branche principale redéploie automatiquement.
5. Au lancement : **Settings → Domains**, ajouter le domaine acheté, puis mettre à jour `NEXT_PUBLIC_SITE_URL` et `SITE_INDEXABLE=true`, et redéployer.

## 6. Variables d'environnement

| Variable | Obligatoire | Exemple | Rôle |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Oui | `https://www.nexoradigital.com` | Domaine public : canonical, sitemap, Open Graph, JSON-LD. Sans barre oblique finale. |
| `SITE_INDEXABLE` | Oui | `false` | `false` = `noindex` + `robots.txt` bloquant. Passer à `true` **uniquement** au lancement. |
| `NOTION_API_KEY` | Oui en production | `ntn_…` | Clé de l'intégration Notion. Utilisée côté serveur seulement, jamais exposée au navigateur. |
| `NOTION_DATABASE_ID` | Oui en production | `1a2b3c…` | ID de la base Notion des soumissions. |
| `NEXT_PUBLIC_CALENDLY_URL` | Non | `https://calendly.com/dawoodijajo01` | Page de réservation. Si la variable est absente, cette URL est utilisée par défaut. Une valeur vide (`""`) désactive la réservation en ligne. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Non | `nexoradigital.com` | Active Plausible. Si vide, aucun script d'analytics n'est chargé. |

Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build : il faut redéployer après une modification.

## 7. Intégrations externes

### Notion (soumissions)

1. Sur [notion.so/my-integrations](https://www.notion.so/my-integrations), créer une intégration interne avec la capacité « Insert content ». Copier la clé dans `NOTION_API_KEY`.
2. Créer une base de données (pleine page) avec **exactement** ces propriétés :

| Propriété | Type Notion | Valeurs envoyées |
| --- | --- | --- |
| `Nom` | Title | Nom complet |
| `Entreprise` | Text | |
| `Courriel` | Email | |
| `Téléphone` | Phone | |
| `Site web` | URL | Normalisé en `https://…` |
| `Secteur` | Select | Commerce de détail · Restauration et hôtellerie · Santé et bien-être · Services professionnels · Construction et rénovation · Immobilier · Technologie · OBNL · Autre |
| `Service` | Select | Création de site web · SEO · Gestion des avis Google · Plusieurs services |
| `Budget` | Select | Moins de 1 000 $ · 1 000 $ – 2 500 $ · 2 500 $ – 5 000 $ · 5 000 $ et plus · Je ne sais pas encore |
| `Objectifs` | Text | |
| `Message` | Text | |
| `Consentement contact` | Checkbox | |
| `Langue` | Select | FR · EN |
| `Statut` | Select | `Nouveau` à la création (ajoutez vos propres étapes : Contacté, Soumission envoyée…) |

   Ajoutez aussi une propriété **Created time** (`Date de soumission`, par exemple). Notion la remplit automatiquement.
   Les options des propriétés Select sont créées automatiquement par Notion si elles n'existent pas encore.
3. Dans la base : **••• → Connections → Ajouter** votre intégration.
4. Copier l'ID de la base (la chaîne de 32 caractères dans l'URL, avant `?v=`) dans `NOTION_DATABASE_ID`.
5. Pour renommer une colonne, modifiez aussi `NOTION_PROPERTIES` dans `lib/notion.ts`.

**Protection anti-spam** : champ piège (honeypot) invisible, délai minimal de remplissage de 3 s, limite de 5 envois par IP toutes les 10 minutes et validation serveur identique à la validation client. La limite de débit est gardée en mémoire, donc propre à chaque instance serverless ; pour une garantie stricte, remplacez la `Map` de `lib/rate-limit.ts` par Upstash Redis ou Vercel KV.

### Calendly

L'embed est un simple `<iframe>`, chargé **seulement après un clic** sur « Afficher le calendrier ». Aucun script Calendly n'est chargé et aucun témoin tiers n'est déposé avant une action du visiteur (bon pour la performance et la Loi 25). Les paramètres de couleur de l'embed nécessitent un forfait Calendly payant ; sur le forfait gratuit, ils sont simplement ignorés.

### Plausible

Il suffit de définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Événements personnalisés envoyés : `Quote Submitted` (avec le service choisi) et `Consultation Calendar Opened`. Dans Plausible, déclarez-les comme **Goals** pour suivre les conversions. Plausible n'utilisant pas de témoins, aucune bannière n'est nécessaire.

## 8. À remplacer avant la mise en ligne

Tous les placeholders sont regroupés et faciles à repérer :

- [ ] **`content/projects.ts`** : remplacer les 4 projets d'exemple (« Projet 01 » à « Projet 04 », textes `[À compléter]`). Secteurs, services, années et textes sont des exemples.
- [ ] **`public/portfolio/<slug>/`** : ajouter les captures d'écran (WebP/AVIF, environ 1600 px de large) et renseigner `cover` et `gallery[].src`. Tant qu'elles manquent, une maquette marquée « Capture d'écran à fournir » s'affiche.
- [ ] **`liveUrl`** de chaque projet une fois en ligne (le bouton « Visiter le site » apparaît automatiquement), avec `status: "live"`.
- [ ] **`content/site.ts`** : courriel, téléphone, adresse, réseaux sociaux (les éléments vides restent masqués automatiquement), raison sociale (`legal.companyName`).
- [ ] **`content/site.ts → privacyOfficer`** : nom, titre et courriel du responsable de la protection des renseignements personnels (**obligatoire, Loi 25**).
- [ ] **`content/legal/privacy.ts`** : durée de conservation (`[durée de conservation, ex. 24 mois]`). Faire **relire la politique par un juriste**.
- [ ] Variables d'environnement de production (section 6).
- [ ] Optionnel : remplacer le logotype typographique et le monogramme (`components/brand/Logo.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/[locale]/opengraph-image.tsx`) si un logo professionnel est créé.

Ce qui n'a volontairement **pas** été inventé : clients, témoignages, statistiques, certifications, récompenses, résultats, logos de partenaires. Les arguments sur les avis Google sont qualitatifs, faute de statistiques vérifiées. Le service d'avis exclut explicitement les faux avis, les avis achetés et le filtrage de clients (« review gating »).

## 9. Checklist finale avant lancement

**Contenu**
- [ ] Projets réels, captures et textes vérifiés (FR et EN).
- [ ] Coordonnées et réseaux renseignés dans `content/site.ts`.
- [ ] Relecture complète des textes FR et EN.

**Juridique (Québec)**
- [ ] Responsable de la protection des renseignements personnels nommé et publié.
- [ ] Politique de confidentialité relue par un professionnel ; date de mise à jour (`legal.privacyLastUpdated`) à jour.
- [ ] Si un autre traceur que Plausible est ajouté : prévoir une bannière de consentement.

**Technique**
- [ ] Domaine acheté et branché sur Vercel (HTTPS actif).
- [ ] `NEXT_PUBLIC_SITE_URL` = domaine final.
- [ ] Base Notion créée, intégration connectée ; soumission de test reçue en production.
- [ ] Réservation Calendly testée.
- [ ] Plausible : domaine ajouté et objectifs `Quote Submitted` et `Consultation Calendar Opened` créés.
- [ ] Test sur iPhone (Safari), Android (Chrome), tablette et ordinateur.
- [ ] PageSpeed Insights sur l'accueil et une page de service (objectif : 90+ partout).

**SEO, le jour J**
- [ ] `SITE_INDEXABLE=true`, puis redéploiement.
- [ ] Vérifier `https://<domaine>/robots.txt` (doit autoriser l'exploration) et `/sitemap.xml`.
- [ ] Google Search Console : valider le domaine et soumettre le sitemap.
- [ ] Créer ou optimiser la fiche Google Business Profile (zone desservie : Montréal / Québec).
- [ ] Tester les données structurées avec l'outil de test des résultats enrichis de Google.
