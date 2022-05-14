import moment from "moment";
import "moment/locale/zh-cn";

import { useDispatch, useSelector } from "react-redux";

import { DAY_DATE } from "../actions/types";

export default function Day({ setIsVisible, day }) {
  const dispatch = useDispatch();
  let dayTag = useSelector((state) => state.calender.data);
 
  const time = [
    "07:00 am",
    "08:00 am",
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
    "06:00 pm",
    "07:00 pm",
    "08:00 pm",
    "09:00 pm",
    "10:00 pm",
    "11:00 pm",
  ];

  let m = moment(day, "ddd MMM D YYYY HH:mm a");

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr className="allDay">
            <td className="alldayHead">All Days</td>
            <td className="gap"></td>
          </tr>

          {/* day row */}
          {time.map((t, i) => (
            < >
              <tr key={i} className="tabel_container">
                <td
                  data-content={t[0] > 0 ? t : t.substring(1)}
                  className="tabel-head"
                ></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "PM"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    let hour = e.target.id;
                    console.log(hour);
                    m.set({ h: hour, m: 0 });
                    console.log(m);
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });
                    console.log(m.format("HH:mm"));
                    console.log(moment(dayTag.date).format("HH:mm"));
                    setIsVisible(true);
                  }}
                  className="tabel-design"
                >
                  {m.format("HH:mm") == moment(dayTag.date).format("HH:mm") ? (
                    <span
                    className='day_data'
                    >
                    {console.log("checking... ",m.format("HH:mm") , " ", moment(dayTag.date).format("HH:mm"))}
                      Select Schdule
                    </span>
                  ) : (
                    <span>hello</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="col"></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "Pm"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    let hour = e.target.id;
                    console.log(hour);
                    var m = moment(day, "ddd MMM D YYYY HH:mm a");

                    m.set({ h: hour, m: 30 });
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });

                    setIsVisible(true);
                  }}
                  className="tabel-design"
                ></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
