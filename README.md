# AI Portuguese Verbs

An AI-powered Portuguese verb conjugation practice app built with SolidJS.

## Features

- 📚 **300 Most Common Verbs** - Learn the verbs that matter most, ordered by frequency
- 🤖 **AI-Generated Exercises** - Unique, contextual sentences every time
- 📈 **Adaptive Learning** - Automatically focuses on verbs you struggle with
- 🎯 **Multiple Tenses** - Practice presente, pretérito perfeito, imperfeito, and futuro
- 📝 **Anki Integration** - Export mistakes as Anki cards for spaced repetition
- 🌙 **Dark Theme** - Easy on the eyes during long practice sessions

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

3. Configure AI (optional)
```bash
cp .env.example .env
# Edit .env to add your OpenAI API key
```

4. Start the development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## AI Configuration

The app supports two AI modes:

- **Mock Mode** (default) - Uses pre-defined templates for offline practice
- **OpenAI Mode** - Generates dynamic exercises using GPT-3.5/GPT-4

To enable OpenAI:
1. Get an API key from https://platform.openai.com
2. Add it to your `.env` file
3. Set `VITE_AI_MODE=openai`

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

## License

MIT