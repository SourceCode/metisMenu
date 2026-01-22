# Contributing to MetisMenu

Thank you for your interest in contributing! Open source is built by people like you. ❤️

## Ways to Contribute

- 🐛 Report bugs and issues
- ✨ Suggest features and improvements
- 📖 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the project

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/onokumus/metismenu.git
cd metismenu

# Install dependencies
npm install

# Start development server with watch mode
npm run js:dev

# In another terminal, watch CSS changes
npm run css:dev
```

### Build & Test

```bash
# Run linting
npm run lint

# Run tests
npm test              # Run tests once
npm run test:watch   # Run tests in watch mode

# Build for production
npm run build

# Build specific assets
npm run js:prod    # Build JavaScript
npm run css:prod   # Build CSS
npm run js:umd:min # Minify UMD
npm run js:esm:min # Minify ESM
npm run css:min    # Minify CSS
```

## Reporting Issues

### Before Creating an Issue

- Check if the issue already exists
- Review the [README](../README.md)
- Test with the latest version

### Issue Guidelines

Please provide:

- **Version**: Which version of MetisMenu are you using?
- **Browser/Environment**: Where does the issue occur?
- **Steps to reproduce**: Clear steps to reproduce the issue
- **Expected behavior**: What should happen?
- **Actual behavior**: What actually happens?
- **Code example**: If applicable, provide a minimal reproduction

## Pull Requests

### Before Starting

1. Fork the repository
2. Create a branch from `master`: `git checkout -b feature/your-feature-name`
3. Keep commits focused and atomic

### Code Standards

- Follow the existing code style
- Use ES6+ features
- Add comments for complex logic
- Ensure no console warnings/errors

### PR Checklist

- [ ] Code follows project style
- [ ] Tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] No breaking changes or documented
- [ ] Documentation updated if needed
- [ ] Commit messages are clear

### Commit Messages

Use descriptive commit messages:

```
feat: add new feature description
fix: resolve bug description
docs: update documentation
style: format code
refactor: reorganize code structure
test: add tests
chore: update dependencies
```

## Questions?

- Open an issue with the `question` label
- Check [Stack Overflow](http://stackoverflow.com/questions/tagged/metismenu)

## Code of Conduct

Be respectful and inclusive. We're all here to help each other build something great.
