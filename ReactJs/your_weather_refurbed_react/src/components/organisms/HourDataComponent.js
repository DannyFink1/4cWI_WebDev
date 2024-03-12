
import useAPI from '../../states/Api'
import HourDataMolecule from '../molecules/HourDataMolecule';

export default function HourDataComponent() {

    const { todayRange } = useAPI();
    


    return (
        <div id="daysforecast"
            className="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] mb-4 border-solid border-black border-[2px] flex items-center relative overflow-hidden">
            <div className="flex overflow-x-auto h-auto m-1">
                <div className="flex flex-row h-auto" id="hour-list">
                    {todayRange.forecast.forecastday[0].hour.map((data, index) => {
                        return <HourDataMolecule
                            hour={index}
                            temp={data.temp_c}
                            icon={data.condition.icon}
                            humidity={data.humidity} />
                    })}
                </div>
            </div>
        </div>
    )
}
