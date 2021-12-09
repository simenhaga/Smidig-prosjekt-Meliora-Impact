import { useState } from 'react'
import Bubble from "./components/Bubble";
import 'bulma/css/bulma.min.css';

function App() {
  const [showTags, setShowTags] = useState(true)
  const [tags, setTags] = useState([
    {
      id: 1,
      title: "Women's Rights",
      selected: false
    },
    {
      id: 2,
      title: 'Education',
      selected: false
    }
  ])
  return (
    <div className="main">
      <Bubble tag={tags.at(0)}/>
    </div>
  );
}

export default App;
