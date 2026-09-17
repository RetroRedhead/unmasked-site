# The Unmasked Standard, website

You do not need to understand any of the code in here. You need this file and about forty minutes, once.

## What this is

Your homepage, split so the words live in one place and the design lives in another. When you change a word, the site rebuilds itself and goes live in about thirty seconds. You never open a code editor.

## Setup, in order

### 1. GitHub account

Go to github.com and sign up. Free. Use the business email.

### 2. Make the repository

Click the **+** in the top right, then **New repository**.

- Name it exactly `unmasked-site`
- Set it to **Private**
- Do not tick any of the "add a README" boxes
- Click **Create repository**

On the next screen click **uploading an existing file**. Select everything in this folder and drag it in. Click **Commit changes**.

There is no hidden file to hunt for. Every file you can see is a file you upload.

Optional, and only if you feel like it: after the upload, click `gitignore.txt`, then the pencil icon, then rename it to `.gitignore` (with the dot, no `.txt`). It stops clutter from ever getting committed later. Skipping it changes nothing today.

### 3. Tell the CMS your username

In GitHub, open `src/admin/config.yml`, click the pencil icon, and change this line:

```
repo: YOUR-GITHUB-USERNAME/unmasked-site
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username. Commit.

### 4. Connect Cloudflare Pages

In your Cloudflare dashboard go to **Workers and Pages**, then **Create**, then **Pages**, then **Connect to Git**. Authorise GitHub and pick `unmasked-site`.

Set these two build fields and nothing else:

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `_site` |

Click **Save and Deploy**. Two minutes later you have a live address ending in `.pages.dev`.

### 5. Point your domain at it

In the Pages project, **Custom domains**, **Set up a domain**, type `unmaskedstandard.org`. If the domain is already in your Cloudflare account it wires itself up. If it is somewhere else, Cloudflare tells you exactly which records to change.

### 6. Turn on the edit screen

This is the one fiddly step and it is a one-time thing.

Sveltia CMS needs permission to save your edits back to GitHub. Deploy the free authentication helper:

1. Go to `github.com/sveltia/sveltia-cms-auth` and follow its readme. It walks you through deploying a small Cloudflare Worker and creating a GitHub OAuth app.
2. When GitHub asks for the **Authorization callback URL**, paste the Worker address it gives you, ending in `/callback`.
3. Come back to Cloudflare Pages, open your `unmasked-site` project, **Settings**, **Environment variables**, and add the Worker address exactly as the readme specifies.

If this step stalls, send me the error and I will walk you through it.

## Using it, forever after

Go to **unmaskedstandard.org/admin**. Sign in with GitHub. You will see two things:

- **Site settings** for the name, tagline and footer
- **Homepage** for everything on the page, including all the prices and the ThriveCart links

Change something, click **Publish**. The site rebuilds and goes live in about thirty seconds.

## Where to paste your ThriveCart links

Admin, Homepage, Pricing by path. Each offer has a **ThriveCart checkout link** field. Paste the checkout URL from ThriveCart into it. There are two sets, one for the stylist tab and one for the owner tab, so the $47 kit link needs pasting in both places.

## Where to point the email signup

Admin, Homepage, **Email tool form URL**. Paste the form action URL from MailerLite or ConvertKit there and the signup box starts working. Until you do, the form does nothing.

## Changing the design rather than the words

Colours, spacing and layout live in `src/css/main.css`. That one is mine. Ask me.
