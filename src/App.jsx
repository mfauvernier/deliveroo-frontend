import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

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
            <div className="container">
              <div className="column-left">
                {data.categories.map((elem) => {
                  // console.log(elem);
                  if (elem.meals.length !== 0) {
                    return (
                      <div key={elem.name}>
                        <h2>{elem.name}</h2>
                        <div className="menu">
                          {elem.meals.map((elem2) => {
                            // console.log(elem2);
                            return (
                              <section
                                key={elem2.id}
                                className="item"
                                onClick={() => {
                                  const itemsTab = [...items];
                                  // console.log(itemsTab);
                                  // console.log(elem2);
                                  itemsTab.push({
                                    title: elem2.title,
                                    price: elem2.price,
                                    id: elem2.id,
                                  });
                                  setItems(itemsTab);
                                  // console.log(itemsTab);
                                }}
                              >
                                <div className="item-details">
                                  <h3>{elem2.title}</h3>
                                  {elem2.description && (
                                    <p className="short">{elem2.description}</p>
                                  )}
                                  <div className="price">
                                    <p>{elem2.price} €</p>
                                    {elem2.popular && (
                                      <p className="star">
                                        <FaStar /> Populaire
                                      </p>
                                    )}
                                  </div>
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
                  }
                })}
              </div>
              <div className="column-right">
                <div className="panier">
                  <button>Valider mon panier</button>
                  <div>
                    {!items ? (
                      <p className="empty">Votre panier est vide</p>
                    ) : (
                      <section>
                        <div className="list">
                          {items.map((item) => {
                            // console.log(item);
                            return (
                              <div key={item.id}>
                                <p>
                                  {item.title} {item.price}€
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          {/* {console.log(items)} */}
                          <p>Sous-Total </p>
                          <p>Frais de livraison</p>
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
