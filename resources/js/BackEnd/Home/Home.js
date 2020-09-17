import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Pie, Radar} from 'react-chartjs-2';
/* Menu */ 
import Menu from '../Menu/Menu';

/* CSS */
import '../../CommonCSS/style.css'
import './Home.css'

const Home = (props) => {
    const [error,setError]                      = useState(null);
    // All Chart
    const urlAllChart                           = '/admin/chartData';
    const [allData, setAllData]                 = useState([]);
    const arrayQuestion = [
        {
            'idQuestion'    : 6,
            'typeChart'     : 'pie',
        },
        {
            'idQuestion'    : 7,
            'typeChart'     : 'pie',
        },
        {
            'idQuestion'    : 10,
            'typeChart'     : 'pie',
        },
        {
            'idQuestion'    : 11,
            'typeChart'     : 'radar',
        },
        {
            'idQuestion'    : 12,
            'typeChart'     : 'radar',
        },
        {
            'idQuestion'    : 13,
            'typeChart'     : 'radar',
        },
        {
            'idQuestion'    : 14,
            'typeChart'     : 'radar',
        },
        {
            'idQuestion'    : 15,
            'typeChart'     : 'radar',
        }
    ];

    useEffect(() => {
        // Chart Data
        const configAxios   = {
            headers: {
                'Access-Control-Allow-Methods'  : 'POST, GET, OPTION',
                'Access-Control-Allow-Origin'   : '*',
            },
        };
        axios.post(urlAllChart, arrayQuestion, configAxios)
        .then(function (response) {
            setAllData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    return (
        <div className="container">
            <div className="row admin_fullContainer">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 admin_menuContent">
                    <Menu/>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 admin_mainContent">
                    <h2 className="admin_h2">Statistiques</h2>
                    <div className="row graphContainer">
                        {allData.map(p => (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  bsGraph" key={p.id}>
                                <p className="chartTitle font-weight-bold text-dark text-center">{p.title}</p>
                                {(p.type=='chart') ? <Pie data={p.data} /> : ((p.type=='radar') ? <Radar data={p.data} /> : '')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;