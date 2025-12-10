import {useState} from 'react';
import Loading_icon from '../Loading_icon.gif';
const WeatherCard = ({temperature, setCityName, cityName, humidity, windSpeed, loading, error, icon, desc, setUnit}) => {
    const [city, setCity] = useState('');
    const [checked, setChecked] = useState(false);
    console.log("checked is", checked);
    const handleChange = (e) => {
        setChecked(e.target.checked);
        if(!checked) {
            setUnit("imperial");
        } else {
            setUnit("metric");  
        }
    }
    return (
    <>
    <div className='weather-app' 
        onKeyDown={(e) => {
            if(e.key === 'Enter') 
                setCityName(city)}}>
        <div className='flex justify-between items-center'>
        <div className='name text-lg-left font-bold mt-10'>
          Weather Forecast
        </div>
        <div className='mt-10 items-center'>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" onChange={handleChange}/>
            <span class="select-none me-3 text-sm font-medium text-heading">Metric</span>
            <div class="relative w-9 h-5 bg-neutral-quaternary rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span class="select-none ms-3 text-sm font-medium text-heading">Imeprial</span>
            </label>
        </div>
        </div>
        <div className='flex city-row justify-between'>
        <div className='grow'>
        <input type="text" className='w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter city name..." value={city} onChange={(e) => setCity(e.target.value)}/>
        </div>
        <button className='bg-sky-500 hover:bg-sky-700 rounded-lg w-40 h-10 cursor-pointer' onClick={() => setCityName(city)}>Get Weather</button>
        </div>
        <div className='city-info'>Enter a city to get weather.</div>
        <div className='weather-card rounded-lg'>
          <div className='font-bold px-2 py-2'>
          Weather Card
          </div>
          
          <div className='flex w-auto'>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className='w-30 h-30'/>
            <div className="flex items-center">
              
              <div className="text-3xl text-end font-bold w-40">
                {(!error && cityName) &&<>
                {temperature} {checked && <>°F</>} {!checked && <>°C</>}
                </>
                } 
              </div>
              <div className="flex flex-col w-50">
                <div className="font-bold text-xl">{!error &&<>
                {cityName}
                </>
                }</div>
                <div className="text-gray-400">{desc}</div>
              </div>
            </div>
          </div>
          <div className='flex w-full text-gray-400 items-center px-4 justify-between h-10'>
              <div className='flex w-1/2 items-center'>{loading && <><div><img src={Loading_icon} className='w-10 h-10'/></div>
                <div>Loading...</div></>}</div>
            <div className='flex'>
              <div>Humidity: </div>
              <div className='w-10 text-right'>{humidity}%</div>
            </div>
              <div className='w-22 text-right'>{windSpeed} {!checked && <>m/s</>}{checked && <>mph</>}</div>
          </div>
        </div>
        {error &&
        <div className='error rounded-lg bg-white h-10 flex items-center px-2'>
          ⚠︎ {error}
        </div>
        }
      </div>
    </>
    )
}

export default WeatherCard; 