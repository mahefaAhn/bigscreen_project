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
    const [pieChartData, setPieChartData]       = useState([]);
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
        }
    ];
    // Radar Chart
    const urlRadarChart                         = '/admin/getRadarChartData';
    const [questionsRadar, setQuestionsRadar]   = useState([]);

    useEffect(() => {
        // Pie Chart Data
        const configAxios   = {
            headers: {
                'Access-Control-Allow-Methods'  : 'POST, GET, OPTION',
                'Access-Control-Allow-Origin'   : '*',
            },
        };
        axios.post(urlAllChart, arrayQuestion, configAxios)
        .then(function (response) {
            setPieChartData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        // Radar chart Data
        axios.get(urlRadarChart, configAxios)
        .then(function (response) {
            console.log(response.data);
            setQuestionsRadar([...questionsRadar,response.data]);
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
                        {pieChartData.map(p => (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  bsGraph" key={p.id}>
                                <p className="chartTitle font-weight-bold text-dark text-center">{p.title}</p>
                                {(p.type=='chart') ? <Pie data={p.data} /> : ((p.type=='radar') ? <Radar data={p.data} /> : '')}
                            </div>
                        ))}
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  bsGraph">
                            <p className="chartTitle font-weight-bold text-dark text-center">Qualités</p>
                            {questionsRadar.map( (content,index) => {
                                return <Radar 
                                data={{
                                    datasets: [
                                        {
                                            data                    : content.datasets.data.map(d => d),
                                            backgroundColor         : content.datasets.backgroundColor,
                                            hoverBackgroundColor    : content.datasets.hoverBackgroundColor,
                                            borderColor             : content.datasets.borderColor,
                                            pointBackgroundColor    : content.datasets.pointBackgroundColor,
                                            pointHoverBorderColor   : content.datasets.pointHoverBorderColor,
                                            pointBorderColor        : content.datasets.pointBorderColor,
                                            pointHoverBackgroundColor: content.datasets.pointHoverBackgroundColor,
                                            label                   : "Evaluation de qualité"
                                        }
                                    ],
                                    // These labels appear in the legend and in the tooltips when hovering different arcs
                                    labels: content.labels.map(l => l)
                                }} 
                                options={{
                                    scale: {
                                        angleLines: {
                                            display: false
                                        },
                                        ticks: {
                                            z: 100,
                                            max: 5,
                                            min: 0,
                                            stepSize: 1
                                        }
                                    }
                                }}
                                key={index}/>
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
