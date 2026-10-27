# Capstone Project: Movies Explorer

Build a frontend app that helps someone discover movies, find a title, save movies for later, and keep track of what they have watched.

Use this guide as a roadmap. Choose your own name, visual style, component structure, and movie API. The milestones suggest an approach and provide hints; they do not prescribe one complete solution.

## 1. Your brief

Your finished app must support these four features:

| Feature | What a working version should do |
| --- | --- |
| Display movies | Show an initial collection from an API, with a title, release year when available, and poster or fallback image. |
| Search movies | Let someone search by title, see matching movies, and understand when there are no matches. |
| Add to watchlist | Save a movie to a personal watchlist without creating duplicates. Let the user view that list separately from search results. |
| Mark as watched | Let the user mark a saved movie as watched and view watched movies through a section, tab, or filter. |

For a simple starting rule, a saved movie has one status: **watchlist** or **watched**. Marking it as watched moves it out of the pending watchlist. You may choose a different model if the behavior is clear, consistent, and explained in your README.

This is a frontend project. Your watchlist belongs to your app; you do not need to update a movie provider's user account. Login, a database, streaming movies, and a custom backend are outside the required scope.

### Required tools

- React, created with Vite.
- Tailwind CSS for styling.
- A movie API of your choice.
- Git and GitHub for source control and project documentation.
- Vercel **or** Netlify for a working deployment.

JavaScript is sufficient. TypeScript is welcome if you already understand it. Routing, `fetch` versus Axios, and the way you handle API requests are your choices.

**Redux is optional.** You can complete the whole project with React state and props. Context or `useReducer` are also options if they help. If you have explored Redux Toolkit independently and want to practise it, you may use it as an additional learning challenge. It is not required to complete any feature or submit the project.

## 2. Research before building

Start by answering these questions in a short planning section of your README or a `PLAN.md` file:

1. Who is your app for, and what makes it easy for them to use?
2. Which API will you use, and why?
3. How will you get the initial collection and search results?
4. Does the API allow requests from a browser? Does it need a key, impose request limits, or require attribution?
5. Which fields identify a movie and provide its title, year, and poster?
6. What happens when there is no poster, no result, or a failed request?
7. Which components need access to the same data, and where should that state live?

Read the API's documentation and inspect a real response. Test a request from your local frontend early: a URL working in a browser tab does not by itself prove that JavaScript can fetch it across origins.

**Checkpoint:** You can explain the response shape and identify the exact data your movie card needs.

### API recommendations

