import Head from 'next/head';
import Button from '../Components/Button';
import React, { useState, useEffect } from "react";
import Cards from '../Components/Cards';
import { useRouter } from 'next/router';

export default function Home() {
    const [hasError, setErrors] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const router = useRouter();
    const url = "https://api.spacexdata.com/v3/launches?limit=100";
    const defaultLaunchYears = [
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
    ];

    async function fetchData() {
      const res = await fetch(getNewApiUrl());
      res
        .json()
        .then(response => setInitialData(response))
        .catch(err => setErrors(err));
    }
  
    useEffect(() => {
      fetchData();
    },[router.query]);

    function getNewApiUrl() {
      let newURL = url;
      let { launch_year, launch_success, landing_success } = router.query;

      if(launch_year) {
          newURL = newURL.concat('&launch_year=', launch_year);
          toggleButton("yearBtn", launch_year);
      }
      if(launch_success != undefined && launch_success != null) {
          newURL = newURL.concat('&launch_success=', launch_success);
          toggleButton("launchSuccessBtn", launch_success);
      }
      if(landing_success != undefined && landing_success != null) {
          newURL = newURL.concat('&landing_success=', landing_success);
          toggleButton("landingSuccessBtn", landing_success);
      }
      return newURL;
    }

    function toggleButton(className, targetValue) {
      let buttons= document.getElementsByClassName(className);
        for(let i = 0; i < buttons.length; i++) {
          if(buttons[i].value.toLowerCase() == targetValue) {
            buttons[i].className = `button buttonSelected ${className}`;
          } else {
            buttons[i].className = `button ${className}`;
          }
        }
    }

    function onLaunchYearClick(event) {
      router.push({ query: getQuery('launch_year', event.target.value) });
      toggleButton("yearBtn", event.target.value);   
    }

    function onLaunchSuccessClick(event) {
      router.push({ query: getQuery('launch_success', event.target.value.toString().toLowerCase()) });
      toggleButton("launchSuccessBtn", event.target.value);
    }

    function onLandingSuccessClick(event) {
      router.push({ query: getQuery('landing_success', event.target.value.toString().toLowerCase()) });
      toggleButton("landingSuccessBtn", event.target.value);
    }

    function getQuery(typeName, value) {
      let query = {};
      let { launch_year, launch_success, landing_success } = router.query;

      if(typeName == 'launch_year') {
        query["launch_year"] = value;
        if(launch_success != undefined && launch_success != null)
          query["launch_success"] = launch_success;
        if(landing_success != undefined && landing_success != null) 
          query["landing_success"] = landing_success;
      } else if(typeName == 'launch_success') {
        if(launch_year)
          query["launch_year"] = launch_year;
        query["launch_success"] = value;
        if(landing_success != undefined && landing_success != null) 
          query["landing_success"] = landing_success;
      } else if(typeName == 'landing_success') {
        if(launch_year)
          query["launch_year"] = launch_year;
        if(launch_success != undefined && launch_success != null)
          query["launch_success"] = launch_success;
        query["landing_success"] = value;
      }

      return query;
    }

    return (
        <React.Fragment>
            <Head>
                <title>XT Space App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="col-12 col-s-12 main" ><h1>SpaceX Launch Programs</h1></div>
                <div className="filterMenu col-3 col-s-6">
                    <span className="lblText">Filters</span>
                    <div className="menuLblText">Launch Year</div>
                    <hr/>
                    {   
                        defaultLaunchYears.map(year => 
                        <Button className={"button yearBtn"} value={year} onClick={onLaunchYearClick}/>
                    )}
                    <div className="menuLblText">Successful Launch</div>
                    <hr/>
                    <Button className={"button launchSuccessBtn"} value={"True"} onClick={onLaunchSuccessClick}/>
                    <Button className={"button launchSuccessBtn"} value={"False"} onClick={onLaunchSuccessClick}/>
                    <div className="menuLblText">Successful Landing</div>
                    <hr/>
                    <div>
                    <Button className={"button landingSuccessBtn"} value={"True"} onClick={onLandingSuccessClick}/>
                    <Button className={"button landingSuccessBtn"} value={"False"} onClick={onLandingSuccessClick}/>
                    </div>
                </div>
                <div className="cardsContainer">
                    <Cards data={initialData} />
                </div>
                { hasError ? <span>{JSON.stringify(hasError)}</span> : null }
                <div className="footer col-12 col-s-12">Developed By: Manas Suri</div>
            </div>
        </React.Fragment>
    )
}