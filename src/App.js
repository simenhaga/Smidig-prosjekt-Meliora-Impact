import { useState } from 'react'
import Bubble from "./components/Bubble";
import 'bulma/css/bulma.min.css';

function App() {
  const [showTags, setShowTags] = useState(true)
  const [tags, setTags] = useState([
    {
      id: 1,
      title: "Women's Rights",
      selectionType: 0
    },
    {
      id: 2,
      title: 'Education',
      selectionType: 0
    }
  ])

  const toggleSelected = (id) => {
      setTags(tags.map((tag) =>
        tag.id === id ? {...tag, selectionType:
        tag.selectionType === 2 ? 0 : ++tag.selectionType} : tag
      ))
  }

  const toggleFavorite = (id) => {
    setTags(tags.map((tag) => 
      tag.id === id ? {...tag, selectionType: 0} : tag
    ))
  }
  
  

  return (
    <div className="main">
      <Bubble tag={tags.at(0)} setSelected={toggleSelected} setFavorite={toggleFavorite}/>
    </div>
  );
}

export default App;
