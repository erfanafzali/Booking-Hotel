import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) <p>Loading...</p>;
  return (
    <div>
      <h2>Nearby Location</h2>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div>
                <p>{item.smart_location}</p>
                <p>{item.name}</p>
                <p>€ &nbsp;{item.price}&nbsp;</p>
                <span>night</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
