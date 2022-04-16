import { useEffect, useState } from 'react';

function Alert({ city, isLoaded, results, cityCoordinates }) {
 
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if(isLoaded && cityCoordinates !== null && cityCoordinates !== undefined) {
            const country = results?.sys.country
            if(country === 'US') {
                const url = `https://api.weather.gov/alerts/active?status=actual&message_type=alert&point=${cityCoordinates.lat}%2C${cityCoordinates.lon}`
                fetch(url)
                .then((res) => res.json())
                .then(
                    (result) => {
                        let title = result?.features[0]?.properties?.parameters?.NWSheadline[0]
                        title = title.toLowerCase().split(' ')
                        title.forEach((word, index) => {
                            if(word.length > 1) {
                                title[index] = word.slice(0,1).toUpperCase() + word.slice(1)
                            }
                        });
                        title = title.join(' ')
                        const desc = result?.features[0]?.properties.description
                        console.log(desc)
                        setAlert({title: title, description: desc})      
                    }, 
                    (error) => {
                        console.log(error)
                    }
                )
            } else {
                console.log('INTERNATIONAL')
            }
        }
    }, [city, isLoaded, results, cityCoordinates]);

  return (
      <>
        {isLoaded && alert !== null && alert !== undefined && (
            <>
                {alert.title !== undefined && alert.title !== null && (
                    <>
                        <p>
                            {alert.title}
                        </p>
                    </>
                )}
                {alert.description!== undefined && alert.description !== null && (
                    <>
                        <p>
                            {alert.description}
                        </p>
                    </>
                )}
            </>
        )}
      </>
  );

}

export default Alert;
