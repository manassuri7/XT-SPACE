export default function Cards({ data }) {
    return (
        <React.Fragment>
            {   
                data.map(({ links, mission_name, mission_id, flight_number, launch_year, launch_success, launch_landing }) =>
                    <div className="card">
                        <img className="imageBadge bold" src={links.mission_patch_small} alt={mission_name}/>
                        <div className="bold colorTitle">{mission_name}#{flight_number}</div>
                        <div className="bold">Mission Ids:</div>
                        <ul>
                            {
                                mission_id.map(id =>
                                    <li className="colorText">{id}</li>
                                    )
                            }
                        </ul>
                        <div className="bold">Launch Year: <span className="colorText">{launch_year}</span></div>
                        <div className="bold">Successful Launch: {launch_success? <span className="colorText">True</span>: <span className="colorText">False</span>}</div>
                        <div className="bold">Successful Landing: {launch_landing? <span className="colorText">True</span>: <span className="colorText">False</span>}</div>
                    </div>
                )
            }
        </React.Fragment>
    )
}