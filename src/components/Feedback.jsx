import { onMount, onCleanup, createSignal } from 'solid-js';
import '../styles/Feedback.css';

function Feedback(props) {
  const [copied, setCopied] = createSignal(false);
  let panelRef;
  
  const handleCopyAnki = () => {
    // Format as org-mode Anki card
    const ankiCard = `#+begin_anki :deck Portugues :type Basic
  * Front
    ${props.exercise.sentence}
  * Back
    ${props.exercise.answer}
#+end_anki`;
    
    navigator.clipboard.writeText(ankiCard);
    
    // Flash visual feedback
    setCopied(true);
    panelRef.classList.add('flash-copy');
    setTimeout(() => {
      setCopied(false);
      panelRef.classList.remove('flash-copy');
    }, 600);
  };
  
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      handleCopyAnki();
    }
  };
  
  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);
  });
  
  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
  
  return (
    <div ref={panelRef} class={`feedback-panel ${props.isCorrect ? 'correct' : 'incorrect'}`}>
      {!props.isCorrect && (
        <div class="feedback-header">
          The correct answer is: <span class="correct-answer">{props.exercise.answer}</span>
        </div>
      )}
      
      <div class="translation">
        <span class="translation-label">Translation:</span> {props.exercise.translation}
      </div>
      
      <div class="feedback-actions">
        <span class="shortcut-hint">
          Press Enter to continue • Ctrl+C to copy Anki card
          {copied() && <span class="copy-indicator"> ✓ Copied!</span>}
        </span>
      </div>
    </div>
  );
}

export default Feedback;