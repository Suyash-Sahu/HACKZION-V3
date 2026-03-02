# Update Project Information

Replace all placeholders with your actual information:

## Files to Update:

1. **package.json** - Update these fields:
   - `author`: "YOUR_NAME <your.email@example.com>"
   - `repository.url`: "https://github.com/YOUR_USERNAME/hackzion.git"
   - `bugs.url`: "https://github.com/YOUR_USERNAME/hackzion/issues"
   - `homepage`: "https://YOUR_USERNAME.github.io/hackzion"

2. **LICENSE** - Update:
   - Replace "YOUR_NAME" with your actual name

3. **Footer.jsx** - Update:
   - Replace "YOUR_NAME" with your actual name

## Steps to Push to New Repository:

1. Create a new repository on GitHub named "hackzion" (or your preferred name)

2. Update the git remote:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/hackzion.git
   ```

3. Install gh-pages for deployment (if you want to deploy to GitHub Pages):
   ```bash
   npm install --save-dev gh-pages
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Update project information and prepare for new repository"
   ```

5. Push to your new repository:
   ```bash
   git push -u origin main
   ```

6. To deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Additional Customization:

- Update the README.md with your project description
- Add your own images/logos to replace placeholders
- Customize colors and content to match your branding
- Update meta tags in index.html with your information