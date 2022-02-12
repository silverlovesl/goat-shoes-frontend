import { RouteComponentProps } from 'react-router';
import RouterTemplate from './routes/RouterTemplate';
import './App.scss';

type PageProps = {} & RouteComponentProps;

const App: React.FC<PageProps> = (props) => {
  return (
    <div className="App">
      <RouterTemplate {...props}></RouterTemplate>
    </div>
  );
};

export default App;
