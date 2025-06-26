import { createEffect, onMount } from 'solid-js';
import '../styles/ExerciseCard.css';

function ExerciseCard(props) {
  let inputRef;
  
  // Focus input when component mounts or when feedback is hidden
  createEffect(() => {
    if (!props.showFeedback && inputRef) {
      inputRef.focus();
    }
  });
  
  onMount(() => {
    if (inputRef) inputRef.focus();
  });
  
  const renderSentence = () => {
    if (!props.exercise) return null;
    
    const { sentence, verb, answer } = props.exercise;
    const parts = sentence.split('_____');
    
    return (
      <div class="sentence">
        <span>{parts[0]}</span>
        {props.showFeedback ? (
          <>
            {props.isCorrect ? (
              <span class="answer-box correct">{answer}</span>
            ) : (
              <>
                <span class="answer-box incorrect">{props.userAnswer}</span>
                <span class="answer-box correct">{answer}</span>
              </>
            )}
          </>
        ) : (
          <span class="input-placeholder">_____</span>
        )}
        <span>{parts[1]}</span>
      </div>
    );
  };
  
  return (
    <div class="exercise-card">
      {renderSentence()}
      
      {!props.showFeedback && (
        <div class="input-section">
          <input
            ref={inputRef}
            type="text"
            class="answer-input"
            value={props.userAnswer}
            onInput={(e) => props.setUserAnswer(e.target.value)}
            onKeyDown={props.onKeyDown}
            placeholder="Type your answer..."
          />
          <button 
            class="submit-button"
            onClick={props.onSubmit}
            disabled={!props.userAnswer.trim()}
          >
            Enter
          </button>
        </div>
      )}
    </div>
  );
}

export default ExerciseCard;