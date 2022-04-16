
export default function Appointment(model) {
    const appointData = model.data.appointmentData;
    return (
      <div className="showtime-preview">
        {(appointData && appointData.patient)?<div>{appointData.patient}</div>:""}
        {
          (appointData && appointData.startDate)?(
            <div>
              {(new Date(appointData.startDate)).toLocaleTimeString('en-US')}
              {' - '}
              {(new Date(appointData.endDate)).toLocaleTimeString('en-US')}
          </div>
          ):null
        }
      </div>
    );
  }
  