import {useState, UseState} from 'react'
import Bubble from "./components/Bubble";

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
    <div>
      <Bubble/>
    </div>
  );
}

export default App;
