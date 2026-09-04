## 0. Accept your GitHub collaborator invite

Before you do anything else, you need to accept the invite to your own
repository — without this you won't be able to clone it or submit work.

1. Look for an e-mail from GitHub (check spam/promotions too) or a
   notification on [github.com/notifications](https://github.com/notifications)
   inviting you to collaborate on
   `CSA-Computer-Science-Association/Yourname-taskname`.
2. Click the invite link in the e-mail/notification, or go directly to
   `https://github.com/CSA-Computer-Science-Association/Yourname-taskname`
   while logged in — GitHub will show a banner with an **Accept
   invitation** button. Click it.
3. Once accepted, the repo should show up under **your** GitHub
   account's repository list, and you'll be able to see and clone it.

If you don't have a GitHub account yet, make one first at Step 3
below, tell us your username, and we'll send the invite.

**Didn't get an invite / think it expired?** Message us your GitHub
username and we'll resend it — invites can expire after a few days.

## 1. One-time setup

If you've never used Git, GitHub, or Node.js before, follow every step
below in order. It looks long but each step is just copy-paste (your
current AI experience is enough for this).

### Step 1 — Install Git

Git is the tool that lets you download ("clone") this project to your
laptop and, later, submit your work.

- **Windows:** download and run the installer from
  [git-scm.com/download/win](https://git-scm.com/download/win). Keep
  clicking "Next" with the default options.
- **Mac:** open the **Terminal** app (search for it with Spotlight,
  `Cmd + Space`) and type:
  ```
  git --version
  ```
  If it's not installed, macOS will prompt you to install the
  "Command Line Developer Tools" — click Install.
- **Linux:** open a terminal and run:
  ```
  sudo apt-get install git
  ```

**Check it worked:** open a terminal (Windows: search for "Git Bash"
in the Start menu and open that) and type:
```
git --version
```
You should see something like `git version 2.43.0`.
If you see an error, restart your computer and try again before asking for help.

### Step 2 — Install Node.js (and npm)

The backend in this project is a Node.js/Express server, so you'll
need Node.js and its package manager, npm.

- Go to [nodejs.org](https://nodejs.org/) and download the **LTS**
  version for your OS. npm comes bundled with it automatically.

**Check it worked:** in a terminal, run:
```
node --version
npm --version
```
You should see version numbers for both (e.g. `v20.11.0` and `10.2.4`).

### Step 3 — Get a GitHub account

If you don't already have one, make a free account at
[github.com/join](https://github.com/join). You'll need this to
receive the project and, later, to submit your work and ask us to
review your code.

### Step 4 — Clone the repo (download it to your laptop)

"Cloning" just means downloading a copy of the project folder,
including its full history, to your computer.

1. Open the repo page on GitHub (link will be shared with you).
2. Click the green **`< > Code`** button, and copy the HTTPS URL
   shown (it looks like `https://github.com/your-org/repo-name.git`).
3. Open a terminal, navigate to wherever you want the project folder
   to live (e.g. your Desktop), and run:
   ```
   cd Desktop
   git clone https://github.com/your-org/repo-name.git
   cd repo-name
   ```
   (Replace the URL with the one you copied.)

You now have the project folder on your machine, with `backend/` and
`frontend/` subfolders. You'll need to `cd repo-name` again every time
you open a fresh terminal window.

### Step 5 — Install the backend dependencies

From inside the `repo-name` folder, move into `backend/` and install:
```
cd backend
npm install
```
This reads `backend/package.json` and downloads `express` (already
listed) into a `node_modules` folder. You'll also need to add a
database SDK later (e.g. `npm install mongodb` for MongoDB Atlas, or
`npm install @supabase/supabase-js` for Supabase) — see the main
`README.md`'s Learning Resources section for which service to pick.

**Check it worked:** still inside `backend/`, run:
```
node index.js
```
You should see `Example app listening on port 3000` printed in the
terminal. Press `Ctrl + C` to stop it.

### Step 6 — Run the frontend alongside the backend

The `frontend/` folder (`index.html`, `script.js`, `style.css`) is
plain HTML/JS — no build step required.

1. Keep your backend running in one terminal (`node index.js` inside
   `backend/`).
2. Open a **second** terminal window, `cd` into `repo-name/frontend`,
   and open `index.html` directly in your browser (double-click it in
   your file explorer), or serve it with any simple static server if
   you prefer (e.g. the VS Code "Live Server" extension).
3. Both need to be running **at the same time** for the form on the
   page to be able to talk to your backend.

---

## Troubleshooting

- **`git`/`node`/`npm` not recognized** — usually means a step above
  didn't finish correctly, or you need to restart your terminal (or
  your whole computer) after installing.
- **`npm install` fails or hangs** — check your internet connection,
  or delete `node_modules` and `package-lock.json` inside `backend/`
  and try again.
- **`node index.js` errors immediately** — read the last line of the
  error message; it usually names the exact problem (e.g. a missing
  library — install it with `npm install <name>`, or "port already in
  use" — close whatever else is using port 3000, or change the `port`
  variable in `index.js`).
- **Frontend form doesn't reach the backend / CORS errors in the
  browser console** — make sure the backend is actually running, and
  that `script.js` is pointing at the right URL/port for your backend.
- **Still stuck** — come to us with the exact error message
  copy-pasted (a screenshot works too). "It doesn't work" is much
  harder to debug than the actual error text.

---

## Quick command reference

| What you want to do              | Command                                  |
|-----------------------------------|-------------------------------------------|
| Check Git is installed            | `git --version`                           |
| Check Node/npm is installed       | `node --version && npm --version`         |
| Go into the project folder        | `cd repo-name`                            |
| Install backend dependencies      | `cd backend && npm install`               |
| Install a library                 | `npm install <library-name>`              |
| Run the backend                   | `node index.js` (inside `backend/`)       |
| Run the frontend                  | Open `frontend/index.html` in a browser   |
| Create your assignment branch     | `git checkout -b solution-task-1`         |
| Save your progress (commit)       | `git add . && git commit -m "msg"`        |
| Push your branch (first time)     | `git push -u origin solution-task-1`      |
| Push your branch (after that)     | `git push`                                |
| Submit for review                 | Open a Pull Request on GitHub, tag `@your-handle` |

---

## Submitting your work

We review submissions through **Pull Requests (PRs)**, not by pushing
straight to `main`. This keeps your changes isolated and lets us
comment directly on your code. Follow these steps for **every**
assignment/task.

### Step 1 — Create a new branch (per assignment)

A branch is just a separate "version" of the repo where your changes
live until they're reviewed. Name it something like
`solution-task-1` (use the actual task name/number).

- **Via Git CLI** (inside the `repo-name` folder in your terminal):
  ```
  git checkout -b solution-task-1
  ```
  This creates the branch and switches you onto it in one step.
- **Via the GitHub website:** open your repo, click the branch
  dropdown (usually says `main`), type the new branch name
  (e.g. `solution-task-1`), and click **Create branch**.

**Check it worked:** run `git branch` in your terminal — the branch
with a `*` next to it is the one you're currently on. Make sure
that's your new branch, not `main`, before you start editing.

### Step 2 — Do the task and commit your changes

Write/edit your backend and frontend files as normal. Once you're
happy with a chunk of progress, save it as a commit:
```
git add .
git commit -m "my solution for task 1"
git push -u origin solution-task-1
```
- `git add .` stages all your changed files.
- `git commit -m "..."` saves a snapshot with a short message.
- `git push -u origin solution-task-1` uploads your branch to GitHub
  (the `-u` only needs to be there the *first* time you push this
  branch; after that, plain `git push` works).

If `git push` asks you to log in, use your GitHub username and, when
prompted for a password, a **Personal Access Token** instead of your
actual password (GitHub will show a link explaining how to create one
the first time this happens).

**Important — never commit secrets:** your database connection
string/API key should go in a `.env` file, and that file should be
listed in `.gitignore` so it's never pushed to GitHub. Also add
`node_modules/` to `.gitignore` if it isn't already there — it's large
and regenerated automatically by `npm install`.

You can repeat this step (edit → add → commit → push) as many times
as you like while working — you don't need to wait until you're
completely done to push.

### Step 3 — Open a Pull Request

Once your branch is pushed and you're ready for review:

1. Go to your repo on GitHub — you should see a banner suggesting you
   open a Pull Request for your recently pushed branch. Click
   **Compare & pull request**. (If you don't see the banner, go to
   the **Pull requests** tab → **New pull request**, and set the
   base branch to `main` and the compare branch to your
   `solution-task-1` branch.)
2. Give the PR a short, clear title (e.g. "Task 1 solution").
3. In the PR description, include your **deployed working URL** and a
   clear explanation of your thought process — as asked for in the
   main `README.md`.
4. Tag your reviewer by typing `@` followed by their GitHub handle
   (e.g. `@your-handle`) in the description — or add them under
   **Reviewers** in the sidebar on the right.
5. Click **Create pull request**.

That's it — we'll get notified and review your code directly on the
PR. If we leave comments asking for changes, just make more commits
on the same branch and push again; they'll automatically show up on
the same PR.
