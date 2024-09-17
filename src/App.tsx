import './App.css'
import prayImage from "/public/img.jpg"
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/dist/locale/ar';
import Loader from './components/loader';
moment.locale("ar")
function App() {

  interface Pray {
    prayName: string;
    prayTime: string;
  }


  interface ApiResponse {
    data: {
      timings: {
        Fajr: string,
        Dhuhr: string,
        Asr: string,
        Maghrib: string,
        Isha: string,
      }
    }
  }

 


  let [selectCity, setSelectedCity] = useState<string>("")
  let [today, setToday] = useState<string>("")
  let [prayTimes, setPrayTimes] = useState<Pray[]>([])
  let [nextPray , setNextPray] = useState<string>("")




  useEffect(() => {
    let t = moment().format("D MMMM YYYY")
    setToday(t)
  }, [])





  const handleNextPray = async () => {
    let timeNow = moment();
    let date = moment().format("DD-MM-YYYY");
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/17-09-2024?city=${selectCity}&country=Egypt&date=${date}`);
    const data: ApiResponse = await response.json();
    let fajr = moment(data.data.timings.Fajr, "HH:mm");
    let dhuhr = moment(data.data.timings.Dhuhr, "HH:mm");
    let asr = moment(data.data.timings.Asr, "HH:mm");
    let maghrib = moment(data.data.timings.Maghrib, "HH:mm");
    let isha = moment(data.data.timings.Isha, "HH:mm");
  
    if (timeNow.isAfter(fajr) && timeNow.isBefore(dhuhr)) {
      setNextPray("الظهر")
    } else if (timeNow.isAfter(dhuhr) && timeNow.isBefore(asr)) {
      setNextPray("العصر")
    } else if (timeNow.isAfter(asr) && timeNow.isBefore(maghrib)) {
      setNextPray("المغرب")
    } else if (timeNow.isAfter(maghrib) && timeNow.isBefore(isha)) {
      setNextPray("العشاء")
    } else {
      setNextPray("الفجر")
    }
  };
  

  const handleChange = async (e: any) => {
    setSelectedCity(e.target.value)
  }


  const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'مسائا' : 'صباحا';
    const hours12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours12}:${formattedMinutes} ${period}`;
  }



  const handlePrayTime = async () => {
    let date = moment().format("DD-MM-YYYY");
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectCity}&country=Egypt&date=${date}`);
    const data: ApiResponse = await response.json();
    const timings = data.data.timings;

    setPrayTimes([
      {
        prayName: "الفجر",
        prayTime: convertTo12HourFormat(timings.Fajr),
      },
      {
        prayName: "الظهر",
        prayTime: convertTo12HourFormat(timings.Dhuhr),
      },
      {
        prayName: "العصر",
        prayTime: convertTo12HourFormat(timings.Asr),
      },
      {
        prayName: "المغرب",
        prayTime: convertTo12HourFormat(timings.Maghrib),
      },
      {
        prayName: "العشاء",
        prayTime: convertTo12HourFormat(timings.Isha),
      }
    ]);
    handleNextPray()
  }


  useEffect(() => {
    handlePrayTime()
  }, [selectCity])

  return (
    <>
      <div className="container" style={{ padding: "30px" }}>
        <h1 style={{ color: "var(--text)", direction: "rtl" }}>{today}</h1>
      </div>
      <div className="awaiter">
        <h1 style={{ color: "var(--text)", textAlign: "center" }}>الصلاة القادمة هي صلاة {nextPray}</h1>
      </div>
      <div className="menu" style={{ display: "flex", justifyContent: "center", padding: "30px", alignItems: "center" }}>
        <select value={selectCity} onChange={handleChange} name="اختر مدينتك" id="praySelect" style={{ color: "var(--text)", borderRadius: "5px", height: "30px", width: "40%", textAlign: "center", backgroundColor: "var(--secondary", border: "none", outline: "none" }}>
          <option style={{ color: "var(--text)", fontWeight: "400" }} value="cairo">القاهرة</option>
          <option style={{ color: "var(--text)", fontWeight: "400" }} value="alexandria">الإسكندرية</option>
          <option style={{ color: "var(--text)", fontWeight: "400" }} value="belkas">بلقاس</option>
        </select>
      </div>
      {
        prayTimes.length !== 0 ?
          <div className="prayCards" style={{ direction: "rtl", padding: "20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px", marginTop: "30px", justifyContent: "center" }}>
            {prayTimes.map((item: Pray, index: number) => {
              return (
                <div key={index} style={{ borderRadius: "5px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--accent)" }}>
                  <img src={prayImage} alt={`${item.prayName} img`} width={300} height={200} />
                  <div className="prayInfo" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl", padding: "15px" }}>
                    <h1 style={{ color: "var(--text)" }}>{item.prayName}</h1>
                    <span style={{ color: "var(--text)", fontSize: "20px" }}>{item.prayTime}</span>
                  </div>
                </div>
              )
            })}
          </div>
          :
          <Loader />
      }
    </>
  )
}

export default App
