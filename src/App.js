import {useState, UseState} from 'react'
import Bubble from "./components/Bubble";
import 'bulma/css/bulma.min.css';

function App() {
  const [showTags, setShowTags] = useState(true)
  const [tags, setTags] = useState([
    {
      id: 1,
      title: "Women's Rights"
    },
    {
      id: 2,
      title: 'Education'
    }
  ])
  return (
    <div classname="main">
      <Bubble title={'test'}/>
    </div>
  );
}

export default App;
