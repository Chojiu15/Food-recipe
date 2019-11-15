import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './Recipe'



const App = () => {

  const API_ID = 'bc7a9ea8'
  const API_KEY = 'aeeb79e4ea32cf8eb4687aee4313b164'
  const example = `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`

  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  
  useEffect(() => {
    getRecipe()
  }, [query])

  const getRecipe = () =>{
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)
    .then(response => setRecipe(response.data.hits))
  }

  const getSearch = (event) =>{
    setSearch(event.target.value)
  }

  const changeQuery = (event) =>{
    event.preventDefault()
    setQuery(search)
    setSearch('')
  }


  return (
    <div className="App">
        <form onSubmit={changeQuery} >
          <input type="text" value={search} onChange={getSearch} />
          <button type="submit">Search</button>
        </form>
        {recipe.map(x =>(
          <Recipe key={x.recipe.label} title={x.recipe.label} calories={x.recipe.calories} image={x.recipe.image} />
        ))}
    </div>
  );
}

export default App;
