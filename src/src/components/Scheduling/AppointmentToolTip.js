import React from 'react';

export default class AppointmentTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: props.data.appointmentData
    };
  }
  render() {
    const {movieData} = this.state;
    return (
      <div className="movie-tooltip">
        <div className="movie-info">
        {
          movieData && movieData.patient?(
            <div className="movie-title">
              {movieData.patient}
            </div>
          ):null
        }
          
          <div>
            Notes: {movieData.notes}
          </div>
          <div>
            Complaint: {movieData.complaint}
          </div>
          <div>
            Status: {movieData.status}
          </div>
          <div>
            Location : {movieData.location}
          </div>
          {/* aswin 10/30/2021 start  */}
          {
            movieData.video_link && (
            <p href={movieData.video_link}>
              {movieData.video_link}
            </p>
            )
          }
          {/* aswin 10/30/2021 stop  */}
          <div>
            {(new Date(movieData.startDate)).toLocaleTimeString('en-US')}
            {' - '}
            {(new Date(movieData.endDate)).toLocaleTimeString('en-US')}
        </div>
        </div>
      </div>
    );
  }
}