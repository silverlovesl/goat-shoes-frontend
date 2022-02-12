import RouterTemplate from './routes/RouterTemplate';
import './App.scss';

type PageProps = {};

const App: React.FC<PageProps> = (props) => {
  return (
    <div className="App">
      <RouterTemplate {...props}></RouterTemplate>
    </div>
  );
};

export default App;
