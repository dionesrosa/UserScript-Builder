# User Script Builder

A modern CLI toolkit for creating, building and releasing browser UserScripts.

## 🚀 Features

- Build UserScripts automatically
- Generate Tampermonkey metadata
- Bundle project files
- Version management
- Local release flow
- Publish automation (future)

## 📦 Installation

```bash
npm install
````

## 🔨 Usage

Build your UserScript:

```bash
usb build
```

Create a local release:

```bash
usb release patch
usb release minor
usb release major
```

Publish the built script to the configured destination:

```bash
usb publish
```

`usb publish` requires a clean Git working tree.

## 📁 Project Structure

Example:

```
my-userscript/
├── src/
│   └── index.js
├── dist/
├── userscript.config.json
└── package.json
```

## 🛠 Development

Clone the repository:

```bash
git clone https://github.com/dionesrosa/userscript-builder.git
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

## 📄 License

MIT License
