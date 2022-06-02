import './Header.css'

const Header = () => {
    return (
      <nav className="product-filter">
        <h1>Jackets</h1> <div className="sort">
        <div className="collection-sort">
        <label>Filter by:</label>
        <select>
          <option value="/">All Jackets</option>
          <option value="/">2016</option>
          <option value="/">jacket</option>
          <option value="/">Jackets</option>
          <option value="/">layers</option>
          <option value="/">Obermeyer</option>
          <option value="/">Roxy</option>
          <option value="/">womens</option>
        </select>
        
      </div><div className="collection-sort">
        <label>Filter by:</label>
        <select>
          <option value="/">All Jackets</option>
          <option value="/">2016</option>
          <option value="/">jacket</option>
          <option value="/">Jackets</option>
          <option value="/">layers</option>
          <option value="/">Obermeyer</option>
          <option value="/">Roxy</option>
          <option value="/">womens</option>
        </select>
        
      </div>
      </div>
      </nav>
    );
  };

  export default Header;