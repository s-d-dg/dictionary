import styles from './App.module.css';
import Content from './components/content/content';
import Header from './components/header/header';

function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <Content />
    </div>
  );
}

export default App;
