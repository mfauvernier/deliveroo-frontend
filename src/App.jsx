import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/");
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Chargement ...</p>
      ) : (
        <>
          <header>
            <div className="top-header">
              <img
                src="src/assets/images/favicon-32x32.png"
                alt="deliveroo-logo"
              />
              <span>Deliveroo</span>
            </div>
            <div className="restaurant">
              <div className="restaurant-infos">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt="restaurant-picture" />
            </div>
          </header>
          <main>
            <div className="all">
              {data.categories.map((elem) => {
                // console.log(elem);
                return (
                  <div key={elem.name}>
                    <h2>{elem.name}</h2>
                    <div className="menu">
                      {elem.meals.map((elem2) => {
                        // console.log(elem2);
                        return (
                          <section className="item">
                            <div className="item-details">
                              <h3>{elem2.title}</h3>
                              {elem2.description && (
                                <p className="short">{elem2.description}</p>
                              )}
                              <p>{elem2.price} €</p>
                            </div>
                            {elem2.picture && (
                              <img src={elem2.picture} alt="" />
                            )}
                          </section>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
