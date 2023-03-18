import styles from './App.module.css';
import Content from './components/content/content';

function App() {
  return (
    <div className={styles.layout}>
      <h1>Dictionary</h1>
      <Content />
    </div>
  );
}

export default App;