| Option | Why choose it? | What to plan for |
| --- | --- | --- |
| [TMDB](https://developer.themoviedb.org/docs/getting-started) | A strong option for a general movie explorer, with [popular movies](https://developer.themoviedb.org/reference/movie-popular-list) and [movie search](https://developer.themoviedb.org/reference/search-movie). | Application authentication, image URLs, and attribution. Read the [authentication guide](https://developer.themoviedb.org/docs/authentication-application) and [usage and attribution requirements](https://developer.themoviedb.org/docs/faq). |
| [OMDb](https://www.omdbapi.com/) | A smaller API surface for title search and movie information. | Requires a key; its [free key option currently lists 1,000 requests per day](https://www.omdbapi.com/apikey.aspx). For the initial screen, use a documented starter search or curated title requests; do not assume a popular-movies endpoint exists. |
| [Studio Ghibli API](https://ghibliapi.vercel.app/) | A small, focused catalog that you can try through the public [films endpoint](https://ghibliapi.vercel.app/films). | It is an unofficial, community-hosted service with a limited catalog. You can fetch the catalog and search titles locally. Verify availability and browser access before committing to it. |

Choose TMDB if you want a broad catalog, OMDb if title search is your main focus, or the Ghibli catalog if you want to keep data fetching small. Another API is acceptable if it supports your project. Check current access conditions before choosing.

**Hint:** With a large catalog, use the provider's search endpoint. With a small complete catalog, filtering the downloaded titles is acceptable. Filtering only one page of a large API response is not a full catalog search; make the search scope clear.

## 3. Plan a small first version

Sketch these three views on paper or in a design tool:

- **Explore:** initial movie collection, search input, and results.
- **Watchlist:** movies saved for later.
- **Watched:** movies already watched.

These can be tabs on one page or separate routes. Choose a layout that works on both a phone and a laptop.

Break the work into small GitHub issues or a task list. A possible component list is `SearchBar`, `MovieCard`, `MovieGrid`, `Watchlist`, and `StatusMessage`. These names and boundaries are suggestions.

**Hint:** Sketch loading, empty, and error states as well as the successful screen. Decide what a button should show after a movie is saved or watched.

**Checkpoint:** You have a wireframe and a short list of tasks that cover all four required features.

## 4. Set up Vite, Tailwind, and GitHub

Create a new project for the capstone, separate from the classroom shop demo. Install a Node.js version supported by the current [Vite setup guide](https://vite.dev/guide/).

```bash
npm create vite@latest movies-explorer -- --template react
cd movies-explorer
npm install
npm install tailwindcss @tailwindcss/vite
```

For the current Tailwind Vite setup, add its plugin alongside the React plugin in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In your main CSS file, start with:

```css
@import "tailwindcss";
```

Make sure that CSS file is imported by your React entry point. Follow the [Tailwind Vite installation guide](https://tailwindcss.com/docs/installation/using-vite) if the setup changes.

```bash
npm run dev
```

Confirm that a Tailwind utility class visibly changes your page before building the rest of the UI.

### Create your repository early

Review `.gitignore` before the first commit. It should exclude `node_modules`, `dist`, and actual environment files. You can add these environment-file rules while keeping a safe example file:

```gitignore
.env
.env.*
!.env.example
```

Create an empty repository on GitHub, then connect your project. Replace `YOUR_USERNAME` with your own account name:

```bash
git init
git add .
git commit -m "Set up Vite, React, and Tailwind"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movies-explorer.git
git push -u origin main
```

Push meaningful commits throughout the project, such as `Display API movie results` or `Add watchlist functionality`. Commit your package lockfile. You may use feature branches and pull requests, especially when working with a partner.

**Checkpoint:** A fresh clone can install dependencies and start the app. Your project is already on GitHub.

## 5. Build the interface with sample data

Create a few temporary movie objects and use them to build a reusable movie card and responsive grid. This lets you work on the interface while learning the API.

Start with a movie shape your components understand:

```js
{
  id: 'a-stable-api-id',
  title: 'Example Movie',
  year: '2024',
  posterUrl: null,
}
```

**Hints:**

- Use the API's stable movie ID, not the array index or title, for identity.
- Map provider-specific fields into your own movie shape in one place.
- Give cards a consistent poster area and a useful missing-image fallback.
- Use real buttons, label the search input, and keep keyboard focus visible.
- Start with a simple mobile layout and add columns at larger widths.

**Checkpoint:** Your layout works with sample data, including a long title and a missing poster. Replace the samples with live data in the next milestone.

## 6. Display and search real movies

First, fetch the initial collection. Once that works, add search.

A simple search form with a **Search** button is enough for the required version. Trim the input, decide what clearing it should do, and show a helpful message when no movies match. Search-as-you-type is optional.

**Hints:**

- Keep request code in a small API module rather than repeating URLs in components.
- Inspect whether the movie array is the response itself, `results`, `Search`, or another field.
- Check both HTTP failures and any error fields returned in the JSON.
- Use `URLSearchParams` or encode search values properly.
- Represent loading, success, empty results, and failure explicitly. Offer a retry where useful.
- A slow earlier search should not overwrite a newer search. Research `AbortController` or request IDs.
- Avoid fetching movie details for every card unless those fields are actually needed.

Using `fetch` with React effects is a suitable starting point. Another request-handling approach is fine if you understand it. Keep the API results separate from the user's saved collection so a new search does not erase saved movies.

### API configuration and keys

If your provider supports browser use and needs client configuration, keep local values in an ignored environment file and commit only a blank `.env.example`. Read frontend configuration through `import.meta.env.VITE_...`.

**A frontend environment variable is not a secret.** Vite includes `VITE_` values in browser code. Ignoring an environment file keeps it out of GitHub; it does not hide a credential from people using the deployed app. Use only credentials the provider permits in browser applications. If a provider requires a private server-side secret, choose another API for this frontend-only brief. See [Vite's environment variable guidance](https://vite.dev/guide/env-and-mode).

**Checkpoint:** Initial movies load, title search works, and the app handles no matches and failed requests without crashing.

## 7. Add the watchlist

Start with an array of saved movies. If several components need it, keep that state in a shared parent and pass down the data and callback functions they need. React's `useState` is enough for this approach.

One possible shape for your saved movies is:

```js
[
  {
    id: 'a-stable-api-id',
    title: 'Example Movie',
    year: '2024',
    posterUrl: null,
    status: 'watchlist',
  },
]
```

Your API results and saved movies should have separate state. Your saved collection must survive a new search: replacing search results should not replace the watchlist.

Suggested functions include `addToWatchlist(movie)` and `markAsWatched(movieId)`. Optional functions might remove a saved movie or move a watched movie back to the watchlist. Choose names that describe what they do.

**Hints:**

- Before adding a movie, check whether its ID is already saved.
- Store enough movie information to render a saved card after search results change.
- Pass callbacks to the buttons that add a movie or change its status.
- Use new arrays and objects when updating React state. Research array spread, `map`, and `filter`.
- When an update depends on the previous state, use the functional form of the state setter.
- Derive pending and watched lists from the saved movies' status.
- Calculate counts from the saved items instead of maintaining separate counts manually.

**Checkpoint:** Adding a movie updates the watchlist and its count everywhere. Adding it again creates no duplicate. Searching for something else leaves saved movies intact.

### Optional self-study: try Redux Toolkit

If you choose Redux Toolkit, install `@reduxjs/toolkit` and `react-redux`, then research `configureStore`, `Provider`, `createSlice`, `useDispatch`, and `useSelector`. A watchlist slice is one possible place to start. Keep API requests and browser storage writes outside reducers.

The [Redux learning video](https://youtu.be/5yEG6GhoJBs?si=A2mRl4ZWTGgOKmut), [Redux Quick Start](https://redux.js.org/tutorials/quick-start), and this repository's shop demo are optional resources. Focus on understanding the approach you choose; you do not need to rewrite a working React-state solution to use Redux.

## 8. Mark movies as watched

Add a clear **Mark as watched** action to saved movies. Update the saved movie's status using its ID and show the change immediately.

For the suggested model, the flow is:

```text
Explore → Add to watchlist → Watchlist → Mark as watched → Watched
```

**Hints:**

- Update the existing saved record rather than adding another copy.
- Decide what happens if someone finds a watched movie in search results again.
- Keep button labels, badges, and counts consistent across views.
- Check how your event handler changes the saved movie's status and how that change reaches each view. If you chose Redux, Redux DevTools can help you inspect it.
- Removing a movie or undoing its watched status are useful optional improvements.

**Checkpoint:** The movie appears in the watched view, leaves the pending list under the suggested model, and has a consistent status wherever it appears.

## 9. Test, polish, and consider persistence

Work through this checklist before deployment:

- [ ] Movies appear on the initial screen.
- [ ] Search finds expected titles; whitespace and no matches are handled.
- [ ] Loading and request errors have clear feedback.
- [ ] A missing or broken poster has a fallback.
- [ ] The same movie cannot be saved twice.
- [ ] New searches do not erase saved movies.
- [ ] Marking a movie as watched updates all relevant views and counts.
- [ ] Empty watchlist and watched views explain what to do next.
- [ ] The app works on a narrow screen and with keyboard navigation.
- [ ] Browser console errors have been investigated.

Write a few focused tests if you can. Good cases include adding a duplicate movie and changing watched status without duplicating the record. These can test user interactions or your state-update functions, depending on your approach. Document the manual checks you performed even if you do not add automated tests.

### Recommended improvement: keep the collection after refresh

In-memory state resets when the page reloads, whether you use React state or Redux. For persistence, research saving the personal collection to `localStorage` and loading it when the app starts. A React effect can save collection changes; handle invalid saved JSON and avoid persisting temporary loading states or errors. If you use reducers, keep storage reads and writes outside them.

This stores data in that browser and origin; it does not sync between devices or between localhost and your deployed site. Explain your chosen refresh behavior in the README. Persistence is encouraged, but it is separate from the four core features.

**Checkpoint:** You can demonstrate the entire required flow without errors and explain what a refresh does.

## 10. Deploy from GitHub

First, verify the production build locally:

```bash
npm run build
npm run preview
```

Fix build errors before deploying. Vite's default build directory is `dist`; `npm run preview` is for checking that build locally. See the [Vite deployment guide](https://vite.dev/guide/static-deploy).

Choose **one** hosting platform:

| Setting | Vercel | Netlify |
| --- | --- | --- |
| Source | Import your GitHub repository | Import your GitHub repository |
| Framework | Vite | Vite, or the detected equivalent |
| Build command | `npm run build` | `npm run build` |
| Output / publish directory | `dist` | `dist` |
| Root directory | The folder containing `package.json` | The folder containing `package.json` |

Follow the official [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite) or [Netlify Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).

Add any permitted frontend environment variables in the host's project settings, using the exact names expected by your code. Configure them for the deployment environments you use, then build again. Changing build-time variables requires a new deployment; it does not update an existing bundle. See [Vercel's environment variable documentation](https://vercel.com/docs/environment-variables) and the [Vite environment guide](https://vite.dev/guide/env-and-mode).

If you chose browser routes such as `/watchlist`, configure a fallback to `index.html` so direct visits and refreshes work. Vercel documents an SPA rewrite in its [Vite guide](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas). Netlify documents the same requirement in its [Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/). Tabs on a single URL do not need route rewrites.

After deploying:

1. Open the live URL and run the four-feature checklist again.
2. Confirm images and API requests use HTTPS and work from the deployed origin.
3. Check direct route refreshes if you added routing.
4. Check the app on a phone or narrow viewport.
5. Push a small improvement to your deployment branch and confirm the connected deployment updates.
6. Add the working live URL to the GitHub repository description and README.

**Checkpoint:** Your live app works independently of your local development server, and its source is on GitHub.

## 11. What to submit

Submit your **GitHub repository URL** and **live deployment URL**. Make the repository accessible to your instructor.

Your README should include:

- Project name and a short description.
- A screenshot and live demo link.
- Required features completed and any optional additions.
- Your API choice, relevant documentation, and required attribution.
- Local setup instructions, including any environment variable names and how to obtain permitted API access. Do not include real credentials.
- A short explanation of where your state lives and how your watchlist and watched updates work. If you chose Redux, explain how you used it.
- Testing performed, refresh behavior, and known limitations.
- One challenge you solved and one improvement you would make next.
- Credits for assets, tutorials, or code you adapted.

Be ready to demonstrate a search, add a result to the watchlist, mark it as watched, and explain how one button click changes state and updates the UI. You can demonstrate this with any of the state-management approaches described above.

## Optional stretch goals

Choose these only after the required flow works:

- Remove saved movies or undo watched status.
- Persist the collection in `localStorage`.
- Add pagination or a load-more button when the API supports it.
- Show a movie details panel or page.
- Add sorting, genre filters, or watched statistics.
- Add debounced search with stale-request handling.
- Add dark mode or more automated tests.
- Explore Redux Toolkit if you want to practise an additional state-management approach.

Your goal is a working app whose decisions you understand. A small, complete project that you can explain is a successful capstone.
