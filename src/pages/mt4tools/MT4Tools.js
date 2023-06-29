import './index.css'
import { useState, useEffect, useRef } from 'react';
import { EyeOutlined, TableOutlined, DownloadOutlined } from '@ant-design/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import logo from 'assets/images/icons/tbLogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { TimePicker } from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import CanvasJSReact from '@canvasjs/react-charts';

const MT4Tools = () => {
    const [onLoading, setOnLoading] = useState(true);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    let endDate = new Date();
    const [timeRange, setTimeRange] = useState([dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")])
    const [filter, setFilter] = useState({ACCOUNT: '', DATA: '', LEGS: '', SYMBOL: '', TYPE: '', OPEN_DATE: startDate, CLOSED_DATE: endDate, TIME_RANGE: ["00:00:00","23:59:59"]})
    const [combo, setCombo] = useState({ACCOUNT: [], DATA: [], LEGS: [], SYMBOL: [], TYPE: []})
    const tabRef = useRef()
    const overviewRef = useRef()

    const getTimeFromDateString = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
        return formattedTime;
    };
    
    const addLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    //  Widget 1
    const symbols = {'AUDCAD':0, 'AUDCHF':0, 'AUDJPY':0, 'AUDNZD':0, 'AUDUSD':0, 'CADCHF':0, 'CADJPY':0, 'CHFJPY':0, 'EURAUD':0, 'EURCAD':0, 'EURGBP':0, 'EURJPY':0, 'EURNZD':0, 'EURUSD':0, 'GPBAUD':0, 'GBPCAD':0, 'GBPCHF':0, 'GBPJPY':0, 'GBPNZD':0, 'GBPUSD':0, 'NZDCAD':0, 'NZDCHF':0, 'NZDJPY':0, 'NZDUSD':0, 'USDCAD':0, 'USDCHF':0, 'USDJPY':0}
    const [elementsSL, setElementsSL] = useState([]);
    
    //  Widget 2
    const [elementsSP, setElementsSP] = useState([]);
    const [profit, setProfit] = useState(0);

    //  Widget 3
    const [elementsChart, setElementsChart] = useState([]);
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const Chart = () => {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            height: "250",
            axisX:{
                gridThickness: 1,
                interval:2, 
                intervalType: "day",        
                valueFormatString: "YY.MM.DD", 
                labelAngle: 90
            },
            data: [{
                type: "line",
                toolTipContent: "Total Legs: ({x}): {y}",
                dataPoints: elementsChart
            }]
        }
        return (
        <div>
            <CanvasJSChart options = {options} />
        </div>
        );
    }

    //  Widget 9
    const [overview, setOverview] = useState([])

    //  Widget 10
    const summary_items = ['SUMMARY', 'DETAIL']
    const update_string = 'Data Last Updated: 5/2/2023 1:30 PM'
    const [item, setItem] = useState(summary_items[0]);
    const handleChangeSummary = (event) => {
      setItem(event.target.value);
    };

    

    useEffect(() => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/mttools/index`,
            data: '',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
            let temp = res.data['COMBO']
            setCombo(temp)
            setFilter(pre => {
                return { ...pre, DATA: temp['DATA'][0], ACCOUNT: temp['ACCOUNT'][0], LEGS: temp['LEGS'][0], SYMBOL: temp['SYMBOL'][0], TYPE: temp['TYPE'][0] }
            })
           
            //  Widget 1
            let SL_items = res.data.SL
            for(let SL_item in SL_items) {
                    let key = (Object.values(SL_items)[SL_item][0]).toUpperCase()
                    let val = Object.values(SL_items)[SL_item][1]
                    symbols[key] = val
                }
                let element = [];
                for(let i=0; i < Object.keys(symbols).length/2; i++) {
                    let i_2 = parseInt(Object.keys(symbols).length/2) + 1 + i
                    element.push(
                        <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'2px', backgroundColor: i%2==0?'RGBa(255,255,255,0.1)':''}}>
                          <div style={{width:'40%', display:'flex', justifyContent: 'space-between'}}><div>{Object.keys(symbols)[i]}</div> {Object.values(symbols)[i]!==0?<div>{Object.values(symbols)[i]}</div>:null}</div>
                          <div style={{width:'40%', display:'flex', justifyContent: 'space-between'}}><div>{Object.keys(symbols)[i_2]}</div> {Object.values(symbols)[i_2]!==0?<div>{Object.values(symbols)[i_2]}</div>:null}</div>
                        </div>
                    );
                }
                setElementsSL(element)
            })
            .catch((err) => {
                console.log(err)
            });
        if (onLoading) return;
        overviewRef.current.width = tabRef.current.scrollWidth;
    }, []);

    const handleChange = (key, value) => {
        if(key === 'TIME_RANGE') {
            let temp = value
            let st = getTimeFromDateString(temp[0]);
            let end = getTimeFromDateString(temp[1]);
            setFilter({
                ...filter,
                [key]: [st, end]
            });
            setTimeRange(value)
        }
        else {
            const temp = {
                ...filter,
                [key]: value
            }
            setFilter(temp);
        }
        setOnLoading(true)
    };
    
    useEffect(() => {
        if(filter['ACCOUNT'] !== '') {
            const formData = new FormData();
            formData.append('filter', JSON.stringify(filter));
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/mttools/main`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                //  Widget 2
                let SP_items = res.data.SP
                let element = []
                let i =0;
                let temp_profit = 0
                for(let SP_item in SP_items) {
                    let symbol = Object.values(SP_items)[SP_item][0]
                    let price = Object.values(SP_items)[SP_item][1]
                    temp_profit += parseFloat(price)
                    element.push(
                        <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'0px 10px', backgroundColor: i%2==0?'RGBa(255,255,255,0.1)':''}}>
                            <div>{symbol.toUpperCase()}</div>
                            <div>{price}</div>
                        </div>
                    );
                    i+=1;
                }
                setElementsSP(element)
                setProfit(temp_profit)
                
                //  Widget 3
                let chart_info = res.data.ChartRES
                let chart_temp = []
                for(let Chart_item in chart_info) {
                        let key = (Object.values(chart_info)[Chart_item][0])
                        let val = Object.values(chart_info)[Chart_item][1]
                        chart_temp.push({x:new Date(key), y:val})
                }
                setElementsChart(chart_temp)

                //  Widget 9
                let overview_temp = res.data.overview
                element = []
                for(let i=0; i < Object.keys(overview_temp).length; i++){
                    let key = Object.keys(overview_temp)[i]
                    let val = Object.values(overview_temp)[i]
                    element.push(<div className='overview_item' key={i}><div>{key}</div><div className='overview_val'>{val}</div></div>)
                }
                setOverview(element)
                
                setOnLoading(false) 
            })
            .catch(() => {
                setOnLoading(false)
            });
        }
    }, [filter])

    return (
        <>  
            <div className="main">
                {!onLoading ? 
                <div className="left-side">
                    <div className='logo'>
                        <Link className='logo-img' to='/dashboard'><img src ={logo} alt='logo' style={{width: '100%'}}></img></Link>
                        <div className='logo-text'>
                            <div style={{fontSize: '20px'}}>Tradding Buddy</div>
                            <div>Fx MT DCA</div>
                        </div>
                    </div>
                    <div className='open-trades'>
                        <div style={{display:'flex', justifyContent:'space-between'}}>OPEN TRADES<EyeOutlined /> </div>
                        <div style={{padding: '10px 0px'}}>SYMBOL / LEGS</div>
                        <div style={{fontSize: '12px', justifyContent:'space-between'}}>{elementsSL}</div>
                    </div>
                    <div className='total-profit'>  
                        <div style={{display:'flex', justifyContent:'space-between'}}>Total Profit<EyeOutlined /></div>  
                        <div style={{padding: '0px 20px', justifyContent:'space-between', display: 'flex'}}>
                            <div>SYMBOL</div>
                            <div>PROFIT</div>
                        </div>
                        <div className='profitContainer'>{elementsSP}</div>
                        <div style={{padding: '5px 30px', justifyContent:'space-between', display: 'flex', fontSize: '15px'}}>
                            <div>TOTAL</div>
                            <div>{profit.toFixed(2)}</div>
                        </div>
                    </div>
                </div>:null}
                <div className='data-info'>
                    <div className='summary'>
                        <div>
                            <FormControl sx={{ minWidth: 140 }}>
                                <Select value={item} onChange={handleChangeSummary} sx={{ '& .MuiSelect-icon': { color: 'white' }, color: 'white', }}>
                                    {summary_items.map((item, index) => (
                                        <MenuItem value={item} key = {index}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{fontSize: '25px', cursor: 'pointer'}}><TableOutlined /></div>
                        <div>{update_string}</div>
                    </div>
                    {
                        onLoading ? <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>:
                        (
                        <div>
                            <div className='graph' >
                                <Chart /> 
                            </div>
                            <div className='tab'>
                                <div className='tab-container' ref={tabRef}>
                                    <div className='combo-group'>
                                        {Object.entries(combo).map(([key, value]) => (
                                            <div key={key} style={{width: '100%'}}>
                                                <div style={{padding:'5px'}}>{key}</div>
                                                <FormControl sx={{ minWidth: '100%', color: 'white', fontSize: '30px' }}>
                                                    <Select value={filter[key]} onChange={(e) => handleChange(key, e.target.value)} sx={{ '& .MuiSelect-icon': { color: 'white' }, color: 'white' , height: '30px' }}>
                                                        {value.map((item, index) => (
                                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            ))
                                        }
                                        <div style={{minWidth: '120px'}}>
                                            <div style={{padding:'5px'}}>OPEN DATE</div>
                                            <DatePicker className='datepicker' selected={filter['OPEN_DATE']} onChange={(date) => handleChange("OPEN_DATE", date)} />
                                        </div>
                                        <div style={{minWidth: '120px'}}>
                                            <div style={{padding:'5px'}}>CLOSED DATE</div>
                                            <DatePicker className='datepicker' selected={filter['CLOSED_DATE']} onChange={(date) => handleChange("CLOSED_DATE", date)} />
                                        </div>
                                        <div style={{minWidth: '200px' }}>
                                            <div style={{padding:'5px'}}>OPEN TIME</div>
                                            <TimePicker.RangePicker className="timepicker" onChange={(e) =>handleChange('TIME_RANGE', e)} showNow={false} value={timeRange}/>
                                        </div>
                                        <div style={{color: 'white', fontSize: '30px', width: '50%', display: 'flex', justifyContent:'right', alignItems:'end', cursor: 'pointer'}}>
                                            <DownloadOutlined />
                                        </div>
                                    </div>
                                    <div className='overview' ref={overviewRef}>
                                        {overview}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    } 
                </div>
            </div>
        </>
    );
}
export default MT4Tools