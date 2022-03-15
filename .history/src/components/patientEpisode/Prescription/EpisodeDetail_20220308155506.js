export default function EpisodeDetail({details}) {
    // console.log('details is is')
    // console.log(details)
    return (    
        <>  
                <p><strong> Patient Name : </strong>{details.patientName}</p>
                <p><strong> Patient Code : </strong>{details.patientCode}</p>
            <p><strong> Episode No:  </strong>{details.episode_no || details.episodeId}</p>
            <p> <strong>Start Date : </strong> {details.start_date}</p>
            <p> <strong>Primary Complaint:  </strong>{details.primary_complaint}</p>
        </>
    )
}
