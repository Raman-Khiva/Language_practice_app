import FlashCard from '@/components/cards/FlashCard'

const flashCards = [
  {
    tag: 'Did you know',
    fact: 'There are over 7,000 languages spoken worldwide, but more than half of the population speaks just 23 of them.',
    accentColor: 'rgb(240, 240, 248)',
    iconKey: 'sparkles',
  },
  {
    tag: 'Translation',
    fact: '“ありがとう” (arigatō) is a versatile way to say “thank you” in Japanese, fitting both casual and polite settings.',
    accentColor: 'rgb(232, 244, 255)',
    iconKey: 'globe',
  },
  {
    tag: 'Fun fact',
    fact: (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-rose-400">
          English quirk
        </span>
        <h2 className="text-3xl font-extrabold tracking-wide text-rose-600">“DREAMT”</h2>
        <p className="text-sm text-slate-600">The only English word ending in “mt”.</p>
        <span className="mt-2 h-1 w-16 rounded-full bg-rose-400/80"></span>
      </div>
    ),
    accentColor: 'rgb(255, 240, 246)',
    iconKey: 'heart',
    iconToneClass: 'text-rose-600',
    iconBackgroundClass: 'bg-rose-50',
    iconGlowClass: 'shadow-[0_0_16px_rgba(244,114,182,0.35)]',
    headerTextClass: 'text-sm font-semibold uppercase tracking-wide text-rose-700',
    backContent: '“Dreamt” is one of the few English words where the past tense keeps the same number of syllables as its present form “dream”.',
  },
  {
    tag: 'Word of the day',
    fact: (
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Serendipity</h2>
        <p className="text-sm italic text-slate-500">/seh-ren-DIP-ih-tee/</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded-full">
            noun
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true"></span>
        </div>
        <p className="text-base text-slate-600">
          A happy discovery made by chance—capture it in a sentence today.
        </p>
      </div>
    ),
    accentColor: 'rgb(255, 249, 235)',
    iconKey: 'book',
  },
  {
    tag: 'Culture note',
    fact: 'In Spain, “la sobremesa” describes the lingering conversation that happens after a meal—it’s considered a cherished ritual.',
    accentColor: 'rgb(240, 250, 240)',
    iconKey: 'message',
  },
  {
    tag: 'Learning tip',
    fact: 'Spend five minutes each morning reviewing phrase “chunks” like “How long have you…?” to build automatic speaking patterns.',
    accentColor: 'rgb(238, 248, 242)',
    iconKey: 'trend',
  },
  {
    tag: 'Did you know',
    fact: 'Mandarin Chinese uses four main tones. The same syllable can change meaning completely depending on tone.',
    accentColor: 'rgb(240, 240, 248)',
    iconKey: 'sparkles',
  },
  {
    tag: 'Translation',
    fact: '“नमस्ते” (namaste) literally means “I bow to you,” offering a respectful and warm greeting in Hindi.',
    accentColor: 'rgb(232, 244, 255)',
    iconKey: 'globe',
  },
  {
    tag: 'Fun fact',
    fact: (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-base text-slate-700">The Japanese have a word for death by overwork:</p>
        <span className="text-3xl font-semibold text-rose-600">“Karoshi”</span>
        <div className="mt-2 flex w-full max-w-xs items-center gap-3 text-xs font-medium uppercase tracking-wide text-rose-400">
          <span className="flex-1 h-0.5 rounded-full bg-rose-100"></span>
          <span>Japanese Culture</span>
          <span className="flex-1 h-0.5 rounded-full bg-rose-100"></span>
        </div>
      </div>
    ),
    accentColor: 'rgb(255, 240, 246)',
    iconKey: 'heart',
    iconToneClass: 'text-rose-600',
    iconBackgroundClass: 'bg-rose-50',
    iconGlowClass: 'shadow-[0_0_16px_rgba(244,114,182,0.35)]',
    headerTextClass: 'text-sm font-semibold uppercase tracking-wide text-rose-700',
    backContent: 'Karoshi entered popular use in Japan in the 1970s and is used to spotlight the health risks of extreme work culture.',
  },
  {
    tag: 'Word of the day',
    fact: (
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Saudade</h2>
        <p className="text-sm italic text-slate-500">/saw-DAH-jee/</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded-full">
            noun
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true"></span>
        </div>
        <p className="text-base text-slate-600">
          A Portuguese feeling of soulful longing for someone or something distant.
        </p>
      </div>
    ),
    accentColor: 'rgb(255, 249, 235)',
    iconKey: 'book',
  },
  {
    tag: 'Pronunciation tip',
    fact: 'Practice French “r” sounds by lightly gargling air at the back of your throat; start slowly, then add real words.',
    accentColor: 'rgb(240, 248, 255)',
    iconKey: 'mic',
  },
  {
    tag: 'Did you know',
    fact: 'Arabic script is written from right to left, while numbers are still written from left to right in the same line.',
    accentColor: 'rgb(240, 240, 248)',
    iconKey: 'sparkles',
  },
  {
    tag: 'Translation',
    fact: 'The Swahili phrase “Hakuna Matata” is a cheerful way to say “no worries.”',
    accentColor: 'rgb(232, 244, 255)',
    iconKey: 'globe',
  },
  {
    tag: 'Fun fact',
    fact: (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-2xl font-semibold text-rose-600">Icelandic Wordcraft</h2>
        <p className="text-sm text-slate-600">
          Icelandic creates new words by combining existing ones, keeping the language closely tied to its roots.
        </p>
        <span className="mt-3 h-0.5 w-20 rounded-full bg-rose-200"></span>
      </div>
    ),
    accentColor: 'rgb(255, 240, 246)',
    iconKey: 'heart',
    iconToneClass: 'text-rose-600',
    iconBackgroundClass: 'bg-rose-50',
    iconGlowClass: 'shadow-[0_0_16px_rgba(244,114,182,0.35)]',
    headerTextClass: 'text-sm font-semibold uppercase tracking-wide text-rose-700',
  },
  {
    tag: 'Learning tip',
    fact: 'Record yourself speaking for one minute each day. Reviewing the clip helps you hear progress and catch pronunciation gaps.',
    accentColor: 'rgb(238, 248, 242)',
    iconKey: 'trend',
  },
]

export default function FlashCardPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Language Learning Flash Facts
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Tap into quick linguistic trivia to stay curious and motivated.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {flashCards.map(({ fact, tag, iconKey, accentColor }, index) => (
            <FlashCard
              key={index}
              fact={fact}
              tag={tag}
              iconKey={iconKey}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
