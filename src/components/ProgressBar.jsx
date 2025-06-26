import '../styles/ProgressBar.css';

function ProgressBar(props) {
  const percentage = (props.current / props.total) * 100;
  
  return (
    <div class="progress-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div class="progress-text">
        {props.current} / {props.total}
      </div>
    </div>
  );
}

export default ProgressBar;