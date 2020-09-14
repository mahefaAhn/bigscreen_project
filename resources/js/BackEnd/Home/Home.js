import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Pie, Radar} from 'react-chartjs-2';
import './Home.css'

const Home = (props) => {
    const [error,setError]                      = useState(null);
    const urlPieChartData                       = '/admin/pieChartData';
    const [pieChartData, setPieChartData]       = useState([]);
    // Radar Chart
    const urlRadarChartData                     = '/admin/radarChartData';
    const [radarChartData, setRadarChartData]   = useState([]);

    useEffect(() => {
        // Pie Chart
        axios
        .get(urlPieChartData)
        .then(response => (
            setPieChartData(response.data)
        ));
        // Radar Chart
        axios
        .get(urlRadarChartData)
        .then(response => (
            setRadarChartData(response.data)
        ));
    }, [])

    return (
        <div>
            <div className="row">
                {pieChartData.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <p className="font-weight-bold">{p.id+'- '+p.title}</p>
                        <Pie data={p.data} />
                    </div>
                ))}
            </div>
        <hr/>
            <div className="row">
                {radarChartData.map(r => (
                    <div className="col-md-4" key={r.id}>
                        <p className="font-weight-bold">{r.id+'- '+r.title}</p>
                        <Radar data={r.data} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;