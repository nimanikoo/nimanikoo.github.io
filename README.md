# Personal Portfolio Website

A production-ready personal website for a senior backend engineer, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Clean, Dark Theme Design** - Senior-level, minimal UI with professional appearance
- **Fully Responsive** - Mobile-first design that works on all devices
- **Data-Driven Architecture** - All content loaded from `data.json`
- **GitHub Projects Integration** - Automatically fetches and displays your top 6 GitHub repositories
- **No Dependencies** - Pure HTML, CSS, and Vanilla JavaScript
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Fast Performance** - Lightweight and optimized for speed

## Project Structure

```
.
├── index.html       # Main HTML file with semantic markup
├── style.css        # Responsive dark theme styles
├── app.js           # Modular JavaScript application
├── data.json        # Personal data and content
├── .gitignore       # Git ignore patterns
└── README.md        # This file
```

## Customization

Edit `data.json` to customize:
- Personal information (name, title, contact)
- About section
- Skills and skill categories
- Work experience and job descriptions
- GitHub username for repository display

Example:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "email": "your@email.com",
    "github": "yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  },
  "about": "Your about text...",
  "skills": [...],
  "experience": [...]
}
```

## Deployment to GitHub Pages

### Prerequisites
- GitHub account
- Git installed locally

### Steps

1. **Create a new GitHub repository** named `yourusername.github.io`

2. **Configure Git user** (if not already done):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

3. **Add remote repository**:
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   ```

4. **Stage and commit files**:
   ```bash
   git add .
   git commit -m "Initial commit: Personal portfolio website"
   ```

5. **Push to main branch**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

6. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Save

7. **Access your site** at: `https://yourusername.github.io`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Page load time: < 1s
- No external frameworks
- Minified CSS and optimized images
- Efficient GitHub API calls with caching

## License

MIT License - Feel free to use this as a template for your own portfolio.

## Contact

For questions or improvements, feel free to open an issue or submit a pull request.
