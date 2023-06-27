import './index.css'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';

const Open_Tab = () => {
    const [onLoading, setOnLoading] = useState(true);
    const [combostate, setCombostate] = useState({ACCOUNT: '', DATA: '', LEGS: '', SYMBOL: '', TYPE: ''})
    const [combo, setCombo] = useState({
        ACCOUNT: [],
        DATA: [],
        LEGS: [],
        SYMBOL: [],
        TYPE: []
    })
    useEffect(() => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/mttools`,
            data: '',
            headers: { 'Content-Type': 'multipart/form-data' }
          })
            .then((res) => {
                setOnLoading(false)
                let temp = res.data
                setCombo(temp)
                setCombostate({ACCOUNT: temp['ACCOUNT'][0], DATA: temp['DATA'][0], LEGS: temp['LEGS'][0], SYMBOL: temp['SYMBOL'][0], TYPE: temp['TYPE'][0]})
            })
            .catch(() => {
                setOnLoading(false)
            });
    }, []);

    const handleChange = (key, value) => {
        const temp = {
            ...combostate,
            [key]: value
        }
        setCombostate(temp);
        console.log(temp)
    };



    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
        {
            onLoading ? <p style={{color: "white"}}> loading ... </p>:
            (
            <div className='tab-container'>
                <div className='combo-group'>
                    {Object.entries(combo).map(([key, value]) => (
                        <div key={key} style={{width: '100%'}}>
                            <div style={{padding:'5px'}}>{key}</div>
                            <FormControl sx={{ minWidth: '100%', color: 'white', fontSize: '30px' }}>
                                <Select value={combostate[key]} onChange={(e) => handleChange(key, e.target.value)} sx={{ '& .MuiSelect-icon': { color: 'white' }, color: 'white' }}>
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
                        <DatePicker className='datepicker' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div style={{minWidth: '120px'}}>
                        <div style={{padding:'5px'}}>CLOSED DATE</div>
                        <DatePicker className='datepicker' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div style={{minWidth: '200px' }}>
                        <div style={{padding:'5px'}}>OPEN TIME</div>
                        <TimePicker.RangePicker style={{height: '40px', color: 'red'}}/>
                    </div>
                    <div style={{color: 'white', fontSize: '30px', width: '50%', display: 'flex', justifyContent:'right', alignItems:'end', cursor: 'pointer'}}>
                        <DownloadOutlined />
                    </div>
                </div>
    
            </div>
            )
        }
        </>
        
    );
}
export default Open_Tab
