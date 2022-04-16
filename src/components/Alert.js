import { useEffect, useState } from 'react';
import { MAX_RESULTS } from 'react-search-autocomplete/dist/components/ReactSearchAutocomplete';

function Alert({ city, isLoaded, results, cityCoordinates, APIKEY}) {
 
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if(isLoaded && cityCoordinates !== null && cityCoordinates !== undefined) {
            const alertUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&exclude=&appid=${process.env.REACT_APP_APIKEY}`
            fetch(alertUrl)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if(result.alerts) {
                        const title = result.alerts[0].event
                        const info = result.alerts[0].description
                        setAlert({title: title, info: info})
                    }
                }, 
                (error) => {
                    console.log(error)
                }
            )
        }
    }, [city, isLoaded, results, cityCoordinates, APIKEY]);

    // useEffect(() => {
    //         if(isLoaded) {
    //           const alertUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&exclude=&appid=${process.env.REACT_APP_APIKEY}`
    //           fetch(alertUrl)
    //           .then((res) => res.json())
    //           .then(
    //             (result) => {
    //               if(result.alerts) {
    //                 const rawDesciption = result.alerts[0].description
    //                 const divisions = rawDesciption.split("*")
    //                 const alertData = {}
    //                 console.log(rawDesciption)
    //                 divisions.forEach(element => {
    //                   // const trimmed = element.trim()
    //                   let newText = element.replace('...', ' ').replace(/\s+/g, ' ').trim()
    //                   if(newText.startsWith('WHAT')) {
    //                     newText = newText.replace('WHAT', '').trim()
    //                     alertData.what = newText
    //                   } else if(newText.startsWith('WHERE')) {
    //                     newText = newText.replace('WHERE', '').trim()
    //                     alertData.where = newText
    //                   } else if(newText.startsWith('WHEN')) {
    //                     newText = newText.replace('WHEN', '').trim()
    //                     alertData.when = newText
    //                   } else if(newText.startsWith('IMPACTS')) {
    //                     newText = newText.replace('IMPACTS', '').trim()
    //                     alertData.impacts = newText
    //                   } else {
    //                     const titles = newText.replaceAll('...', ' ').split('  ')
    //                     titles.forEach((title, index) => {
    //                       const newTitle = title.trim()
    //                       titles[index] = newTitle
    //                     });
    //                     alertData.headlines = titles
    //                   }
    //                 });
    //                 setAlerts(alertData)
    //                 console.log(alertData)
    //               } else {
    //                 setAlerts(null)
    //               }
    //             },
    //             (err) => {
    //               console.log(err)
    //             }
    //           )
    //         }
    //   }, [isLoaded]); 

  return (
      <>
        {isLoaded && alert !== null && alert !== undefined && (
            <>
                <p>
                    Alerts is working.
                </p>
            </>
        )}
      </>
  );

}

export default Alert;
