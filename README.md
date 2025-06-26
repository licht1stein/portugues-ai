# Portuguese with Myke

An AI-powered Portuguese verb conjugation practice app built with SolidJS.

> 🤖 **Note**: This repository is an experiment in AI-assisted coding, built entirely through conversation with Claude. Despite its experimental nature, it's proven to be quite useful for learning Portuguese verb conjugations!

## Features

- 📚 **300 Most Common Verbs** - Learn the verbs that matter most, ordered by frequency
- 🤖 **AI-Generated Exercises** - Unique, contextual sentences every time (optional)
- 📈 **Adaptive Learning** - Automatically focuses on verbs you struggle with
- 🎯 **Multiple Tenses** - Practice presente, pretérito perfeito, imperfeito, and futuro
- 📝 **Anki Integration** - Export mistakes as Anki cards for spaced repetition
- 🌙 **Dark Theme** - Easy on the eyes during long practice sessions
- 🔒 **Privacy First** - Fully client-side app, API keys stored locally in browser

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/licht1stein/portugues-ai.git
cd portugues-ai
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## AI Configuration

The app automatically detects whether to use AI based on the presence of an OpenAI API key:

- **Practice Mode** (default) - Uses pre-defined templates with dark, emotionally charged themes
- **AI Mode** - Generates dynamic exercises using OpenAI's GPT models

To enable AI Mode:
1. Get an API key from https://platform.openai.com
2. Go to the Settings page in the app
3. Enter your API key in the secure input field
4. The app will automatically switch to AI Mode

Your API key is stored locally in your browser's localStorage and is never sent to any server except OpenAI's API.

## How It Works

1. **Choose Your Settings** - Select tense, verb type (regular/irregular), and session length
2. **Practice** - Fill in the blanks with correct conjugations
3. **Get Feedback** - See corrections and translations immediately
4. **Track Progress** - The app learns which verbs you struggle with
5. **Export to Anki** - Copy mistake cards for later review

## Adaptive Algorithm

The app uses a smart selection algorithm:
- 40% problem verbs (high error rate)
- 40% frequency-based selection
- 20% random for variety

Verbs you master move to lower priority, while problem verbs appear more often.

## Tech Stack

- **SolidJS** - Reactive UI framework
- **Vite** - Fast build tool
- **AI Integration** - OpenAI API (optional)
- **Local Storage** - Progress tracking

## Contributing

Pull requests are welcome! Please check the issues page for current tasks.

## Deployment

This app is deployed on GitHub Pages and available at [pt.myke.blog](https://pt.myke.blog).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.